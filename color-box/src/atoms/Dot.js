import React, { Component } from 'react';
import styled from '@emotion/styled'


const StyledDot = styled.div`
  font-weight: bold;
  font-size: 12px;
  grid-area:${props => props.gridArea};
`
const Circle = styled.span`
  padding: 8px;
  border-radius: 50%;
  overflow: hidden;
  background-color:${props => props.backgroundColor};
`

class Dot extends Component {
  render() {
    const {onGridLocation,computeHsl,insideText,downText} = this.props
    return (
          <StyledDot gridArea={onGridLocation}>
            <Circle backgroundColor={computeHsl}>{insideText}</Circle>
            <br></br><br></br>
            {downText}
          </StyledDot>
    );
  }
}

export default Dot;

