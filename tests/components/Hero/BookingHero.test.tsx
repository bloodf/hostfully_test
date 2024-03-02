import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookingHero from "@/components/Hero/BookingHero";

describe('BookingHero', () => {
    it('renders correctly with children', () => {
        render(
            <BookingHero>
                <button>Test Button</button>
            </BookingHero>
        );

        expect(screen.getByText('Discover Amazing Places')).toBeInTheDocument();
        expect(screen.getByText('Explore the best accommodations in your favorite locations and make unforgettable memories.')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();

        expect(screen.getByAltText('Travel')).toBeInTheDocument();
    });
});
