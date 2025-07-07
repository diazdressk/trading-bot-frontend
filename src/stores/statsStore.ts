import { botsApi } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import type { BotStatistic } from '@/types/bot';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StatsState {
  statistics: BotStatistic[];
  isLoading: boolean;
  error: string | null;
  totalDeposit: number;
  totalProfit: number;
  totalCycles: number;
  avgProfitPercentage: number;
  profitableBots: number;
  activeBots: number;
}

interface StatsActions {
  loadStatistics: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type StatsStore = StatsState & StatsActions;

const computeStats = (statistics: BotStatistic[]) => {
  const totalDeposit = statistics.reduce((sum, stat) => sum + stat.deposit_usdt, 0);
  const totalProfit = statistics.reduce((sum, stat) => sum + stat.profit_usdt, 0);
  const totalCycles = statistics.reduce((sum, stat) => sum + stat.cycles_completed, 0);
  const avgProfitPercentage = totalDeposit > 0 ? (totalProfit / totalDeposit) * 100 : 0;
  const profitableBots = statistics.filter(stat => stat.profit_usdt > 0).length;
  const activeBots = statistics.length;

  return {
    totalDeposit,
    totalProfit,
    totalCycles,
    avgProfitPercentage,
    profitableBots,
    activeBots,
  };
};

export const useStatsStore = create<StatsStore>()(
  devtools(
    (set) => ({
      statistics: [],
      isLoading: false,
      error: null,
      totalDeposit: 0,
      totalProfit: 0,
      totalCycles: 0,
      avgProfitPercentage: 0,
      profitableBots: 0,
      activeBots: 0,

      loadStatistics: async () => {
        try {
          set({ isLoading: true, error: null });
          const statistics = await botsApi.getStatistics();
          const computedStats = computeStats(statistics);

          set({
            statistics,
            ...computedStats,
            isLoading: false,
          });
        } catch (error: unknown) {
          set({
            error: getErrorMessage(error),
            isLoading: false,
          });
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
      name: 'stats-store',
    }
  )
); 