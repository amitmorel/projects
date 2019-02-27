import React, { Component } from 'react';
import styled from '@emotion/styled'
import Filter from '../atoms/Filter';
import Total from '../atoms/Total';

class Manager extends Component {
  render() {
    return (
      <StyledManager>
        <Filter />
        <Total />
      </StyledManager>
    );
  }
}

export default Manager;

const StyledManager = styled.div`
    grid-area: Manager; 
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
`