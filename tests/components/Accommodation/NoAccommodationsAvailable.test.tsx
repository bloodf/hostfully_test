import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import NoAccommodationsAvailable
    from "@/components/Accommodation/NoAccommodationsAvailable";

vi.mock('date-fns', () => ({
    ...vi.importActual('date-fns'),
    format: vi.fn(),
}));

describe('NoAccommodationsAvailable', () => {
    it('renders correctly with formatted dates and children', () => {
        const startDate = new Date(2024, 2, 15);
        const endDate = new Date(2024, 2, 20);

        vi.mocked(format).mockImplementation((date, formatString) => {
            if (date === startDate) return 'March 15th, 2024';
            if (date === endDate) return 'March 20th, 2024';
            return '';
        });

        render(
            <NoAccommodationsAvailable startDate={startDate} endDate={endDate}>
                <button>Retry Search</button>
            </NoAccommodationsAvailable>
        );

        expect(screen.getByText('No Accommodations Available')).toBeInTheDocument();

        expect(screen.getByText('March 15th, 2024')).toBeInTheDocument();
        expect(screen.getByText('March 20th, 2024')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Retry Search' })).toBeInTheDocument();

        expect(screen.getByText('Please try different dates or adjust your search criteria.')).toBeInTheDocument();
    });
});
