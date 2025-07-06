import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Award,
  DollarSign,
  RefreshCw,
  Target,
  TrendingUp,
} from 'lucide-react';

interface StatsSummaryCardsProps {
  totalDeposit: number;
  totalProfit: number;
  totalCycles: number;
  avgProfitPercentage: number;
  profitableBots: number;
  totalBots: number;
}

export const StatsSummaryCards = ({
  totalDeposit,
  totalProfit,
  totalCycles,
  avgProfitPercentage,
  profitableBots,
  totalBots,
}: StatsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card
        className="opacity-0 bot-card-enter hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500"
        style={{ animationDelay: '200ms' }}
      >
        <CardHeader className="pb-1 pt-3 px-3">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-medium text-gray-600">Total Deposit</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-3 pb-3">
          <p className="text-lg font-bold text-blue-600">
            ${totalDeposit.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card
        className="opacity-0 bot-card-enter hover:shadow-md transition-shadow duration-200 border-l-4 border-l-green-500"
        style={{ animationDelay: '300ms' }}
      >
        <CardHeader className="pb-1 pt-3 px-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h3 className="text-xs font-medium text-gray-600">Total Profit</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-3 pb-3">
          <p
            className={`text-lg font-bold ${
              totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            ${totalProfit.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card
        className="opacity-0 bot-card-enter hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-500"
        style={{ animationDelay: '400ms' }}
      >
        <CardHeader className="pb-1 pt-3 px-3">
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-medium text-gray-600">Total Cycles</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-3 pb-3">
          <p className="text-lg font-bold text-purple-600">
            {totalCycles.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card
        className="opacity-0 bot-card-enter hover:shadow-md transition-shadow duration-200 border-l-4 border-l-orange-500"
        style={{ animationDelay: '500ms' }}
      >
        <CardHeader className="pb-1 pt-3 px-3">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-orange-600" />
            <h3 className="text-xs font-medium text-gray-600">Avg Profit %</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-3 pb-3">
          <p
            className={`text-lg font-bold ${
              avgProfitPercentage >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {avgProfitPercentage.toFixed(2)}%
          </p>
        </CardContent>
      </Card>

      <Card
        className="opacity-0 bot-card-enter hover:shadow-md transition-shadow duration-200 border-l-4 border-l-emerald-500"
        style={{ animationDelay: '600ms' }}
      >
        <CardHeader className="pb-1 pt-3 px-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-medium text-gray-600">Profitable Bots</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-3 pb-3">
          <p className="text-lg font-bold text-emerald-600">
            {profitableBots}/{totalBots}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}; 