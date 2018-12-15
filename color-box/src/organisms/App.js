import React, { Component } from 'react';
import Sidebar from '../molecules/Sidebar';
import Main from '../molecules/Main';
import styled from '@emotion/styled'
import Header from '../molecules/Header'
const toHex = require('hsl-to-hex')


const StyledApp=styled.div`
  height:90vh;
  display: flex;
  background: linear-gradient(rgba(244,244,250,.8) 1px,transparent 0),linear-gradient(#f4f4fa 1px,transparent 0),linear-gradient(90deg,rgba(244,244,250,.8) 1px,transparent 0),linear-gradient(90deg,#f4f4fa 1px,transparent 0),linear-gradient(transparent 3px,#fff 0,#fff 94px,transparent 0),linear-gradient(90deg,#f4f4fa 3px,transparent 0,transparent 94px,#f4f4fa 0);
  background-size: 24px 24px, 96px 96px, 24px 24px, 96px 96px, 96px 96px,96px 96px;
`

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      stepsStart: 11,
      hueStart: 315,
      hueEnd:293,
      satStart: 4,
      satEnd:90,
      lumStart: 100,
      lumEnd:53
    }
    this.onSlideChange = this.onSlideChange.bind(this)
    this.computeHsl = this.computeHsl.bind(this)
    this.computeHex = this.computeHex.bind(this)
    this.computeRoundedHue = this.computeRoundedHue.bind(this)
  }

    onSlideChange(property,correct) {
      this.setState({[property]:parseInt(correct)})
  }
  
  computeProp(index,start,end,steps) {
    const delta = (end - start) / (steps - 1)
    return start + (delta * index)
  }

  computeRoundedHue(index){
    const {stepsStart,hueStart,hueEnd} = this.state
    return Math.round(this.computeProp(index,hueStart,hueEnd,stepsStart))
  }

    computeHsl(index){
      const {stepsStart,hueStart,hueEnd,satStart,satEnd,lumStart,lumEnd} = this.state
      return `hsl(
                ${this.computeProp(index,hueStart,hueEnd,stepsStart)},
                ${this.computeProp(index,satStart,satEnd,stepsStart)}%,
                ${this.computeProp(index,lumStart,lumEnd,stepsStart)}%)`
    }
    
    computeHex(index){
      const {stepsStart,hueStart,hueEnd,satStart,satEnd,lumStart,lumEnd} = this.state
      return toHex(
                `${this.computeProp(index,hueStart,hueEnd,stepsStart)}`,
                `${this.computeProp(index,satStart,satEnd,stepsStart)}`,
                `${this.computeProp(index,lumStart,lumEnd,stepsStart)}`)
    }  
 
  render() {
    const functions = {
      onSlideChange:this.onSlideChange,
      computeProp:this.computeProp, 
      computeHsl:this.computeHsl,
      computeHex:this.computeHex,
      computeRoundedHue:this.computeRoundedHue
    }
    return (
      <>
      <Header />
      <StyledApp>
        <Sidebar {...this.state} {...functions}/>
        <Main {...this.state} {...functions}/>
      </StyledApp>
      </>
    );
  }
}

export default App;
