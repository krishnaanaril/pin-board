import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LatLng, ListDetails, LocationDetails, PinBoardState } from './model';

const pinBoardMiddlewares = (f: StateCreator<PinBoardState, [], []>) => devtools(persist(f, { name: 'PinBoardStore' }));

const DEFAULT_LISTS : ListDetails[] = [
    { id: '1', name: 'Unlabelled', description: 'This is the default list', createdAt: Date.now(), updatedAt: Date.now() }
];

const PinBoardStateCreatorFn = (set: any) => ({
    savedLocations: [],
    savedLists: DEFAULT_LISTS,
    activePosition: null,
    updateActivePosition: (newPosition: LatLng | null) => set(() => ({ activePosition: newPosition })),
    addSavedLocation: (newLocation: LocationDetails) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations, newLocation] }));
    },
    updateSavedLocation: (id: string, newLocation: LocationDetails) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations.filter((x: LocationDetails) => x.id !== id), newLocation] }));
    },
    deleteSavedLocation: (id: string) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations.filter((x: LocationDetails) => x.id !== id)] }));
    },
    addListItem: (newListItem: ListDetails) => {
        set((state: PinBoardState) => ({ savedLists: [...state.savedLists, newListItem] }));
    },
    updateListItem: (id: string, newListItem: ListDetails) => {
        set((state: PinBoardState) => ({ savedLists: [...state.savedLists.filter((x: ListDetails) => x.id !== id), newListItem] }));
    },
    deleteListItem: (id: string) => {
        set((state: PinBoardState) => ({ savedLists: [...state.savedLists.filter((x: ListDetails) => x.id !== id)] }));
    },
    appendSavedLocations: (newLocations: LocationDetails[]) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations, ...newLocations] }));
    },
    appendSavedLists: (newLists: ListDetails[]) => {
        set((state: PinBoardState) => ({ savedLists: [...state.savedLists, ...newLists] }));
    }
})

const usePinBoardStore = create<PinBoardState>()(
    pinBoardMiddlewares(PinBoardStateCreatorFn)
);

export default usePinBoardStore;