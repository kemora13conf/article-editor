import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import { PROGRAMMING_LANGUAGES } from '../utils/blockTypes';

const ArticleReader = () => {
  const location = useLocation();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Get article data from location state or localStorage
    if (location.state?.article) {
      setArticle(location.state.article);
    } else {
      // Load from localStorage as fallback
      const saved = localStorage.getItem('article-preview');
      if (saved) {
        try {
          setArticle(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load article:', error);
        }
      }
    }
  }, [location]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Article Found</h2>
          <p className="text-gray-600">Please export an article first.</p>
        </div>
      </div>
    );
  }

  const { metadata, containerSettings, blocks } = article;

  const renderCodeBlock = (content) => {
    const { code = '', language = 'javascript' } = content || {};
    
    return (
      <div className="my-4">
        <div className="bg-slate-800 px-4 py-2 rounded-t-lg flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            {PROGRAMMING_LANGUAGES.find(l => l.value === language)?.label || language}
          </span>
        </div>
        <Highlight theme={themes.vsDark} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-auto rounded-b-lg m-0`}
              style={{
                ...style,
                padding: '1rem',
                maxHeight: '600px',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="inline-block w-8 text-right pr-4 select-none opacity-40">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    );
  };

  const renderBlock = (block) => {
    const { type, content, styles, children } = block;

    // Text blocks
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type)) {
      const Tag = type;
      return <Tag key={block.id} style={styles}>{content}</Tag>;
    }

    if (type === 'paragraph') {
      return <p key={block.id} style={styles}>{content}</p>;
    }

    if (type === 'caption') {
      return <p key={block.id} style={styles} className="text-sm italic">{content}</p>;
    }

    if (type === 'quote') {
      return <blockquote key={block.id} style={styles}>{content}</blockquote>;
    }

    // Lists
    if (type === 'list') {
      return (
        <ul key={block.id} style={styles} className="list-disc">
          {Array.isArray(content) && content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    if (type === 'numbered-list') {
      return (
        <ol key={block.id} style={styles} className="list-decimal">
          {Array.isArray(content) && content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      );
    }

    // Code block
    if (type === 'code') {
      return <div key={block.id}>{renderCodeBlock(content)}</div>;
    }

    // Divider
    if (type === 'divider') {
      return <hr key={block.id} style={styles} />;
    }

    // Media blocks
    if (type === 'image' && content) {
      return (
        <div key={block.id} className="my-4">
          <img src={content} alt="Article image" style={styles} className="rounded-lg shadow-md" />
        </div>
      );
    }

    if (type === 'video' && content) {
      return (
        <div key={block.id} className="my-4">
          <video src={content} controls style={styles} className="rounded-lg shadow-md w-full" />
        </div>
      );
    }

    if (type === 'pdf' && content) {
      return (
        <div key={block.id} style={styles} className="my-4 p-4 bg-gray-50 rounded-lg border">
          <a href={content} download className="text-primary-600 hover:text-primary-700">
            Download PDF
          </a>
        </div>
      );
    }

    if (type === 'file' && content) {
      return (
        <div key={block.id} style={styles} className="my-4 p-4 bg-gray-50 rounded-lg border">
          <a href={content} download className="text-primary-600 hover:text-primary-700">
            Download File
          </a>
        </div>
      );
    }

    // Container blocks
    if (type === 'flex' && children) {
      return (
        <div key={block.id} style={styles} className="my-4">
          {children.map(child => renderBlock(child))}
        </div>
      );
    }

    if (type === 'section' && children) {
      return (
        <section key={block.id} style={styles} className="my-4">
          {children.map(child => renderBlock(child))}
        </section>
      );
    }

    return null;
  };

  const maxWidthClass = `max-w-${containerSettings?.maxWidth || '4xl'}`;
  const paddingClass = `p-${containerSettings?.padding || '8'}`;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{
        fontFamily: containerSettings?.fontFamily || 'inherit',
        fontSize: containerSettings?.fontSize || '16px',
        lineHeight: containerSettings?.lineHeight || '1.6',
      }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className={`${maxWidthClass} mx-auto ${paddingClass} py-4 flex items-center justify-between`}>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Article Preview</h1>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            ← Back to Editor
          </button>
        </div>
      </header>

      {/* Article Content */}
      <main className={`${maxWidthClass} mx-auto ${paddingClass} py-8`}>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ backgroundColor: containerSettings?.backgroundColor || '#ffffff' }}
        >
          <div className={paddingClass}>
            {/* Article Header */}
            <header className="mb-8 pb-6 border-b-2 border-gray-100">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {metadata?.title || 'Untitled Article'}
              </h1>
              
              {metadata?.author && (
                <p className="text-gray-600 mb-2">
                  By <span className="font-semibold">{metadata.author}</span>
                </p>
              )}
              
              {metadata?.description && (
                <p className="text-lg text-gray-700 mb-4">{metadata.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {metadata?.createdAt && (
                  <span>Published: {new Date(metadata.createdAt).toLocaleDateString()}</span>
                )}
                {metadata?.updatedAt && metadata.updatedAt !== metadata.createdAt && (
                  <span>Updated: {new Date(metadata.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
              
              {metadata?.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {blocks && blocks.map(block => renderBlock(block))}
            </div>
          </div>
        </motion.article>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Created with Article Editor</p>
        </footer>
      </main>
    </div>
  );
};

export default ArticleReader;
