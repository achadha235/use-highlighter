//@ts-nocheck
function getXPathForElement(node, context) {
  context = context || document;
  if (node.id && context.getElementById(node.id) === node) {
    return `id("${node.id}")`;
  }

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return getElementXPath(node);
    case Node.ATTRIBUTE_NODE:
      return `${getElementXPath(node.ownerElement)}/@${node.nodeName}`;
    case Node.TEXT_NODE:
      return `${getElementXPath(node.parentNode)}/text()[${getTextNodeIndex(node)}]`;
    case Node.DOCUMENT_NODE:
      return "/";
    default:
      return "";
  }
}

function getElementXPath(element) {
  var path = [];
  while (element.nodeType === Node.ELEMENT_NODE) {
    var index =
      1 +
      Array.from(element.parentNode.childNodes)
        .filter((e) => e.nodeName === element.nodeName)
        .indexOf(element);
    path.unshift(`${element.nodeName.toLowerCase()}[${index}]`);
    element = element.parentNode;
  }
  return path.length ? "/" + path.join("/") : null;
}

function getTextNodeIndex(textNode) {
  var index = 1,
    sibling = textNode.previousSibling;
  while (sibling) {
    if (sibling.nodeType === Node.TEXT_NODE) {
      index++;
    }
    sibling = sibling.previousSibling;
  }
  return index;
}

function getElementByXPath(path, context) {
  context = context || document;
  const evaluator = new XPathEvaluator();
  const result = evaluator.evaluate(
    path,
    context,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
}

export function deserialize(state) {
  const range = document.createRange();
  range.collapse(state.collapsed);
  const start = getElementByXPath(state.startContainer, document);
  range.setStart(start, state.startOffset);
  const end = getElementByXPath(state.endContainer, document);
  range.setEnd(end, state.endOffset);
  return range;
}

export function serialize(range: Range) {
  return {
    collapsed: range.collapsed,
    startOffset: range.startOffset,
    endOffset: range.endOffset,
    commonAncestorContainer: getXPathForElement(
      range.commonAncestorContainer,
      document
    ),
    startContainer: getXPathForElement(range.startContainer, document),
    endContainer: getXPathForElement(range.endContainer, document),
  };
}
