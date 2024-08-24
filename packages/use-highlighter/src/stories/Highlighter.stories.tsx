import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useHighlighter } from "..";

const testComponentId = "test-component";

function TestComponent() {
  return (
    <div
      id={testComponentId}
      style={{
        fontFamily: "sans-serif",
      }}
    >
      <h1>This is the title</h1>
      <h2> This is the subtitle</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt <b>ut labore et dolore magna aliqua</b>. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. <u>Duis aute irure</u> dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>
    </div>
  );
}

const meta: Meta<any> = {
  title: "Example/TreeSelect",
  component: TestComponent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: (args) => {
    const { highlight, unhighlightAll, restoreHighlights } = useHighlighter();
    const [savedRanges, setSavedRanges] = useState<any[]>([]);

    const onHighlight = () => {
      const result = highlight();
      if (!result) return;
      setSavedRanges([...savedRanges, ...result?.json]);
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
      {
        className: "highlight-wrapper",
        collapsed: false,
        startOffset: 13,
        endOffset: 21,
        commonAncestorContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/h2[1]/text()[1]",
        startContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/h2[1]/text()[1]",
        endContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/h2[1]/text()[1]",
      },
      {
        className: "highlight-wrapper",
        collapsed: false,
        startOffset: 0,
        endOffset: 26,
        commonAncestorContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]/text()[1]",
        startContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]/text()[1]",
        endContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]/text()[1]",
      },
      {
        className: "highlight-wrapper",
        collapsed: false,
        startOffset: 14,
        endOffset: 37,
        commonAncestorContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]/text()[2]",
        startContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]/text()[2]",
        endContainer:
          "/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]/text()[2]",
      },
    ];

    return (
      <>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onHighlight}>Highlight</button>
          <button onClick={() => unhighlightAll()}>Unhighlight all</button>
          <button onClick={() => restoreHighlights(exampleRanges)}>
            Restore Example
          </button>
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 4, maxWidth: 800 }}
        >
          <TestComponent />
        </div>
        <div>
          <pre>{JSON.stringify(savedRanges, null, 2)}</pre>
        </div>
      </>
    );
  },
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSelect: (selected) => {},
    selected: {},
  },
};
