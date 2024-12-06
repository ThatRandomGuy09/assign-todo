'use client';

import { useState } from 'react';
import { CalendarHeader } from '@/components/ui/calendar-header';
import { TodoList } from '@/components/todo/todo-list';
import { AddTodoButton } from '@/components/ui/add-todo-button';
import { useTodoStore } from '@/lib/store';
import { format } from 'date-fns';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const todaysTodos = todos.filter(
    (todo) => todo.date === format(selectedDate, 'yyyy-MM-dd')
  );

  const handleAddTodo = (text: string, description: string) => {
    addTodo({
      text,
      description,
      completed: false,
      date: format(selectedDate, 'yyyy-MM-dd'),
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <CalendarHeader 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate}
        />
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 px-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <TodoList
            todos={todaysTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
        <AddTodoButton onAdd={handleAddTodo} />
      </div>
    </main>
  );
}