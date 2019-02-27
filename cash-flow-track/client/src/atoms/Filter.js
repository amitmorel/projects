import React, { Component } from 'react';
import styled from '@emotion/styled'
import Context from '../organisms/Context'


class Filter extends Component {
  render() {
    return (
      <Context.Consumer> 
      {({handleFilterChange}) => (
        <StyledFilter>
          <input
            placeholder="Enter Record Name"
            onChange={e => handleFilterChange(e.target.value)}
          >
          </input>
        </StyledFilter>
      )}
      </Context.Consumer>
    );
  }
}

export default Filter;

const StyledFilter = styled.div``