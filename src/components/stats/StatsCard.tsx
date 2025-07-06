import { Card, CardContent } from '@/components/ui/card';
import type { BotStatistic } from '@/types/bot';
import React from 'react';
import StatsCardHeader from './StatsCardHeader';
import StatsMetricsGrid from './StatsMetricsGrid';

interface StatsCardProps {
  stat: BotStatistic;
  index: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stat, index }) => {
  return (
    <Card
      className="opacity-0 bot-card-enter hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600"
      style={{
        animationDelay: `${800 + index * 100}ms`,
      }}
    >
      <StatsCardHeader stat={stat} />
      
      <CardContent className="pt-0 px-2 pb-2">
        <StatsMetricsGrid stat={stat} />
      </CardContent>
    </Card>
  );
}; 