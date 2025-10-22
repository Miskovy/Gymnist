import express from 'express';
import * as roomController from './controller';
import * as validator from './validator';
import { upload } from '../middleware/upload';

const router = express.Router();

// Room routes
router.get('/', roomController.getAllRooms);
router.get('/:id', validator.validateRoomId, validator.handleValidationErrors, roomController.getRoomById);
router.post('/', validator.validateRoomCreation, validator.handleValidationErrors, roomController.createRoom);
router.put('/:id', validator.validateRoomUpdate, validator.handleValidationErrors, roomController.updateRoom);
router.delete('/:id', validator.validateRoomId, validator.handleValidationErrors, roomController.deleteRoom);

// Room Gallery routes
router.post('/:roomId/images', 
  validator.validateRoomImageUpload, 
  validator.handleValidationErrors,
  upload.single('image'), 
  roomController.addRoomImage
);
router.delete('/images/:id', 
  validator.validateRoomImageId, 
  validator.handleValidationErrors, 
  roomController.deleteRoomImage
);

export default router;