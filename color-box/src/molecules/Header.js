import React, { Component } from 'react';
import styled from '@emotion/styled'

const StyledHeader=styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display:flex;
  align-items: center;
  border-bottom: 1px solid #cacad9;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.16);
  overflow: hidden;
`
const Figure=styled.div`
  width:176px; 
  overflow:hidden; 
  margin:-40px 0; 
`
const Image=styled.img`
  display:block; 
  width:100%; 
`

const ButtonsContainer=styled.div`
  margin-left:auto;
}
  
`
const Buttton=styled.a`
  padding: 8px 32px;
  border-radius: 24px;
  cursor: pointer;
  transition: all .2s;
  margin-left: 8px;
  font-weight: bold;
  color:${props => props.color};
  background-color:${props => props.backgroundColor};
  border:${props => props.border};
  text-decoration:none;
`


class Header extends Component {
  
  render() {
    return (
      <StyledHeader>
        <Figure><Image src='https://cdn.dribbble.com/users/31752/screenshots/5417646/colorbox-logo.png' alt=''></Image></Figure>
        <ButtonsContainer>
          <Buttton href='./' style={{color:'black',backgroundColor: '#fff', border: '2px solid #cacad9'}}>Reset</Buttton>
          <Buttton href='./' style={{color:'white', backgroundColor: '#8b37ff', borderColor: '#8b37ff'}}>Share</Buttton>
        </ButtonsContainer>
      </StyledHeader>
    );
  }
}

export default Header;
