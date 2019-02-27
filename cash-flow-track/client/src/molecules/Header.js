import React, { Component } from 'react';
import styled from '@emotion/styled'

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        Track Your Cash Flow
      </StyledHeader>
    );
  }
}

export default Header;


const StyledHeader = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');
  grid-area: Header; 
  font-family: 'Shadows Into Light', cursive;
  font-size:108px;
  text-align:center;
  letter-spacing:20px;
  color:#246e89;
  border-top:none;
  border-right:none;
  border:none;
`
