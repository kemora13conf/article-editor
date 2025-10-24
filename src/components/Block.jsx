import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useEditor } from '../hooks/useEditor';
import BlockControls from './BlockControls';
import CodeBlock from './CodeBlock';

const Block = ({ block, depth = 0 }) => {
  const { updateBlockContent, selectedBlock } = useEditor();
  const isSelected = selectedBlock === block.id;
  const [editingListItem, setEditingListItem] = useState(null);

  // Make block sortable (for reordering existing blocks)
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: block.id,
    data: {
      type: 'existing-block',
    }
  });

  // Make block droppable (for accepting new blocks from sidebar)
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: block.id,
    data: {
      accepts: ['new-block', 'existing-block'],
    }
  });

  // Combine both refs
  const setNodeRef = (node) => {
    setSortableNodeRef(node);
    setDroppableNodeRef(node);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateBlockContent(block.id, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = (accept) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = (e) => {
      if (e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    };
    input.click();
  };

  const renderTextBlock = () => {
    const Tag = block.type === 'paragraph' || block.type === 'caption' ? 'p' : block.type;
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateBlockContent(block.id, e.target.textContent)}
        style={block.styles}
        data-placeholder={`Enter ${block.type} text...`}
        className="outline-none min-h-[1.5em]"
      >
        {block.content}
      </Tag>
    );
  };

  const renderQuote = () => {
    return (
      <blockquote
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateBlockContent(block.id, e.target.textContent)}
        style={block.styles}
        data-placeholder="Enter quote text..."
        className="outline-none min-h-[1.5em]"
      >
        {block.content}
      </blockquote>
    );
  };

  const renderList = () => {
    const ListTag = block.type === 'numbered-list' ? 'ol' : 'ul';
    const items = Array.isArray(block.content) ? block.content : ['Item 1'];

    const addItem = () => {
      updateBlockContent(block.id, [...items, `Item ${items.length + 1}`]);
    };

    const updateItem = (index, value) => {
      const newItems = [...items];
      newItems[index] = value;
      updateBlockContent(block.id, newItems);
    };

    const deleteItem = (index) => {
      if (items.length > 1) {
        const newItems = items.filter((_, i) => i !== index);
        updateBlockContent(block.id, newItems);
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addItem();
      } else if (e.key === 'Backspace' && e.target.textContent === '' && items.length > 1) {
        e.preventDefault();
        deleteItem(index);
      }
    };

    return (
      <div>
        <ListTag style={block.styles} className={block.type === 'numbered-list' ? 'list-decimal' : 'list-disc'}>
          {items.map((item, index) => (
            <li
              key={index}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateItem(index, e.target.textContent)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="outline-none mb-2"
              data-placeholder="List item..."
            >
              {item}
            </li>
          ))}
        </ListTag>
        <button
          onClick={addItem}
          className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          + Add item
        </button>
      </div>
    );
  };

  const renderDivider = () => {
    return <hr style={block.styles} className="border-0" />;
  };

  const renderCodeBlock = () => {
    const codeContent = typeof block.content === 'object' ? block.content : { code: '', language: 'javascript' };
    const { code = '', language = 'javascript' } = codeContent;

    return (
      <CodeBlock
        code={code}
        language={language}
        onCodeChange={(newCode) => updateBlockContent(block.id, { ...codeContent, code: newCode })}
        onLanguageChange={(newLang) => updateBlockContent(block.id, { ...codeContent, language: newLang })}
        styles={block.styles}
      />
    );
  };

  const renderMediaBlock = () => {
    const mediaConfig = {
      image: { icon: ImageIcon, accept: 'image/*', text: 'Click to upload image' },
      video: { icon: VideocamIcon, accept: 'video/*', text: 'Click to upload video' },
      pdf: { icon: DescriptionIcon, accept: 'application/pdf', text: 'Click to upload PDF' },
      file: { icon: DescriptionIcon, accept: '*/*', text: 'Click to upload file' },
    };

    const config = mediaConfig[block.type];
    const Icon = config.icon;

    if (block.content) {
      if (block.type === 'image') {
        return (
          <div className="relative group">
            <img
              src={block.content}
              alt="Uploaded"
              style={block.styles}
              className="rounded-lg shadow-md w-full"
            />
            <button
              onClick={() => triggerFileUpload(config.accept)}
              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ImageIcon sx={{ fontSize: 16 }} className="text-primary-600" />
            </button>
          </div>
        );
      }

      if (block.type === 'video') {
        return (
          <div className="relative group">
            <video
              src={block.content}
              controls
              style={block.styles}
              className="rounded-lg shadow-md w-full"
            />
            <button
              onClick={() => triggerFileUpload(config.accept)}
              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <VideocamIcon sx={{ fontSize: 16 }} className="text-primary-600" />
            </button>
          </div>
        );
      }

      return (
        <div
          style={block.styles}
          className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-lg border-2 border-gray-200"
        >
          <DescriptionIcon sx={{ fontSize: 48 }} className="text-primary-600" />
          <p className="text-sm text-gray-600 font-medium">File uploaded</p>
          <a
            href={block.content}
            download
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            Download File
          </a>
        </div>
      );
    }

    return (
      <div
        onClick={() => triggerFileUpload(config.accept)}
        style={block.styles}
        className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all min-h-[200px] group"
      >
        <Icon sx={{ fontSize: 64 }} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
        <p className="text-gray-600 font-medium group-hover:text-primary-600 transition-colors">{config.text}</p>
      </div>
    );
  };

  const renderContainer = () => {
    const isSection = block.type === 'section';
    return (
      <div
        style={block.styles}
        className={`relative ${
          isSection
            ? 'bg-amber-50 border-2 border-amber-300'
            : 'bg-gray-50 border-2 border-dashed border-gray-300'
        } rounded-lg p-4 min-h-[150px]`}
      >
        <div
          className={block.type === 'flex' ? 'flex' : 'space-y-4'}
          style={{
            flexDirection: block.type === 'flex' ? block.styles.flexDirection : undefined,
            gap: block.type === 'flex' ? block.styles.gap : undefined,
          }}
        >
          {block.children && block.children.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {block.children.map((child) => (
                <Block key={child.id} block={child} depth={depth + 1} />
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 italic text-sm mb-2">
                Empty {block.type}
              </p>
              <p className="text-gray-500 text-xs">
                Click the settings icon and use "Add Child Block" to add content
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const isTextBlock = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'paragraph', 'caption'].includes(block.type);
    const isMediaBlock = ['image', 'video', 'pdf', 'file'].includes(block.type);
    const isContainer = ['flex', 'section'].includes(block.type);

    if (isTextBlock) return renderTextBlock();
    if (block.type === 'quote') return renderQuote();
    if (block.type === 'list' || block.type === 'numbered-list') return renderList();
    if (block.type === 'code') return renderCodeBlock();
    if (block.type === 'divider') return renderDivider();
    if (isMediaBlock) return renderMediaBlock();
    if (isContainer) return renderContainer();
    return null;
  };

  return (
    <div
      ref={setNodeRef}
      style={{...style, marginLeft: depth > 0 ? '1rem' : '0' }}
      {...attributes}
      className={`group relative mb-4 p-3 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-primary-400 bg-primary-50 shadow-lg'
          : isOver
          ? 'border-primary-300 bg-primary-50/30 border-dashed'
          : 'border-transparent hover:border-gray-200 hover:bg-gray-50/50'
      }`}
    >
      {isOver && (
        <div className="absolute -top-2 left-0 right-0 h-1 bg-primary-500 rounded-full shadow-lg z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full"></div>
        </div>
      )}
      <BlockControls
        blockId={block.id}
        blockType={block.type}
        dragListeners={listeners}
      />
      {renderContent()}
    </div>
  );
};

export default Block;
