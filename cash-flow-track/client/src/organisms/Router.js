import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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

class Router extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            filteredRecords: [],
            viewedRecord: { id: 0 },
            editableRecord: { id: 0 },
            total: 0,
        }
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

    handleAddBtn = (history) => {
        history.push('/add')
    }

    handleEditBtn = (history) => {
        history.push('/' + this.state.viewedRecord._id + '/edit')
    }

    handleFieldChange = (property, value) => {
        let temp = { ...this.state.editableRecord }
        temp[property] = value;
        this.setState({ editableRecord: temp })
    }

    handleCancelBtn = (history) => {
        history.push('/')
        this.componentDidMount()
    }

    handleAddApi = async (history) => {
        const { record_name, location, income, amount, details } = this.state.editableRecord
        await api.addServer(record_name, location, income, parseInt(amount), details)
        this.handleCancelBtn(history)
    }

    handleEditApi = async (history) => {
        const { _id, record_name, location, income, amount, details } = this.state.editableRecord
        await api.editServer(_id, record_name, location, income, amount, details)

        this.handleCancelBtn(history)
    }

    handleRemoveBtn = () => {
        api.removeServer(this.state.viewedRecord._id)
        this.componentDidMount()
    }

    handleRouterEdit = (_id) => {
        api.getRecords()
            .then(res => this.setState({ records: res }, () => {
                const RecordObject = this.state.records.find(record => record._id === _id)
                this.setState({
                    viewedRecord: RecordObject,
                    editableRecord: RecordObject
                })
            }))
    }


    render() {
        return (
            <BrowserRouter>
                <StyledApp>
                    <Header />
                    <Route exact path="/" render={({ match, location, history }) =>
                        <Context.Provider value={{
                            viewedRecord: this.state.viewedRecord,
                            total: this.state.total,
                            handleAddBtn: () => this.handleAddBtn(history),
                            handleEditBtn: () => this.handleEditBtn(history),
                            handleRemoveBtn: this.handleRemoveBtn,
                            filteredRecords: this.state.filteredRecords,
                            handleSideClick: this.handleSideClick,
                            handleFilterChange: this.handleFilterChange
                        }} >
                            <SideBar />
                            <Manager />
                            <Main />
                        </Context.Provider>
                    } />
                    <Route path="/add" render={({ match, location, history }) =>
                        <Context.Provider value={{
                            isAddModalViewed: true,
                            handleCancelBtn: () => this.handleCancelBtn(history),
                            handleFieldChange: this.handleFieldChange,
                            handleAddApi: () => this.handleAddApi(history)
                        }} >
                            <Add />
                        </Context.Provider>
                    } />
                    <Route path="/:_id/edit" render={({ match, location, history }) =>
                        <Context.Provider value={{
                            isEditModalViewed: true,
                            handleCancelBtn: () => this.handleCancelBtn(history),
                            editableRecord: this.state.editableRecord,
                            handleFieldChange: this.handleFieldChange,
                            handleEditApi: () => this.handleEditApi(history)
                        }} >
                            <Edit cb={() => this.handleRouterEdit(match.params._id)}/>
                        </Context.Provider>
                    } />
                    <Footer />
                </StyledApp>
            </BrowserRouter>

        );
    }
}

export default Router;

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

