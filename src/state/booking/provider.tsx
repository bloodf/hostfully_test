import { useState, ReactNode } from 'react';
import { isBefore } from 'date-fns';
import { generateUUID } from "@/helpers/uuid";
import { Booking } from "@/types/booking";
import {BookingContext, BookingData} from "./context";
import { validateBooking } from "@/utils/validateBooking";
import { useLocalBooking } from "@/hooks/useLocalBooking";
import { useAccount } from "@/hooks/useAccount";


export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);
    const { bookings, setBookings } = useLocalBooking();
    const { user } = useAccount();

    const upsertBooking = (bookingData: BookingData): boolean => {
        setError(null);

        const now = new Date();
        const newUserBookings = bookings[user.email] ?? [];
        const bookingId = bookingData.id ?? generateUUID();
        const booking: Booking = {
            ...bookingData,
            id: bookingId,
            createdAt: newUserBookings.find(b => b.id === bookingId)?.createdAt ?? now,
            updatedAt: now,
            removedAt: null,
            status: bookingData.id ? 'updatedBooking' : 'booked',
            userEmail: user.email,
        };

        if (!validateBooking(booking, newUserBookings, bookingId)) {
            setError("Cannot book accommodation. You already have booked accommodation in this date.");
            return false;
        }

        const existingIndex = newUserBookings.findIndex(b => b.id === bookingId);
        if (existingIndex > -1) {
            newUserBookings[existingIndex] = booking;
        } else {
            newUserBookings.push(booking);
        }

        setBookings({ ...bookings, [user.email]: newUserBookings });
        return true;
    };

    const deleteBooking = (bookingId: string): void => {
        const userBookings = bookings[user.email] ?? [];
        const bookingIndex = userBookings.findIndex(booking => booking.id === bookingId);

        if (bookingIndex > -1) {
            const booking = userBookings[bookingIndex];
            if (isBefore(new Date(), booking.startDate)) {
                userBookings.splice(bookingIndex, 1);
            }
        }

        setBookings({ ...bookings, [user.email]: userBookings });
    };

    const readBookings = (): Booking[] => bookings[user.email] ?? [];

    const clearError = () => setError(null);

    return (
        <BookingContext.Provider
            value={{
                upsertBooking,
                deleteBooking,
                readBookings,
                error,
                clearError,
            }}>
            {children}
        </BookingContext.Provider>
    );
};
