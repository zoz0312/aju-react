function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createDom(fiber) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  const isProperty = (key) => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name]
    })

  return dom
}

function render(element, container) {
  // TODO set next unit of work
}

let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldWork = true
  while (nextUnitOfWork && shouldWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldWork = deadline.timeReadining() > 0
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

const AJu = {
  createElement,
  render,
}

const element = AJu.createElement(
  'div',
  { id: 'foo' },
  AJu.createElement('a', null, 'bar'),
  AJu.createElement('b')
)

const container = document.getElementById('root')
AJu.render(element, container)
