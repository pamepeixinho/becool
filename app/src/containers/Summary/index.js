import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import LinearProgress from 'material-ui/Progress/LinearProgress';
import { carbonCoins } from '../../api/back';

import Title from '../../components/Title';
import Wrapper from '../../components/Wrapper';
import BackButton from '../../components/BackButton';
import Page from './Page';

const styles = ({
  base: {
    position: 'absolute',
  },
  progress: {
    position: 'absolute',
    zIndex: 1000,
  },
});

const UnderstandLink = styled(Link)`
  margin-top: '16px';
`;

class Summary extends React.Component {
  state = {
    lastRun: 0,
    carboCoin: 0,
  }

  componentDidMount() {
    this.fetchData();
  }

  handle = (result) => {
    this.setState({
      distance: result.distanciaPercorrida,
      carboCoin: result.carboCoin,
      lastRun: result.lastRun,
    });
  }

  fetchData = async () => {
    const body = {
      tokenUser: 'lucasfonseca123456',
      latitude: '-23.5489', 
      longitude: '-46.638823',
      distanciaPercorrida: '10.88789',

    };
   
    await axios.post(carbonCoins, body, { headers: { "Access-Control-Allow-Origin": "*" }})
      .then((res) => this.handle(res.data));
  }

  render() {
    const defaultValue = this.state.lastRun;
    return (
      <div>
        <Page title="Resumo da corrida" kmValue={30} ccValue={150} />
      </div>
    );
  }
}

export default withStyles(styles)(Summary);