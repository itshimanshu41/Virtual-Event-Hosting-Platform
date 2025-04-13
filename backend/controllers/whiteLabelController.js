const Event = require('../models/Event');
const { s3 } = require('../config/aws-config');

exports.updateWhiteLabelSettings = async (req, res, next) => {
  try {
    const { logo, primaryColor, secondaryColor, customCSS } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { 
        whiteLabelSettings: {
          logo,
          primaryColor,
          secondaryColor,
          customCSS
        }
      },
      { new: true }
    );
    
    res.json(event.whiteLabelSettings);
  } catch (error) {
    next(error);
  }
};

exports.uploadWhiteLabelLogo = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `white-label-logos/${req.params.eventId}/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();
    
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { 'whiteLabelSettings.logo': result.Location },
      { new: true }
    );
    
    res.json(event.whiteLabelSettings);
  } catch (error) {
    next(error);
  }
};

exports.getWhiteLabelSettings = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event.whiteLabelSettings || {});
  } catch (error) {
    next(error);
  }
};