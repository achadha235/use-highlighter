import { highlightRange } from "./highlightRange";
import { deserialize } from "./utils";

export function restoreHighlights(serializedRanges: any[]) {
  for (let i = 0; i < serializedRanges.length; i++) {
    const serializedRange = serializedRanges[i];
    const className = serializedRange.className;
    const style = serializedRange.style;
    const range = deserialize(serializedRange);
    highlightRange(
      range,
      className ? [className] : undefined,
      style ? { style } : undefined
    );
  }
}
