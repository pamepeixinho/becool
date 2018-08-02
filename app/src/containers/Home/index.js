import React from 'react';
import styled from 'styled-components';

import MuiButton from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import Title from '../../components/Title';
import Wrapper from '../../components/Wrapper';
import SearchBox from '../../components/SearchBox';
import TextField from 'material-ui/TextField';
import { MuiThemeProvider } from 'material-ui';
import Light from '../../theme/Light';
import { DirectionsBike } from 'material-ui-icons';

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

  :after {
    background-color: white;
  }

  margin-bottom: 24px;
`;

const Form = styled.form`
 label {
   color: white;
 }
`;

class Home extends React.Component {
  state = {
    destination: '',
    selected: '',
  };

  handleChangeButton = event => {
    if (event.target.textContent === 'Quero bike') {
      this.setState({
        selected: Type.getBike,
        show: true,
      });
    }

    if (event.target.textContent === 'Tenho bike') {
      this.setState({
        selected: Type.haveBike,
        show: true,
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  state = {
    lat: '',
    lng: '',
    show: false,
  }

  componentWillReceiveProps(nextProps) {
    const location = nextProps.places && nextProps.places.lenght > 0 ? nextProps.places[0] : null;
    const lat = location ? location.lat() : '';
    const lng = location ? location.lng() : '';

    this.setState({
      lat,
      lng,
    });
  }

  test = (where) => {
    console.log(this.state.lat);
    console.log(this.state.lng);
    window.location.pathname = `/${where}?lat=${this.state.lat}&lng=${this.state.lng}&search=${this.state.destination}` 
  }

  render() {
    const where = this.state.selected === Type.getBike ? 'get-bike' : 'map';

    return (
      <Wrapper>
        <Title msg="Como você vai?" />
        <ButtonsWrapper>
          {console.log(this.state.selected === Type.getBike)}
          <Button style={buttonStyle(this.state.selected === Type.getBike)}
            onClick={this.handleChangeButton}
          >
            <div style={buttonLabelStyle}>Quero bike</div>
          </Button>

          <Button style={buttonStyle(this.state.selected === Type.haveBike)} onClick={this.handleChangeButton}>
            <div style={buttonLabelStyle}>Tenho bike</div>
          </Button>
        </ButtonsWrapper>
        { this.state.show && 
          <div style={{ display: 'flex' }}>
          <MuiThemeProvider theme={Light}>
            <Form noValidate autoComplete="off">
              <Field 
                id="name"
                label="Insira seu destino"
                value={this.state.destination}
                onChange={this.handleChange('destination')}
                margin="normal"
                className="FOOBAR"
                InputLabelProps={{ style: { color: 'white !important'}}}
              />
            </Form>
          </MuiThemeProvider>

          <StyledLink to={`/${where}?lat=-23.5615&lng=-46.656&search=${this.state.destination}`}>
            <MuiButton
              style={{
                backgroundColor: '#FC981C', 
                float: 'right', color: 'white', 
                borderRadius: '22px', marginTop: '24px',
                height: '41px',
                width: '52px',
              }}
            >
              <DirectionsBike />
            </MuiButton>
          </StyledLink>
          </div>
        }
      </Wrapper>
    );
  }
}

export default withStyles(styles)(Home);