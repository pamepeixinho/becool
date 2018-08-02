import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import LinearProgress from 'material-ui/Progress/LinearProgress';
import { carbonCoins } from '../../api/back';
import Button from 'material-ui/Button';

import Title from '../../components/Title';
import Wrapper from '../../components/Wrapper';
import Dialog from 'material-ui/Dialog';
import carboncoins from '../../images/carboncoin3.png';

const buttonStyle = ({
  backgroundColor: '#FC981C',
  borderRadius: '22px',
  padding: '5px',
  marginBottom: '24px',
});

const styles = ({
  base: {
    position: 'absolute',
  },
  progress: {
    position: 'absolute',
    zIndex: 1000,
  },
});

const P = styled.p`
  font-size: '14px';
`;

const UnderstandLink = styled(Link)`
  margin-top: '16px';
`;

const buttonLabelStyle = {
  color: 'white',
  textTransform: 'lowercase',
  fontSize: '18px',
};

class Summary extends React.Component {
  state = {
    lastRun: 97,
    carboCoin: 0,
  }

  componentDidMount() {
    this.fetchData();
  }

  handle = (result) => {
    debugger;

    this.setState({
      distance: result.data.distanciaPercorrida,
      carboCoin: result.data.carboCoin,
      lastRun: result.data.lastRun,
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

  state = {
    showDialog: false,
  }

  render() {
    const defaultValue = this.state.lastRun;
    return (
      <Wrapper>
        {/* <BackButton msg="< nova corrida" backPath="/" /> */}
        <Title msg={this.props.title} />
        <div style={{ color: '#0DD493', display: 'flex', justifyContent: 'center' }} onClick={() => {
          this.setState({
            showDialog: true,
          })
          }}>
          <CircularProgress
            className={this.props.classes.progress}
            variant="static"
            value={100}
            size={213}
            thickness={4}
            color="inherit"
          />
          <div style={{ color: '#D8D8D8', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
              className={this.props.classes.base}
              variant="static"
              value={100}
              size={213}
              thickness={4}
              color="inherit"
            />
          </div>
        </div>

        <div style={{ position: 'absolute', top: '180px', left: '140px', width: '93px' }} >
          <div style={{
            color: '#0DD493', fontSize: '12px',  fontWeight: 500,  lineHeight: '13px',  textAlign: 'center',
          }}>
            você ganhou nessa corrida:
          </div>
        </div>
        <div style={{ position: 'absolute', top: '240px', left: '170px', width: '70px' }} >
          <div style={{
            color: '#0DD493', fontSize: '32px',      fontWeight: 900,        lineHeight: '10px',
          }}>
            {defaultValue}
          </div>
        </div>
        <div style={{ position: 'absolute',    left: '192px', top: '273px', width: '70px' }} >
          <div style={{
            color: '#0DD493', fontSize: '12px',      fontWeight: 500,        lineHeight: '13px',     textAlign: 'center',
          }}>
            <div>carbo<br/>coins</div>
            <img src={carboncoins} style={{ position: 'absolute',
            width: '25px',
            height: '18px',
            top: '-20px',
            left: '20px',
          }} />
          </div>
        </div>

        <div style={{ marginTop: '300px' }}>
          <P> O que falta para completar esse desafio </P>
          <LinearProgress thickness={4} variant="determinate" value={300} valueBuffer={30} />
          <span> {this.props.kmValue}km </span>
          <LinearProgress thickness={4} style={{ marginTop: '8px' }} variant="determinate" value={100} valueBuffer={150} />
          <span> {this.props.ccValue}Carboncoins </span>
        </div>
        <UnderstandLink to="challenges">
          <div style={{
              color: '#0DD493',
              marginTop: '22px',
              marginLeft: '36px',
              textDecoration: 'underline',
              textDecorationColor: '#0DD493'
            }}>
            veja os próximos desafios aqui
          </div>
        </UnderstandLink>
        <UnderstandLink to="carbon-coins">
          <div style={{
              color: '#FC981C',
              marginTop: '12px',
              marginLeft: '36px',
              textDecoration: 'underline',
              textDecorationColor: '#FC981C'
            }}>
            entenda mais sobre carbocoins
          </div>
        </UnderstandLink>
        <Dialog open={this.state.showDialog} onClose={() => {
          this.setState({
            showDialog: false,
          })
          }}>
          <div style={{ padding: '32px' }}>
            <h3 style={{ color: 'black'}}>Parabéns, beCooler!</h3>
              <p style={{ color: 'grey'}}>
                Você completou o desafio <span style={{ color: 'green' }}>#GoGreen</span> e ajudou a salvar cada vez mais nosso planeta! 
              </p>
              <div style={{
                  color: '#0DD493', fontSize: '32px',      fontWeight: 900,  padding: '32px',  lineHeight: '10px',
                }}>
                  150
                  <img src={carboncoins} style={{ position: 'absolute',
                    width: '55px',
                    height: '38px',
                    top: '191px',
                    right: '120px',
                  }} />
              </div>
              <Link to="/rewards">
              <Button style={buttonStyle}
              onClick={this.handleChangeButton}
            >
              <div style={buttonLabelStyle}>troque por recompensas aqui</div>
            </Button>
            </Link>
          </div>
          </Dialog>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(Summary);