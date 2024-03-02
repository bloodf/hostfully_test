import {describe, it, expect, beforeEach} from 'vitest';
import {Booking} from "../../src/types/booking";
import {getBookingsFromLocalStorage, saveBookingsToLocalStorage} from "../../src/models/bookings";
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string): string | null => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LocalStorage Utilities for Bookings', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should save bookings to localStorage', () => {
        const bookings: Record<string, Booking[]> = {
            'user@example.com': [
                {
                    id: '1',
                    startDate:new Date(),
                    endDate: new Date(),
                    price: 100,
                    guests: 2,
                    accommodationId: 'acc-1',
                    userEmail: 'user@example.com',
                    createdAt: new Date(),
                    updatedAt: null,
                    removedAt: null,
                    status: 'booked',
                },
            ],
        };

        saveBookingsToLocalStorage(bookings);

        const storedData = localStorage.getItem('bookings');
        expect(storedData).toEqual(JSON.stringify(bookings));
    });

    it('should retrieve bookings from localStorage', () => {
        const bookings: Record<string, Booking[]> = {
            'user@example.com': [
                {
                    id: '2',
                    startDate: '2023-02-01',
                    endDate: '2023-02-05',
                    price: 200,
                    guests: 4,
                    accommodationId: 'acc-2',
                    userEmail: 'user@example.com',
                    createdAt: new Date().toISOString(),
                    updatedAt: null,
                    removedAt: null,
                    status: 'booked',
                },
            ],
        };

        localStorage.setItem('bookings', JSON.stringify(bookings));

        const retrievedBookings = getBookingsFromLocalStorage();
        expect(retrievedBookings).toEqual(bookings);
    });
});
