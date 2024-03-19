// store.js

import zustand from 'zustand';
import { createStore } from 'zustand';

export const useStore = createStore((set) => ({
  formData: {
    Surname1: '',
    Surname2: '',
    Name1: '',
    DNIType: '',
    DNINumber: '',
    BirthDate: '',
  },
  setFormData: (data) => set((state) => ({ formData: data })),
  resetFormData: () => set((state) => ({ formData: {} })),
}));
