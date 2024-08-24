export function getHighlightRanges(range: Range, textNodesBetween: Text[]) {
  const ranges = [];
  const startRange = new Range();
  startRange.setStart(range.startContainer, range.startOffset);
  if (range.startContainer === range.endContainer) {
    startRange.setEnd(range.startContainer, range.endOffset);
  } else if (range.startContainer.textContent) {
    startRange.setEnd(
      range.startContainer,
      range.startContainer.textContent.length
    );
  }
  ranges.push(startRange);
  if (range.startContainer !== range.endContainer) {
    const endRange = new Range();
    endRange.setStart(range.endContainer, 0);
    endRange.setEnd(range.endContainer, range.endOffset);
    ranges.push(endRange);
  }

  for (let i = 0; i < textNodesBetween.length; i++) {
    const sectionRange = new Range();
    sectionRange.setStart(textNodesBetween[i], 0);
    sectionRange.setEnd(
      textNodesBetween[i],
      textNodesBetween[i].textContent!.length
    );
    ranges.push(sectionRange);
  }
  return ranges;
}
