import React from 'react';
import { Plus, MessageCircle } from 'lucide-react';

const NewChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-50"
      title="New Secret Chat"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default NewChatButton;

