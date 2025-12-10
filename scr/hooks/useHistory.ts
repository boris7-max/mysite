import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  text: string;
  type: 'standoff' | 'md5' | 'link';
  timestamp: number;
}

const STORAGE_KEY = 'multitool_history';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveHistory = (items: HistoryItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setHistory(items);
  };

  const addToHistory = (text: string, type: HistoryItem['type']) => {
    if (!text.trim()) return;
    
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      text: text.trim(),
      type,
      timestamp: Date.now(),
    };
    
    const updated = [newItem, ...history].slice(0, 100); // Keep last 100 items
    saveHistory(updated);
  };

  const removeFromHistory = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    saveHistory(updated);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const refreshHistory = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    refreshHistory,
  };
};
