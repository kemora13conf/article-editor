# Quick Implementation Guide

## How to Add the New Features

Since there's a build issue with the current setup, here's a step-by-step guide to implement all the production-ready features:

### Step 1: Fix the Build Issue

```bash
# Option 1: Use pnpm (recommended)
npm install -g pnpm
rm -rf node_modules yarn.lock package-lock.json
pnpm install
pnpm run build

# Option 2: Fresh install with npm
rm -rf node_modules package-lock.json yarn.lock
npm install
npm run build

# Option 3: Use yarn with different version
yarn set version berry
yarn install
yarn build
```

### Step 2: Already Implemented Files

The following files have been created/updated:

✅ **New Files Created:**
- `src/components/CodeBlock.jsx` - Code editor with syntax highlighting
- `src/components/ToastProvider.jsx` - Toast notifications wrapper

✅ **Updated Files:**
- `src/context/EditorContext.jsx` - Added undo/redo, auto-save, duplicate
- `src/components/Sidebar.jsx` - Added search, undo/redo buttons, clear all
- `src/components/BlockControls.jsx` - Added duplicate button
- `src/utils/blockTypes.js` - Added 6 new block types
- `src/utils/blockDefaults.js` - Added defaults for new blocks
- `src/App.jsx` - Added ToastProvider

### Step 3: Update Block.jsx

Replace the content of `src/components/Block.jsx` with the enhanced version that includes:
- Code block rendering
- List rendering (bullet & numbered)
- Quote block
- Divider block

The file is ready in the backup: `src/components/Block.jsx` (restored from backup)

You need to replace it with this new implementation that handles all the new block types.

### Step 4: Test Each Feature

**Test Undo/Redo:**
1. Add a block
2. Press Cmd/Ctrl + Z (should undo)
3. Press Cmd/Ctrl + Shift + Z (should redo)

**Test Auto-Save:**
1. Add some blocks
2. Wait 2 seconds
3. Refresh the page
4. Should see "Previous work restored!" toast

**Test Code Block:**
1. Drag "Code Block" from sidebar
2. Select language from dropdown
3. Type code
4. Click "Copy" button

**Test Lists:**
1. Drag "Bullet List" or "Numbered List"
2. Edit items
3. Press Enter to add new item
4. Press Backspace on empty item to delete

**Test Duplicate:**
1. Add any block
2. Hover over it
3. Click the duplicate icon (📋)
4. Should create exact copy below

**Test Search:**
1. Type in search box at top of sidebar
2. Only matching blocks should show
3. Click X to clear search

### Step 5: Verify All Features Work

Checklist:
- [ ] Drag blocks from sidebar to canvas
- [ ] Drop blocks between existing blocks
- [ ] Code block with syntax highlighting
- [ ] Lists with add/remove items
- [ ] Quote block with styled border
- [ ] Divider line
- [ ] Undo/Redo with keyboard shortcuts
- [ ] Auto-save and restore on reload
- [ ] Duplicate blocks
- [ ] Search blocks in sidebar
- [ ] Clear all with confirmation
- [ ] Toast notifications appear
- [ ] Export to JSON
- [ ] Import from JSON

## Code Snippets for Testing

### Test Code Block Content
```javascript
// JavaScript example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
# Python example
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3,6,8,10,1,2,1]))
```

### Sample Article Structure
1. H1: "Article Title"
2. Paragraph: Introduction text
3. H2: "Code Example"
4. Code Block: Sample code
5. Paragraph: Explanation
6. Quote: Important note
7. Bullet List: Key points
8. Divider
9. H2: "Conclusion"
10. Paragraph: Final thoughts

## Troubleshooting

### Code Block Not Showing
- Check if `prism-react-renderer` is installed
- Verify `CodeBlock.jsx` exists
- Check import in `Block.jsx`

### Toast Notifications Not Appearing
- Check if `ToastProvider` is in `App.jsx`
- Verify `react-hot-toast` is installed
- Check browser console for errors

### Undo/Redo Not Working
- Check keyboard shortcuts in browser
- Verify `EditorContext.jsx` has history management
- Check if blocks are being added to history

### Auto-Save Not Working
- Check localStorage is enabled in browser
- Verify auto-save timeout in `EditorContext.jsx`
- Check browser console for errors

### Search Not Filtering
- Check if search state is updating
- Verify filter logic in `Sidebar.jsx`
- Check category rendering

## Performance Tips

1. **Large Articles:**
   - Use virtualization for 100+ blocks
   - Implement pagination
   - Add lazy loading for images

2. **Code Blocks:**
   - Limit code block size (< 1000 lines)
   - Use code folding for large blocks
   - Add syntax validation

3. **History:**
   - Adjust MAX_HISTORY constant
   - Implement history compression
   - Add history pruning

## Next Steps After Build Fix

1. **Add Tests:**
```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom
```

2. **Add Storybook:**
```bash
npx storybook@latest init
```

3. **Add E2E Tests:**
```bash
yarn add -D playwright
npx playwright install
```

4. **Setup CI/CD:**
- GitHub Actions
- Vercel/Netlify deployment
- Automated testing

## Production Deployment

### Environment Variables
```env
VITE_APP_NAME=Article Editor
VITE_APP_VERSION=2.0.0
VITE_AUTO_SAVE_DELAY=2000
VITE_MAX_HISTORY=50
```

### Build Commands
```bash
# Development
yarn dev

# Production build
yarn build

# Preview production
yarn preview

# Lint
yarn lint
```

### Deployment Platforms
- **Vercel:** `vercel --prod`
- **Netlify:** `netlify deploy --prod`
- **GitHub Pages:** Build to `docs/` folder
- **AWS S3:** `aws s3 sync dist/ s3://bucket`

## Support

If you encounter issues:
1. Check this guide
2. Check `PRODUCTION_READY.md`
3. Check browser console
4. Clear cache and rebuild
5. Create an issue on GitHub

---

**Happy Coding! 🚀**
