import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { BotStatistic } from '@/types/bot';
import { DollarSign, Grid3X3, TrendingUp, Zap } from 'lucide-react';
import React from 'react';

interface StatsTableProps {
  statistics: BotStatistic[];
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

const getProfitColor = (profit: number): string => {
  if (profit > 0) return 'text-green-600';
  if (profit < 0) return 'text-red-600';
  return 'text-gray-600';
};

const getProfitBadgeClass = (profit: number): string => {
  const baseClasses = 'text-xs font-medium h-4 sm:h-5 transition-all duration-200';
  
  if (profit > 0) {
    return `${baseClasses} bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 hover:from-green-600 hover:to-emerald-600`;
  }
  if (profit < 0) {
    return `${baseClasses} bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-400 hover:from-red-600 hover:to-rose-600`;
  }
  return `${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400 hover:from-blue-600 hover:to-indigo-600`;
};

export const StatsTable: React.FC<StatsTableProps> = ({ statistics }) => {  
  if (!statistics || statistics.length === 0) {
    return (
      <Card className="w-full overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            No statistics data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          Individual Bot Performance ({statistics.length} bots)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-900 min-w-[120px] text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    Bot
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-center min-w-[60px] sm:min-w-[80px] text-xs sm:text-sm hidden sm:table-cell">
                  Cycles
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-right min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="hidden sm:inline">Deposit</span>
                    <span className="sm:hidden">Dep.</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-right min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    Profit
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-center min-w-[70px] sm:min-w-[80px] text-xs sm:text-sm">
                  <span className="hidden sm:inline">Performance</span>
                  <span className="sm:hidden">%</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.map((stat) => (
                <TableRow 
                  key={stat.id} 
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <TableCell className="font-medium p-2 sm:p-3">
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="font-semibold text-gray-900 max-w-[100px] sm:max-w-[150px] text-xs sm:text-sm">
                        {stat.name}
                      </div>
                      <div className="text-xs text-blue-600 font-medium">
                        {stat.symbol}
                      </div>
                      <div className="sm:hidden">
                        <Badge variant="outline" className="text-xs h-4">
                          {stat.cycles_completed} cycles
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {stat.cycles_completed}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium p-2 sm:p-3">
                    <div className="text-gray-900 text-xs sm:text-sm">
                      {formatCurrency(stat.deposit_usdt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium p-2 sm:p-3">
                    <div className={`${getProfitColor(stat.profit_usdt)} text-xs sm:text-sm`}>
                      {formatCurrency(stat.profit_usdt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-2 sm:p-3">
                    <Badge 
                      className={getProfitBadgeClass(stat.profit_percentage)}
                    >
                      {formatPercentage(stat.profit_percentage)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}; 