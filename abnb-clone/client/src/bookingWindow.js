import React from "react";
import styled from "@emotion/styled";
import api from "./api";

class BookingWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: undefined,
      endDate: undefined,
      status: ""
    };
  }

  onFieldChange = (field, date) => {
    this.setState({ [field]: date });
  };

  theActualBooking = async (startDate, endDate) => {
    const { id, bookings } = this.props;
    let isAvilable = true;
    if (typeof startDate === "undefined" || typeof endDate === "undefined") {
      isAvilable = false;
      this.setState({ status: "Invalid date/s" });
    }
    if (startDate > endDate) {
      isAvilable = false;
      this.setState({ status: "Are you a time traveler ?" });
    }
    for (let oneBook of bookings) {
      if (oneBook.startDate <= endDate && oneBook.endDate >= startDate) {
        isAvilable = false;
        this.setState({ status: "Sorry, dates taken" });
      }
    }
    if (isAvilable) {
      bookings.push({
        startDate,
        endDate
      });
      await api.postBooking(id, bookings);
      this.setState({ status: "Booked!" });
    }
  };

  render() {
    const { price, rating, reviews } = this.props;
    const { startDate, endDate, status } = this.state;
    return (

      <BookingWrap>

        <PriceSection>
          <Price>₪{price}</Price> <Per>per night</Per>
        </PriceSection>

        <RatingWrap>
          <Stars>{"★".repeat(rating)}</Stars>
          <Count>{reviews.length}</Count>
        </RatingWrap>

        <DatesWrap>
          <BookingTitle>Dates</BookingTitle>
          <DatesInputWrap>
            <DateInputWrap>
              <DateInput
                placeholder={startDate}
                type="date"
                onChange={e => this.onFieldChange("startDate", e.target.value)}
              />
            </DateInputWrap>
            <DateInputWrap>
              <DateInput
                placeholder={endDate}
                type="date"
                onChange={e => this.onFieldChange("endDate", e.target.value)}
              />
            </DateInputWrap>
          </DatesInputWrap>
        </DatesWrap>

        <GuestsWrap>
          <BookingTitle>Guests</BookingTitle>
          <GuestInput type="number" placeholder={"1 guest"} />
        </GuestsWrap>

        <ButtonWrap>
          <BookBtn onClick={() => this.theActualBooking(startDate, endDate)}>
            Book
          </BookBtn>
          <BookingTitle>You won’t be charged yet</BookingTitle>
        </ButtonWrap>

        <Status>{status}</Status>
        
      </BookingWrap>
    );
  }
}

export default BookingWindow;

const BookingWrap = styled.div`
  float: right;
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 20px 30px 20px 30px;
  border: 1px lightgray solid;
`;

const PriceSection = styled.div``;

const Price = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: #484848;
`;
const Per = styled.span``;

const RatingWrap = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px lightgray solid;
`;
const Stars = styled.span`
  font-size: 14px;
  color: #008489;
`;
const Count = styled.span`
  font-size: 14px;
`;

const DatesWrap = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px lightgray solid;
`;

const BookingTitle = styled.h5`
  font-weight: 400;
  margin: 0;
  padding: 5px 0px 5px 0px;
  color: #484848;
`;

const DatesInputWrap = styled.div`
  border: 1px lightgray solid;
  padding: 3px;
  border-radius: 5px;
`;
const DateInput = styled.input`
  outline: none;
  border: none;
`;
const DateInputWrap = styled.div`
  display: table-cell;
`;

const GuestsWrap = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px lightgray solid;
`;

const GuestInput = styled.input`
  outline: none;
  border: none;
  border: 1px lightgray solid;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
`;
const BookBtn = styled.button`
  cursor: pointer;
  background-color: rgb(255, 90, 95);
  color: white;
  width: 100%;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonWrap = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px lightgray solid;
  text-align: center;
`;

const Status = styled.h4`
  font-weight: 400;
  margin: 0;
  padding: 5px 0px 5px 0px;
  color: #484848;
`;
