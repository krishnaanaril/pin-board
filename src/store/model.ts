export interface LatLng {
    lat: number,
    lng: number
}

export interface ActivePositionInfo extends LatLng {
    text: string
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

export interface LocationDetailsWithList extends LocationDetails {
    list: string | undefined
}

/*
 {
    "place_id": 226032179,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 1942586,
    "lat": "28.6273928",
    "lon": "77.1716954",
    "category": "boundary",
    "type": "administrative",
    "place_rank": 8,
    "importance": 0.703553691289515,
    "addresstype": "state",
    "name": "Delhi",
    "display_name": "Delhi, India",
    "boundingbox": [
      "28.4046285",
      "28.8834464",
      "76.8388351",
      "77.3452524"
    ]
  }
*/
export interface LocationSearchResult {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    lat: string,
    lon: string,
    category: string,
    type: string,
    place_rank: number,
    importance: number,
    addresstype: string,
    name: string,
    display_name: string,
    boundingbox: string[]
}

export interface PinBoardState {
    savedLocations: LocationDetails[];
    activePosition: ActivePositionInfo | null;
    savedLists: ListDetails[];
    updateActivePosition: (newPosition: ActivePositionInfo | null) => void;
    addSavedLocation: (newLocation: LocationDetails) => void;
    updateSavedLocation: (id: string, newLocation: LocationDetails) => void;
    deleteSavedLocation: (id: string) => void;
    addListItem: (newListItem: ListDetails) => void;
    updateListItem: (id: string, newListItem: ListDetails) => void;
    deleteListItem: (id: string) => void;
    appendSavedLocations: (newLocations: LocationDetails[]) => void;
    appendSavedLists: (newLists: ListDetails[]) => void;
}

export interface AlertProps {
    openAlert: boolean;
    setOpenAlert: (open: boolean) => void;
    title: string;
    description: string;
    cancelText: string;
    actionText: string;
    action: () => void;
}