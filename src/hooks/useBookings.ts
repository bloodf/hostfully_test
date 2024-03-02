import {useContext} from "react";
import {BookingContext} from "@/state/booking/context.ts";

export const useBookings = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBookings must be used within a BookingProvider');
    }

    return {
        addOrUpdateBooking: context.upsertBooking,
        removeBooking: context.deleteBooking,
        getUserBookings: context.readBookings,
        error: context.error,
        clearError: context.clearError,
    };
};
