import React from "react";
import styled from "@emotion/styled";
import api from "./api";
import MultiHousesPreview from "./MultiHousesPreview";
import ExploreCities from "./ExploreCities";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      dateInput: "",
      guestInput: ""
    };
  }

  onSearchClick = query => {
    if (query) this.props.history.push("/" + query + "/search-results");
  };

  onFieldChange = (prop, value) => {
    this.setState({ [prop]: value });
  };

  async editorPicker(num) {
    const original = await api.getAllData();
    let targetArray = original.slice(0, num);
    return targetArray;
  }

  render() {
    return (
      <>
        <SearchHomepage>
          <HomepageImage
            src={
              "https://playhardertours.com/wp-content/uploads/2018/06/this-club-for-luxury-second-homeowners-is-like-airbnb-for-the-ultra-rich-take-a-look-inside.jpg"
            }
          />
        </SearchHomepage>
        <SearchBox>
          <HomepageTitle>Plan your next trip</HomepageTitle>
          <SearchHomes>
            <SearchOptions>Homes</SearchOptions>
            <SearchBarWrap>
              <SearchBar>
                <SearchLupa>
                  <i className="fas fa-search" />
                </SearchLupa>
                <SearchInput
                  placeholder="Surfing in Los Angeles"
                  onChange={e =>
                    this.onFieldChange("searchInput", e.target.value)
                  }
                />
                <SearchDate type="date" placeholder="Dates" />
                <SearchGuests type="number" placeholder="Guests" />
              </SearchBar>
              <SearchBtn
                onClick={() => this.onSearchClick(this.state.searchInput)}
              >
                <i className="fas fa-search" />
              </SearchBtn>
            </SearchBarWrap>
          </SearchHomes>
        </SearchBox>

        <RecommendationsWrap>
          <Recommendations>
            <RecommendationsTitle>Editor's Picks</RecommendationsTitle>
            <MultiHousesPreview
              imgWidth={250}
              rowItems={4}
              history={this.props.history}
              clickHandler={this.props.clickHandler}
              houseArray={this.editorPicker(8)}
            />
          </Recommendations>
        </RecommendationsWrap>

        <ExploreWrap>
          <Recommendations>
            <ExploreTitle>Explore Cities</ExploreTitle>
            <ExploreCities history={this.props.history} />
          </Recommendations>
        </ExploreWrap>
      </>
    );
  }
}

export default Homepage;

const SearchHomepage = styled.div`
  background-color: white;
  position: absolute;
  z-index: -1;
  min-height: 100vh;
  min-width: 100vw;
  top: 0px;
  left: 0px;
`;

const HomepageImage = styled.img`
  min-height: 100vh;
  min-width: 100vw;
`;

const HomepageTitle = styled.h1`
  font-size: 50px;
  width: 520px;
  color: #ffffff;
  padding-bottom: 24px;
  text-shadow: 0 6px 32px #484848;
  font-weight: bold;
  padding-left: 24px;
  align-self: flex-start;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  margin: 0px 24px 0px 24px;
`;

const SearchHomes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 980px;
`;

const SearchOptions = styled.div`
  width: 100%;
  color: #ffffff;
  border-bottom: 1px solid white;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 17px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  background-color: white;
  height: 78px;
  border-radius: 5px;
  margin-top: 25px;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.65) !important;
`;

const SearchBarWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchBtn = styled.button`
  display: inline-block;
  width: 76px;
  height: 78px;
  padding: 23px;
  color: #ffffff;
  background: #ff5a5f;
  border: 1px solid #ff5a5f;
  border-radius: 5px;
  text-align: center;
  font-size: 30px;
  margin-top: 25px;
`;

const SearchLupa = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 24px;
  color: #484848;
  outline: none;
  height: 100%;
  width: 7%;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  border-right: 1px solid #e2e2e2;
  font-size: 17px;
  font-weight: bold;
  height: 100%;
  width: 55%;
`;

const SearchDate = styled.input`
  outline: none;
  border: none;
  border-right: 1px solid #e2e2e2;
  font-size: 17px;
  font-weight: bold;
  height: 100%;
  width: 25%;
  padding-left: 10px;
`;

const SearchGuests = styled.input`
  outline: none;
  border: none;
  width: 25%;
  height: 100%;
  font-size: 17px;
  font-weight: bold;
  padding-left: 10px;
`;

const RecommendationsWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin-top: 62vh;
`;

const RecommendationsTitle = styled.h2`
  color: #484848;
`;

const Recommendations = styled.span`
margin: 20px 0px 20px 0px;
`;

const ExploreWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const ExploreTitle = styled.h2`

  color: #484848;
`;
