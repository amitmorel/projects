import React, { Component } from 'react';
import styled from '@emotion/styled'
import Context from '../organisms/Context'

class Total extends Component {
  render() {
    return (
      <Context.Consumer>
        {({ total }) => (
          <StyledTotal color={total >= 0 ? 'green' : 'red'}>
            {total}
          </StyledTotal>
        )}
      </Context.Consumer>

    );
  }
}

export default Total;


const StyledTotal = styled.div`
@import url('https://fonts.googleapis.com/css?family=Orbitron');
font-family: 'Orbitron', sans-serif;
font-size:28px;
color:${props => props.color}
`
