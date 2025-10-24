import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import PaletteIcon from '@mui/icons-material/Palette';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddIcon from '@mui/icons-material/Add';
import StraightenIcon from '@mui/icons-material/Straighten';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BrushIcon from '@mui/icons-material/Brush';
import ImageIcon from '@mui/icons-material/Image';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useEditor } from "../hooks/useEditor";
import FontSelector from "./FontSelector";
import { blockTypes } from "../utils/blockTypes";

const StylePanel = () => {
  const {
    showStylePanel,
    setShowStylePanel,
    selectedBlock,
    findBlock,
    updateBlockStyle,
    addChildToContainer,
    changeBlockType,
  } = useEditor();
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showChildMenu, setShowChildMenu] = useState(false);

  if (!showStylePanel || !selectedBlock) return null;

  const block = findBlock(selectedBlock);
  if (!block) return null;

  const isContainer = block.type === "flex" || block.type === "section";
  const isTextBlock = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "paragraph",
    "caption",
  ].includes(block.type);

  const textBlockTypes = [
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "h4", label: "Heading 4" },
    { value: "h5", label: "Heading 5" },
    { value: "h6", label: "Heading 6" },
    { value: "paragraph", label: "Paragraph" },
    { value: "caption", label: "Caption" },
  ];

  const styleGroups = [
    {
      title: "Dimensions",
      icon: StraightenIcon,
      styles: [
        {
          key: "width",
          label: "Width",
          type: "text",
          placeholder: "auto, 100%, 500px",
        },
        {
          key: "maxWidth",
          label: "Max Width",
          type: "text",
          placeholder: "100%",
        },
        { key: "height", label: "Height", type: "text", placeholder: "auto" },
        {
          key: "maxHeight",
          label: "Max Height",
          type: "text",
          placeholder: "none",
        },
      ],
    },
    {
      title: "Typography",
      icon: FormatSizeIcon,
      styles: [
        {
          key: "fontFamily",
          label: "Font Family",
          type: "font",
          placeholder: "Click to select font",
        },
        {
          key: "fontSize",
          label: "Font Size",
          type: "text",
          placeholder: "16px, 1rem, 1.5em",
        },
        {
          key: "fontWeight",
          label: "Font Weight",
          type: "select",
          options: [
            { value: "100", label: "Thin (100)" },
            { value: "200", label: "Extra Light (200)" },
            { value: "300", label: "Light (300)" },
            { value: "400", label: "Regular (400)" },
            { value: "500", label: "Medium (500)" },
            { value: "600", label: "Semi Bold (600)" },
            { value: "700", label: "Bold (700)" },
            { value: "800", label: "Extra Bold (800)" },
            { value: "900", label: "Black (900)" },
          ],
        },
        { key: "color", label: "Text Color", type: "color" },
        {
          key: "lineHeight",
          label: "Line Height",
          type: "text",
          placeholder: "1.5, 24px",
        },
        {
          key: "textAlign",
          label: "Text Align",
          type: "select",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
            { value: "justify", label: "Justify" },
          ],
        },
      ],
    },
    {
      title: "Spacing",
      icon: SpaceBarIcon,
      styles: [
        {
          key: "marginTop",
          label: "Margin Top",
          type: "text",
          placeholder: "0, 1rem, 16px",
        },
        { key: "marginBottom", label: "Margin Bottom", type: "text" },
        { key: "marginLeft", label: "Margin Left", type: "text" },
        { key: "marginRight", label: "Margin Right", type: "text" },
        { key: "paddingTop", label: "Padding Top", type: "text" },
        { key: "paddingBottom", label: "Padding Bottom", type: "text" },
        { key: "paddingLeft", label: "Padding Left", type: "text" },
        { key: "paddingRight", label: "Padding Right", type: "text" },
      ],
    },
    {
      title: "Layout",
      icon: ViewModuleIcon,
      styles: [
        {
          key: "display",
          label: "Display",
          type: "select",
          options: [
            { value: "block", label: "Block" },
            { value: "flex", label: "Flex" },
            { value: "inline-block", label: "Inline Block" },
            { value: "inline", label: "Inline" },
            { value: "grid", label: "Grid" },
          ],
        },
        {
          key: "flexDirection",
          label: "Flex Direction",
          type: "select",
          options: [
            { value: "row", label: "Row" },
            { value: "column", label: "Column" },
            { value: "row-reverse", label: "Row Reverse" },
            { value: "column-reverse", label: "Column Reverse" },
          ],
        },
        { key: "gap", label: "Gap", type: "text", placeholder: "1rem, 16px" },
        {
          key: "alignItems",
          label: "Align Items",
          type: "select",
          options: [
            { value: "flex-start", label: "Start" },
            { value: "center", label: "Center" },
            { value: "flex-end", label: "End" },
            { value: "stretch", label: "Stretch" },
            { value: "baseline", label: "Baseline" },
          ],
        },
        {
          key: "justifyContent",
          label: "Justify Content",
          type: "select",
          options: [
            { value: "flex-start", label: "Start" },
            { value: "center", label: "Center" },
            { value: "flex-end", label: "End" },
            { value: "space-between", label: "Space Between" },
            { value: "space-around", label: "Space Around" },
            { value: "space-evenly", label: "Space Evenly" },
          ],
        },
        {
          key: "flexWrap",
          label: "Flex Wrap",
          type: "select",
          options: [
            { value: "nowrap", label: "No Wrap" },
            { value: "wrap", label: "Wrap" },
            { value: "wrap-reverse", label: "Wrap Reverse" },
          ],
        },
      ],
    },
    {
      title: "Visual",
      icon: BrushIcon,
      styles: [
        { key: "backgroundColor", label: "Background Color", type: "color" },
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "text",
          placeholder: "0, 4px, 0.5rem",
        },
        {
          key: "border",
          label: "Border",
          type: "text",
          placeholder: "1px solid #ccc",
        },
        {
          key: "boxShadow",
          label: "Box Shadow",
          type: "text",
          placeholder: "0 2px 4px rgba(0,0,0,0.1)",
        },
        {
          key: "opacity",
          label: "Opacity",
          type: "text",
          placeholder: "1, 0.5",
        },
      ],
    },
    {
      title: "Media",
      icon: ImageIcon,
      styles: [
        {
          key: "objectFit",
          label: "Object Fit",
          type: "select",
          options: [
            { value: "contain", label: "Contain" },
            { value: "cover", label: "Cover" },
            { value: "fill", label: "Fill" },
            { value: "none", label: "None" },
            { value: "scale-down", label: "Scale Down" },
          ],
        },
        {
          key: "objectPosition",
          label: "Object Position",
          type: "text",
          placeholder: "center, top left",
        },
      ],
    },
  ];

  const renderStyleInput = (style) => {
    const value = block.styles[style.key] || "";

    if (style.type === "font") {
      return (
        <button
          onClick={() => setShowFontSelector(true)}
          className="w-full px-3 py-2 text-sm text-left border border-gray-300 rounded-lg hover:border-primary-400 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-white flex items-center justify-between group"
        >
          <span className="truncate" style={{ fontFamily: value || "inherit" }}>
            {value || "Select a font..."}
          </span>
          <TextFieldsIcon sx={{ fontSize: 16 }} className="text-gray-400 group-hover:text-primary-500 flex-shrink-0" />
        </button>
      );
    }

    if (style.type === "select") {
      return (
        <select
          value={value}
          onChange={(e) =>
            updateBlockStyle(block.id, style.key, e.target.value)
          }
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
        >
          {style.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (style.type === "color") {
      return (
        <div className="flex gap-2">
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) =>
              updateBlockStyle(block.id, style.key, e.target.value)
            }
            className="w-14 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) =>
              updateBlockStyle(block.id, style.key, e.target.value)
            }
            placeholder="#000000"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all font-mono"
          />
        </div>
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => updateBlockStyle(block.id, style.key, e.target.value)}
        placeholder={style.placeholder || "auto"}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
      />
    );
  };

  return (
    <>
      <AnimatePresence>
        <motion.aside
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="w-96 bg-white border-l border-gray-200 flex flex-col h-screen overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <PaletteIcon sx={{ fontSize: 24 }} />
                <h2 className="text-xl font-bold">Style Editor</h2>
              </div>
              <button
                onClick={() => setShowStylePanel(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
            <p className="text-primary-50 text-sm">
              Editing: <span className="font-semibold">{block.type}</span>
            </p>
          </div>

          {/* Block Type Switcher (for text blocks) */}
          {isTextBlock && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <SyncAltIcon sx={{ fontSize: 18 }} />
                Change Block Type
              </h3>
              <select
                value={block.type}
                onChange={(e) => changeBlockType(block.id, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all bg-white"
              >
                {textBlockTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Content Management Section (for containers) */}
          {isContainer && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <InventoryIcon sx={{ fontSize: 18 }} />
                  Content Management
                </h3>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  {block.children?.length || 0}{" "}
                  {block.children?.length === 1 ? "child" : "children"}
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowChildMenu(!showChildMenu)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 active:scale-95 transition-all shadow-sm"
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                  Add Child Block
                </button>
                <AnimatePresence>
                  {showChildMenu && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowChildMenu(false)}
                      />
                      {/* Menu */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-80 overflow-y-auto"
                      >
                        {blockTypes
                          .filter((bt) => bt.type !== "section")
                          .map((bt) => (
                            <button
                              key={bt.type}
                              onClick={() => {
                                addChildToContainer(block.id, bt.type);
                                setShowChildMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                            >
                              <div className="p-1.5 bg-primary-50 rounded-md">
                                <bt.icon className="w-4 h-4 text-primary-600" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-700">
                                  {bt.label}
                                </div>
                                <div className="text-xs text-gray-500 capitalize">
                                  {bt.category}
                                </div>
                              </div>
                            </button>
                          ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Style Groups */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {styleGroups.map((group, index) => {
              const GroupIcon = group.icon;
              return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <GroupIcon sx={{ fontSize: 18 }} />
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.styles.map((style) => (
                    <div key={style.key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        {style.label}
                      </label>
                      {renderStyleInput(style)}
                    </div>
                  ))}
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setShowStylePanel(false)}
              className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg active:scale-[0.98] transition-all"
            >
              Done Editing
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Font Selector Modal */}
      <AnimatePresence>
        {showFontSelector && (
          <FontSelector
            value={block.styles.fontFamily || "inherit"}
            onChange={(font) => {
              updateBlockStyle(block.id, "fontFamily", font);
              setShowFontSelector(false);
            }}
            onClose={() => setShowFontSelector(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StylePanel;
