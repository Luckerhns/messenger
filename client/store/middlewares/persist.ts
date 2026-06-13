import { create } from "zustand";
import { persist } from "zustand/middleware";

export const withPersists = <T>(
  storeFunction: Parameters<(typeof create<T>)[0]>,
  name: string,
) => {
  return create(
    persist(storeFunction, {
      name,
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        // removeItem: (name) => localStorage.removeItem(name),
      },
    }),
  );
};
