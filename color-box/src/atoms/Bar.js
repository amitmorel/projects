import React, { Component } from 'react';
import styled from '@emotion/styled'

const StyledBar = styled.div`
  flex-grow: 1;
  display:flex;
  justify-content:space-around;
  background-color:${props => props.backgroundColor};
  color:${props => props.color};
  font-weight:bold;
`

class Bar extends Component {
  render() {
    const {coloringText,computeHsl,computeHex,insideText} = this.props
    return (
        <StyledBar
            backgroundColor={computeHsl}  
            color={coloringText}
          >
          <div>{insideText}</div>
          <div>{computeHex}</div>
        </StyledBar>
    );
  }
}

export default Bar;
