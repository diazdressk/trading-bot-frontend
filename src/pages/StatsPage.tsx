import {
  StatsEmptyState,
  StatsLoadingState,
  StatsSummaryCards,
  StatsTable,
} from '@/components/stats';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useStatsStore } from '@/stores';
import { AlertTriangle, BarChart3 } from 'lucide-react';
import { useEffect } from 'react';

const StatsPage = () => {
  const {
    statistics,
    isLoading,
    error,
    totalDeposit,
    totalProfit,
    totalCycles,
    avgProfitPercentage,
    profitableBots,
    loadStatistics,
  } = useStatsStore();

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  if (isLoading) {
    return <StatsLoadingState />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3">
          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          Bot Statistics
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">Track your trading performance and analytics</p>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className="animate-in fade-in-0 slide-in-from-left-4 duration-500"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {statistics.length === 0 ? (
        <StatsEmptyState />
      ) : (
        <>
          <StatsSummaryCards
            totalDeposit={totalDeposit}
            totalProfit={totalProfit}
            totalCycles={totalCycles}
            avgProfitPercentage={avgProfitPercentage}
            profitableBots={profitableBots}
            totalBots={statistics.length}
          />

          <StatsTable statistics={statistics} />
        </>
      )}
    </div>
  );
};

export default StatsPage; 