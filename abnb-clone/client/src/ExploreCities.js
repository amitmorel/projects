import React from "react";
import styled from "@emotion/styled";

class ExploreCities extends React.Component {
  clickCity(input) {
    this.props.history.push("/" + input + "/search-results");
  }

  render() {
    return (
      <Container>
        {citiesArray.map(city => (
          
          <CityContainer key={city.image} onClick={() => this.clickCity(city.name)}>
            <CityImageWrap>
              <CityImage src={city.image} />
              <CityNameWrap>
                <CityName>{city.name}</CityName>
              </CityNameWrap>
            </CityImageWrap>
          </CityContainer>
        ))}
      </Container>
    );
  }
}

export default ExploreCities;

const citiesArray = [
  {
    name: "Paris",
    image:
      "https://cdn-web.sidlee.com/-/media/sidlee/cities/paris/sidlee-cities-pre-par-01_798x895.jpg?mw=1420&hash=0DA87CBA5A6626B67D73CB08579BDFD6E46CB2E6"
  },
  {
    name: "Shanghai",
    image:
      "http://www.lonelyplanet.com/travel-blog/tip-article/wordpress_uploads/2017/03/Shanghai_for_free-abe6e2eb510b.jpg"
  },
  {
    name: "Tokio",
    image:
      "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/2142/SITours/ochtendtour-van-tokio-meiji-shrine-senso-ji-temple-en-ginza-shopping-in-tokyo-168307.jpg"
  },
  {
    name: "Rotterdam",
    image:
      "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/rotterdam-netherlands.jpg?itok=02t7ufYs"
  },
  {
    name: "Eilat",
    image:
      "https://new.goisrael.com/sites/default/files/styles/1397x735_article_full/public/Eilat%201397X735.jpg?itok=urD9QDZ1"
  }
];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 193px);
  grid-gap: 25px 20px;
  cursor: pointer;
`;
const CityContainer = styled.div``;

const CityImageWrap = styled.div`
  position: relative;
  height: 240px;
  width: 193px;
  overflow: hidden;
  border-radius: 5px;
`;
const CityImage = styled.img`
  height: 100%;
  filter: brightness(75%);
`;
const CityName = styled.h2`
  text-align: center;
  font-size:22px;
`;

const CityNameWrap = styled.div`
  width: 100%;
  position: absolute;
  top: 65%;
  left: 0%;
  color: white;
`;
