"use client";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      className="min-w-full prose prose-neutral dark:prose-invert"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              customStyle={{ padding: 15, margin: 0 }}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => {
          return <pre style={{ padding: 0, margin: 0 }}>{children}</pre>;
        },
        img: ({ src }) => (
          <Image
            src={src || ""}
            alt={src || ""}
            className="w-auto h-auto shadow-md"
            width={1500}
            height={1500}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
