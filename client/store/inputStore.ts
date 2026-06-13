import { withPersists } from "./middlewares/persist";

export const useInputStore = withPersists(
  (set, get) => ({
    inputValue: "",
    setInputValue: (value) =>
      set((state) => ({
        inputValue: value,
      })),
    clearInputValue: (chatId) =>
      set((state) => {
        const newInputValues = { ...state.inputValues };
        delete newInputValues[chatId];
        return { inputValues: newInputValues };
      }),
  }),
  "input-storage",
);
