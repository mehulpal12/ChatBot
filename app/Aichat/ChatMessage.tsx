"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");

          if (!inline && match) {
            return <CodeBlock language={match[1]} value={codeString} />;
          }

          return (
            <code className="bg-gray-200 px-1 rounded text-sm">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/* -------------------------------
   Code Block with Copy Button
-------------------------------- */
function CodeBlock({
  language,
  value,
}: {
  language: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative my-4">
      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Code block */}
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
