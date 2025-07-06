import type { BotStatistic } from '@/types/bot';
import {
  DollarSign,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import React from 'react';

interface StatsMetricsGridProps {
  stat: BotStatistic;
}

interface MetricGridItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  valueColor?: string;
  hoverColor: string;
  iconColor: string;
}

const MetricGridItem: React.FC<MetricGridItemProps> = ({
  icon: Icon,
  label,
  value,
  valueColor = "text-gray-900",
  hoverColor,
  iconColor,
}) => (
  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-1.5 ${hoverColor} transition-all duration-200`}>
    <div className="flex items-center gap-1 mb-0.5">
      <Icon className={`w-2.5 h-2.5 ${iconColor}`} />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
    <p className={`text-xs font-semibold ${valueColor}`}>{value}</p>
  </div>
);

export const StatsMetricsGrid: React.FC<StatsMetricsGridProps> = ({ stat }) => {
  const profitColor = stat.profit_usdt >= 0 ? 'text-green-600' : 'text-red-600';
  const profitPercentageColor = stat.profit_percentage >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="grid grid-cols-2 gap-1.5">
      <MetricGridItem
        icon={RefreshCw}
        label="Cycles"
        value={stat.cycles_completed.toString()}
        hoverColor="hover:from-blue-50 hover:to-blue-100"
        iconColor="text-blue-600"
      />
      
      <MetricGridItem
        icon={DollarSign}
        label="Deposit"
        value={`$${stat.deposit_usdt.toLocaleString()}`}
        hoverColor="hover:from-green-50 hover:to-green-100"
        iconColor="text-green-600"
      />
      
      <MetricGridItem
        icon={stat.profit_usdt >= 0 ? TrendingUp : TrendingDown}
        label="Profit (USDT)"
        value={`$${stat.profit_usdt.toFixed(2)}`}
        valueColor={profitColor}
        hoverColor="hover:from-emerald-50 hover:to-emerald-100"
        iconColor={profitColor}
      />
      
      <MetricGridItem
        icon={Target}
        label="Profit %"
        value={`${stat.profit_percentage.toFixed(2)}%`}
        valueColor={profitPercentageColor}
        hoverColor="hover:from-purple-50 hover:to-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
};

export default StatsMetricsGrid; 