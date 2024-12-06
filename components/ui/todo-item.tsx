'use client';

import { useState } from 'react';
import { Todo } from '@/lib/store';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string, description: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full mb-2 px-3 py-1.5 border rounded-lg text-sm sm:text-base"
          placeholder="Task title"
          autoFocus
        />
        <input
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-3 px-3 py-1.5 border rounded-lg text-sm sm:text-base"
          placeholder="Description (optional)"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="p-1.5 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleSave}
            className="p-1.5 text-green-500 hover:text-green-700"
          >
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={cn(
            "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
            todo.completed ? "bg-black border-black" : "border-gray-300"
          )}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-sm sm:text-base font-medium break-words",
            todo.completed && "line-through text-gray-500"
          )}>
            {todo.text}
          </h3>
          {todo.description && (
            <p className={cn(
              "text-xs sm:text-sm text-gray-500 mt-1 break-words",
              todo.completed && "line-through"
            )}>
              {todo.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-gray-600"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-gray-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}