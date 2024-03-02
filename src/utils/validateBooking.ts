import { startOfDay, isBefore, isEqual, isWithinInterval } from "date-fns";
import { Booking } from "@/types/booking.ts";

export const validateBooking = (booking: Booking, existingBookings: Booking[], excludeBookingId?: string): boolean => {
    const today = startOfDay(new Date());
    const startDate = startOfDay(new Date(booking.startDate));
    const endDate = startOfDay(new Date(booking.endDate));

    if (isBefore(startDate, today) || isBefore(endDate, today) || isEqual(startDate, endDate)) {
        return false;
    }

    for (const existingBooking of existingBookings) {
        if (existingBooking.id === excludeBookingId) continue;

        const existingStart = startOfDay(new Date(existingBooking.startDate));
        const existingEnd = startOfDay(new Date(existingBooking.endDate));

        const isOverlapping =
            isWithinInterval(startDate, { start: existingStart, end: existingEnd }) ||
            isWithinInterval(endDate, { start: existingStart, end: existingEnd }) ||
            isWithinInterval(existingStart, { start: startDate, end: endDate }) ||
            isWithinInterval(existingEnd, { start: startDate, end: endDate });

        if (isOverlapping) {
            return false;
        }
    }

    return true;
};
