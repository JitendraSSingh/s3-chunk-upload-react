import React from 'react'

export default class Loading extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            text: 'Loading'
        }
    }

    componentDidMount(){
        let initialText = this.state.text
        let finalText = this.state.text + '...' 
        this.counter = setInterval(() => {
            this.setState(({text}) => {
                return {
                    text: text !== finalText ? text + '.' : initialText
                }
            })
        }, 300)
    }

    componentWillUnmount(){
        clearInterval(this.counter)
    }

    render(){
        return(
            <div className='loading'>
                {this.state.text}
            </div>
        )
    }
}