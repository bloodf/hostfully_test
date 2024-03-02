import { render, screen } from '@testing-library/react';
import Footer from "@/components/Navigation/Footer.tsx";

describe('Footer Component', () => {
    it('renders the footer and displays the correct content', () => {
        render(<Footer />);
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent('Footer content');
    });
});
