import express from 'express';
import * as classController from './controller';
import * as validator from './validator';

const router = express.Router();

// Class routes
router.get('/', classController.getAllClasses);
router.get('/:id', validator.validateClassId, validator.handleValidationErrors, classController.getClassById);
router.post('/', validator.validateClassCreation, validator.handleValidationErrors, classController.createClass);
router.put('/:id', validator.validateClassUpdate, validator.handleValidationErrors, classController.updateClass);
router.delete('/:id', validator.validateClassId, validator.handleValidationErrors, classController.deleteClass);

// Trainer-Class routes
router.post('/:classId/trainers', validator.validateTrainerClassCreation, validator.handleValidationErrors, classController.addTrainerToClass);

// Class Schedule routes
router.post('/:classId/schedules', validator.validateScheduleCreation, validator.handleValidationErrors, classController.addScheduleToClass);

// Booking routes
router.post('/bookings', validator.validateBookingCreation, validator.handleValidationErrors, classController.createBooking);

// Calendar routes
router.get('/calendar', validator.validateCalendarQuery, validator.handleValidationErrors, classController.getClassCalendar);

export default router;