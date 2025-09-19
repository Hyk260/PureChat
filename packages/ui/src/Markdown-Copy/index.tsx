import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export interface MarkdownProps {
  markdown?: string
  className?: string
}

export const Markdown: React.FC<MarkdownProps> = ({
  markdown = "1234",
  className,
}) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}