
import React , { Component } from 'react'
import { BrowserRouter , Route } from 'react-router-dom'
import ReactDom from 'react-dom'
// import { registerServiceWorker } from './register-service-worker.js'
// registerServiceWorker()
import axios from 'axios'
import List from './list'
import Home from './home.jsx'
class App extends Component {
    componentDidMount(){

        // axios.get('/dellee/react/api/header.json').then(res=>{
        //     console.log(res)
        // })
    }
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Home}>

                    </Route>
                    <Route path="/list" component={List}>

                    </Route>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))