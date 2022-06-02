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
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  }
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

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  // TODO add dom node
  // TODO create new fibers
  // TODO return next unit of work
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
