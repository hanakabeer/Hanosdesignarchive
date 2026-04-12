import { create } from 'zustand';

interface CursorState {
  cursorType: 'default' | 'project';
  cursorVisible: boolean;
  setCursorType: (type: 'default' | 'project') => void;
  setCursorVisible: (visible: boolean) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  cursorType: 'default',
  cursorVisible: true,
  setCursorType: (type) => set({ cursorType: type }),
  setCursorVisible: (visible) => set({ cursorVisible: visible }),
}));
