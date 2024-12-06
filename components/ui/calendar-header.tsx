'use client';

import { format, addDays, subDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange?: (date: Date) => void;
}

export function CalendarHeader({ selectedDate, onDateChange }: CalendarHeaderProps) {
  const today = new Date();
  const dates = [-3, -2, -1, 0, 1, 2, 3].map(offset => addDays(selectedDate, offset));

  const handlePrevWeek = () => {
    onDateChange?.(subDays(selectedDate, 7));
  };

  const handleNextWeek = () => {
    onDateChange?.(addDays(selectedDate, 7));
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        {format(selectedDate, 'EEEE').toLowerCase()}
      </h2>
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevWeek}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="flex space-x-2 sm:space-x-4">
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);
            const dayInitial = format(date, 'EEEEE');

            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateChange?.(date)}
                className={cn(
                  "flex flex-col items-center min-w-[2.5rem] sm:min-w-[3rem]",
                  isSelected && "bg-black rounded-xl px-2 sm:px-3 py-1"
                )}
              >
                <span className={cn(
                  "text-xs sm:text-sm mb-1",
                  isSelected ? "text-white" : "text-gray-400"
                )}>
                  {dayInitial}
                </span>
                <span className={cn(
                  "w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base",
                  isSelected ? "text-white" : "text-gray-900",
                  !isSelected && isToday && "bg-gray-100 rounded-full"
                )}>
                  {format(date, 'd')}
                </span>
              </button>
            );
          })}
        </div>
        <button
          onClick={handleNextWeek}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next week"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}