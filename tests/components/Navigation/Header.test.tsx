import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, beforeEach} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import Header from "@/components/Navigation/Header";

describe('Header', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        );
    });

    it('renders the logo and links correctly', () => {
        expect(screen.getByText('Hotel Booking')).toBeInTheDocument();

        expect(screen.getByTestId('desktop-home-link')).toHaveTextContent('Home');
        expect(screen.getByTestId('desktop-bookings-link')).toHaveTextContent('My Bookings');
    });

    it('toggles mobile menu', () => {
        expect(screen.queryByTestId('mobile-nav')).toBeNull();

        fireEvent.click(screen.getByTestId('mobile-menu-button'));
        expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();

        expect(screen.getByTestId('mobile-home-link')).toHaveTextContent('Home');
        expect(screen.getByTestId('mobile-bookings-link')).toHaveTextContent('My Bookings');

        fireEvent.click(screen.getByTestId('mobile-menu-button'));
        expect(screen.queryByTestId('mobile-nav')).toBeNull();
    });
});
