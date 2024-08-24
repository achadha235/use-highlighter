/**
 * unwrap - Unwrap an element
 * @param ele
 * @returns
 */
export function unwrap(ele: Element) {
  if (!ele.parentNode || !ele.firstChild) {
    return;
  }

  while (ele.childNodes.length > 0) {
    ele.parentNode.insertBefore(ele.removeChild(ele.firstChild), ele);
  }
  ele.parentNode.removeChild(ele);
}
