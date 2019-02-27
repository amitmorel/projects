import React, { Component } from 'react';
import styled from '@emotion/styled'


import Header from '../molecules/Header';
import Main from '../molecules/Main';
import Edit from '../molecules/Edit';
import Add from '../molecules/Add';
import SideBar from '../molecules/SideBar';
import Manager from '../molecules/Manager';
import Footer from '../molecules/Footer';
import Context from './Context'
import api from '../api/index'

class App extends Component {

  state = {
    records: [],
    filteredRecords: [],
    viewedRecord: { id: 0 },
    editableRecord: { id: 0 },
    isAddModalViewed: false,
    isEditModalViewed: false,
    total: 0,
  }

  async componentDidMount() {
    this.setState({
      records: await api.getRecords(),
    }, (state) => {
      this.setState({
        total: this.calculateTotal(),
        filteredRecords: this.state.records,
      })
      if (this.state.filteredRecords[0]) {
        this.setState({
          viewedRecord: this.state.filteredRecords[0],
          editableRecord: this.state.filteredRecords[0]
        })
      }
    })

  }

  calculateTotal = () => {
    let total = 0
    for (let record of this.state.records) {
      if (record.income) total += record.amount
      else if (!record.income) total -= record.amount
    }
    return total
  }

  handleFilterChange = (filterValue) => {
    this.setState(state => ({ filteredRecords: state.records.filter(record => record.record_name.toLowerCase().includes(filterValue.toLowerCase())) }))
  }

  handleSideClick = (RecordObject) => {
    this.setState({
      viewedRecord: RecordObject,
      editableRecord: RecordObject
    })
  }

  handleAddBtn = () => {
    this.setState({ isAddModalViewed: true })
  }

  handleEditBtn = () => {
    this.setState({ isEditModalViewed: true })
  }

  handleFieldChange = (property, value) => {
    let temp = { ...this.state.editableRecord }
    temp[property] = value;
    this.setState({ editableRecord: temp })
  }

  handleCancelBtn = () => {
    this.setState({ isAddModalViewed: false })
    this.setState({ isEditModalViewed: false })
    this.componentDidMount()
  }

  handleAddApi = async ()=> {
    const {record_name,location,income,amount,details} = this.state.editableRecord
    await api.addServer(record_name,location,income,parseInt(amount),details)
    this.handleCancelBtn()
  }

  handleEditApi = async () => {
    const { _id, record_name, location, income, amount, details } = this.state.editableRecord
    await api.editServer(_id, record_name, location, income, amount, details)
    this.handleCancelBtn()
  }

  handleRemoveBtn = () => {
    api.removeServer(this.state.viewedRecord._id)
    this.componentDidMount()
  }

  render() {
    return (
      <Context.Provider value={{
        records: this.state.records ,
        filteredRecords: this.state.filteredRecords ,
        viewedRecord: this.state.viewedRecord   ,
        editableRecord: this.state.editableRecord ,
        isAddModalViewed: this.state.isAddModalViewed,
        isEditModalViewed: this.state.isEditModalViewed,
        total: this.state.total,
        handleFilterChange: this.handleFilterChange ,
        handleFieldChange: this.handleFieldChange ,
        handleAddBtn: this.handleAddBtn ,
        handleEditBtn: this.handleEditBtn ,
        handleCancelBtn: this.handleCancelBtn ,
        handleSideClick: this.handleSideClick ,
        handleAddApi: this.handleAddApi ,
        handleEditApi: this.handleEditApi ,
        handleRemoveBtn:this.handleRemoveBtn 
      }} >
        <StyledApp>
          <Header />
          <SideBar />
          <Manager />
          <Main />
          <Add />
          <Edit />
          <Footer />
        </StyledApp>
      </Context.Provider>
    );
  }
}

export default App;


const StyledApp = styled.div`
  display:grid;
  height:100vh;
  width:100vw;
  grid-template: 3fr 1fr 15fr 1fr/ 400px 1fr;
  grid-template-areas:
    "Header Header"
    "Manager Main"
    "SideBar Main"
    "Footer Footer";
    &>*{
      border:2px #91d1d3 solid;
    };
`


// const { filteredRecords, viewedRecord, total, isAddModalViewed, isEditModalViewed, editableRecord } = this.state
// filteredRecords={filteredRecords} clickCallBack={this.handleSideClick} chosenRecord={viewedRecord}                  
// filterCallBack={this.handleFilterChange} total={total}                                                              
// chosenRecord={viewedRecord} onAdd={this.handleAddBtn} onEdit={this.handleEditBtn}                                   
// isShown={isAddModalViewed} edit={this.handleFieldChange} objectToEdit={editableRecord} after={this.handleCancelBtn} 
// isShown={isEditModalViewed} edit={this.handleFieldChange} objectToEdit={editableRecord} after={this.handleCancelBtn}

