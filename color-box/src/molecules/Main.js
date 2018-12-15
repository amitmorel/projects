import React, { Component } from 'react';
import Dot from '../atoms/Dot';
import Bar from '../atoms/Bar';
import styled from '@emotion/styled'
import utils from '../utils'


const StyledMain=styled.div`
  width:100%;
  height:100%;
  display:flex;
`
const DotsDisplay=styled.div`
  display:grid;
  grid-template-rows: repeat(360,1fr);
  width:65%;
  height:80%;
  padding:5% 2.5%;
  grid-template-columns: repeat(${props => props.stepsStart - 1},1fr)
`

const BarsDisplay=styled.div`
  height:100%;
  width:30%;
  display: flex;
  flex-direction: column;
  right:0;
`

class Main extends Component {
  
  render() {
    const {onGridLocation,textColor,displayConst,multipleCreator} = utils
    const {stepsStart,computeHsl,computeHex,computeRoundedHue} = this.props
    return (
      <StyledMain>
        <DotsDisplay stepsStart={stepsStart}>
        {multipleCreator(stepsStart,
          (index)=><Dot 
          onGridLocation={onGridLocation(computeRoundedHue(index),index)} 
          computeHsl={computeHsl(index)} 
          textColor={textColor(index)}
          downText={computeRoundedHue(index)}
          insideText={displayConst(index)}/>
          )}
        </DotsDisplay>
        <BarsDisplay>
        {multipleCreator(stepsStart,
          (index) =><Bar 
            computeHsl={computeHsl(index)} 
            computeHex={computeHex(index)} 
            textColor={textColor(index)}
            insideText={displayConst(index)}/>
          )}
        </BarsDisplay>
      </StyledMain>
    );
  }
}




export default Main;
