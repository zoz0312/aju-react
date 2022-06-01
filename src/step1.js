function createElemnt(type, props, ...children) {
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

const AJu = {
  createElemnt,
}

const element = AJu.createElement(
  'div',
  { id: 'foo' },
  AJu.createElement('a', null, 'bar'),
  AJu.createElement('b')
)

/** @jsx AJu.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )
const container = document.getElementById('root')
ReactDOM.render(element, container)
