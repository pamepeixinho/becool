/* global google */
import React from 'react';
import { compose } from 'recompose';
import { geolocated } from 'react-geolocated';
import styled from 'styled-components';
import MuiButton from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import GoogleMap from  './GoogleMap';
import { getParameterByName } from '../../api/request';
import { CircularProgress } from 'material-ui';
import { DirectionsBike } from 'material-ui-icons';

const Cardzinho = styled.div`
  height: 170px;
  width: 100%;
  background-color: #FAFAFA;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);
  z-index: 100000;
  position: absolute;
  bottom: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(5px);
  z-index: 10000000000000000000;
  background-size: cover;
  overflow: hidden;
  filter: blur(13px);
`;


const styles = ({
  progress: {
    position: 'absolute',
    zIndex: 100000000000,
    top: '35%',
    left: '40%',
  }
});

class Map extends React.Component {
  state = {
    currentLocation: {
      lat: 0,
      lng: 0,
    },
    distance: '',
    duration: '',
    loading: true,
    simulation: false,
  }

  setValues = (distance, duration) => {
    this.setState({
      distance,
      duration,
      loading: false,
    });
  }

  loadingTimeout = () => {
    /**
     * Just a simmulation for the user's ride for MVP purpose.
     * 
     * It's totatly possible to get the real kilometer
     * from the user by live location. This app is already
     * prepared for that, but there's no time and how
     * to test for now to present it.
     */
    this.setState({
      loading: true,
      simulation: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      window.location.pathname = '/summary';
    }, 1900);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isGeolocationAvailable &&
        nextProps.isGeolocationEnabled && nextProps.coords) {
          console.log(
              `latitude: ${nextProps.coords.latitude}`,
              `longitude: ${nextProps.coords.longitude}`,
          );

          this.setState({
            currentLocation: {
              lat: nextProps.coords.latitude,
              lng: nextProps.coords.longitude,
            },
          }); 
      }
  }

 render() {
   const placeTo = getParameterByName('search', this.props.location.search);
   const lat = getParameterByName('lat', this.props.location.search);
   const lng = getParameterByName('lng', this.props.location.search);

   return (
     <React.Fragment>
        { (this.state.currentLocation.lat !== 0 &&
          this.state.currentLocation.lng !== 0) ?
          (<GoogleMap directions={this.props.GoogleMap}
            originLat={this.state.currentLocation.lat}
            originLng={this.state.currentLocation.lng}
            destLat={lat}
            destLng={lng}
            setValues={this.setValues}
          />) : (<div style={{ height: `540px`, width: `100%`, backgroundColor: 'white' }} />)
        }

        { this.state.simulation && 
          <div>
            <Wrapper />
            <h2 style={{ color: '#5E0D62', background: 'white', position: 'absolute', zIndex: 100000000000, top: '20%', left: '20%', }}>
              Simulação de corrida
            </h2>
          </div>
        }

        { this.state.loading &&
          <CircularProgress
            className={this.props.classes.progress}
            variant="indeterminate"
            size={64}
            thickness={4}
            color="primary"
          />
        }
         <Cardzinho>
           <div style={{ padding: '16px' }}>
            <div 
                style={{ color: 'black', fontSize: '21px', fontWeight: 500, lineHeight: '31px', textAlign: 'left' }}>
                Para: {placeTo}
              </div>
              <div style={{ paddingLeft: '22px' }}>
                <span 
                  style={{ color: 'black', fontSize: '21px', fontWeight: 500, lineHeight: '31px', textAlign: 'left' }}>
                  de:
                </span>
                <span 
                  style={{ color: '#FC981C', paddingLeft: '8px', fontSize: '21px', fontWeight: 500, lineHeight: '31px', textAlign: 'left' }}>
                  sua localização
                </span>
              </div>
           </div>
            <div style={{ height: '1px', backgroundColor: '#E4E4E4', width: '100%' }} />
            <div style={{display: 'flex',
              justifyContent: 'space-between'}}>
              <div >
                <b>
                <div style={{ color: '#000', marginLeft: '30px', paddingTop: '15px'}}>{this.state.duration}</div>
                </b>
                <div style={{ color: '#868686', marginLeft: '30px' }}>{this.state.distance}</div>

              </div>
              <div style={{marginRight: '15px'}}>
                <MuiButton
                  style={{
                    backgroundColor: '#FC981C',
                    float: 'right', color: 'white',
                    borderRadius: '22px', marginTop: '24px',
                    height: '41px',
                    width: '52px',
                  }}
                  onClick={this.loadingTimeout}
                >
                  <DirectionsBike />
                </MuiButton>
              </div>

            </div>
         </Cardzinho>
     </React.Fragment>
   );
 }
}

const MapWithDirections = compose(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    watchPosition: true,
  }),
)(Map);

export default withStyles(styles)(MapWithDirections);
