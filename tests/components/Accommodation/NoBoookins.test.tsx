import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NoBookings from "@/components/Accommodation/NoBoookins";

describe('NoBookings', () => {
    it('renders the no bookings message', () => {
        render(
            <NoBookings>
                <button>Explore Accommodations</button>
            </NoBookings>
        );

        expect(screen.getByText('You Have No Bookings Yet')).toBeInTheDocument();
        expect(screen.getByText(/Looks like you haven't made any bookings with us yet./)).toBeInTheDocument();
        expect(screen.getByText('Find new accommodations to book')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(
            <NoBookings>
                <button>Explore Accommodations</button>
            </NoBookings>
        );

        expect(screen.getByRole('button', { name: 'Explore Accommodations' })).toBeInTheDocument();
    });
});
