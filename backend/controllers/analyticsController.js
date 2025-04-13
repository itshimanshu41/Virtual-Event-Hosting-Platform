const { logEvent, getEventMetrics, publishCustomMetric } = require('../services/analyticsService');

exports.logInteraction = async (req, res, next) => {
  try {
    const { eventId, action, metadata } = req.body;
    await logEvent(eventId, req.user.userId, action, metadata);
    
    // Publish custom metric
    await publishCustomMetric(
      'UserInteraction',
      1,
      [
        { Name: 'EventId', Value: eventId },
        { Name: 'ActionType', Value: action }
      ]
    );
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.getEventAnalytics = async (req, res, next) => {
  try {
    const metrics = await getEventMetrics(req.params.eventId);
    res.json(metrics);
  } catch (error) {
    next(error);
  }
};

exports.getSessionAnalytics = async (req, res, next) => {
  try {
    // Similar to event analytics but filtered by session
    const params = {
      TableName: process.env.DYNAMODB_EVENTS_TABLE,
      FilterExpression: 'eventId = :eventId AND metadata.sessionId = :sessionId',
      ExpressionAttributeValues: {
        ':eventId': req.params.eventId,
        ':sessionId': req.params.sessionId
      }
    };

    const data = await dynamodb.scan(params).promise();
    
    const metrics = {
      totalParticipants: new Set(data.Items.map(item => item.userId)).size,
      totalInteractions: data.Items.length,
      interactionsByType: data.Items.reduce((acc, item) => {
        acc[item.action] = (acc[item.action] || 0) + 1;
        return acc;
      }, {})
    };
    
    res.json(metrics);
  } catch (error) {
    next(error);
  }
};