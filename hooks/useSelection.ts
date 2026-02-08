
import { useState, useEffect, useCallback } from 'react';
import { KnowledgeNote } from '../types';

export const useSelection = () => {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [notes, setNotes] = useState<KnowledgeNote[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('error_mind_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 3) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      if (rect) {
        setPosition({ x: rect.left + window.scrollX, y: rect.bottom + window.scrollY });
        setSelectedText(text);
        setShowPopup(true);
      }
    } else {
      setShowPopup(false);
    }
  }, []);

  const saveNote = (folder: string, userId: string) => {
    const newNote: KnowledgeNote = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      text: selectedText,
      folder,
      timestamp: Date.now()
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem('error_mind_notes', JSON.stringify(updated));
    setShowPopup(false);
    window.getSelection()?.removeAllRanges();
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return { selectedText, position, showPopup, saveNote, notes, setShowPopup };
};
