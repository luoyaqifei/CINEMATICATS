export function createElementAndAppendToParent(
    domTag,
    innerText = null,
    className = null,
    parent = null
) {
    const element = document.createElement(domTag);
    if (!!innerText) {
        element.innerText = innerText;
    }
    if (!!className) {
        element.classList.add(className);
    }
    if (!!parent) {
        parent.appendChild(element);
    }
    return element;
}