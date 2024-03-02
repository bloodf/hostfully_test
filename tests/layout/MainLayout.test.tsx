import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import MainLayout from "@/layout/MainLayout";

vi.mock('@/components/Navigation/Header.tsx', () => ({
    __esModule: true,
    default: () => <header>Mocked Header</header>,
}));

vi.mock('@/components/Navigation/Footer.tsx', () => ({
    __esModule: true,
    default: () => <footer>Mocked Footer</footer>,
}));

vi.mock('react-router-dom', async () => {
    const originalModule = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
    return {
        ...originalModule,
        Outlet: () => <div>Mocked Outlet</div>,
    };
});

describe('MainLayout', () => {
    it('renders the layout with Header, Outlet, and Footer', () => {
        const { getByText } = render(<MainLayout />);

        expect(getByText('Mocked Header')).toBeInTheDocument();
        expect(getByText('Mocked Outlet')).toBeInTheDocument();
        expect(getByText('Mocked Footer')).toBeInTheDocument();
    });
});
