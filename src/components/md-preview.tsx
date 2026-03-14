import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const MDPreview = ({ src, className }: { src?: string; className?: string }) => {
  return (
    <div className={`markdown-preview${className ? ` ${className}` : ""}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkBreaks, remarkGfm]}
      >
        {src}
      </ReactMarkdown>
    </div>
  );
};

export default MDPreview;
