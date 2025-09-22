import { createWebComponent } from "@/utils/createWebComponent"
import { default as MarkdownComponent } from "./Markdown"
export { default as Markdown, type MarkdownProps, Typography, type TypographyProps } from "./Markdown"

const MarkdownWrapper: React.FC<any> = ({ content, ...restProps }) => (
  <MarkdownComponent {...restProps}>{content}</MarkdownComponent>
);

createWebComponent({
  tagName: "markdown-ui",
  reactComponent: MarkdownWrapper,
})
