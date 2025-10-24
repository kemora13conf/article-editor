import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import PaletteIcon from '@mui/icons-material/Palette';
import { useEditor } from '../hooks/useEditor';

const GlobalSettings = () => {
  const { articleMeta, containerSettings, updateArticleMeta, updateContainerSettings } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metadata'); // 'metadata' or 'container'

  const maxWidthOptions = [
    { value: 'sm', label: 'Small (640px)' },
    { value: 'md', label: 'Medium (768px)' },
    { value: 'lg', label: 'Large (1024px)' },
    { value: 'xl', label: 'Extra Large (1280px)' },
    { value: '2xl', label: '2X Large (1536px)' },
    { value: '4xl', label: '4X Large (2560px)' },
    { value: 'full', label: 'Full Width' },
  ];

  const paddingOptions = [
    { value: '0', label: 'None' },
    { value: '2', label: 'Small' },
    { value: '4', label: 'Medium' },
    { value: '8', label: 'Large' },
    { value: '12', label: 'Extra Large' },
  ];

  const fontFamilyOptions = [
    { value: 'inherit', label: 'System Default' },
    { value: "'Inter', sans-serif", label: 'Inter' },
    { value: "'Roboto', sans-serif", label: 'Roboto' },
    { value: "'Open Sans', sans-serif", label: 'Open Sans' },
    { value: "'Lato', sans-serif", label: 'Lato' },
    { value: "'Poppins', sans-serif", label: 'Poppins' },
    { value: "'Montserrat', sans-serif", label: 'Montserrat' },
    { value: "Georgia, serif", label: 'Georgia' },
    { value: "'Times New Roman', serif", label: 'Times New Roman' },
    { value: "'Courier New', monospace", label: 'Courier New' },
  ];

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTag = e.target.value.trim();
      if (!articleMeta.tags.includes(newTag)) {
        updateArticleMeta('tags', [...articleMeta.tags, newTag]);
      }
      e.target.value = '';
    }
  };

  const handleTagRemove = (tagToRemove) => {
    updateArticleMeta('tags', articleMeta.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
        title="Global Settings"
      >
        <SettingsIcon />
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <div className="flex items-center gap-3">
                  <SettingsIcon />
                  <h2 className="text-xl font-bold">Global Settings</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('metadata')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
                    activeTab === 'metadata'
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ArticleIcon sx={{ fontSize: 20 }} />
                  Article Info
                </button>
                <button
                  onClick={() => setActiveTab('container')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
                    activeTab === 'container'
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <PaletteIcon sx={{ fontSize: 20 }} />
                  Container Style
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'metadata' ? (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        value={articleMeta.title}
                        onChange={(e) => updateArticleMeta('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter article title"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={articleMeta.description}
                        onChange={(e) => updateArticleMeta('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Brief description of your article"
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={articleMeta.author}
                        onChange={(e) => updateArticleMeta('author', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Author name"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {articleMeta.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              onClick={() => handleTagRemove(tag)}
                              className="hover:text-primary-900"
                            >
                              <CloseIcon sx={{ fontSize: 14 }} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        onKeyDown={handleTagAdd}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Type and press Enter to add tags"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        <strong>Created:</strong> {new Date(articleMeta.createdAt).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <strong>Last Updated:</strong> {new Date(articleMeta.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Max Width */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Container Width
                      </label>
                      <select
                        value={containerSettings.maxWidth}
                        onChange={(e) => updateContainerSettings('maxWidth', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {maxWidthOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Padding */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Container Padding
                      </label>
                      <select
                        value={containerSettings.padding}
                        onChange={(e) => updateContainerSettings('padding', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {paddingOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Background Color */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={containerSettings.backgroundColor}
                          onChange={(e) => updateContainerSettings('backgroundColor', e.target.value)}
                          className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={containerSettings.backgroundColor}
                          onChange={(e) => updateContainerSettings('backgroundColor', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    {/* Font Family */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Font Family
                      </label>
                      <select
                        value={containerSettings.fontFamily}
                        onChange={(e) => updateContainerSettings('fontFamily', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {fontFamilyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Base Font Size
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="12"
                          max="24"
                          value={parseInt(containerSettings.fontSize)}
                          onChange={(e) => updateContainerSettings('fontSize', `${e.target.value}px`)}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {containerSettings.fontSize}
                        </span>
                      </div>
                    </div>

                    {/* Line Height */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Line Height
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1"
                          max="2.5"
                          step="0.1"
                          value={containerSettings.lineHeight}
                          onChange={(e) => updateContainerSettings('lineHeight', e.target.value)}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {containerSettings.lineHeight}
                        </span>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="pt-4 border-t border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preview
                      </label>
                      <div
                        className="p-4 rounded-lg border-2 border-gray-200"
                        style={{
                          backgroundColor: containerSettings.backgroundColor,
                          fontFamily: containerSettings.fontFamily,
                          fontSize: containerSettings.fontSize,
                          lineHeight: containerSettings.lineHeight,
                        }}
                      >
                        <p>This is how your article text will look.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSettings;
