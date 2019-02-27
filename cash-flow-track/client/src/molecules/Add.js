import React, { Component } from 'react';
import styled from '@emotion/styled'
import MainTitle from '../atoms/MainTitle';
import Context from '../organisms/Context'

class Add extends Component {
  render() {
    return (
      <Context.Consumer>
        {({ isAddModalViewed, handleCancelBtn, handleFieldChange, handleAddApi }) => (
          <Modal display={isAddModalViewed ? 'block' : 'none'}>
            <StyledAdd>
              <div>
                <MainTitle title={'Record Name'} />
                <StyledTextbox onBlur={(e) => handleFieldChange('record_name', e.target.value)}></StyledTextbox>
              </div>
              <div>
                <MainTitle title={'Location'} />
                <StyledTextbox onBlur={(e) => handleFieldChange('location', e.target.value)}></StyledTextbox>
              </div>
              <div>
                <MainTitle title={'Type'} />
                <input type="radio" name="type" onBlur={(e) => handleFieldChange('income', true)}></input>Income
            <input type="radio" name="type" onBlur={(e) => handleFieldChange('income', false)}></input>Expense
          </div>
              <div>
                <MainTitle title={'amount'} />
                <StyledTextbox onBlur={(e) => handleFieldChange('amount', e.target.value)}></StyledTextbox>
              </div>
              <div>
                <MainTitle title={'Details'} />
                <StyledTextbox onBlur={(e) => handleFieldChange('details', e.target.value)}></StyledTextbox>
              </div>
              <div>
                <StyledButton onClick={() => handleAddApi()}>Save Changes</StyledButton>
                <StyledButton onClick={() => handleCancelBtn()}>Cancel</StyledButton>
              </div>
            </StyledAdd>
          </Modal>
        )}
      </Context.Consumer>
    );
  }
}

export default Add;


const Modal = styled.div`
  display:${props => props.display};
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:100vw;
  background-color: rgb(0,0,0,0.6)
`

const StyledAdd = styled.div`
position:absolute;
  top:20vh;
  left:35vw;
  background-color: #eee6d1;
  display:inline-flex;
  padding: 40px 50px;
  flex-direction:column;
  justify-content:space-around;
  color:#388fa3;
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

const StyledTextbox = styled.input``
