import { z } from "zod";

export interface LatLng {
    lat: number,
    lng: number
}

export interface LocationDetails {
    id: number,
    name: string,
    note: string,
    position: LatLng
    createdAt: number,
    updatedAt: number
}

export interface PinBoardState {
    savedLocations: LocationDetails[];
    activePosition: LatLng | null;
    updateActivePosition: (newPosition: LatLng) => void;
    addSavedLocation: (newLocation: LocationDetails) => void;
    updateSavedLocation: (id: number, newLocation: LocationDetails) => void;
    deleteSavedLocation: (id: number) => void;
}

export const LocationFormSchema = z.object({
    name: z.string()
        .nonempty("Location name is required")
        .min(3, {
            message: "Location name must be at least 3 characters.",
        })
        .max(50, "Location name should be shorter than 50 chars."),
    note: z.string()
});
