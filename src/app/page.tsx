'use client'
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './page.module.css';

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine === '"""' && lastLine === '"""') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const Page: React.FC = () => {
  const [editorText, setEditorText] = useState(defaultMarkdown);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Markdown Previewer</h1>
      </header>
      <div className={styles.editorContainer}>
        <textarea
          id="editor"
          className={styles.editor}
          value={editorText}
          onChange={(e) => setEditorText(e.target.value)}
          rows={20}
          placeholder="Enter your markdown here..."
        />
      </div>
      <div className={styles.previewContainer}>
        <ReactMarkdown
          className={styles.preview}
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={styles.inlineCode} {...props}>
                  {children}
                </code>
              )
            },
            blockquote: ({node, ...props}) => <blockquote className={styles.blockquote} {...props} />,
            table: ({node, ...props}) => <table className={styles.table} {...props} />,
            img: ({node, ...props}) => <img className={styles.image} {...props} alt="Markdown content" />,
            a: ({node, ...props}) => <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props} />,
            ul: ({node, ...props}) => <ul className={styles.list} {...props} />,
            ol: ({node, ...props}) => <ol className={styles.list} {...props} />,
          }}
        >
          {editorText}
        </ReactMarkdown>
      </div>
      <footer className={styles.footer}>
        Created by <a href="https://github.com/wweziza" target="_blank" rel="noopener noreferrer">wweziza</a>
      </footer>
    </div>
  );
};

export default Page;