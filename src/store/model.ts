export interface LatLng {
    lat: number,
    lng: number
}

export interface LocationDetails {
    id: number,
    note: string,
    position: LatLng
}

export interface PinBoardState {
    savedLocations: LocationDetails[];
    activePosition: LatLng | null;
    updateActivePosition: (newPosition: LatLng) => void;
    addSavedLocation: (newLocation: LocationDetails) => void;
    updateSavedLocation: (id: number, newLocation: LocationDetails) => void;
    deleteSavedLocation: (id: number) => void;
}