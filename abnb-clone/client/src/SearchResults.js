import React from "react";
import MultiHousesPreview from "./MultiHousesPreview";
import api from "./api";
import styled from "@emotion/styled";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredArray: undefined,
      noValues: true
    };
  }

  filterHelper = target => {
    return target.toLowerCase().includes(this.props.query.toLowerCase());
  };

  filter = async () => {
    const all = await api.getAllData();
    const filtered = all.filter(
      record =>
        this.filterHelper(record.address.city) ||
        this.filterHelper(record.address.country)
    );
    if (filtered.length !== 0) this.setState({ noValues: false })
    return filtered;
  };

  render() {
    const { query, history, clickHandler } = this.props;
    return (
      <ResultsWrap>
        <ResultsTitle> {(this.state.noValues) ? " " : `Explore options in ${query}`} </ResultsTitle>
        <Results>
          <MultiHousesPreview
            imgWidth={250}
            rowItems={5}
            history={history}
            clickHandler={clickHandler}
            houseArray={this.filter()}
          />
        </Results>
      </ResultsWrap>
    );
  }
}

export default SearchResults;

const ResultsWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const ResultsTitle = styled.h1`
  color: #484848;
  padding-bottom: 30px;
`;

const Results = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;
