import React from "react";
import styled from "@emotion/styled";
import GoogleMapReact from "google-map-react";

const MapWrap = styled.div`
  height: 350px;
  width: 650px;
`;
const MapComponent = styled.div``;

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <MapWrap>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB-zWWX7CjMetXxWW9-kkVfPHH_teNKXqU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
          />
        </GoogleMapReact>
      </MapWrap>
    );
  }
}

export default Map;
