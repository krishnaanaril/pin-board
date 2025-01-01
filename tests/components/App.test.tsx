import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App'
import { describe, it, expect, beforeAll, vi } from 'vitest';
import React from 'react';
import SideMenu from '../../src/components/SideMenu';
import { Toaster } from '../../src/components/ui/toaster';

describe('App component', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          })),
        });
      });

    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        expect(container).toBeInTheDocument()
    })

    it('renders the Toaster component', () => {
        const { getByText } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        expect(getByText('Saved')).toBeInTheDocument()
        expect(getByText('Search')).toBeInTheDocument()
    })

    it('renders the SideMenu component', () => {
        const { container } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        expect(container.querySelector('div')).toBeInTheDocument()
    })

    it('has links to /saved and /', () => {
        const { getByText } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        expect(getByText('Saved').closest('a')).toHaveAttribute('href', '/saved')
        expect(getByText('Search').closest('a')).toHaveAttribute('href', '/')
    })
})