import { create } from 'zustand'

export const useBearStore = create<{boxId: string; setBoxId: (val: string) => void}>((set) => ({
  boxId: '',
  setBoxId: (val: string) => set((state: any) => ({...state, boxId: val})),
}))