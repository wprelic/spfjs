// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview Basic DOM manipulation functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

goog.provide('spf.dom');


/**
 * Inserts a new node before an existing reference node (i.e. as the previous
 * sibling). If the reference node has no parent, then does nothing.
 *
 * @param {Node} newNode Node to insert.
 * @param {Node} refNode Reference node to insert before.
 */
spf.dom.insertSiblingBefore = function(newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode);
};


/**
 * Inserts a new node after an existing reference node (i.e. as the next
 * sibling). If the reference node has no parent, then does nothing.
 *
 * @param {Node} newNode Node to insert.
 * @param {Node} refNode Reference node to insert after.
 */
spf.dom.insertSiblingAfter = function(newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
};


/**
 * Flattens an element. That is, removes it and replace it with its children.
 * Does nothing if the element is not in the document.
 *
 * @param {Element} element The element to flatten.
 * @return {Element|undefined} The original element, detached from the document
 *     tree, sans children; or undefined, if the element was not in the document
 *     to begin with.
 */
spf.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if (parent && parent.nodeType != 11) {  // 11 = document fragment
    // Use IE DOM method (supported by Opera too) if available
    if (element.removeNode) {
      return /** @type {Element} */ (element.removeNode(false));
    } else {
      // Move all children of the original node up one level.
      while ((child = element.firstChild)) {
        parent.insertBefore(child, element);
      }
      // Detach the original element.
      return /** @type {Element} */ (parent.removeChild(element));
    }
  }
};


/**
 * Inflates an element. That is, adds a new child and places its previous
 * children inside.
 *
 * @param {Element} element The element to inflate.
 * @param {Element} parent The new parent of the existing children.
 */
spf.dom.inflateElement = function(element, parent) {
  if (parent) {
    var child;
    // Move all children of the original node down one level.
    while ((child = element.firstChild)) {
      parent.appendChild(child);
    }
    // Attach the new parent.
    element.appendChild(parent);
  }
};
