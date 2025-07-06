export const BotsLoadingState = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse">Loading bots...</p>
      </div>
    </div>
  );
}; 