import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      className="prose prose-neutral dark:prose-invert md:prose-xl"
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
