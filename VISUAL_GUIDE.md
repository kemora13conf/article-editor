# 🎯 Visual Location Guide

## Where to Find Everything

### 1. Global Settings (Article Metadata)

**Location**: Bottom-right corner of screen
```
                                    Screen
┌─────────────────────────────────────────────┐
│  Sidebar    Canvas          Style Panel     │
│  [blocks]   [content]       [styles]        │
│                                             │
│                                             │
│                                             │
│                                             │
│                                             │
│                                         ⚙️  │ ← Click this gear icon!
└─────────────────────────────────────────────┘
```

**Opens**:
```
┌──────────────────────────┐
│ ⚙️ Global Settings    X  │
├────────────┬─────────────┤
│ Article    │ Container   │
│ Info ✓     │ Style       │
├────────────┴─────────────┤
│                          │
│  Article Title *         │
│  [Enter title...]        │
│                          │
│  Description             │
│  [Enter description...]  │
│                          │
│  Author                  │
│  [Enter author...]       │
│                          │
│  Tags                    │
│  [Press Enter to add]    │
│                          │
└──────────────────────────┘
```

---

### 2. Preview Button

**Location**: Top of Sidebar actions
```
┌─────────────────┐
│  Sidebar        │
│                 │
│  [Search...]    │
│                 │
│  Text Elements  │
│  • H1           │
│  • H2           │
│  • Paragraph    │
│                 │
│  Media          │
│  • Image        │
│  • Video        │
│                 │
│  Code           │
│  • Code Block   │
│                 │
├─────────────────┤
│ 👁️ Preview     │ ← Click here!
│ Article         │
│                 │
│ 💾 Export       │
│ Article         │
│                 │
│ 📥 Import       │
└─────────────────┘
```

---

### 3. Canvas with Metadata Display

**Before Setting Metadata**:
```
┌────────────────────────────┐
│  Your Article              │
│                            │
│  0 blocks in your article  │
│  ───────────────────────   │
│                            │
│  [Empty canvas]            │
└────────────────────────────┘
```

**After Setting Metadata**:
```
┌────────────────────────────────────┐
│  How to Use React Hooks            │ ← Your Title
│  By John Doe                       │ ← Author
│  A comprehensive guide...          │ ← Description  
│  #react #hooks #tutorial           │ ← Tags
│                                    │
│  3 blocks in your article          │
│  ──────────────────────────────    │
│                                    │
│  [H1] Introduction                 │
│  Lorem ipsum...                    │
│                                    │
│  [CODE] JavaScript                 │
│  function example() {...}          │
└────────────────────────────────────┘
```

---

### 4. Preview Page Layout

**Full Page View**:
```
┌─────────────────────────────────────────────┐
│  Article Preview          [← Back to Editor]│ ← Header
├─────────────────────────────────────────────┤
│                                             │
│        📄 Article Content Area              │
│                                             │
│   ┌──────────────────────────────────┐     │
│   │                                  │     │
│   │  How to Use React Hooks          │     │ ← Title (big)
│   │  By John Doe                     │     │
│   │  A comprehensive guide...        │     │
│   │  #react #hooks #tutorial         │     │
│   │  Published: Oct 24, 2025         │     │
│   │  ──────────────────────────────  │     │
│   │                                  │     │
│   │  Introduction                    │     │
│   │  This is the introduction...     │     │
│   │                                  │     │
│   │  [CODE BLOCK]                    │     │
│   │  function useState() {           │     │
│   │    return [state, setState];     │     │
│   │  }                               │     │
│   │                                  │     │
│   │  Key Concepts                    │     │
│   │  • Hook rules                    │     │
│   │  • State management              │     │
│   │                                  │     │
│   └──────────────────────────────────┘     │
│                                             │
│     Created with Article Editor            │ ← Footer
└─────────────────────────────────────────────┘
```

---

## Step-by-Step Usage Flow

### Setting Up Article:

```
1. Open App
      ↓
2. Click ⚙️ gear icon (bottom-right)
      ↓
3. "Article Info" tab opens
      ↓
4. Set Title: "Your Article Title"
      ↓
5. Set Author: "Your Name"
      ↓
6. Add Tags: Type + press Enter
      ↓
7. Switch to "Container Style" tab
      ↓
8. Adjust Width: Select from dropdown
      ↓
9. Choose Font: Select from dropdown
      ↓
10. Close panel (click X or backdrop)
      ↓
11. See metadata on canvas! ✨
```

### Creating & Previewing:

