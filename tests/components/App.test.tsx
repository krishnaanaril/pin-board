import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App'
import { describe, it, expect } from 'vitest';
import React from 'react';
import SideMenu from '../../src/components/SideMenu';
import { Toaster } from '../../src/components/ui/toaster';

describe('App component', () => {
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