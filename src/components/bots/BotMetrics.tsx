import type { Bot } from '@/types/bot';
import { DollarSign, Grid3X3, Hash, TrendingUp } from 'lucide-react';
import React from 'react';

interface BotMetricsProps {
  bot: Bot;
}

interface MetricItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hoverColor: string;
  iconColor: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  hoverColor, 
  iconColor 
}) => (
  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-1 ${hoverColor} transition-all duration-200`}>
    <div className="flex items-center gap-0.5">
      <Icon className={`w-2.5 h-2.5 ${iconColor}`} />
      <p className="text-xs text-gray-500">{label}</p>
    </div>
    <p className="font-semibold text-xs mt-0.5">{value}</p>
  </div>
);

export const BotMetrics: React.FC<BotMetricsProps> = ({ bot }) => {
  return (
    <div className="grid grid-cols-2 gap-1 mb-1">
      <MetricItem
        icon={DollarSign}
        label="Deposit"
        value={`$${bot.deposit.toLocaleString()}`}
        hoverColor="hover:from-blue-50 hover:to-blue-100"
        iconColor="text-green-600"
      />
      <MetricItem
        icon={TrendingUp}
        label="Profit"
        value={`${bot.profit_percentage}%`}
        hoverColor="hover:from-green-50 hover:to-green-100"
        iconColor="text-green-600"
      />
      <MetricItem
        icon={Hash}
        label="Orders"
        value={bot.num_orders.toString()}
        hoverColor="hover:from-purple-50 hover:to-purple-100"
        iconColor="text-purple-600"
      />
      <MetricItem
        icon={Grid3X3}
        label="Grid"
        value={`${bot.grid_length}%`}
        hoverColor="hover:from-orange-50 hover:to-orange-100"
        iconColor="text-orange-600"
      />
    </div>
  );
};

export default BotMetrics; 