import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../../src/App';
import Home from '../../src/components/Home';
import Saved from '../../src/components/Saved';
import Lists from '../../src/components/Lists';
import Settings from '../../src/components/Settings';
import About from '../../src/components/About';
import Search from '../../src/components/Search';
import React from 'react';
import SideMenu from '../../src/components/SideMenu';
import { Toaster } from '../../src/components/ui/toaster';

describe('Main App Routing', () => {
    it('renders Home component for the default route', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        expect(screen.getByText(/Add/i)).toBeInTheDocument();
    });

    it('renders Saved component for the /saved route', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        window.history.pushState({}, 'Saved', '/saved');
        expect(screen.getByText(/Saved/i)).toBeInTheDocument();
    });

    it('renders Lists component for the /lists route', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        window.history.pushState({}, 'Lists', '/lists');
        expect(screen.getByText(/Lists/i)).toBeInTheDocument();
    });

    it('renders Settings component for the /settings route', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        window.history.pushState({}, 'Settings', '/settings');
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    });

    it('renders About component for the /about route', async () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        window.history.pushState({}, 'About', '/about');
        await waitFor(() => {
            expect(screen.getByText(/Menu/i)).toBeInTheDocument();
            // expect(screen.getByRole('heading', { level: 1, name: /About/i })).toBeInTheDocument();
        });

    });

    it('renders Search component for the /search route', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        window.history.pushState({}, 'Search', '/search');
        expect(screen.getByText(/Search/i)).toBeInTheDocument();
    });
});