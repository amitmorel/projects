import React, { Component } from 'react';
import styled from '@emotion/styled'
import SideItem from '../atoms/SideItem';
import Context from '../organisms/Context'


class SideBar extends Component {
  render() {
    return (
      <Context.Consumer>
        {({ filteredRecords }) => (
          <StyledSideBar>
            {filteredRecords.map(record => <SideItem key={record._id} object={record} />)}
          </StyledSideBar>
        )}
      </Context.Consumer>

    );
  }
}

export default SideBar;


const StyledSideBar = styled.div`
  grid-area: SideBar; 
  overflow-y: scroll;
`