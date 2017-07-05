import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
    <div>hello world</div>
)

const shadow = document.createElement('div');
shadow.id = 'shadow';
shadow.style.position = "fixed"
shadow.style.top = 0
shadow.style.left = 0
shadow.style.zIndex = "2147483638"
const shadowRoot = shadow.attachShadow({mode: 'open'});
document.body.appendChild(shadow);

ReactDOM.render(<App />, shadowRoot);