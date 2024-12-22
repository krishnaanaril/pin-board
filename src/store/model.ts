export interface LatLng {
    lat: number,
    lng: number
}

export interface LocationDetails {
    id: number,
    name: string,
    note: string,
    listId: number,
    position: LatLng | null,
    createdAt: number,
    updatedAt: number
}

export interface ListDetails {
    id: number,
    name: string,
    description: string,
    createdAt: number,
    updatedAt: number
}

export interface ListDetailsWithPlaces extends ListDetails {
    places: LocationDetails[]
}

export interface PinBoardState {
    savedLocations: LocationDetails[];
    activePosition: LatLng | null;
    savedLists: ListDetails[];
    updateActivePosition: (newPosition: LatLng | null) => void;
    addSavedLocation: (newLocation: LocationDetails) => void;
    updateSavedLocation: (id: number, newLocation: LocationDetails) => void;
    deleteSavedLocation: (id: number) => void;
    addListItem: (newListItem: ListDetails) => void;
    updateListItem: (id: number, newListItem: ListDetails) => void;
    deleteListItem: (id: number) => void;
}