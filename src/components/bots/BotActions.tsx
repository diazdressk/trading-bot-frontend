import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';
import type { Bot } from '@/types/bot';
import { Edit, Eye, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface BotActionsProps {
  bot: Bot;
  onEdit: (bot: Bot) => void;
  onDelete: (botId: string) => void;
}

export const BotActions: React.FC<BotActionsProps> = ({ bot, onEdit, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    if (!bot.isPublic) {
      onEdit(bot);
    }
  };

  const handleDelete = () => {
    if (!bot.isPublic) {
      setShowDeleteDialog(true);
    }
  };

  const confirmDelete = () => {
    onDelete(bot.id);
    setShowDeleteDialog(false);
  };

  if (bot.isPublic) {
    return (
      <div className="text-center py-0.5">
        <p className="text-xs text-gray-400 italic flex items-center justify-center gap-0.5">
          <Eye className="w-2.5 h-2.5" />
          Read-only
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="cursor-pointer flex-1 h-4 text-xs hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 group/btn"
        >
          <Edit className="w-2 h-2 mr-0.5 group-hover/btn:scale-110 transition-transform" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="cursor-pointer flex-1 h-4 text-xs hover:bg-red-600 transition-all duration-200 group/btn"
        >
          <Trash2 className="w-2 h-2 mr-0.5 group-hover/btn:scale-110 transition-transform" />
          Delete
        </Button>
      </div>

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete bot"
        description={`Are you sure you want to delete the bot "${bot.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default BotActions; 