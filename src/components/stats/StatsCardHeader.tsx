import { Badge } from '@/components/ui/badge';
import { CardHeader } from '@/components/ui/card';
import type { BotStatistic } from '@/types/bot';
import { Zap } from 'lucide-react';
import React from 'react';

interface StatsCardHeaderProps {
  stat: BotStatistic;
}

export const StatsCardHeader: React.FC<StatsCardHeaderProps> = ({ stat }) => {
  return (
    <CardHeader className="pb-1.5 pt-2 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-blue-600" />
          <h3 className="font-semibold text-sm">{stat.name}</h3>
        </div>
        <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
          {stat.symbol}
        </Badge>
      </div>
    </CardHeader>
  );
};

export default StatsCardHeader; 