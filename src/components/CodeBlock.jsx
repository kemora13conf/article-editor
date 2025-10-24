import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { PROGRAMMING_LANGUAGES } from '../utils/blockTypes';
import toast from 'react-hot-toast';

const CodeBlock = ({ code, language, onCodeChange, onLanguageChange, styles }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group" style={styles}>
      {/* Language Selector and Copy Button */}
      <div className="flex items-center justify-between mb-2 px-3 py-2 bg-slate-800 rounded-t-lg border-b border-slate-700">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-slate-700 text-gray-200 text-sm px-3 py-1 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          {PROGRAMMING_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-gray-200 rounded transition-colors text-sm"
        >
          {copied ? (
            <>
              <CheckIcon sx={{ fontSize: 16 }} />
              Copied!
            </>
          ) : (
            <>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none outline-none p-4 font-mono text-sm z-10"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
          spellCheck={false}
        />

        {/* Syntax Highlighted Preview */}
        <Highlight theme={themes.vsDark} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-auto rounded-b-lg m-0`}
              style={{
                ...style,
                padding: '1rem',
                minHeight: '200px',
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
    </div>
  );
};

export default CodeBlock;
