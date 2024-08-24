export function clearSelection() {
  if (window && window.getSelection) {
    window.getSelection()?.removeAllRanges();
  }
}
