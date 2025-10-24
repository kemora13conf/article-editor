import React, { useEffect, useState } from 'react';
import { EditorProvider } from './context/EditorContext';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import StylePanel from './components/StylePanel';
import ToastProvider from './components/ToastProvider';
import GlobalSettings from './components/GlobalSettings';
import { preloadPopularFonts } from './utils/googleFonts';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core';
import { useEditor } from './hooks/useEditor';

function AppContent() {
  const { addBlock, reorderBlocks, blocks } = useEditor();
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    if (active.data.current?.type === 'new-block') {
      setActiveType(active.data.current.blockType);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveType(null);
      return;
    }

    // Dragging new block from sidebar
    if (active.data.current?.type === 'new-block') {
      const blockType = active.data.current.blockType;
      
      // Dropping on canvas (at the end)
      if (over.id === 'canvas-droppable') {
        addBlock(blockType);
      } 
      // Dropping on an existing block (insert before it)
      else {
        const overIndex = blocks.findIndex(b => b.id === over.id);
        if (overIndex !== -1) {
          addBlock(blockType, overIndex);
        } else {
          addBlock(blockType);
        }
      }
    } 
    // Reordering existing blocks
    else if (active.id !== over.id && !active.data.current?.type) {
      reorderBlocks(active.id, over.id);
    }

    setActiveId(null);
    setActiveType(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveType(null);
  };

  // Custom collision detection that works for both new and existing blocks
  const customCollisionDetection = (args) => {
    // First check pointer intersection for better precision with new blocks
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // Fallback to rect intersection
    const rectCollisions = rectIntersection(args);
    if (rectCollisions.length > 0) {
      return rectCollisions;
    }

    // Final fallback to closest center
    return closestCenter(args);
  };

  return (
    <>
      <ToastProvider />
      <GlobalSettings />
      <DndContext
        sensors={sensors}
        collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex h-screen overflow-hidden bg-gray-100">
          <Sidebar />
          <Canvas />
          <StylePanel />
        </div>

        <DragOverlay dropAnimation={null}>
          {activeType ? (
            <div className="bg-white border-2 border-primary-500 rounded-lg p-6 shadow-2xl opacity-90">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
                <p className="text-base font-semibold text-gray-700">
                  New {activeType} block
                </p>
              </div>
            </div>
          ) : activeId && blocks.find(b => b.id === activeId) ? (
            <div className="opacity-50 scale-105">
              <div className="bg-white border-2 border-primary-400 rounded-lg p-4 shadow-xl">
                <p className="text-sm font-medium text-gray-600">Moving block...</p>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

function App() {
  useEffect(() => {
    preloadPopularFonts();
  }, []);

  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
}

export default App;
