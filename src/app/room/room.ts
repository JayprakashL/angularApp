export interface Room {
  availableRooms: number;
  bookedRooms: number;
  totalRooms: number;
}

export interface RoomsList {
  roomNumber: number;
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}
