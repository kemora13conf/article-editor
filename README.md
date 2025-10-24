# 📝 Article Editor

A modern, production-ready article editor built with React, Tailwind CSS, and Framer Motion. Create beautiful content with an intuitive block-based interface.

![Article Editor](https://img.shields.io/badge/React-18.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.0-ff0055)

## ✨ Features

### 🎨 Rich Content Blocks
- **Text Elements**: H1-H6 headings, paragraphs, and captions
- **Media**: Images, videos, PDFs, and file uploads
- **Layout**: Flexible containers and sections for complex layouts

### 🎯 Intuitive Interface
- **Drag & Drop**: Reorder blocks effortlessly
- **Live Editing**: Edit content inline with instant preview
- **Style Panel**: Comprehensive styling options for every block
- **Responsive**: Works beautifully on all screen sizes

### 🚀 Modern Technologies
- **React 18**: Latest React features with hooks
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth, professional animations
- **Context API**: Efficient state management

### 💾 Import/Export
- Export articles as JSON
- Import previously saved articles
- Version control friendly format

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and Yarn

### Setup

```bash
# Navigate to project directory
cd article-editor

# Install dependencies
yarn install

# Start development server
yarn dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📖 Usage

### Adding Blocks

1. **Choose a Block Type**: Click any block type in the sidebar
2. **Add Content**:
   - Text blocks: Click and type
   - Media blocks: Click to upload files
   - Layout blocks: Add children using the "+ Add Child" button

### Styling Blocks

1. **Select a Block**: Click the settings icon (⚙️) on any block
2. **Customize**: Use the style panel to adjust:
   - Dimensions (width, height, etc.)
   - Typography (font, size, weight, color)
   - Spacing (margins, padding)
   - Layout (flexbox properties)
   - Visual (background, borders, radius)

### Block Controls

Each block has controls that appear on hover:

- **↑ ↓**: Move block up or down
- **⚙️**: Open style panel
- **🗑️**: Delete block
- **⋮⋮**: Drag handle (coming soon)

### Layout Containers

**Flex Container**: Arrange children in rows or columns
- Perfect for side-by-side layouts
- Customize flex properties (direction, gap, alignment)

**Section**: Group related content
- Visual distinction with colored background
- Great for organizing article structure

## 🎨 Customization

### Tailwind CSS v4 Configuration

This project uses **Tailwind CSS v4** with the modern CSS-based configuration. Customize your theme directly in `src/index.css` using the `@theme` directive:

```css
@theme {
  /* Custom Color Palette */
  --color-primary-50: #f5f7ff;
  --color-primary-500: #667eea;
  --color-primary-900: #262d70;

  /* Custom Animations */
  --animate-slide-in: slide-in 0.3s ease-out;

  @keyframes slide-in {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
}
```

No need for a separate `tailwind.config.js` file - everything is in CSS! 🎉

### Default Styles

Modify `src/utils/blockDefaults.js` to change default block styles:

```js
export const getDefaultStyles = (type) => {
  // Customize default styles here
}
```

## 📁 Project Structure

```
article-editor/
├── src/
│   ├── components/
│   │   ├── Block.jsx          # Block renderer
│   │   ├── BlockControls.jsx  # Block action buttons
│   │   ├── Canvas.jsx         # Main editing area
│   │   ├── Sidebar.jsx        # Block type selector
│   │   └── StylePanel.jsx     # Style editor
│   ├── context/
│   │   └── EditorContext.jsx  # State management
│   ├── utils/
│   │   ├── blockDefaults.js   # Default styles
│   │   └── blockTypes.js      # Block type definitions
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles + Tailwind v4 config
├── public/                     # Static assets
├── package.json
├── postcss.config.js          # PostCSS configuration
└── vite.config.js             # Vite configuration
```

## 🏗️ Architecture

### Component Hierarchy

```
App
├── EditorProvider (Context)
    ├── Sidebar
    │   └── Block Type Buttons
    ├── Canvas
    │   └── Block (recursive)
    │       ├── BlockControls
    │       └── Block Content
    └── StylePanel
        └── Style Groups
```

### State Management

The app uses React Context for global state:

```js
const {
  blocks,              // All blocks
  selectedBlock,       // Currently selected block
  showStylePanel,      // Style panel visibility
  addBlock,            // Add new block
  updateBlockContent,  // Update block content
  updateBlockStyle,    // Update block styles
  deleteBlock,         // Delete block
  moveBlock,           // Move block up/down
  // ... more actions
} = useEditor();
```

## 🎯 Best Practices

### Component Design
- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Complex UIs built from simple components
- **Props Validation**: TypeScript or PropTypes recommended for production

### Performance
- **Memoization**: Use `React.memo()` for expensive components
- **Lazy Loading**: Code split with `React.lazy()` for larger apps
- **Optimized Rerenders**: Context split for frequently changing values

### Code Quality
- **ESLint**: Maintain code consistency
- **Prettier**: Auto-format code
- **Component Structure**: Organized and maintainable

## 🚀 Building for Production

```bash
# Build optimized bundle
yarn build

# Preview production build
yarn preview
```

The build output will be in the `dist/` directory.

## 🔮 Future Enhancements

- [ ] Drag and drop reordering
- [ ] Undo/Redo functionality
- [ ] Templates and presets
- [ ] Collaborative editing
- [ ] Custom block types
- [ ] Image optimization
- [ ] Markdown export
- [ ] HTML export
- [ ] Database integration
- [ ] Auto-save functionality

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
