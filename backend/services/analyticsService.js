const { dynamodb, cloudwatch } = require('../config/aws-config');

const logEvent = async (eventId, userId, action, metadata = {}) => {
  const params = {
    TableName: process.env.DYNAMODB_EVENTS_TABLE,
    Item: {
      eventId,
      userId,
      action,
      timestamp: new Date().toISOString(),
      metadata
    }
  };

  try {
    await dynamodb.put(params).promise();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEventMetrics = async (eventId) => {
  // Get basic counts from DynamoDB
  const params = {
    TableName: process.env.DYNAMODB_EVENTS_TABLE,
    FilterExpression: 'eventId = :eventId',
    ExpressionAttributeValues: {
      ':eventId': eventId
    }
  };

  try {
    const data = await dynamodb.scan(params).promise();
    
    // Process data to get metrics
    const metrics = {
      totalParticipants: new Set(data.Items.map(item => item.userId)).size,
      totalInteractions: data.Items.length,
      interactionsByType: data.Items.reduce((acc, item) => {
        acc[item.action] = (acc[item.action] || 0) + 1;
        return acc;
      }, {})
    };
    
    return metrics;
  } catch (error) {
    throw new Error(error.message);
  }
};

const publishCustomMetric = async (metricName, value, dimensions) => {
  const params = {
    MetricData: [
      {
        MetricName: metricName,
        Dimensions: dimensions,
        Value: value,
        Unit: 'Count',
        Timestamp: new Date()
      }
    ],
    Namespace: 'VirtualEvents'
  };

  try {
    await cloudwatch.putMetricData(params).promise();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  logEvent,
  getEventMetrics,
  publishCustomMetric
};