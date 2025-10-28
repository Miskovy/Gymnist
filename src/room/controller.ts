import { Request, Response } from 'express';
import { RoomModel, RoomGalleryModel } from './model';
import { saveBase64Image } from '../utils/handleImages';
import { deleteImage } from '../utils/deleteImage';


interface RoomWithGallery extends RoomModel {
  gallery?: RoomGalleryModel[];
}


export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await RoomModel.findAll({
      include: [{
        model: RoomGalleryModel,
        as: 'gallery', 
        attributes: ['id', 'image']
      }],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      message: 'Rooms fetched successfully',
      data: rooms
    });
  } catch (error: any) {
    console.error('Error fetching rooms:', error);
    return res.status(500).json({ 
      message: 'Error fetching rooms'
    });
  }
};


export const getRoomById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await RoomModel.findByPk(id, {
      include: [{
        model: RoomGalleryModel,
        as: 'gallery', 
        attributes: ['id', 'image']
      }]
    });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.status(200).json({
      message: 'Room fetched successfully',
      data: room
    });
  } catch (error: any) {
    console.error('Error fetching room:', error);
    return res.status(500).json({ 
      message: 'Error fetching room'
    });
  }
};


export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, capacity, description, thumbnail, galleryImages } = req.body;

    
    if (!name?.trim()) {
      return res.status(400).json({ message: 'Room name is required' });
    }

    if (capacity && (isNaN(capacity) || capacity < 0)) {
      return res.status(400).json({ message: 'Capacity must be a positive number' });
    }

    
    const existingRoom = await RoomModel.findOne({ where: { name } });
    if (existingRoom) {
      return res.status(409).json({ message: 'Room with this name already exists' });
    }

    
    let thumbnailUrl: string | undefined;
    if (thumbnail && thumbnail.startsWith('data:')) {
      try {
        thumbnailUrl = await saveBase64Image(thumbnail, req, 'rooms/thumbnails');
      } catch (error) {
        return res.status(400).json({ message: 'Invalid thumbnail image format' });
      }
    }

    
    const room = await RoomModel.create({
      name: name.trim(),
      capacity: capacity || 0,
      description,
      thumbnail: thumbnailUrl
    });

    
    if (galleryImages && Array.isArray(galleryImages) && galleryImages.length > 0) {
      const galleryPromises = galleryImages.map(async (image: string) => {
        if (image.startsWith('data:')) {
          try {
            const imageUrl = await saveBase64Image(image, req, 'rooms/gallery');
            return RoomGalleryModel.create({
              roomId: room.id,
              image: imageUrl
            });
          } catch (error) {
            console.error('Error saving gallery image:', error);
            return null;
          }
        }
        return null;
      });

      await Promise.all(galleryPromises);
    }

    
    const createdRoom = await RoomModel.findByPk(room.id, {
      include: [{
        model: RoomGalleryModel,
        as: 'gallery', 
        attributes: ['id', 'image']
      }]
    });

    return res.status(201).json({
      message: 'Room created successfully',
      data: createdRoom
    });
  } catch (error: any) {
    console.error('Error creating room:', error);
    return res.status(500).json({ 
      message: 'Error creating room'
    });
  }
};


