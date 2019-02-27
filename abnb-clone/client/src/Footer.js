import React from "react";
import styled from "@emotion/styled";


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({
      isVisible: true
    });
  }

  handleClose() {
    this.setState({
      isVisible: false
    });
  }
  render() {
    return (
      <>
        <FooterDetails visibilityProp={this.state.isVisible}>
          <FooterListWrap>
            <FooterList>
              <FooterListHeader>AirBnB</FooterListHeader>
              <FooterListItem>Careers</FooterListItem>
              <FooterListItem>Press</FooterListItem>
              <FooterListItem>Policies</FooterListItem>
              <FooterListItem>Help</FooterListItem>
              <FooterListItem>Careers</FooterListItem>
              <FooterListItem>Diversity and Belonging</FooterListItem>
            </FooterList>

            <FooterList>
              <FooterListHeader>Discover</FooterListHeader>
              <FooterListItem>Trust and Safety</FooterListItem>
              <FooterListItem>Travel Credit</FooterListItem>
              <FooterListItem>Gift Card</FooterListItem>
              <FooterListItem>AirBnB Citizen</FooterListItem>
              <FooterListItem>Business Travel</FooterListItem>
              <FooterListItem>Guidebooks</FooterListItem>
              <FooterListItem>Airbnbmag</FooterListItem>
              <FooterListItem>Events</FooterListItem>
            </FooterList>

            <FooterList>
              <FooterListHeader>Hosting</FooterListHeader>
              <FooterListItem>Why host</FooterListItem>
              <FooterListItem>Hospitality</FooterListItem>
              <FooterListItem>Responsible Hosting</FooterListItem>
              <FooterListItem>Community Center</FooterListItem>
              <FooterListItem>Host an Experience</FooterListItem>
              <FooterListItem>Open Homes</FooterListItem>
            </FooterList>

            <FooterList>
              <IconsWrap>
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i className="fab fa-instagram" />
              </IconsWrap>
              <FooterListItem>Terms</FooterListItem>
              <FooterListItem>Privacy</FooterListItem>
              <FooterListItem>Site Map</FooterListItem>
            </FooterList>
          </FooterListWrap>
          <CreditsWrap>AirBnB clone by Vicky and Amit</CreditsWrap>

          <CloseBtn onClick={this.handleClose}>
            <i className="fas fa-times" />
            <span>Close</span>
          </CloseBtn>
        </FooterDetails>
        <FooterWrap
          onClick={this.handleClick}
          visibilityProp={this.state.isVisible}
        >
          <FooterBtn>
            <i className="fas fa-globe" />
            <span>Terms, Privacy, Currency & More</span>
          </FooterBtn>
        </FooterWrap>
      </>
    );
  }
}

export default Footer;

const FooterDetails = styled.div`
  border-top: 1px lightgray solid;
  bottom: 0;
  height: 400px;
  background: white;
  position: fixed;
  width: 100%;
  padding: 0px;
  display: ${props => (props.visibilityProp ? "flex;" : "none;")};
  justify-content: center;
`;

const FooterWrap = styled.div`
display:${props => (props.visibilityProp ? "none;" : "flex;")}
bottom: 13px;
right: 13px;
position: fixed;

`;

const FooterBtn = styled.button`

cursor:pointer;
background-color:white;
outline: none;
border:none;
border-radius: 3px;
padding: 5px;
font-size: 14px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px;
i{
    padding:5px;
}
}
`;

const CloseBtn = styled.button`
bottom: 13px;
right: 13px;
position: fixed;

cursor:pointer;
background-color:white;
outline: none;
border:none;
border-radius: 3px;
padding: 5px;
font-size: 17px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px;
i{
    padding:7px;
}
}
`;

const FooterListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-gap: 70px;
  margin-top: 30px;
  border-bottom: 1px lightgray solid;
`;

const FooterList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const FooterListItem = styled.li`
  cursor: pointer;
`;

const FooterListHeader = styled.h4`
  color: rgb(72, 72, 72);
`;
const IconsWrap = styled.div`
  color: rgb(121, 121, 121);
  display: flex;
  margin: 20px 0px 20px 0px;
  justify-content: space-between;
  width: 70px;
`;
const CreditsWrap = styled.div`
  position: absolute;
  bottom: 50px;
  left: 240px;
  font-size: 14px;
`;