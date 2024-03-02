import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as useBookingsHook from '@/hooks/useBookings';
import NotificationPopup from "@/components/Dialog/ErrorNotificationDialog";

vi.mock('@/hooks/useBookings', () => ({
    useBookings: vi.fn(),
}));

describe('NotificationPopup', () => {
    let clearErrorMock;

    beforeEach(() => {
        clearErrorMock = vi.fn();
        vi.useFakeTimers();
    });

    it('displays an error message when an error exists', () => {
        useBookingsHook.useBookings.mockReturnValue({
            error: 'Test error message',
            clearError: clearErrorMock,
        });

        render(<NotificationPopup />);

        expect(screen.getByText('Heads up!')).toBeInTheDocument();
        expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('does not display the alert if there is no error', () => {
        useBookingsHook.useBookings.mockReturnValue({
            error: null,
            clearError: clearErrorMock,
        });

        render(<NotificationPopup />);

        expect(screen.queryByText('Heads up!')).not.toBeInTheDocument();
        expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
