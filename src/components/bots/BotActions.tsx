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
      <div className="text-center py-1">
        <p className="text-xs text-gray-400 italic flex items-center justify-center gap-1">
          <Eye className="w-3 h-3" />
          Read-only
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-1 mt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="cursor-pointer flex-1 h-7 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-200 group/btn shadow-sm hover:shadow-md"
        >
          <Edit className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="cursor-pointer flex-1 h-7 text-xs font-medium bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 border-red-500 hover:border-red-600 text-white transition-all duration-200 group/btn shadow-sm hover:shadow-md"
        >
          <Trash2 className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
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