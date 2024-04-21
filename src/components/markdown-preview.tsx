import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const MarkdownPreview = ({ src, ...props }: { src?: string }) => {
  return (
    <div className="markdown-preview">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkBreaks, remarkGfm]}
        {...props}
      >
        {src}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
