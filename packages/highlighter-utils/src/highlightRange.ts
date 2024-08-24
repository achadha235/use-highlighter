export function highlightRange(
  range: Range,
  classNames?: string[],
  attributes?: Record<string, string>,
  tagName: string = "mark"
) {
  const newNode = document.createElement(tagName);
  for (const attr in attributes) {
    newNode.setAttribute(attr, attributes[attr]);
  }
  if (classNames) {
    newNode.classList.add(...classNames);
  }
  range.surroundContents(newNode);
}
