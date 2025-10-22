export interface Room {
  id: number;
  name: string;
  capacity: number;
  description?: string;
  thumbnail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomGallery {
  id: number;
  roomId: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}