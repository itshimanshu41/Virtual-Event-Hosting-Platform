const Event = require('../models/Event');
const { s3 } = require('../config/aws-config');

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, startDate, endDate, isPublic, maxAttendees, whiteLabelSettings } = req.body;
    
    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      organizer: req.user.userId,
      isPublic,
      maxAttendees,
      whiteLabelSettings
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    const events = await Event.find(filter).populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.uploadEventImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `event-images/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { coverImage: result.Location },
      { new: true }
    );
    
    res.json(event);
  } catch (error) {
    next(error);
  }
};