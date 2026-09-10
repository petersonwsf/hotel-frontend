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
    page: number;
    size: number;
    userId?: number;
    roomId?: number;
    replied?: boolean;
    commented?: boolean,
    sentiment?: Sentiment[];
}

export interface Review {
    id: number;
    rating: number;
    comment?: string;
    sentiment: Sentiment;
    user: User;
    address: ContactInformation;
    category: RoomCategory;
}