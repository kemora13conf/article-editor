import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createNewBlock } from '../utils/blockDefaults';
import { EditorContext } from '../hooks/useEditor';
import toast from 'react-hot-toast';

const MAX_HISTORY = 50;
const AUTOSAVE_DELAY = 2000;

export const EditorProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const autoSaveTimeout = useRef(null);
  
  // Article metadata
  const [articleMeta, setArticleMeta] = useState({
    title: 'Untitled Article',
    description: '',
    author: '',
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Global container settings
  const [containerSettings, setContainerSettings] = useState({
    maxWidth: '4xl',  // Tailwind max-width class
    padding: '8',     // Tailwind padding value
    backgroundColor: '#ffffff',
    fontFamily: 'inherit',
    fontSize: '16px',
    lineHeight: '1.6',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('article-editor-content');
    const savedMeta = localStorage.getItem('article-editor-meta');
    const savedContainer = localStorage.getItem('article-editor-container');
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBlocks(parsed);
        setHistory([parsed]);
        toast.success('Previous work restored!');
      } catch (error) {
        console.error('Failed to load saved content:', error);
      }
    }
    
    if (savedMeta) {
      try {
        const parsedMeta = JSON.parse(savedMeta);
        setArticleMeta(parsedMeta);
      } catch (error) {
        console.error('Failed to load saved metadata:', error);
      }
    }
    
    if (savedContainer) {
      try {
        const parsedContainer = JSON.parse(savedContainer);
        setContainerSettings(parsedContainer);
      } catch (error) {
        console.error('Failed to load saved container settings:', error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }

    autoSaveTimeout.current = setTimeout(() => {
      if (blocks.length > 0) {
        localStorage.setItem('article-editor-content', JSON.stringify(blocks));
      }
      localStorage.setItem('article-editor-meta', JSON.stringify(articleMeta));
      localStorage.setItem('article-editor-container', JSON.stringify(containerSettings));
    }, AUTOSAVE_DELAY);

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [blocks, articleMeta, containerSettings]);

  // Add to history
  const addToHistory = useCallback((newBlocks) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(newBlocks)));
      return newHistory.slice(-MAX_HISTORY);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setBlocks(JSON.parse(JSON.stringify(history[historyIndex - 1])));
      toast.success('Undo');
    }
  }, [historyIndex, history]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setBlocks(JSON.parse(JSON.stringify(history[historyIndex + 1])));
      toast.success('Redo');
    }
  }, [historyIndex, history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Undo: Cmd/Ctrl + Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y
      else if ((e.metaKey || e.ctrlKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
        e.preventDefault();
        redo();
      }
      // Save: Cmd/Ctrl + S
      else if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        exportArticle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Add a new block
  const addBlock = useCallback((type, position = null) => {
    const newBlock = createNewBlock(type);
    setBlocks((prev) => {
      let newBlocks;
      if (position === null || position >= prev.length) {
        newBlocks = [...prev, newBlock];
      } else {
        newBlocks = [...prev];
        newBlocks.splice(position, 0, newBlock);
      }
      addToHistory(newBlocks);
      return newBlocks;
    });
    return newBlock.id;
  }, [addToHistory]);

  // Update block content
  const updateBlockContent = useCallback((id, content) => {
    const updateRecursive = (blockList) => {
      return blockList.map((block) => {
        if (block.id === id) {
          return { ...block, content };
        }
        if (block.children) {
          return { ...block, children: updateRecursive(block.children) };
        }
        return block;
      });
    };
    setBlocks((prev) => {
      const newBlocks = updateRecursive(prev);
      addToHistory(newBlocks);
      return newBlocks;
    });
  }, [addToHistory]);

  // Update block style
  const updateBlockStyle = useCallback((id, styleKey, value) => {
    const updateRecursive = (blockList) => {
      return blockList.map((block) => {
        if (block.id === id) {
          return {
            ...block,
            styles: { ...block.styles, [styleKey]: value },
          };
        }
        if (block.children) {
          return { ...block, children: updateRecursive(block.children) };
        }
        return block;
      });
    };
    setBlocks((prev) => {
      const newBlocks = updateRecursive(prev);
      addToHistory(newBlocks);
      return newBlocks;
    });
  }, [addToHistory]);

  // Delete block
  const deleteBlock = useCallback((id) => {
    const deleteRecursive = (blockList) => {
      return blockList.filter((block) => {
        if (block.id === id) return false;
        if (block.children) {
          block.children = deleteRecursive(block.children);
        }
        return true;
      });
    };
    setBlocks((prev) => {
      const newBlocks = deleteRecursive(prev);
      addToHistory(newBlocks);
      return newBlocks;
    });
    setSelectedBlock((prev) => (prev === id ? null : prev));
    setShowStylePanel((prev) => (selectedBlock === id ? false : prev));
    toast.success('Block deleted');
  }, [selectedBlock, addToHistory]);

  // Move block up or down
  const moveBlock = useCallback((id, direction) => {
    const moveRecursive = (blockList) => {
      const index = blockList.findIndex((b) => b.id === id);
      if (index === -1) {
        return blockList.map((block) => ({
          ...block,
          children: block.children ? moveRecursive(block.children) : undefined,
        }));
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= blockList.length) return blockList;

      const newBlocks = [...blockList];
      [newBlocks[index], newBlocks[newIndex]] = [
        newBlocks[newIndex],
        newBlocks[index],
      ];
      return newBlocks;
    };
    setBlocks((prev) => {
      const newBlocks = moveRecursive(prev);
      addToHistory(newBlocks);
      return newBlocks;
    });
  }, [addToHistory]);

  // Duplicate block
  const duplicateBlock = useCallback((id) => {
    const findAndDuplicate = (blockList) => {
      for (let i = 0; i < blockList.length; i++) {
        if (blockList[i].id === id) {
          const original = blockList[i];
          const duplicate = JSON.parse(JSON.stringify(original));
          duplicate.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          // Update IDs of children recursively
          const updateChildIds = (block) => {
            if (block.children) {
              block.children = block.children.map((child) => {
                const newChild = { ...child };
                newChild.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                return updateChildIds(newChild);
              });
            }
            return block;
          };
          updateChildIds(duplicate);
          
          const newList = [...blockList];
          newList.splice(i + 1, 0, duplicate);
          return newList;
        }
        if (blockList[i].children) {
          const newChildren = findAndDuplicate(blockList[i].children);
          if (newChildren !== blockList[i].children) {
            const newList = [...blockList];
            newList[i] = { ...newList[i], children: newChildren };
            return newList;
          }
        }
      }
      return blockList;
    };
    
    setBlocks((prev) => {
      const newBlocks = findAndDuplicate(prev);
      addToHistory(newBlocks);
      return newBlocks;
    });
    toast.success('Block duplicated');
  }, [addToHistory]);

  // Add child to flex/section container
  const addChildToContainer = useCallback((parentId, childType) => {
    const addChildRecursive = (blockList) => {
      return blockList.map((block) => {
        if (
          block.id === parentId &&
          (block.type === 'flex' || block.type === 'section')
        ) {
          const newChild = createNewBlock(childType);
          return {
            ...block,
            children: [...(block.children || []), newChild],
          };
        }
        if (block.children) {
          return { ...block, children: addChildRecursive(block.children) };
        }
        return block;
      });
    };
    setBlocks((prev) => addChildRecursive(prev));
  }, []);

  // Find block by id
  const findBlock = useCallback(
    (id) => {
      const searchRecursive = (blockList) => {
        for (const block of blockList) {
          if (block.id === id) return block;
          if (block.children) {
            const found = searchRecursive(block.children);
            if (found) return found;
          }
        }
        return null;
      };
      return searchRecursive(blocks);
    },
    [blocks]
  );

  // Select block and open style panel
  const selectBlock = useCallback((id) => {
    setSelectedBlock(id);
    setShowStylePanel(true);
  }, []);

  // Deselect block
  const deselectBlock = useCallback(() => {
    setSelectedBlock(null);
    setShowStylePanel(false);
  }, []);

  // Update article metadata
  const updateArticleMeta = useCallback((key, value) => {
    setArticleMeta((prev) => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Update container settings
  const updateContainerSettings = useCallback((key, value) => {
    setContainerSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Export article as JSON (with metadata)
  const exportArticle = useCallback(() => {
    const exportData = {
      metadata: articleMeta,
      containerSettings,
      blocks,
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = articleMeta.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    a.download = `${filename}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Article exported successfully!');
  }, [blocks, articleMeta, containerSettings]);

  // Import article from JSON
  const importArticle = useCallback((json) => {
    try {
      const parsed = JSON.parse(json);
      
      // Handle new format with metadata
      if (parsed.metadata && parsed.blocks) {
        setBlocks(parsed.blocks);
        setArticleMeta(parsed.metadata);
        if (parsed.containerSettings) {
          setContainerSettings(parsed.containerSettings);
        }
        addToHistory(parsed.blocks);
      } 
      // Handle old format (just blocks array)
      else if (Array.isArray(parsed)) {
        setBlocks(parsed);
        addToHistory(parsed);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import article:', error);
      toast.error('Failed to import article. Invalid JSON format.');
      return false;
    }
  }, [addToHistory]);

  // Clear all blocks
  const clearAll = useCallback(() => {
    setBlocks([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setArticleMeta({
      title: 'Untitled Article',
      description: '',
      author: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setContainerSettings({
      maxWidth: '4xl',
      padding: '8',
      backgroundColor: '#ffffff',
      fontFamily: 'inherit',
      fontSize: '16px',
      lineHeight: '1.6',
    });
    localStorage.removeItem('article-editor-content');
    localStorage.removeItem('article-editor-meta');
    localStorage.removeItem('article-editor-container');
    toast.success('Canvas cleared');
  }, []);

  // Reorder blocks (for drag and drop)
  const reorderBlocks = useCallback((activeId, overId) => {
    setBlocks((blocks) => {
      const oldIndex = blocks.findIndex((b) => b.id === activeId);
      const newIndex = blocks.findIndex((b) => b.id === overId);

      if (oldIndex === -1 || newIndex === -1) return blocks;

      const newBlocks = [...blocks];
      const [removed] = newBlocks.splice(oldIndex, 1);
      newBlocks.splice(newIndex, 0, removed);

      addToHistory(newBlocks);
      return newBlocks;
    });
  }, [addToHistory]);

  // Change block type (for text blocks)
  const changeBlockType = useCallback((id, newType) => {
    const updateRecursive = (blockList) => {
      return blockList.map((block) => {
        if (block.id === id) {
          return {
            ...block,
            type: newType,
            styles: {
              ...block.styles,
              // Update font size based on new type
              fontSize: newType === 'h1' ? '2.5rem' :
                       newType === 'h2' ? '2rem' :
                       newType === 'h3' ? '1.75rem' :
                       newType === 'h4' ? '1.5rem' :
                       newType === 'h5' ? '1.25rem' :
                       newType === 'h6' ? '1.1rem' :
                       newType === 'caption' ? '0.875rem' : '1rem',
              fontWeight: newType.startsWith('h') ? '700' : newType === 'caption' ? '400' : '400',
              marginBottom: newType.startsWith('h') ? '1rem' : '0.5rem',
            },
          };
        }
        if (block.children) {
          return { ...block, children: updateRecursive(block.children) };
        }
        return block;
      });
    };
    setBlocks((prev) => {
      const newBlocks = updateRecursive(prev);
      addToHistory(newBlocks);
      return newBlocks;
    });
  }, [addToHistory]);

  const value = {
    blocks,
    selectedBlock,
    showStylePanel,
    articleMeta,
    containerSettings,
    addBlock,
    updateBlockContent,
    updateBlockStyle,
    deleteBlock,
    moveBlock,
    duplicateBlock,
    addChildToContainer,
    findBlock,
    selectBlock,
    deselectBlock,
    exportArticle,
    importArticle,
    clearAll,
    setShowStylePanel,
    reorderBlocks,
    changeBlockType,
    setBlocks,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    updateArticleMeta,
    updateContainerSettings,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};