export const updateRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await RoomModel.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const { name, capacity, description, thumbnail, galleryImages } = req.body;

    const updateData: any = {};

    
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ message: 'Room name cannot be empty' });
      }
      
      
      const existingRoom = await RoomModel.findOne({ 
        where: { name, id: { [Symbol.for('ne')]: id } }
      });
      if (existingRoom) {
        return res.status(409).json({ message: 'Room name already taken' });
      }
      updateData.name = name.trim();
    }

    if (capacity !== undefined) {
      if (isNaN(capacity) || capacity < 0) {
        return res.status(400).json({ message: 'Capacity must be a positive number' });
      }
      updateData.capacity = capacity;
    }

    if (description !== undefined) updateData.description = description;

    if (thumbnail !== undefined) {
      if (thumbnail === null || thumbnail === '') {
        if (room.thumbnail) {
          await deleteImage(room.thumbnail);
        }
        updateData.thumbnail = null;
      } else if (thumbnail.startsWith('data:')) {
        try {
          const thumbnailUrl = await saveBase64Image(thumbnail, req, 'rooms/thumbnails');
          if (room.thumbnail) {
            await deleteImage(room.thumbnail);
          }
          updateData.thumbnail = thumbnailUrl;
        } catch (error) {
          return res.status(400).json({ message: 'Invalid thumbnail image format' });
        }
      }
    }

    await RoomModel.update(updateData, { where: { id } });

    if (galleryImages !== undefined) {
      if (Array.isArray(galleryImages)) {
        const existingGallery = await RoomGalleryModel.findAll({ where: { roomId: id } });
        for (const galleryItem of existingGallery) {
          await deleteImage(galleryItem.image);
          await galleryItem.destroy();
        }

        if (galleryImages.length > 0) {
          const galleryPromises = galleryImages.map(async (image: string) => {
            if (image.startsWith('data:')) {
              try {
                const imageUrl = await saveBase64Image(image, req, 'rooms/gallery');
                return RoomGalleryModel.create({
                  roomId: id,
                  image: imageUrl
                });
              } catch (error) {
                console.error('Error saving gallery image:', error);
                return null;
              }
            }
            return null;
          });

          await Promise.all(galleryPromises);
        }
      }
    }

    const updatedRoom = await RoomModel.findByPk(id, {
      include: [{
        model: RoomGalleryModel,
        as: 'gallery', 
        attributes: ['id', 'image']
      }]
    });

    return res.status(200).json({
      message: 'Room updated successfully',
      data: updatedRoom
    });
  } catch (error: any) {
    console.error('Error updating room:', error);
    return res.status(500).json({ 
      message: 'Error updating room'
    });
  }
};


export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await RoomModel.findByPk(id, {
      include: [{
        model: RoomGalleryModel,
        as: 'gallery' 
      }]
    }) as RoomWithGallery;

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    
    if (room.thumbnail) {
      await deleteImage(room.thumbnail);
    }

    
    if (room.gallery && room.gallery.length > 0) {
      for (const galleryItem of room.gallery) {
        await deleteImage(galleryItem.image);
        await galleryItem.destroy();
      }
    }

    
    await RoomModel.destroy({ where: { id } });

    return res.status(200).json({
      message: 'Room deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting room:', error);
    return res.status(500).json({ 
      message: 'Error deleting room'
    });
  }
};


export const getRoomGallery = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.roomId);
    
    if (isNaN(roomId) || roomId <= 0) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await RoomModel.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const gallery = await RoomGalleryModel.findAll({
      where: { roomId },
      order: [['createdAt', 'ASC']]
    });

    return res.status(200).json({
      message: 'Room gallery fetched successfully',
      data: gallery
    });
  } catch (error: any) {
    console.error('Error fetching room gallery:', error);
    return res.status(500).json({ 
      message: 'Error fetching room gallery'
    });
  }
};


export const addToRoomGallery = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.roomId);
    
    if (isNaN(roomId) || roomId <= 0) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const { image } = req.body;

    if (!image || !image.startsWith('data:')) {
      return res.status(400).json({ message: 'Valid image data is required' });
    }

    const room = await RoomModel.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const imageUrl = await saveBase64Image(image, req, 'rooms/gallery');
    
    const galleryItem = await RoomGalleryModel.create({
      roomId,
      image: imageUrl
    });

    return res.status(201).json({
      message: 'Image added to room gallery successfully',
      data: galleryItem
    });
  } catch (error: any) {
    console.error('Error adding to room gallery:', error);
    return res.status(500).json({ 
      message: 'Error adding to room gallery'
    });
  }
};


export const removeFromRoomGallery = async (req: Request, res: Response) => {
  try {
    const { roomId, imageId } = req.params;
    
    const roomIdNum = Number(roomId);
    const imageIdNum = Number(imageId);
    
    if (isNaN(roomIdNum) || roomIdNum <= 0) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }
    
    if (isNaN(imageIdNum) || imageIdNum <= 0) {
      return res.status(400).json({ message: 'Invalid image ID' });
    }

    const galleryItem = await RoomGalleryModel.findOne({
      where: { id: imageIdNum, roomId: roomIdNum }
    });

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }

    await deleteImage(galleryItem.image);
    await galleryItem.destroy();

    return res.status(200).json({
      message: 'Image removed from room gallery successfully'
    });
  } catch (error: any) {
    console.error('Error removing from room gallery:', error);
    return res.status(500).json({ 
      message: 'Error removing from room gallery'
    });
  }
};