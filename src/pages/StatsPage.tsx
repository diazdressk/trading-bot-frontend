import {
  StatsCard,
  StatsEmptyState,
  StatsLoadingState,
  StatsSummaryCards,
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
    <div className="space-y-6">
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          Bot Statistics
        </h1>
        <p className="text-gray-500 mt-2">Track your trading performance and analytics</p>
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

          <div className="space-y-4">
            <h2
              className="text-xl font-semibold text-gray-800 opacity-0 bot-card-enter"
              style={{ animationDelay: '700ms' }}
            >
              Individual Bot Performance
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <StatsCard key={stat.id} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage; 