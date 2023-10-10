"use client";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { useScroll, motion } from "framer-motion";
import TableOfContents from "../TableOfContents";

const MarkdownViewer = ({ content }: { content: string }) => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        className="fixed left-0 right-0 h-2 origin-left bg-gradient-to-br backdrop-blur-sm from-sky-300 via-blue-400 to-indigo-500 top-14 dark:from-violet-300 dark:via-purple-400 dark:to-fuchsia-500"
        style={{ scaleX: scrollYProgress }}
      />

      <TableOfContents />

      <ReactMarkdown
        className="min-w-full prose max-w-min prose-neutral dark:prose-invert"
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
              className="w-auto h-auto bg-white shadow-md"
              width={500}
              height={500}
              priority
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

export default MarkdownViewer;
