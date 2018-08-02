/* global google */
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import { geolocated } from 'react-geolocated';

const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places";

const googleProps = {
  googleMapURL,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `560px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

class GoogleMapContainer extends React.Component {
 render() {
   return (
     <React.Fragment>
       <GoogleMap
         defaultZoom={7}
         defaultCenter={new google.maps.LatLng(this.props.originLat, this.props.originLng)}
       >
         {this.props.directions && <DirectionsRenderer directions={this.props.directions} />}
       </GoogleMap>
     </React.Fragment>
   );
 }
}

const MapWithDirections = compose(
  withProps(googleProps),
  withScriptjs,
  withGoogleMap,
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    watchPosition: true,
  }),
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.originLat, this.props.originLng),
        destination: new google.maps.LatLng(this.props.destLat, this.props.destLng),
        travelMode: google.maps.TravelMode.BICYCLING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const distance = result.routes[0] && result.routes[0].legs[0] && result.routes[0].legs[0].distance.text;
          const duration = result.routes[0] && result.routes[0].legs[0] && result.routes[0].legs[0].duration.text;
          this.setState({
            directions: result,
          });

          this.props.setValues(distance, duration);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
  })
)(GoogleMapContainer);

export default MapWithDirections;
