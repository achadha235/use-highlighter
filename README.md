# use-highlighter

## Overview

use-highlighter is a simple and powerful library for capturing highlighted text on web pages. It allows developers to create, persist, and restore multiple overlapping highlights across arbitrary content. This hook is especially useful for applications that require text annotation, study aids, or any feature where persistent text highlighting over arbitrary web content is necessary.

## Motivation

I created this libary to build Blacklight, a crowd-powered fact-checking system for the web. I needed a way to let my users highlight and annotate arbitrary text across the internet and share it with each other. This turned out to be more complicated than I initially imagined. I tried other libraries but none had the features I needed and so I decided to build my own.

## Key Features

- **Lightweight and Easy to Use**: use-highlight exposes a pure-JS API as well as a convenient React hook for managing highlights.

- **Highlight anything**: Seamlessly handle highlights across various DOM structures, ensuring compatibility with different web page layouts and elements.

- **Overlapping Highlights**: Create multiple highlights that can overlap, providing flexibility in how text is selected and marked.

- **Serialization and Restoration**: Easily serialize and restore highlights on any web page, allowing for robust and consistent highlight management.

- **Custom Styling**: Apply custom CSS classes to highlights, enabling developers to style highlighted text to match their application's design.

## Installation

You can install the library via npm or yarn:

```bash
npm install react-highlighter-hook
```

or

```bash
yarn add react-highlighter-hook
```

## Try it out

You can view the library's components and hooks in action by running the Storybook:

```bash
npm run storybook
```

## Example Usage

Here's a simple example demonstrating how to use the useHighlighter hook in a React component:

```tsx
import React, { useEffect, useState } from "react";
import { useHighlighter } from "use-highlighter";

function MyComponent() {
  const { highlight, unhighlightAll, restoreHighlights } = useHighlighter();
  const [savedRanges, setSavedRanges] = useState([]);

  const onHighlight = () => {
    const result = highlight();
    if (result) {
      setSavedRanges([...savedRanges, ...result.json]);
    }
  };

  const exampleRanges = [
    {
      className: "highlight-wrapper",
      collapsed: false,
      startOffset: 1,
      endOffset: 11,
      commonAncestorContainer:
        "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/h1[1]/text()[1]",
      startContainer:
        "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/h1[1]/text()[1]",
      endContainer:
        "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/h1[1]/text()[1]",
    },
    // Add more ranges as needed
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onHighlight}>Highlight</button>
        <button onClick={unhighlightAll}>Unhighlight All</button>
        <button onClick={() => restoreHighlights(exampleRanges)}>
          Restore Example Highlights
        </button>
      </div>
      <div
        id="text-content"
        style={{
          fontFamily: "sans-serif",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          maxWidth: "600px",
          margin: "20px auto",
        }}
      >
        <h1>This is the title</h1>
        <h2>This is the subtitle</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt <b>ut labore et dolore magna aliqua</b>. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. <u>Duis aute irure</u> dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </div>
      <div>
        <pre>{JSON.stringify(savedRanges, null, 2)}</pre>
      </div>
    </div>
  );
}

export default MyComponent;
```

### Example Explanation

- **Highlighting Text**: The highlight function captures the currently selected text on the page and stores it in savedRanges.
- **Unhighlighting Text**: The unhighlightAll function removes all the current highlights on the page.
- **Restoring Highlights**: The restoreHighlights function accepts an array of serialized highlight ranges and re-applies them to the page.

### CSS for Highlighting

To visually distinguish highlighted text, you'll want to apply some basic CSS:

```css
.highlight-wrapper {
  background-color: yellow;
  color: black;
}
```

This CSS class is applied to all highlighted ranges, giving them a yellow background.

## API Reference

### useHighlighter()

This hook provides the following methods:

- `highlight()`: Captures the currently selected text and returns an array of serialized ranges.
- `unhighlightAll()`: Removes all highlights from the page.
- `restoreHighlights(ranges: Array)`: Restores previously saved highlights from a serialized array of ranges.

### Highlight Range Object

The highlight range object is a serialized representation of a highlighted text range. For more details about the Range object, read the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Range).
The serialized highlight object contains the following fields:

- `className`: The CSS class applied to the highlighted text.
- `collapsed`: A boolean indicating whether the highlight is collapsed.
- `startOffset, endOffset`: The start and end positions of the highlighted text within its container.
- `commonAncestorContainer`: The common ancestor node path for the highlight.
- `startContainer, endContainer`: The specific nodes where the highlight starts and ends.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
