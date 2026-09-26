import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      favorites: [],
      trips: [],
      savedAddresses: [],
      user: null,

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [...state.favorites, id],
        })),

      saveTrip: (trip) =>
        set((state) => ({
          trips: [...state.trips, trip],
        })),

      addAddress: (address) =>
        set((state) => ({
          savedAddresses: [...state.savedAddresses, address],
        })),

      removeAddress: (index) =>
        set((state) => ({
          savedAddresses: state.savedAddresses.filter((_, i) => i !== index),
        })),

      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: 'oromia-tourism' },
  ),
)
