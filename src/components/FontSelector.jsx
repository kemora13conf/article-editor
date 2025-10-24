import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { GOOGLE_FONTS, SYSTEM_FONTS, loadGoogleFont, getFontValue } from '../utils/googleFonts';

const FontSelector = ({ value, onChange, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadingFont, setLoadingFont] = useState(null);

  const allFonts = useMemo(() => {
    return [
      ...SYSTEM_FONTS.map(f => ({ ...f, isSystem: true })),
      ...GOOGLE_FONTS.map(f => ({ ...f, isSystem: false }))
    ];
  }, []);

  const filteredFonts = useMemo(() => {
    let fonts = allFonts;

    // Filter by category
    if (selectedCategory !== 'all') {
      fonts = fonts.filter(f => f.category === selectedCategory);
    }

    // Filter by search
    if (search) {
      fonts = fonts.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return fonts;
  }, [allFonts, selectedCategory, search]);

  const categories = [
    { id: 'all', label: 'All Fonts' },
    { id: 'system', label: 'System' },
    { id: 'sans-serif', label: 'Sans Serif' },
    { id: 'serif', label: 'Serif' },
    { id: 'monospace', label: 'Monospace' },
    { id: 'display', label: 'Display' },
  ];

  const handleFontSelect = async (font) => {
    if (!font.isSystem) {
      setLoadingFont(font.name);
      try {
        await loadGoogleFont(font.name, font.weight || [400]);
      } catch (error) {
        console.error('Failed to load font:', error);
      }
      setLoadingFont(null);
    }

    const fontValue = getFontValue(font.name);
    onChange(fontValue);
  };

  const getCurrentFontName = () => {
    // Try to extract font name from value
    const match = value.match(/^["']?([^,"']+)["']?/);
    return match ? match[1] : 'System UI';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Select Font</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CloseIcon sx={{ fontSize: 20 }} className="text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon sx={{ fontSize: 20 }} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fonts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {filteredFonts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No fonts found matching "{search}"</p>
              </div>
            ) : (
              filteredFonts.map((font) => (
                <FontItem
                  key={font.name}
                  font={font}
                  isSelected={getCurrentFontName() === font.name}
                  isLoading={loadingFont === font.name}
                  onSelect={() => handleFontSelect(font)}
                />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-sm text-gray-600">
            Current font: <span className="font-semibold">{getCurrentFontName()}</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FontItem = ({ font, isSelected, isLoading, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(font.isSystem);

  useEffect(() => {
    if (!font.isSystem && !isLoaded) {
      loadGoogleFont(font.name, [400])
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(false));
    }
  }, [font, isLoaded]);

  const fontStyle = font.isSystem
    ? { fontFamily: font.value }
    : isLoaded
    ? { fontFamily: `"${font.name}", ${font.category}` }
    : {};

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      disabled={isLoading}
      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">{font.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {font.category}
            </span>
            {font.isSystem && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                System
              </span>
            )}
          </div>
          <p
            style={fontStyle}
            className="text-lg text-gray-700 leading-tight"
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        {isSelected && (
          <CheckIcon sx={{ fontSize: 20 }} className="text-primary-500 flex-shrink-0 ml-2" />
        )}
        {isLoading && (
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin flex-shrink-0 ml-2" />
        )}
      </div>
    </motion.button>
  );
};

export default FontSelector;
