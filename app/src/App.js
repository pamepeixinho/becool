import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Logo from '../src/images/logo_app.png';
import MapDirections from './containers/MapDirections';
import Home from './containers/Home';
import GetBike from './containers/GetBike';
import Summary from './containers/Summary';
import CarbonCoins from './containers/CarbonCoins';
import CarbonCoinsMine from './containers/CarbonCoins/Me';
import theme from './theme/purple';
import Rewards from "./containers/Rewards";
// import BurguerMenu from './components/BurguerMenu';
// import Rewards from "./containers/Rewards";
import BurguerMenu from './components/BurguerMenu'

const Router = styled(BrowserRouter)`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <BurguerMenu />
            <img src={Logo} style={{
                height: '31px', 
                width: '42px', 
                position: 'absolute', 
                right: '24px', 
                top: '24px',
                background: 'none',
              }}
            />
            <Route exact path="/" component={Home} />
            <Route path="/map" component={MapDirections} />
            <Route path="/get-bike" component={GetBike} />
            <Route path="/summary" component={Summary} />
            <Route path="/carbon-coins" component={CarbonCoins} />
            <Route path="/carbon-coins-me" component={CarbonCoinsMine} />
            <Route path="/rewards" component={Rewards} />
          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;