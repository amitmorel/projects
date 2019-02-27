import React from "react";
import HousePreview from "./SingleHousePreview";
import styled from "@emotion/styled";

class MultiHousesPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: undefined
    };
  }
  async componentDidMount() {
    const temp = await this.props.houseArray;
    this.setState({ array: temp });
  }

  render() {
    const { array } = this.state;
    const { imgWidth, rowItems, clickHandler, history , redirect } = this.props;
    if (array) {
      return (
        <HousesPreviewWrap imgWidth={imgWidth} rowItems={rowItems}>
          {array.map((house, i) => (
            <HousePreview
              key={i}
              home={house}
              clickHandler={clickHandler}
              history={history}
              redirect={redirect}
            />
          ))}
        </HousesPreviewWrap>
      );
    } else {
      return <h6 style={{ color: "white" }}>Loading ...</h6>;
    }
  }
}

export default MultiHousesPreview;

const HousesPreviewWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${props => props.rowItems},
    ${props => props.imgWidth}px
  );
  grid-gap: 25px 15px;
`;
