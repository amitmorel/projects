import React from "react";
import styled from "@emotion/styled";

class SingleHousePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickHandler: undefined
    };
  }

  componentDidMount() {
    this.setState({ clickHandler: this.props.clickHandler });
  }

  render() {
    const {
      _id,
      image,
      title,
      type,
      space,
      price,
      reviews,
      rating
    } = this.props.home;
    const { clickHandler, history ,redirect} = this.props;
    if (this.state.clickHandler) {
      return (
        <House onClick={() => clickHandler(history, _id , redirect)}>
          <ImgWrap>
            <StyledImage src={image} />
          </ImgWrap>

          <StyledA>
            {type} • {space.beds} beds
          </StyledA>
          <Title>{title}</Title>
          <SubTitle>₪{price} per night • Free Cancellation</SubTitle>
          <Rating>
            <Stars> {"★".repeat(rating)} </Stars>
            {reviews.length} • Superhost
          </Rating>
        </House>
      );
    } else {
      return <h6 style={{ color: "white" }}>Loading ...</h6>;
    }
  }
}

export default SingleHousePreview;

const ImgWrap = styled.div`
  width: 250px;
  height: 160px;
  overflow: hidden;
  border-radius: 5px;
`;

const House = styled.div`
  cursor: pointer;
  width: 250px;
  height: 280px;

  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: normal;
`;
const StyledImage = styled.img`
  width: 100%;
`;
const StyledA = styled.p`
  color: #800000;
  font-size: 12px;
  text-transform: uppercase;
  margin: 1px;
`;
const Title = styled.p`
  font-size: 18px;
  margin: 1px;
  font-weight: bold;
`;
const SubTitle = styled.p`
  font-size: 14px;
  margin: 1px;
`;
const Rating = styled.p`
  font-size: 12px;
  margin: 1px;
`;

const Stars = styled.span`
  color: #008489;
`;
