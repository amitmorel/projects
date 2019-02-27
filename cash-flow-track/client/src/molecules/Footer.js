import React, { Component } from 'react';
import styled from '@emotion/styled'

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        created by Amit Morel * icons by <a href="https://fontawesome.com/license">Font Awesone</a>
      </StyledFooter>
    );
  }
}

export default Footer;


const StyledFooter = styled.div`
  grid-area: Footer; 
  text-align:center;
  padding:30px 0;
  font-weight:bold;
  color:#246e89;
  & a {
    text-decoration:none;
  }
`
