import { Badge } from '@/components/ui/badge';
import { CardHeader } from '@/components/ui/card';
import type { Bot } from '@/types/bot';
import { Eye, Zap } from 'lucide-react';
import React from 'react';
import BotStatusBadge from './BotStatusBadge';

interface BotCardHeaderProps {
  bot: Bot;
}

export const BotCardHeader: React.FC<BotCardHeaderProps> = ({ bot }) => {
  return (
    <CardHeader className="pb-0.5 pt-0.5 px-1.5 sm:px-2 sm:pt-1">
      <div className="flex items-center justify-between gap-2 mb-0.5">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <h3 className="font-semibold text-xs truncate group-hover:text-blue-600 transition-colors">
            {bot.name}
          </h3>
          {bot.isPublic && (
            <Badge
              variant="outline"
              className="text-xs px-0.5 py-0 h-3 text-blue-600 border-blue-300 flex-shrink-0"
            >
              <Eye className="w-1.5 h-1.5 mr-0.5" />
              Public
            </Badge>
          )}
        </div>
        <BotStatusBadge status={bot.status} />
      </div>
      <div className="flex items-center gap-0.5">
        <Zap className="w-2.5 h-2.5 text-blue-500" />
        <p className="text-xs text-blue-600 font-medium">{bot.symbol}</p>
      </div>
    </CardHeader>
  );
};

export default BotCardHeader; 