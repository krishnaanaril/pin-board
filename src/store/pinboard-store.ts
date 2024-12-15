import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LatLng, LocationDetails, PinBoardState } from './model';

const pinBoardMiddlewares = (f: StateCreator<PinBoardState, [], []>) => devtools(persist(f, { name: 'PinBoardStore' }));

const PinBoardStateCreatorFn = (set: any) => ({
    savedLocations: [],
    activePosition: null,
    updateActivePosition: (newPosition: LatLng) => set((state: PinBoardState) => ({ activePosition: newPosition })),
    addSavedLocation: (newLocation: LocationDetails) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations, newLocation] }));
    },
    updateSavedLocation: (id: number, newLocation: LocationDetails) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations.filter((x: LocationDetails) => x.id !== id), newLocation] }));
    },
    deleteSavedLocation: (id: number) => {
        set((state: PinBoardState) => ({ savedLocations: [...state.savedLocations.filter((x: LocationDetails) => x.id !== id)] }));
    }
})

const usePinBoardStore = create<PinBoardState>()(
    pinBoardMiddlewares(PinBoardStateCreatorFn)
);

export default usePinBoardStore;