"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromRoomGallery = exports.addToRoomGallery = exports.getRoomGallery = exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const model_1 = require("./model");
const handleImages_1 = require("../utils/handleImages");
const deleteImage_1 = require("../utils/deleteImage");
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield model_1.RoomModel.findAll({
            include: [{
                    model: model_1.RoomGalleryModel,
                    as: 'gallery',
                    attributes: ['id', 'image']
                }],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({
            message: 'Rooms fetched successfully',
            data: rooms
        });
    }
    catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({
            message: 'Error fetching rooms'
        });
    }
});
exports.getAllRooms = getAllRooms;
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid room ID' });
        }
        const room = yield model_1.RoomModel.findByPk(id, {
            include: [{
                    model: model_1.RoomGalleryModel,
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
    }
    catch (error) {
        console.error('Error fetching room:', error);
        return res.status(500).json({
            message: 'Error fetching room'
        });
    }
});
exports.getRoomById = getRoomById;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, capacity, description, thumbnail, galleryImages } = req.body;
        if (!(name === null || name === void 0 ? void 0 : name.trim())) {
            return res.status(400).json({ message: 'Room name is required' });
        }
        if (capacity && (isNaN(capacity) || capacity < 0)) {
            return res.status(400).json({ message: 'Capacity must be a positive number' });
        }
        const existingRoom = yield model_1.RoomModel.findOne({ where: { name } });
        if (existingRoom) {
            return res.status(409).json({ message: 'Room with this name already exists' });
        }
        let thumbnailUrl;
        if (thumbnail && thumbnail.startsWith('data:')) {
            try {
                thumbnailUrl = yield (0, handleImages_1.saveBase64Image)(thumbnail, req, 'rooms/thumbnails');
            }
            catch (error) {
                return res.status(400).json({ message: 'Invalid thumbnail image format' });
            }
        }
        const room = yield model_1.RoomModel.create({
            name: name.trim(),
            capacity: capacity || 0,
            description,
            thumbnail: thumbnailUrl
        });
        if (galleryImages && Array.isArray(galleryImages) && galleryImages.length > 0) {
            const galleryPromises = galleryImages.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                if (image.startsWith('data:')) {
                    try {
                        const imageUrl = yield (0, handleImages_1.saveBase64Image)(image, req, 'rooms/gallery');
                        return model_1.RoomGalleryModel.create({
                            roomId: room.id,
                            image: imageUrl
                        });
                    }
                    catch (error) {
                        console.error('Error saving gallery image:', error);
                        return null;
                    }
                }
                return null;
            }));
            yield Promise.all(galleryPromises);
        }
        const createdRoom = yield model_1.RoomModel.findByPk(room.id, {
            include: [{
                    model: model_1.RoomGalleryModel,
                    as: 'gallery',
                    attributes: ['id', 'image']
                }]
        });
        return res.status(201).json({
            message: 'Room created successfully',
            data: createdRoom
        });
    }
    catch (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({
            message: 'Error creating room'
        });
    }
});
exports.createRoom = createRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid room ID' });
        }
        const room = yield model_1.RoomModel.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const { name, capacity, description, thumbnail, galleryImages } = req.body;
        const updateData = {};
        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({ message: 'Room name cannot be empty' });
            }
            const existingRoom = yield model_1.RoomModel.findOne({
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
        if (description !== undefined)
            updateData.description = description;
        if (thumbnail !== undefined) {
            if (thumbnail === null || thumbnail === '') {
                if (room.thumbnail) {
                    yield (0, deleteImage_1.deleteImage)(room.thumbnail);
                }
                updateData.thumbnail = null;
            }
            else if (thumbnail.startsWith('data:')) {
                try {
                    const thumbnailUrl = yield (0, handleImages_1.saveBase64Image)(thumbnail, req, 'rooms/thumbnails');
                    if (room.thumbnail) {
                        yield (0, deleteImage_1.deleteImage)(room.thumbnail);
                    }
                    updateData.thumbnail = thumbnailUrl;
                }
                catch (error) {
                    return res.status(400).json({ message: 'Invalid thumbnail image format' });
                }
            }
        }
        yield model_1.RoomModel.update(updateData, { where: { id } });
        if (galleryImages !== undefined) {
            if (Array.isArray(galleryImages)) {
                const existingGallery = yield model_1.RoomGalleryModel.findAll({ where: { roomId: id } });
                for (const galleryItem of existingGallery) {
                    yield (0, deleteImage_1.deleteImage)(galleryItem.image);
                    yield galleryItem.destroy();
                }
                if (galleryImages.length > 0) {
                    const galleryPromises = galleryImages.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                        if (image.startsWith('data:')) {
                            try {
                                const imageUrl = yield (0, handleImages_1.saveBase64Image)(image, req, 'rooms/gallery');
                                return model_1.RoomGalleryModel.create({
                                    roomId: id,
                                    image: imageUrl
                                });
                            }
                            catch (error) {
                                console.error('Error saving gallery image:', error);
                                return null;
                            }
                        }
                        return null;
                    }));
                    yield Promise.all(galleryPromises);
                }
            }
        }
        const updatedRoom = yield model_1.RoomModel.findByPk(id, {
            include: [{
                    model: model_1.RoomGalleryModel,
                    as: 'gallery',
                    attributes: ['id', 'image']
                }]
        });
        return res.status(200).json({
            message: 'Room updated successfully',
            data: updatedRoom
        });
    }
    catch (error) {
        console.error('Error updating room:', error);
        return res.status(500).json({
            message: 'Error updating room'
        });
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid room ID' });
        }
        const room = yield model_1.RoomModel.findByPk(id, {
            include: [{
                    model: model_1.RoomGalleryModel,
                    as: 'gallery'
                }]
        });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        if (room.thumbnail) {
            yield (0, deleteImage_1.deleteImage)(room.thumbnail);
        }
        if (room.gallery && room.gallery.length > 0) {
            for (const galleryItem of room.gallery) {
                yield (0, deleteImage_1.deleteImage)(galleryItem.image);
                yield galleryItem.destroy();
            }
        }
        yield model_1.RoomModel.destroy({ where: { id } });
        return res.status(200).json({
            message: 'Room deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting room:', error);
        return res.status(500).json({
            message: 'Error deleting room'
        });
    }
});
exports.deleteRoom = deleteRoom;
const getRoomGallery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = Number(req.params.roomId);
        if (isNaN(roomId) || roomId <= 0) {
            return res.status(400).json({ message: 'Invalid room ID' });
        }
        const room = yield model_1.RoomModel.findByPk(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const gallery = yield model_1.RoomGalleryModel.findAll({
            where: { roomId },
            order: [['createdAt', 'ASC']]
        });
        return res.status(200).json({
            message: 'Room gallery fetched successfully',
            data: gallery
        });
    }
    catch (error) {
        console.error('Error fetching room gallery:', error);
        return res.status(500).json({
            message: 'Error fetching room gallery'
        });
    }
});
exports.getRoomGallery = getRoomGallery;
const addToRoomGallery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = Number(req.params.roomId);
        if (isNaN(roomId) || roomId <= 0) {
            return res.status(400).json({ message: 'Invalid room ID' });
        }
        const { image } = req.body;
        if (!image || !image.startsWith('data:')) {
            return res.status(400).json({ message: 'Valid image data is required' });
        }
        const room = yield model_1.RoomModel.findByPk(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const imageUrl = yield (0, handleImages_1.saveBase64Image)(image, req, 'rooms/gallery');
        const galleryItem = yield model_1.RoomGalleryModel.create({
            roomId,
            image: imageUrl
        });
        return res.status(201).json({
            message: 'Image added to room gallery successfully',
            data: galleryItem
        });
    }
    catch (error) {
        console.error('Error adding to room gallery:', error);
        return res.status(500).json({
            message: 'Error adding to room gallery'
        });
    }
});
exports.addToRoomGallery = addToRoomGallery;
const removeFromRoomGallery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const galleryItem = yield model_1.RoomGalleryModel.findOne({
            where: { id: imageIdNum, roomId: roomIdNum }
        });
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery image not found' });
        }
        yield (0, deleteImage_1.deleteImage)(galleryItem.image);
        yield galleryItem.destroy();
        return res.status(200).json({
            message: 'Image removed from room gallery successfully'
        });
    }
    catch (error) {
        console.error('Error removing from room gallery:', error);
        return res.status(500).json({
            message: 'Error removing from room gallery'
        });
    }
});
exports.removeFromRoomGallery = removeFromRoomGallery;
