import { create } from 'zustand'
import { Tables } from '../db'

interface Profile {
  profile: Tables<'profiles'> | null
  email?: string
  setProfile: (profile: Tables<'profiles'>) => void
}

export const useProfileStore = create<Profile>()((set) => ({
  profile: null,
  setProfile: (newProfile) => set(() => ({
    profile: newProfile
  })),
}))