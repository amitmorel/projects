import React from "react";
import styled from "@emotion/styled";
import Dates from "./Dates";
import Map from "./Map";
import BookingWindow from "./bookingWindow";
import MultiHousesPreview from "./MultiHousesPreview";
import api from "./api";

class House extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseListing: undefined
    };
  }
  async componentDidMount() {
    await this.props.cb();
    this.setState({ houseListing: this.props.home });
  }

  similarListing = async (query, slicer) => {
    const all = await api.getAllData();
    const filtered = all.filter(record => record.address.city === query);
    return filtered.slice(0, slicer);
  };

  render() {
    if (!this.state.houseListing) return <h6 style={{ color: "white" }}>Loading ...</h6>;

    const {
        _id,
        title,
        type,
        image,
        description,
        price,
        space,
        bookings,
        address,
        rating,
        owner,
        reviewsCount,
        reviews
      } = this.state.houseListing;

      const booked = bookings.map(book => ({
        after: new Date(Date.parse(book.startDate) - 86400000),
        before: new Date(Date.parse(book.endDate) + 86400000)
      }));

      return (
        <>
          <MainImageWrap>
            <MainImage src={image} />
          </MainImageWrap>
          <PageWrap>
            <MainWrap>
              <BookingWrap>
                {" "}
                <BookingWindow
                  id={_id}
                  bookings={bookings}
                  price={price}
                  rating={rating}
                  reviews={reviews}
                />
              </BookingWrap>
              <HouseInfoWrap>
                <Container>
                  <TitleWrap>
                    <OwnerImgWrap>
                      {" "}
                      <OwnerImg src={owner.pic} /> <span>{owner.name}</span>
                    </OwnerImgWrap>

                    <Type>{type}</Type>
                    <Title>{title}</Title>
                    <TitleCity>{address.city}</TitleCity>

                    <SpaceInfo>
                      <i className="fas fa-users" /> {space.guests} guests{" "}
                      {space.beds} bed {space.bedrooms} bath
                    </SpaceInfo>
                  </TitleWrap>
                </Container>

                <Container>
                  <DescriptionWrap>{description}</DescriptionWrap>
                  <SubTitle>Amenities</SubTitle>
                  <AmenitiesWrap>
                    <Amenity>
                      <i className="fas fa-tv"> </i> TV
                    </Amenity>
                    <Amenity>
                      <i className="fas fa-wifi" /> WiFi
                    </Amenity>
                    <Amenity>
                      <i className="fas fa-thermometer-three-quarters" />
                      Heating
                    </Amenity>
                    <Amenity>
                      <i className="fas fa-snowflake" />
                      AC
                    </Amenity>
                  </AmenitiesWrap>
                </Container>

                <Container>
                  <AvilabilityWrap>
                    <ReviewsTitle>Avilability</ReviewsTitle>
                    <p>Updated today</p>

                    <Dates dates={booked} startMonth={1} />
                  </AvilabilityWrap>
                </Container>

                <Container>
                  <ReviewsTitle>{reviewsCount} Reviews </ReviewsTitle>
                  <Stars>{"★".repeat(rating)}</Stars>
                </Container>

                {reviews.map(one => (
                  <Container key={one.pic}>
                    <ReviewWrap>
                      <RateImg src={one.pic} />
                      <div>
                        <MiniTitle>{one.name}</MiniTitle>
                        <DateTitle>{one.date}</DateTitle>
                      </div>
                    </ReviewWrap>

                    <div>{one.content}</div>
                  </Container>
                ))}
                <Container>
                  <OwnerImg src={owner.pic} />
                  <ReviewsTitle>Hosted By {owner.name}</ReviewsTitle>
                  <MiniTitle>
                    <span>
                      {address.city},{address.country} · Joined in{" "}
                      {owner.joined}
                    </span>
                  </MiniTitle>
                  <MiniTitle>★ {reviewsCount} Reviews</MiniTitle>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque tempor nunc sed neque pellentesque, quis
                    accumsan nisi mollis. Nam sagittis fringilla felis sit amet
                    tincidunt. Cras at sapien tellus. Nulla facilisi. Nunc a
                    neque lorem. Duis convallis quis purus vel aliquam.
                  </div>
                  <br />
                  <MiniTitle>
                    Languages: <BoldSpan>{owner.languages}</BoldSpan>
                  </MiniTitle>
                  <ContactHostBtn>Contact host</ContactHostBtn>
                </Container>
                <Container>
                  <ReviewsTitle>The neighborhood</ReviewsTitle>
                  <MapWrap>
                    {" "}
                    <Map
                      center={{ lat: address.Latitude, lng: address.Longitude }}
                    />
                  </MapWrap>
                </Container>
                <Container>
                  <ReviewsTitle>Similar Listings</ReviewsTitle>
                  <SimilarListingsWrap>
                    <MultiHousesPreview
                      imgWidth={250}
                      rowItems={3}
                      redirect={true}
                      history={this.props.history}
                      clickHandler={this.props.clickHandler}
                      houseArray={this.similarListing(address.city, 3)}
                    />
                  </SimilarListingsWrap>
                </Container>
              </HouseInfoWrap>
            </MainWrap>
          </PageWrap>
        </>
      );
    
  }
}

