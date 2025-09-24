import { createWebComponent } from "@/utils/createWebComponent"
// import { default as MarkdownComponent } from "./Markdown"
import { Markdown } from "./Markdown-Copy"

const MarkdownWrapper: React.FC<any> = ({ content, ...restProps }) => (
  <Markdown {...restProps}>{content}</Markdown>
);

// const MarkdownWrapper: React.FC<any> = ({ content, ...restProps }) => (
//   <MarkdownComponent {...restProps}>{content}</MarkdownComponent>
// );

createWebComponent({
  tagName: "markdown-ui",
  reactComponent: MarkdownWrapper,
})
