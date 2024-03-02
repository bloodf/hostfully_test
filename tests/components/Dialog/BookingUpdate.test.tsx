import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import BookingUpdate from '@/components/Dialog/BookingUpdate';

vi.mock('@/components/UI/DatePickerWithRange', () => ({
    __esModule: true,
    default: vi.fn(({ onChange }) => (
        <button data-testid="date-picker-mock" onClick={() => onChange({ from: new Date(2024, 3, 22), to: new Date(2024, 3, 29) })}>
            Mock DatePicker
        </button>
    )),
}));

vi.mock('@/components/UI/Select.tsx', () => ({
    Select: vi.fn(({ children, onValueChange }) => (
        <div onClick={() => onValueChange('3')}>
            {children}
        </div>
    )),
    SelectTrigger: vi.fn(({ children }) => <div>{children}</div>),
    SelectValue: vi.fn(() => <div />),
    SelectContent: vi.fn(({ children }) => <div>{children}</div>),
    SelectItem: vi.fn(({ children }) => <div>{children}</div>),
}));

describe('BookingUpdate', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should update booking when save is clicked', async () => {
        const onSaveMock = vi.fn();
        const onCloseMock = vi.fn();

        const { getByText, getByTestId } = render(
            <BookingUpdate
                isOpen={true}
                capacity={4}
                initialGuests={2}
                selectedDates={{ from: new Date(2024, 3, 20), to: new Date(2024, 3, 25) }}
                onClose={onCloseMock}
                onSave={onSaveMock}
            />
        );

        fireEvent.click(getByTestId('date-picker-mock'));
        fireEvent.click(getByText('3'));
        fireEvent.click(getByText('Update'));

        expect(onSaveMock).toHaveBeenCalledWith(
            { from: new Date(2024, 3, 22), to: new Date(2024, 3, 29) },
            3
        );
    });
});