export default House;

const MainImageWrap = styled.div`
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  border: 1px solid black;
`;
const MainImage = styled.img`
  width: 100%;
`;
const Container = styled.div`
  border-bottom: 1px lightgray solid;
  padding-bottom: 20px;
  margin-top: 20px;
`;
const Type = styled.p`
  color: #a52903;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin: 0;
`;
const Title = styled.p`
  font-size: 32px;
  font-weight: 700;
  color: #484848;
  margin: 0;
  padding-bottom: 5px;
`;
const TitleCity = styled.p`
  font-size: 17px;
  margin: 0;
  padding-bottom: 12px;
  color: #484848;
`;
const MiniTitle = styled.h3`
  font-size: 16px;
  padding: 5px 0px 15px 0px;
  margin: 0;
  font-weight: 400;
`;
const RateImg = styled.img`
  border-radius: 50%;
  height: 50px;
  float: left;
  margin-right: 30px;
`;

const OwnerImg = styled.img`
  border-radius: 50%;
  height: 65px;
  width: 65px;
  float: right;
`;

const HouseInfoWrap = styled.div`
  margin: 0px 0px 0px 0px;
  width: 58%;
  float: left;
`;
const TitleWrap = styled.div`
  margin: 0px 0px 0px 0px;
`;
const SpaceInfo = styled.p`
  font-size: 16px;

  font-weight: bold;

  color: #484848;
`;
const DescriptionWrap = styled.p`
  font-size: 17px;

  color: #484848;
`;
const AmenitiesWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
`;

const AvilabilityWrap = styled.div``;

const SubTitle = styled.p`
  font-size: 17px;
  margin: 0;
  padding-bottom: 12px;
  color: #484848;
  font-weight: bold;
`;

const Amenity = styled.div`
  margin: 10px 0px 10px 0px;
`;
const ReviewsTitle = styled.h2`
  color: #484848;
  display: inline;
`;
const Stars = styled.span`
  color: #008489;
`;

const MainWrap = styled.div``;

const DateTitle = styled.span`
  font-size: 14px;
`;

const ReviewWrap = styled.div`
  margin-bottom: 20px;
`;

const MapWrap = styled.div`
  margin-top: 20px;
`;
const OwnerImgWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  float: right;
  align-items: center;
`;
const SimilarListingsWrap = styled.div`
  margin-top: 20px;
`;
const BoldSpan = styled.span`
  font-weight: bold;
`;

const ContactHostBtn = styled.button`
  cursor: pointer;
  font-size: 14px;
  width: 130px;
  color: #008489;
  outline: none;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #008489;
  padding: 10px 15px 10px 15px;
`;
const PageWrap = styled.div`
display:flex;
align-items: flex-start;
  margin-top: 30px;
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  padding-right: 24px;
  padding-left: 24px;
`;
const BookingWrap = styled.div`
  position: sticky;
  top: 30px;
`;
