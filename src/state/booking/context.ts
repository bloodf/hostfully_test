import {Booking} from "@/types/booking.ts";
import {createContext} from "react";

export type BookingData = Omit<Booking, 'status' | 'userEmail' | 'createdAt' | 'updatedAt' | 'removedAt' | 'id'> & { id?: string };

export interface BookingContextType {
    upsertBooking: (bookingData: BookingData) => boolean;
    deleteBooking: (bookingId: string) => void;
    readBookings: () => Booking[] | undefined;
    error: string | null;
    clearError: () => void;
}

export const BookingContext = createContext<BookingContextType | undefined>(undefined);
