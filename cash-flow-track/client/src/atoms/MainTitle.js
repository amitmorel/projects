import React, { Component } from 'react';
import styled from '@emotion/styled'

class MainTitle extends Component {
  render() {
    const {title} = this.props
    return (
        <StyledTitle>{title}</StyledTitle>
    );
  }
}

export default MainTitle;


const StyledTitle = styled.span`
  @import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');
  font-family: 'Shadows Into Light', cursive;
  font-size:28px;
  text-decoration:underline;
  font-weight:bold;
  letter-spacing:3px;
  &::after {
    content:':';
  }
  padding-right:0.5em;
`