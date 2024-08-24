import {
  unhighlightAll,
  clearSelection,
  highlight,
  restoreHighlights,
} from "highlighter-utils";
import { useEffect, useState } from "react";

export function useHighlighter() {
  const [selection, setSelection] = useState<Selection | null>();

  const updateSelection = () => {
    setSelection(document.getSelection());
  };
  useEffect(() => {
    document.addEventListener("selectionchange", updateSelection);
    return () => {
      document.removeEventListener("selectionchange", updateSelection);
    };
  }, []);
  return {
    selection,
    highlight,
    unhighlightAll,
    clearSelection,
    restoreHighlights,
  };
}
