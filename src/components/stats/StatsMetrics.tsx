import type { BotStatistic } from '@/types/bot';
import { DollarSign, Hash, Percent, TrendingUp } from 'lucide-react';
import React from 'react';

interface StatsMetricsProps {
  stat: BotStatistic;
}

interface MetricItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  valueColor?: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  valueColor = "text-gray-900" 
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className={`font-semibold text-sm ${valueColor}`}>{value}</span>
  </div>
);

export const StatsMetrics: React.FC<StatsMetricsProps> = ({ stat }) => {
  const profitColor = stat.profit_usdt >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="space-y-3">
      <MetricItem
        icon={DollarSign}
        label="Deposit"
        value={`$${stat.deposit_usdt.toLocaleString()}`}
      />
      <MetricItem
        icon={TrendingUp}
        label="Profit"
        value={`$${stat.profit_usdt.toLocaleString()}`}
        valueColor={profitColor}
      />
      <MetricItem
        icon={Percent}
        label="Profit %"
        value={`${stat.profit_percentage.toFixed(2)}%`}
        valueColor={profitColor}
      />
      <MetricItem
        icon={Hash}
        label="Cycles"
        value={stat.cycles_completed.toString()}
      />
    </div>
  );
};

export default StatsMetrics; 