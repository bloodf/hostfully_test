import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import AccommodationCard from "@/components/Accommodation/Card";

describe('AccommodationCard', () => {
    const mockAccommodation = {
        id: "4",
        name: "Country House",
        price: 400,
        numberOfBeds: 4,
        capacity: 8,
        pictureUrl: "https://via.placeholder.com/350?text=Country+House",
        reservedDates: [
            '2024-06-18',
            '2024-06-19',
            '2024-06-20',
        ],
    };

    it('renders correctly for unbooked accommodation', () => {
        render(<AccommodationCard accommodation={mockAccommodation} isBooked={false}
                                  onSave={vi.fn()}/>);

        expect(screen.getByText(mockAccommodation.name)).toBeInTheDocument();
        expect(screen.getByText(`$${mockAccommodation.price} / night`)).toBeInTheDocument();
        expect(screen.getByText(`${mockAccommodation.numberOfBeds} beds · Up to ${mockAccommodation.capacity} guests`)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Book'})).toBeInTheDocument();
    });

    it('calls onSave when booking', async () => {
        const mockOnSave = vi.fn();
        render(<AccommodationCard accommodation={mockAccommodation} isBooked={false}
                                  onSave={mockOnSave}/>);

        await fireEvent.click(screen.getByRole('button', {name: 'Book'}));

        expect(mockOnSave).toHaveBeenCalled();
    });
});
