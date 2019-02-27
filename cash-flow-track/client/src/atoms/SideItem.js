import React, { Component } from 'react';
import styled from '@emotion/styled'
import Context from '../organisms/Context'

class SideItem extends Component {
  render() {
    const {object} = this.props
    const { record_name, income, amount } = object
    return (
      <Context.Consumer>
        {({ handleSideClick, viewedRecord }) => (
          <StyledSideItem onClick={() => handleSideClick(object)} backgroundColor={(viewedRecord === object) ? '#246e89' : ''} textColor={(viewedRecord === object) ? 'white' : 'black'}>
            <img src={income ? require('../img/CCgreen.svg') : require('../img/CCred.svg')} alt='' />
            <h3>{record_name}</h3>
            <h4>{amount}</h4>
          </StyledSideItem>
        )}
      </Context.Consumer>
    );
  }
}

export default SideItem;


const StyledSideItem = styled.div`
  display:flex;
  cursor:pointer;
  flex-direction:row;
  height:40px;
  margin-right:auto;
  align-items:center;
  padding: 10px 0;
  & img {
    width:10%;
    padding:0 10px;
  }
  border-bottom: 1px gray solid;
  & h4 {
    margin-left:auto;
    padding-right:5px;
  }
  background-color:${props => props.backgroundColor};
  color:${props => props.textColor};
`
