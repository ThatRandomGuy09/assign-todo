'use client';

import { TodoItem } from '@/components/ui/todo-item';
import { Todo } from '@/lib/store';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, description: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 px-4">
        <p className="text-sm sm:text-base">No tasks for today. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(text, description) => onEdit(todo.id, text, description)}
        />
      ))}
    </div>
  );
}