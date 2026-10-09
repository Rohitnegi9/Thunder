import { create } from "zustand";

export const useChatStore = create((set) => ({
  messagesByChatId: {},

  setChatMessages: (chatId, messages) =>
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: messages,
      },
    })),

  removeChat: (chatId) =>
    set((state) => {
      const messagesByChatId = { ...state.messagesByChatId };
      delete messagesByChatId[chatId];
      return { messagesByChatId };
    }),

  clearChats: () => set({ messagesByChatId: {} }),
}));
