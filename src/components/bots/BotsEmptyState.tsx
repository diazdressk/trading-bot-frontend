import { Button } from '@/components/ui/button';
import { Bot, Plus } from 'lucide-react';

interface BotsEmptyStateProps {
  onCreateBot: () => void;
}

export const BotsEmptyState = ({ onCreateBot }: BotsEmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
        <Bot className="w-12 h-12 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Trading Bots Yet</h3>
      <p className="text-gray-500 mb-6">
        Create your first trading bot to start automated trading
      </p>
      <Button onClick={onCreateBot} className="cursor-pointer">
        <Plus className="w-4 h-4 mr-2" />
        Create Your First Bot
      </Button>
    </div>
  );
}; 