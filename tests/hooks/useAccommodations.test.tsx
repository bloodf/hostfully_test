import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAccommodations } from '@/hooks/useAccommodations';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactRouterDom from 'react-router-dom';
import * as HotelAPI from '@/api/fakeHotel';
import * as BookingHooks from '@/hooks/useBookings';

vi.mock('react-router-dom', async () => ({
    useSearchParams: vi.fn(),
}));

vi.mock('@/api/fakeHotel', () => ({
    getHotelData: vi.fn(),
}));

vi.mock('@/hooks/useBookings', () => ({
    useBookings: vi.fn(),
}));

describe('useAccommodations', () => {
    beforeEach(() => {
        vi.resetAllMocks();

        vi.spyOn(ReactRouterDom, 'useSearchParams').mockReturnValue([
            new URLSearchParams({ start: '2024-03-15', end: '2024-03-25' }),
        ]);

        vi.spyOn(HotelAPI, 'getHotelData').mockReturnValue([
            {
                id: "1",
                name: "Ocean View Suite",
                price: 250,
                numberOfBeds: 2,
                capacity: 4,
                pictureUrl: "https://via.placeholder.com/350?text=Ocean+View+Suite",
                reservedDates: ['2024-03-18', '2024-03-19', '2024-03-20'],
            },
        ]);

        vi.spyOn(BookingHooks, 'useBookings').mockReturnValue({
            getUserBookings: vi.fn().mockReturnValue([
                {
                    id: "booking1",
                    startDate: new Date('2024-03-22'),
                    endDate: new Date('2024-03-24'),
                    guests: 2,
                    accommodationId: "1",
                    userEmail: "user@example.com",
                    status: 'booked',
                    createdAt: new Date('2024-02-15'),
                    updatedAt: null,
                    removedAt: null,
                },
            ]),
        });
    });

    it('should filter accommodations based on search params and user bookings', () => {
        const { result } = renderHook(() => useAccommodations());

        expect(result.current.accommodations).toBeDefined();
        const availableAccommodations = result.current.getAvailableAccommodations();
        expect(availableAccommodations).toBeDefined();
        expect(availableAccommodations.some(acc => acc.id === "1")).toBe(false);
    });
});
