import React from 'react';
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "../../src/components/About";

describe("About Component", () => {
    it("should render the PageHeader with correct text", () => {
        render(<About />);
        const headerElement = screen.getByText(/About/i);
        expect(headerElement).toBeInTheDocument();
    });

    it("should set the document title on mount", () => {
        render(<About />);
        expect(document.title).toBe("About | Pin Board: Save your locations");
    });

    it("should render the features section with correct items", () => {
        render(<About />);
        const featuresHeader = screen.getByText(/Features/i);
        expect(featuresHeader).toBeInTheDocument();

        const featureItems = [
            "Save locations with a name and note",
            "Save lists with a name and description",
            "View saved locations and lists",
            "Edit saved locations and lists",
            "Delete saved locations and lists",
            "Export data as json",
            "Import data from json"
        ];

        featureItems.forEach(item => {
            const featureElement = screen.getByText(item);
            expect(featureElement).toBeInTheDocument();
        });
    });

    it("should render the technologies section with correct items", () => {
        render(<About />);
        const technologiesHeader = screen.getByText(/Technologies/i);
        expect(technologiesHeader).toBeInTheDocument();

        const technologyItems = [
            "React",
            "TypeScript",
            "Zustand",
            "React Hook Form",
            "Tailwind CSS",
            "Shadcn"
        ];

        technologyItems.forEach(item => {
            const technologyElement = screen.getByText(item);
            expect(technologyElement).toBeInTheDocument();
        });
    });
});