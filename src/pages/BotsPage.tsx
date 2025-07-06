import {
  BotForm,
  BotsEmptyState,
  BotsList,
  BotsLoadingState,
} from '@/components/bots';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useBotsStore } from '@/stores';
import type { Bot } from '@/types/bot';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const BotsPage = () => {
  const {
    publicBots,
    myBots,
    isLoading,
    error,
    loadBots,
    deleteBot,
  } = useBotsStore();

  const [showForm, setShowForm] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);

  useEffect(() => {
    loadBots();
  }, [loadBots]);

  const handleEdit = (bot: Bot) => {
    if (!bot.isPublic) {
      setEditingBot(bot);
      setShowForm(true);
    }
  };

  const handleDelete = async (botId: string) => {
    try {
      await deleteBot(botId);
    } catch (err) {
      console.error('Error deleting bot:', err);
    }
  };

  const handleCreateBot = () => {
    setEditingBot(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBot(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    loadBots();
  };

  if (isLoading) {
    return <BotsLoadingState />;
  }

  const hasAnyBots = publicBots.length > 0 || myBots.length > 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-2xl sm:text-3xl font-bold">Trading bots</h1>
        <Button
          onClick={handleCreateBot}
          className="cursor-pointer hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create bot
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!hasAnyBots ? (
        <BotsEmptyState onCreateBot={handleCreateBot} />
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {publicBots.length > 0 && (
            <div className="animate-in fade-in-0 slide-in-from-left-4 duration-700">
              <div className="border-b pb-2 mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-600">Public bots</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  These bots are available to all users for viewing. They cannot be edited or deleted.
                </p>
              </div>
              <BotsList
                title=""
                bots={publicBots}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}

          <div className="animate-in fade-in-0 slide-in-from-right-4 duration-700">
            <div className="border-b pb-2 mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-green-600">My bots</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Your personal bots. You can create, edit and delete them.
              </p>
            </div>
            {myBots.length > 0 ? (
              <BotsList
                title=""
                bots={myBots}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">You don't have any bots yet</p>
                <Button onClick={handleCreateBot} className="cursor-pointer w-full sm:w-auto" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first bot
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <BotForm bot={editingBot} onClose={handleFormClose} onSuccess={handleFormSuccess} />
      )}
    </div>
  );
};

export default BotsPage;
