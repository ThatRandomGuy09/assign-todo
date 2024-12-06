'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AddTodoButtonProps {
  onAdd: (text: string, description: string) => void;
}

export function AddTodoButton({ onAdd }: AddTodoButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), description.trim());
      setText('');
      setDescription('');
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className="fixed inset-x-0 bottom-0 p-4 bg-white border-t">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg"
              autoFocus
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              className="w-full px-4 py-2 text-sm sm:text-base border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="fixed bottom-6 right-6 w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
    >
      <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
    </button>
  );
}