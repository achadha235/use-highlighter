import { unwrap } from "./unwrap";

export function unhighlightAll(className = "highlight-wrapper") {
  let highlightWrappers = document.getElementsByClassName(className);
  while (highlightWrappers.length > 0) {
    for (let ele of highlightWrappers) {
      unwrap(ele);
      ele.remove();
    }
    highlightWrappers = document.getElementsByClassName(className);
  }
}
