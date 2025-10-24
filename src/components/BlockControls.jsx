import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEditor } from "../hooks/useEditor";

const BlockControls = ({ blockId, blockType, dragListeners }) => {
  const { moveBlock, deleteBlock, duplicateBlock, selectBlock } = useEditor();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this block?")) {
      deleteBlock(blockId);
    }
  };

  return (
    <div className="flex items-center gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
      {/* Move Up */}
      <button
        onClick={() => moveBlock(blockId, "up")}
        className="p-1.5 bg-white border border-gray-200 rounded-md hover:border-primary-400 hover:bg-primary-50 active:scale-95 transition-all"
        title="Move up"
        type="button"
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 16 }} className="text-gray-600" />
      </button>

      {/* Move Down */}
      <button
        onClick={() => moveBlock(blockId, "down")}
        className="p-1.5 bg-white border border-gray-200 rounded-md hover:border-primary-400 hover:bg-primary-50 active:scale-95 transition-all"
        title="Move down"
        type="button"
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} className="text-gray-600" />
      </button>

      {/* Drag Handle */}
      <div
        {...dragListeners}
        className="p-1.5 cursor-grab active:cursor-grabbing text-gray-400 hover:text-primary-600 transition-colors"
        title="Drag to reorder"
      >
        <DragIndicatorIcon sx={{ fontSize: 16 }} />
      </div>

      {/* Block Type Label */}
      <span className="flex-1 text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
        {blockType}
      </span>

      {/* Duplicate */}
      <button
        onClick={() => duplicateBlock(blockId)}
        className="p-1.5 bg-white border border-gray-200 rounded-md hover:border-primary-400 hover:bg-primary-50 active:scale-95 transition-all"
        title="Duplicate block"
        type="button"
      >
        <ContentCopyIcon sx={{ fontSize: 16 }} className="text-gray-600" />
      </button>

      {/* Settings */}
      <button
        onClick={() => selectBlock(blockId)}
        className="p-1.5 bg-white border border-gray-200 rounded-md hover:border-primary-400 hover:bg-primary-50 active:scale-95 transition-all"
        title="Style settings"
        type="button"
      >
        <SettingsIcon sx={{ fontSize: 16 }} className="text-gray-600" />
      </button>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="p-1.5 bg-white border border-gray-200 rounded-md hover:border-red-400 hover:bg-red-50 active:scale-95 transition-all"
        title="Delete block"
        type="button"
      >
        <DeleteIcon sx={{ fontSize: 16 }} className="text-gray-600 hover:text-red-600" />
      </button>
    </div>
  );
};

export default BlockControls;
