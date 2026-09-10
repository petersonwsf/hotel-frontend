import { RoomCategory } from "./Room.types";
import { User } from "./User.types";

export type StatusNotification = "DISMISSED" | "COMPLETED"

export interface NotificationData {
    id: number;
    user: User;
    reservationInfos: {
        id: number;
        checkInDate: string | Date;
        checkOutDate: string | Date;
        categoryRoom: RoomCategory;
    }
}