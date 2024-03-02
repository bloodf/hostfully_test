import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    <Link to="/" className="text-xl font-bold flex items-center">
                        <Icon icon="twemoji:hotel" className="mr-2" />Hotel Booking
                    </Link>
                </div>
                <nav className="hidden md:flex" data-testid="desktop-nav">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="flex items-center" data-testid="desktop-home-link">
                                <Icon icon="mdi:home" className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookings/my-bookings" className="flex items-center" data-testid="desktop-bookings-link">
                                <Icon icon="mdi:book-open-variant" className="mr-2" /> My Bookings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} data-testid="mobile-menu-button">
                        <Icon icon="mdi:menu" className="text-2xl" />
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden" data-testid="mobile-nav">
                    <ul>
                        <li>
                            <Link to="/" className="block p-2" data-testid="mobile-home-link">
                                <Icon icon="mdi:home" className="inline mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookings/my-bookings" className="block p-2" data-testid="mobile-bookings-link">
                                <Icon icon="mdi:book-open-variant" className="inline mr-2" /> My Bookings
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
