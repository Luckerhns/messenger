import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onNewChat: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onNewChat }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10 backdrop-blur">
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:dark:ring-blue-400 text-sm placeholder-gray-500"
          />
        </div>
        <button
          onClick={onNewChat}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
          title="New chat"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

