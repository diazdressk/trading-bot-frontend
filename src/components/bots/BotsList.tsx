import BotCard from '@/components/bots/BotCard';
import type { Bot } from '@/types/bot';

interface BotsListProps {
  title: string;
  bots: Bot[];
  onEdit: (bot: Bot) => void;
  onDelete: (botId: string) => void;
}

export const BotsList = ({ title, bots, onEdit, onDelete }: BotsListProps) => {
  if (bots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};