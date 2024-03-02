import {Booking} from "@/types/booking.ts";


const BOOKINGS_STORAGE_KEY = 'bookings';

export const saveBookingsToLocalStorage = (bookings: Record<string, Booking[]>) => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};

export const getBookingsFromLocalStorage = (): Record<string, Booking[]> => {
    const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
};
