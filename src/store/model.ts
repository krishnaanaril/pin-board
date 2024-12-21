import { z } from "zod";

export interface LatLng {
    lat: number,
    lng: number
}

export interface LocationDetails {
    id: number,
    name: string,
    note: string,
    position: LatLng | null,
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