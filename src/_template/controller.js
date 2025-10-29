const Model = require('./model');

// Get all records
exports.getAll = async (req, res) => {
  try {
    const records = await Model.findAll();
    res.status(200).json({
      status: 'success',
      data: records
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get record by ID
exports.getById = async (req, res) => {
  try {
    const record = await Model.findByPk(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new record
exports.create = async (req, res) => {
  try {
    const newRecord = await Model.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newRecord
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update record
exports.update = async (req, res) => {
  try {
    const record = await Model.findByPk(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
    }
    
    await record.update(req.body);
    
    res.status(200).json({
      status: 'success',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete record
exports.delete = async (req, res) => {
  try {
    const record = await Model.findByPk(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
    }
    
    await record.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};