import { ContactInformation } from "./Client.types";
import { RoomCategory } from "./Room.types";
import { User } from "./User.types";

export type Sentiment = 'NEUTRAL' | 'NEGATIVE' | 'POSITIVE'

export interface ReviewBody {
    rating: number;
    comment?: string;
    reservationId: number;
}

export interface ReviewQueryParams {
    page: string | string[];
    size: string | string[];
    userId?: string | string[];
    roomId?: string | string[];
    replied?: boolean;
    commented?: boolean,
    createdAt?: string | string[];
    sentiment?: string | string[];
}

export interface Review {
    id: number;
    rating: number;
    comment?: string;
    sentiment: Sentiment;
    user: User;
    address: ContactInformation;
    category: RoomCategory;
    reply?: string;
    repliedAt?: string | Date;
}