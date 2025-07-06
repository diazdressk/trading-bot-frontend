import { botsApi } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import type { Bot, BotCreate } from '@/types/bot';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BotsState {
  bots: Bot[];
  publicBots: Bot[];
  myBots: Bot[];
  isLoading: boolean;
  error: string | null;
}

interface BotsActions {
  loadBots: () => Promise<void>;
  createBot: (botData: BotCreate) => Promise<void>;
  updateBot: (botData: Partial<Bot> & { id: string }) => Promise<void>;
  deleteBot: (id: string) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type BotsStore = BotsState & BotsActions;

export const useBotsStore = create<BotsStore>()(
  devtools(
    (set, get) => ({
      bots: [],
      publicBots: [],
      myBots: [],
      isLoading: false,
      error: null,

      loadBots: async () => {
        try {
          set({ isLoading: true, error: null });
          const bots = await botsApi.getAll();

          const publicBots = bots.filter(bot => bot.isPublic);
          const myBots = bots.filter(bot => !bot.isPublic);

          set({
            bots,
            publicBots,
            myBots,
            isLoading: false,
          });
        } catch (error: unknown) {
          set({
            error: getErrorMessage(error),
            isLoading: false,
          });
        }
      },

      createBot: async (botData) => {
        try {
          set({ isLoading: true, error: null });
          const newBot = await botsApi.create(botData);

          const currentState = get();
          const updatedBots = [...currentState.bots, newBot];
          const myBots = [...currentState.myBots, newBot];

          set({
            bots: updatedBots,
            myBots,
            isLoading: false,
          });
        } catch (error: unknown) {
          set({
            error: getErrorMessage(error),
            isLoading: false,
          });
          throw error;
        }
      },

      updateBot: async (botData) => {
        try {
          set({ isLoading: true, error: null });
          const updatedBot = await botsApi.update(botData);

          const currentState = get();
          const updatedBots = currentState.bots.map(bot =>
            bot.id === updatedBot.id ? updatedBot : bot
          );
          const myBots = currentState.myBots.map(bot =>
            bot.id === updatedBot.id ? updatedBot : bot
          );

          set({
            bots: updatedBots,
            myBots,
            isLoading: false,
          });
        } catch (error: unknown) {
          set({
            error: getErrorMessage(error),
            isLoading: false,
          });
          throw error;
        }
      },

      deleteBot: async (id) => {
        try {
          set({ isLoading: true, error: null });
          await botsApi.delete(id);

          const currentState = get();
          const updatedBots = currentState.bots.filter(bot => bot.id !== id);
          const myBots = currentState.myBots.filter(bot => bot.id !== id);

          set({
            bots: updatedBots,
            myBots,
            isLoading: false,
          });
        } catch (error: unknown) {
          set({
            error: getErrorMessage(error),
            isLoading: false,
          });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'bots-store',
    }
  )
); 