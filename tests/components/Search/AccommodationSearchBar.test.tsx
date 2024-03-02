import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import * as reactRouterDom from 'react-router-dom';
import { format } from 'date-fns';
import AccommodationSearchBar from "@/components/Search/AccommodationSearchBar";

vi.mock('react-router-dom', async () => {
    const originalModule = await vi.importActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: vi.fn(),
    };
});

vi.mock('@/components/UI/DatePickerWithRange', () => ({
    __esModule: true,
    default: ({ onChange }) => {
        return <button onClick={() => onChange({ from: new Date('2024-03-01'), to: new Date('2024-03-10') })}>Select Dates</button>;
    },
}));

describe('AccommodationSearchBar', () => {
    it('navigates with correct query params on search', async () => {
        const mockNavigate = vi.fn();
        vi.mocked(reactRouterDom.useNavigate).mockReturnValue(mockNavigate);

        render(<AccommodationSearchBar />);

        fireEvent.click(screen.getByText('Select Dates'));

        fireEvent.click(screen.getByText('Search'));

        const formattedStart = format(new Date('2024-03-01'), 'yyyy-MM-dd');
        const formattedEnd = format(new Date('2024-03-10'), 'yyyy-MM-dd');
        expect(mockNavigate).toHaveBeenCalledWith(`/accommodation-list?start=${formattedStart}&end=${formattedEnd}`);
    });
});
