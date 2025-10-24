import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useDraggable } from '@dnd-kit/core';
import { useEditor } from "../hooks/useEditor";
import { blockTypesByCategory } from "../utils/blockTypes";
import toast from 'react-hot-toast';

// Draggable Block Button Component
const DraggableBlockButton = ({ blockType }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${blockType.type}`,
    data: {
      type: 'new-block',
      blockType: blockType.type,
    },
  });

  const BlockIcon = blockType.icon;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left rounded-lg border border-transparent hover:bg-gray-50 hover:border-gray-200 active:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="p-1.5 bg-primary-50 rounded-md">
        <BlockIcon sx={{ fontSize: 16 }} className="text-primary-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">
        {blockType.label}
      </span>
    </button>
  );
};

const Sidebar = () => {
  const { exportArticle, importArticle, clearAll, undo, redo, canUndo, canRedo, blocks, articleMeta, containerSettings } = useEditor();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handlePreview = () => {
    // Save current state to localStorage for preview
    const articleData = {
      metadata: articleMeta,
      containerSettings,
      blocks,
    };
    localStorage.setItem('article-preview', JSON.stringify(articleData));
    
    // Navigate to preview page
    navigate('/preview', { state: { article: articleData } });
    toast.success('Opening preview...');
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const success = importArticle(event.target.result);
          if (success) {
            toast.success("Article imported successfully!");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClear = () => {
    if (blocks.length === 0) {
      toast.error('Canvas is already empty');
      return;
    }
    
    if (window.confirm('Are you sure you want to clear all blocks? This cannot be undone.')) {
      clearAll();
    }
  };

  const categories = Object.keys(blockTypesByCategory);
  const categoryConfig = {
    text: { label: "Text Elements", icon: TextFieldsIcon },
    media: { label: "Media", icon: ImageIcon },
    layout: { label: "Layout", icon: ViewModuleIcon },
    code: { label: "Code", icon: CodeIcon },
  };

  // Filter blocks based on search query
  const filteredCategories = categories.reduce((acc, category) => {
    const filteredBlocks = blockTypesByCategory[category].filter((block) =>
      block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredBlocks.length > 0) {
      acc[category] = filteredBlocks;
    }
    return acc;
  }, {});

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <AutoAwesomeIcon sx={{ fontSize: 24 }} />
          <h1 className="text-2xl font-bold">Article Editor</h1>
        </div>
        <p className="text-primary-50 text-sm">
          Drag & drop to build content
        </p>
      </div>

      {/* Undo/Redo Controls */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
              canUndo
                ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Undo (Cmd/Ctrl + Z)"
          >
            <UndoIcon sx={{ fontSize: 18 }} />
            <span className="text-sm">Undo</span>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
              canRedo
                ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Redo (Cmd/Ctrl + Shift + Z)"
          >
            <RedoIcon sx={{ fontSize: 18 }} />
            <span className="text-sm">Redo</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
          )}
        </div>
      </div>

      {/* Block Types */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.keys(filteredCategories).length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <SearchIcon sx={{ fontSize: 48 }} className="mb-2" />
            <p className="text-sm">No blocks found</p>
          </div>
        ) : (
          Object.keys(filteredCategories).map((category) => {
            const CategoryIcon = categoryConfig[category].icon;
            return (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                  <CategoryIcon sx={{ fontSize: 14 }} />
                  {categoryConfig[category].label}
                </h3>
                <div className="space-y-1">
                  {filteredCategories[category].map((blockType) => (
                    <DraggableBlockButton key={blockType.type} blockType={blockType} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2 bg-gray-50">
        <button
          onClick={handlePreview}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <VisibilityIcon sx={{ fontSize: 16 }} />
          Preview Article
        </button>
        <button
          onClick={exportArticle}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <DownloadIcon sx={{ fontSize: 16 }} />
          Export Article
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleImport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <UploadIcon sx={{ fontSize: 16 }} />
            Import
          </button>
          <button
            onClick={handleClear}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-red-200 text-red-600 rounded-lg font-medium hover:border-red-300 hover:bg-red-50 active:scale-[0.98] transition-all"
          >
            <DeleteSweepIcon sx={{ fontSize: 16 }} />
            Clear
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
