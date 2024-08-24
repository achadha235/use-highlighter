/**
 * getTextNodesBetween - get all text nodes between two nodes
 * @param rootNode
 * @param startNode
 * @param endNode
 * @returns
 */
export function getTextNodesBetween(
  rootNode: Node,
  startNode: Node,
  endNode: Node
) {
  let pastStartNode = false;
  let reachedEndNode = false;
  let textNodes: Text[] = [];
  function getTextNodes(node: Node) {
    if (node == startNode) {
      pastStartNode = true;
    } else if (node == endNode) {
      reachedEndNode = true;
    } else if (node.nodeType == 3 && node.nodeValue) {
      if (pastStartNode && !reachedEndNode && !/^\s*$/.test(node.nodeValue)) {
        textNodes.push(node as Text);
      }
    } else {
      for (let i = 0; !reachedEndNode && i < node.childNodes.length; ++i) {
        getTextNodes(node.childNodes[i]);
      }
    }
  }
  getTextNodes(rootNode);
  return textNodes;
}
