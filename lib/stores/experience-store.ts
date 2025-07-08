import { create } from 'zustand'

interface ExperienceStore {
  activeId: string | null
  setActiveId: (id: string) => void
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  activeId: null,
  setActiveId: (id) => set({ activeId: id }),
}))
