import React from "react";
import styled from "@emotion/styled";
import Context from "./Context";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
  }

  onSearch = query => {
    if (query) this.props.history.push("/" + query + "/search-redirect");
  };

  onFieldChange = (prop, value) => {
    this.setState({ [prop]: value });
  };

  render() {
    return (
      <Context.Consumer>
        {({ headerColor, borderColor, headerSearch }) => (
          <HeaderWrap borderColor={borderColor}>
            <Logo
              src={
                "https://cloud.githubusercontent.com/assets/17696209/23246257/df791648-f957-11e6-84cd-622e0b1cd676.png"
              }
              onClick={() => this.props.homepageHandler(this.props.history)}
            />

            <BtnWrap>
              <HeaderBtn headerColor={headerColor}>Become a host</HeaderBtn>
              <HeaderBtn headerColor={headerColor}>Help</HeaderBtn>
              <HeaderBtn headerColor={headerColor}>Sign Up</HeaderBtn>
              <HeaderBtn headerColor={headerColor}>Log in</HeaderBtn>
            </BtnWrap>
            <HeaderSearchWrap headerSearch={headerSearch}>
              <SearchBar
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.onSearch(this.state.searchInput);
                  }
                }}
              >
                <SearchLupa>
                  <i className="fas fa-search" />
                </SearchLupa>
                <SearchInput
                  placeholder=""
                  onChange={e =>
                    this.onFieldChange("searchInput", e.target.value)
                  }
                />
              </SearchBar>
            </HeaderSearchWrap>
          </HeaderWrap>
        )}
      </Context.Consumer>
    );
  }
}

export default Header;

const BtnWrap = styled.div``;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 350px;
  background-color: white;
  margin-top: 25px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 48px;
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
  width: 13%;
  padding: 5px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  border-right: 1px solid #e2e2e2;
  font-size: 17px;
  font-weight: bold;
  height: 100%;
  width: 100%;
`;

const HeaderWrap = styled.div`
  height: 81px;
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 5px 10px 10px 10px;
  border-bottom: 1px solid ${props => props.borderColor};
`;
const Logo = styled.img`
  cursor: pointer;
  height: 35px;
  display: block;
`;
const HeaderBtn = styled.button`
  outline: none;
  color: ${props => props.headerColor};
  cursor: pointer;
  background: transparent;
  border: 2px solid transparent;
  font-size: 15px;
  margin: 45px 15px 15px 15px;
  padding-bottom: 30px;
  &:hover {
    border-bottom: 2px solid ${props => props.headerColor};
  }
`;

const HeaderSearchWrap = styled.div`
  display: ${props => props.headerSearch};
  position: absolute;
  top: -11px;
  left: 72px;
`;
