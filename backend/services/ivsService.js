const { ivs } = require('../config/aws-config');

const createChannel = async (channelName) => {
  const params = {
    name: channelName,
    type: 'STANDARD',
    tags: {
      purpose: 'virtual-event'
    }
  };

  try {
    const result = await ivs.createChannel(params).promise();
    return {
      channelArn: result.channel.arn,
      playbackUrl: result.channel.playbackUrl,
      ingestEndpoint: result.channel.ingestEndpoint,
      streamKey: result.streamKey.value
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getChannel = async (channelArn) => {
  const params = {
    arn: channelArn
  };

  try {
    const result = await ivs.getChannel(params).promise();
    return result.channel;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteChannel = async (channelArn) => {
  const params = {
    arn: channelArn
  };

  try {
    await ivs.deleteChannel(params).promise();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createChannel,
  getChannel,
  deleteChannel
};