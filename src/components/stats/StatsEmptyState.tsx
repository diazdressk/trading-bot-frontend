import { BarChart3 } from 'lucide-react';

export const StatsEmptyState = () => {
  return (
    <div className="text-center py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <BarChart3 className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Statistics Yet</h3>
      <p className="text-gray-500 mb-1">
        Create a bot and start trading to see your statistics
      </p>
      <p className="text-sm text-gray-400">Your trading performance will appear here</p>
    </div>
  );
}; 