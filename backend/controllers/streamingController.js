const { createChannel, getChannel, deleteChannel } = require('../services/ivsService');
const Session = require('../models/Session');

exports.createStreamingSession = async (req, res, next) => {
  try {
    const { eventId, title, description, startTime, endTime } = req.body;
    
    // Create IVS channel
    const channelName = `${eventId}-${Date.now()}`;
    const streamingData = await createChannel(channelName);
    
    // Save session to database
    const session = new Session({
      event: eventId,
      title,
      description,
      startTime,
      endTime,
      streamingData: {
        channelArn: streamingData.channelArn,
        playbackUrl: streamingData.playbackUrl,
        ingestEndpoint: streamingData.ingestEndpoint,
        streamKey: streamingData.streamKey
      },
      status: 'scheduled'
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

exports.getStreamingSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id).populate('event');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Get updated channel info
    const channel = await getChannel(session.streamingData.channelArn);
    session.streamingData.channelStatus = channel.state;
    
    res.json(session);
  } catch (error) {
    next(error);
  }
};

exports.startStreaming = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status: 'live' },
      { new: true }
    );
    
    res.json(session);
  } catch (error) {
    next(error);
  }
};

exports.endStreaming = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    
    // Optionally delete the IVS channel
    // await deleteChannel(session.streamingData.channelArn);
    
    res.json(session);
  } catch (error) {
    next(error);
  }
};