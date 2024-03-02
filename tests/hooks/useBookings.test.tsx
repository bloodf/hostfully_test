import {describe, it, expect, beforeEach, vi} from 'vitest';
import {renderHook} from '@testing-library/react-hooks';
import {useBookings} from '@/hooks/useBookings';
import {BookingContext} from '@/state/booking/context';
import {ReactNode} from "react";

const mockUpsertBooking = vi.fn();
const mockDeleteBooking = vi.fn();
const mockReadBookings = vi.fn(() => []);
const mockClearError = vi.fn();
const mockError = 'Test Error';

const wrapper = ({children}: { children: ReactNode }) => (
    <BookingContext.Provider
        value={{
            upsertBooking: mockUpsertBooking,
            deleteBooking: mockDeleteBooking,
            readBookings: mockReadBookings,
            error: mockError,
            clearError: mockClearError,
        }}
    >
        {children}
    </BookingContext.Provider>
);

describe('useBookings', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('provides booking context functions and error state', () => {
        const {result} = renderHook(() => useBookings(), {wrapper});

        expect(result.current.addOrUpdateBooking).toBeDefined();
        expect(result.current.removeBooking).toBeDefined();
        expect(result.current.getUserBookings).toBeDefined();
        expect(result.current.error).toBe(mockError);
        expect(result.current.clearError).toBeDefined();

        result.current.addOrUpdateBooking();
        expect(mockUpsertBooking).toHaveBeenCalled();
    });

    it('throws an error when used outside of BookingProvider', () => {
        const {result} = renderHook(() => useBookings());

        expect(result.error).toBeDefined();
        expect(result.error.message).toBe('useBookings must be used within a BookingProvider');
    });
});
