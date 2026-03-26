import { create } from 'zustand';

interface CursorState {
  cursorType: 'default' | 'project';
  setCursorType: (type: 'default' | 'project') => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
}));
