import { Badge } from '@/components/ui/badge';
import type { Bot } from '@/types/bot';
import { AlertCircle, Pause, Play } from 'lucide-react';
import React from 'react';

interface BotStatusBadgeProps {
  status: Bot['status'];
  className?: string;
}

const getStatusConfig = (status: Bot['status']) => {
  switch (status) {
    case 'ACTIVE':
      return {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: Play,
        iconColor: 'text-green-600',
      };
    case 'PAUSE':
      return {
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Pause,
        iconColor: 'text-yellow-600',
      };
    case 'ERROR':
      return {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: AlertCircle,
        iconColor: 'text-red-600',
      };
    default:
      return {
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: Pause,
        iconColor: 'text-gray-600',
      };
  }
};

export const BotStatusBadge: React.FC<BotStatusBadgeProps> = ({ status, className }) => {
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <Badge className={`text-xs px-1 py-0 h-4 border ${statusConfig.color} flex-shrink-0 ${className || ''}`}>
      <StatusIcon className={`w-2 h-2 mr-0.5 ${statusConfig.iconColor}`} />
      {status}
    </Badge>
  );
};

export default BotStatusBadge; 