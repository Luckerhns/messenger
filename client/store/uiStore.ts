import { create } from 'zustand';
import type { UIState } from './types';

interface UIActions {
  setSearchQuery: (query: string) => void;
  openModal: (type: UIState['modalType']) => void;
  closeModal: () => void;
  setModalType: (type: UIState['modalType']) => void;
  setLeftPanelView: (view: UIState['leftPanelView']) => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  searchQuery: '',
  isModalOpen: false,
  modalType: null,
  leftPanelView: 'chats',
};

export const useUIStore = create<UIStore>((set, get) => ({
  ...initialState,
  setSearchQuery: (query) => set({ searchQuery: query }),
  openModal: (type) => set({ isModalOpen: true, modalType: type }),
  closeModal: () => set({ isModalOpen: false, modalType: null }),
  setModalType: (type) => set({ modalType: type }),
  setLeftPanelView: (view) => set({ leftPanelView: view }),
}));
