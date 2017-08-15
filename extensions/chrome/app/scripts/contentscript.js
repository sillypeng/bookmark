import React from 'react'
import ReactDOM from 'react-dom'
import Drawer from 'material-ui/Drawer'
import Autocomplete from './Autocomplete'

class App extends React.Component {
    constructor() {
        super();
        this.state = {isOpen:true}
    }

    handleTopClose(){
        this.setState({isOpen:false})
    }

    render(){
        return <TopDrawer isOpen={this.state.isOpen} handleTopClose={this.handleTopClose.bind(this)}/>
    }
}

const TopDrawer = ({isOpen, handleTopClose}) => {
    return <Drawer
          anchor="top"
          open={isOpen}
          onRequestClose={handleTopClose}
          onClick={handleTopClose}
        >
            <Autocomplete/>
        </Drawer>
}

const shadow = document.createElement('div');
shadow.id = 'shadow';
shadow.style.position = "fixed"
shadow.style.top = 0
shadow.style.left = 0
shadow.style.zIndex = "2147483638"
const shadowRoot = shadow.attachShadow({mode: 'open'});
document.body.appendChild(shadow);

ReactDOM.render(<App />, shadowRoot);