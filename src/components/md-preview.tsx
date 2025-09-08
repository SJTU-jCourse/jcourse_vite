import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const MDPreview = ({ src }: any) => {
  return (
    <div className="markdown-preview">
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
