import { clearSelection } from "./clearSelection";
import { getTextNodesBetween } from "./getTextNodesBetween";
import { getHighlightRanges } from "./getHighlightRanges";
import { highlightRange } from "./highlightRange";
import { serialize, deserialize } from "./utils";
// Read here for serialization:
// https://github.com/timdown/rangy/blob/master/src/modules/rangy-serializer.js

export function highlight(
  style?: string,
  className: string = "highlight-wrapper"
) {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return;
  }
  const range = selection.getRangeAt(0);

  const textNodesBetween = getTextNodesBetween(
    range.commonAncestorContainer,
    range.startContainer,
    range.endContainer
  );

  const ranges = getHighlightRanges(range, textNodesBetween);

  const json = ranges.map((range) => ({
    className,
    style,
    ...serialize(range),
  }));

  let selectedText = "";
  for (let range of ranges) {
    highlightRange(
      range,
      className ? [className] : undefined,
      style ? { style } : undefined
    );
    selectedText += range.toString();
  }

  clearSelection();

  return {
    range,
    json,
    selection,
    selectedText,
  };
}
