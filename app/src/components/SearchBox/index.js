import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
} from 'react-google-maps';
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

import Light from '../../theme/Light';
import styled from 'styled-components';

import MuiButton from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import Title from '../../components/Title';
import Wrapper from '../../components/Wrapper';
import TextField from 'material-ui/TextField';
import { MuiThemeProvider } from 'material-ui';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled(MuiButton)`
  width: 177px;
`;

const styles = ({
  textField: {
    color: 'white',
  },
});

const buttonStyle = (selected) => ({
  backgroundColor: selected ? '#0DD493' : '#FC981C',
  borderRadius: '22px',
  padding: '5px',
  marginBottom: '24px',
});

const buttonLabelStyle = {
  color: 'white',
  textTransform: 'lowercase',
  fontSize: '18px',
};

const Type = {
  getBike: 'get-bike',
  haveBike: 'have-bike',
}

const Field = styled(TextField)`
 label {
   color: white;
   :after {
    background-color: white;
   color: white;
    }
  :before {
      background-color: white;
   color: white;
      
  }
 }

  width: 230px;

  :after {
    background-color: white;
  }

  margin-bottom: 24px;
`;

const Form = styled.form`
 label {
   color: white;
 }
 width: 232px !important;
 :after {
    background-color: white;
   color: white;
 }
  :before {
    background-color: white;
    color: white;
  }
`;

const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places";

const SearchBox = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      })
    },
    componentWillReceiveProps(nextProps) {
      this.props.handle(nextProps.lat, nextProps.lng);
    }
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <MuiThemeProvider theme={Light}>
        <Form noValidate autoComplete="off">
          <Field 
            id="name"
            label="Insira seu destino"
            placeholder="MASP SP"
            margin="normal"
          />
        </Form>
      </MuiThemeProvider>
    {/* <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <MuiThemeProvider theme={Light}>
          <Form noValidate autoComplete="off">
            <Field 
              id="name"
              label="Insira seu destino"
              placeholder="MASP SP"
              margin="normal"
            />
          </Form>
      </MuiThemeProvider>
    </StandaloneSearchBox> */}
    {/* <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol> */}
  </div>
);

export default SearchBox;
