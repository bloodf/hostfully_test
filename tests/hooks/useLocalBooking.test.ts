import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalBooking } from '@/hooks/useLocalBooking';
import * as bookingsModel from '@/models/bookings';

vi.mock('@/models/bookings', () => ({
    getBookingsFromLocalStorage: vi.fn(),
    saveBookingsToLocalStorage: vi.fn(),
}));

const mockBookings = {
    'user@example.com': [
        {
            id: '1',
            startDate: new Date(),
            endDate: new Date(),
            guests: 2,
            userEmail: 'user@example.com',
            status: 'booked',
        },
    ],
};

describe('useLocalBooking', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        bookingsModel.getBookingsFromLocalStorage.mockReturnValue(mockBookings);
    });

    it('initializes bookings from local storage', () => {
        const { result } = renderHook(() => useLocalBooking());

        expect(bookingsModel.getBookingsFromLocalStorage).toHaveBeenCalled();
        expect(result.current.bookings).toEqual(mockBookings);
    });

    it('updates bookings and saves to local storage', () => {
        const { result } = renderHook(() => useLocalBooking());
        const newBooking = {
            id: '2',
            startDate: new Date(),
            endDate: new Date(),
            guests: 4,
            userEmail: 'newuser@example.com',
            status: 'booked',
        };

        act(() => {
            result.current.setBookings({ ...mockBookings, 'newuser@example.com': [newBooking] });
        });

        expect(result.current.bookings['newuser@example.com']).toContainEqual(newBooking);
        expect(bookingsModel.saveBookingsToLocalStorage).toHaveBeenCalledWith({
            ...mockBookings,
            'newuser@example.com': [newBooking],
        });
    });
});
