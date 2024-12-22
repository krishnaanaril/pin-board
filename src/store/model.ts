export interface LatLng {
    lat: number,
    lng: number
}

export interface LocationDetails {
    id: string,
    name: string,
    note: string,
    listId: string,
    position: LatLng | null,
    createdAt: number,
    updatedAt: number
}

export interface ListDetails {
    id: string,
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
    updateSavedLocation: (id: string, newLocation: LocationDetails) => void;
    deleteSavedLocation: (id: string) => void;
    addListItem: (newListItem: ListDetails) => void;
    updateListItem: (id: string, newListItem: ListDetails) => void;
    deleteListItem: (id: string) => void;
}