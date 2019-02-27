import React, { Component } from 'react';
import styled from '@emotion/styled'
import MainTitle from '../atoms/MainTitle';
import Context from '../organisms/Context'

class Main extends Component {
  render() {
    return (
      <Context.Consumer>
        {({ viewedRecord, handleAddBtn, handleEditBtn, handleRemoveBtn }) => (
          <StyledMain>
            <div>
              <StyledButton onClick={() => handleAddBtn()}>Add New</StyledButton>
              <StyledButton onClick={() => handleRemoveBtn()}>Remove Current</StyledButton>
              <StyledButton onClick={() => handleEditBtn()}>Edit Current</StyledButton>
            </div>
            <div>
              <MainTitle title={'Record Name'} />
              <StyledValue>{viewedRecord.record_name}</StyledValue>
            </div>
            <div>
              <MainTitle title={'Location'} />
              <StyledValue>{viewedRecord.location}</StyledValue>
            </div>
            <div>
              <MainTitle title={'Type'} />
              <StyledValue>{viewedRecord.income === undefined ? '' : (viewedRecord.income ? "Income" : "Expense")}</StyledValue>
            </div>
            <div>
              <MainTitle title={'Cost'} />
              <StyledValue>{viewedRecord.amount}</StyledValue>
            </div>
            <div>
              <MainTitle title={'Details'} />
              <StyledValue>{viewedRecord.details}</StyledValue>
            </div>
          </StyledMain>
        )}
      </Context.Consumer>

    );
  }
}

export default Main;


const StyledMain = styled.div`
  grid-area: Main; 
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  color:#388fa3;
  padding-left:30px;
`

const StyledButton = styled.button`
  @import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');
  cursor:pointer;
  background:#56afc1;
  color:white;
  border-radius:15px;
  border:1px #56afc1 solid;
  font-size:20px;
  letter-spacing:3px;
  font-family: 'Shadows Into Light', cursive;
  margin:0 15px;
`

const StyledValue = styled.span`
  font-size:20px;
  color
`
