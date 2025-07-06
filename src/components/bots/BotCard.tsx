import { Card, CardContent } from '@/components/ui/card';
import type { Bot } from '@/types/bot';
import React from 'react';
import BotActions from './BotActions';
import BotCardHeader from './BotCardHeader';
import BotMetrics from './BotMetrics';

interface BotCardProps {
  bot: Bot;
  onEdit: (bot: Bot) => void;
  onDelete: (botId: string) => void;
}

const BotCard: React.FC<BotCardProps> = ({ bot, onEdit, onDelete }) => {
  return (
    <Card className="group h-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out border-l-4 border-l-blue-500 hover:border-l-blue-600">
      <BotCardHeader bot={bot} />
      
      <CardContent className="pt-0 pb-0.5 px-1.5 sm:px-2">
        <BotMetrics bot={bot} />
        <BotActions bot={bot} onEdit={onEdit} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
};

export default BotCard;