```
1. Drag blocks from sidebar
      ↓
2. Add content (text, code, images)
      ↓
3. Style individual blocks (⚙️ on each block)
      ↓
4. Click "Preview Article" (green button)
      ↓
5. Preview page opens
      ↓
6. See beautiful rendered article
      ↓
7. Click "← Back to Editor"
      ↓
8. Continue editing
      ↓
9. Export when done
```

---

## Button Colors & Meanings

```
Sidebar Buttons:

🟢 Preview Article     ← Green (view/preview)
🔵 Export Article      ← Blue gradient (main action)
⚪ Import              ← White (secondary action)
🔴 Clear               ← Red (destructive action)
⚪ Undo/Redo           ← White (utility)
```

```
Settings Panel:

[Article Info] ← Tab 1 (selected = blue)
[Container Style] ← Tab 2 (selected = blue)
```

---

## Interactive Elements Map

### Sidebar:
- **Search box** → Filter blocks in real-time
- **Block cards** → Drag to canvas
- **Undo/Redo** → Click or use shortcuts
- **Preview** → Opens new page
- **Export** → Downloads JSON
- **Import** → Opens file picker
- **Clear** → Confirms then clears all

### Canvas:
- **Block hover** → Shows controls (↑↓ ⋮⋮ 📋 ⚙️ 🗑️)
- **Block click** → Edit content
- **Empty area** → Drop zone for new blocks
- **Between blocks** → Blue line shows insert position

### Settings Panel:
- **Tabs** → Switch between Article Info & Container Style
- **Inputs** → Type to update (auto-saves)
- **Tag input** → Press Enter to add tag
- **Tag X** → Click to remove tag
- **Color picker** → Click to choose color
- **Sliders** → Drag to adjust values
- **Dropdowns** → Click to select options
- **Preview box** → See font changes live

### Preview Page:
- **Back button** → Returns to editor
- **Scroll** → Header stays visible
- **All content** → Fully rendered and styled

---

## Quick Reference

| Want to... | Do this... |
|------------|------------|
| **Set article title** | ⚙️ → Article Info → Title field |
| **Add author name** | ⚙️ → Article Info → Author field |
| **Add tags** | ⚙️ → Article Info → Tags (press Enter) |
| **Change container width** | ⚙️ → Container Style → Width dropdown |
| **Change fonts** | ⚙️ → Container Style → Font Family |
| **Preview article** | Sidebar → Green "Preview Article" button |
| **Go back to editor** | Preview page → "← Back to Editor" |
| **Export with metadata** | Sidebar → "Export Article" |
| **Import article** | Sidebar → "Import" → Select JSON |
| **Clear everything** | Sidebar → "Clear" → Confirm |

---

## Finding Your Settings

### Where settings are stored:

```javascript
// In Browser LocalStorage:
- 'article-editor-content'    → All blocks
- 'article-editor-meta'        → Metadata (title, author, etc.)
- 'article-editor-container'   → Container settings
- 'article-preview'            → Cached for preview

// In Exported JSON:
{
  "metadata": {...},           → Article info
  "containerSettings": {...},  → Styles
  "blocks": [...],             → Content
  "version": "2.0.0",          → App version
  "exportedAt": "..."          → Export time
}
```

---

## First Time Checklist

When you first open the app:

1. ✅ **See floating gear icon** (bottom-right)
2. ✅ **See green Preview button** (sidebar)
3. ✅ **Click gear** → Panel slides from right
4. ✅ **Set a title** → See it on canvas
5. ✅ **Add a block** → Drag from sidebar
6. ✅ **Click Preview** → New page opens
7. ✅ **Click Back** → Returns to editor
8. ✅ **Export** → JSON downloads

If ALL these work → **You're all set!** 🎉

---

## Troubleshooting Visual Cues

### Settings button missing?
**Look for**: Floating circle with ⚙️ icon at bottom-right
**Should be**: Always visible, on top of everything
**If not visible**: Check browser console, might be CSS issue

### Preview button not showing?
**Look for**: Green button at top of sidebar actions
**Should say**: "👁️ Preview Article"
**If not visible**: Check Sidebar.jsx is updated

### Metadata not showing on canvas?
**Look for**: Large title at top of canvas
**Should show**: Your article title, author, tags
**If showing "Your Article"**: Click ⚙️ and set metadata

### Preview shows "No Article Found"?
**Check**: You have some blocks added
**Try**: Adding at least one block
**Try**: Refreshing preview page

---

## Success Indicators

**You'll know it's working when**:

✅ Gear icon visible at bottom-right
✅ Clicking gear opens settings panel
✅ Title you type shows on canvas immediately
✅ Preview button is green and visible
✅ Clicking preview opens new page
✅ Preview shows your article beautifully
✅ Back button returns to editor
✅ Export includes metadata in JSON

---

**All Clear? Start Creating! 🚀**
