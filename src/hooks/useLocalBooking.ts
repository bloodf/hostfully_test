import { useEffect, useState } from "react";
import { Booking } from "@/types/booking";
import { getBookingsFromLocalStorage, saveBookingsToLocalStorage } from "@/models/bookings";

export const useLocalBooking = () => {
    const [bookings, setBookings] = useState<Record<string, Booking[]>>(getBookingsFromLocalStorage());

    useEffect(() => {
        saveBookingsToLocalStorage(bookings);
    }, [bookings]);

    return { bookings, setBookings };
};
