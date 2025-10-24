import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DescriptionIcon from '@mui/icons-material/Description';
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEditor } from "../hooks/useEditor";
import Block from "./Block";

const Canvas = () => {
  const { blocks, containerSettings, articleMeta } = useEditor();

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable',
  });

  const maxWidthClass = `max-w-${containerSettings.maxWidth}`;
  const paddingClass = `p-${containerSettings.padding}`;

  return (
    <div 
      className="flex-1 overflow-y-auto bg-gradient-to-br from-primary-50 via-white to-secondary-50"
      style={{
        fontFamily: containerSettings.fontFamily,
        fontSize: containerSettings.fontSize,
        lineHeight: containerSettings.lineHeight,
      }}
    >
      <div className={`${maxWidthClass} mx-auto ${paddingClass}`}>
        <motion.div
          ref={setNodeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ backgroundColor: containerSettings.backgroundColor }}
          className={`rounded-2xl shadow-2xl ${paddingClass} min-h-[600px] transition-all ${
            isOver ? 'ring-4 ring-primary-400 ring-opacity-50' : ''
          }`}
        >
          {/* Canvas Header with Article Title */}
          <div className="mb-8 pb-6 border-b-2 border-gray-100">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              {articleMeta.title}
            </motion.h1>
            {articleMeta.author && (
              <p className="text-sm text-gray-600 mb-1">
                By <span className="font-medium">{articleMeta.author}</span>
              </p>
            )}
            {articleMeta.description && (
              <p className="text-gray-600 mb-2">{articleMeta.description}</p>
            )}
            {articleMeta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {articleMeta.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm mt-3"
            >
              {blocks.length === 0
                ? "Drag blocks here to start building"
                : `${blocks.length} block${
                    blocks.length !== 1 ? "s" : ""
                  } in your article`}
            </motion.p>
          </div>

          {/* Empty State */}
          {blocks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 p-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full">
                <DescriptionIcon sx={{ fontSize: 64 }} className="text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Start Creating
              </h3>
              <p className="text-gray-500 max-w-md mb-4">
                Drag and drop blocks from the sidebar to begin building your article.
              </p>
              <p className="text-primary-600 font-medium text-sm">
                ← Drag any block type here
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    1
                  </div>
                  <span>Drag a block</span>
                </div>
                <div className="text-gray-400">→</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    2
                  </div>
                  <span>Add content</span>
                </div>
                <div className="text-gray-400">→</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                    3
                  </div>
                  <span>Style it</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Blocks with sorting */
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-0">
                <AnimatePresence mode="popLayout">
                  {blocks.map((block) => (
                    <Block key={block.id} block={block} />
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Drop zone indicator at the end */}
              {isOver && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-6 border-2 border-dashed border-primary-400 bg-primary-50 rounded-lg flex items-center justify-center"
                >
                  <p className="text-primary-600 font-medium">Drop here to add at the end</p>
                </motion.div>
              )}
            </SortableContext>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Canvas;
