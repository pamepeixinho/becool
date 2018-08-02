import React from 'react';
import { compose } from 'recompose';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { geolocated } from 'react-geolocated';

import { getBikeDocksByCurrentLocation } from '../../api/back';

import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';

import Wrapper from '../../components/Wrapper';
import Title from '../../components/Title';
import BackButton from '../../components/BackButton';

import Card from 'material-ui/Card';
import CardMedia from 'material-ui/Card/CardMedia';
import CardContent from 'material-ui/Card/CardContent';

const styles = {
  card: {
    minWidth: 345,
    margin: '0 24px 24px',
    display: 'inline-block',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

class GetBike extends React.Component {
  state = {
    bikeStations: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isGeolocationAvailable &&
        nextProps.isGeolocationEnabled && nextProps.coords) {
          console.log(
              `latitude: ${nextProps.coords.latitude}`,
              `longitude: ${nextProps.coords.longitude}`,
          );
        this.fetchData(nextProps.coords.latitude, nextProps.coords.longitude);
      }
  }

  handle = (result) => {
    this.setState({
      bikeStations: result,
    });
  }

  fetchData = async (lat, lng) => {
    await axios.get(getBikeDocksByCurrentLocation(lat, lng)).then((res) => this.handle(res.data));
  }

  render() {
    const bikeStations = this.state.bikeStations.data || [];
    return (
      <Slide direction="left" in>
        <React.Fragment>
          <Wrapper>
            {/* <BackButton backPath="/" /> */}
            <Title msg="Alugue uma bike" />
          </Wrapper>
          <div style={{ width: '100%', overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
          { bikeStations.length > 0 && bikeStations.map((bikeStation) => {
            return (
             <StyledLink to={`/map${this.props.location.search}`}>
             <Card className={this.props.classes.card}>
               <CardMedia
                 image="https://i.stack.imgur.com/LecIK.jpg"
                 className={this.props.classes.media}
               />
               <CardContent>
                 <div style={{ color: '#5E0D62', fontWeight: 'bold' }}> { bikeStation.name } </div>
                 <div style={{ color: '#5E0D62' }}> {`${bikeStation.distanceTime}min de você`} </div>
                 <div style={{ color: '#9B9B9B', paddingTop: '16px' }}>{bikeStation.price} </div>
               </CardContent>
             </Card>
             </StyledLink>
          );
          })
          }
          </div>
        </React.Fragment>
      </Slide>
    );
  }
}

export default compose(
  withStyles(styles),
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    watchPosition: false,
  }),
)(GetBike);