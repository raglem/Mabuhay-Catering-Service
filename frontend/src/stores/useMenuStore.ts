import { create } from 'zustand';
import menu from '../menu.json'
import type { MenuCategory } from '../types/Menu';

type MenuStore = {
    getMenu: () => Promise<MenuCategory[]>;
}

export const useMenuStore = create<MenuStore>()((set) => ({
    getMenu: async () => {
    return Promise.resolve(menu as MenuCategory[]);
  },
}));


