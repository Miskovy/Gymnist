import express from 'express';
import * as roomController from './controller';

const router = express.Router();

// Room routes
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

// Room gallery routes
router.get('/:roomId/gallery', roomController.getRoomGallery);
router.post('/:roomId/gallery', roomController.addToRoomGallery);
router.delete('/:roomId/gallery/:imageId', roomController.removeFromRoomGallery);
export default router;