import React from 'react';
import carboncoins from '../../images/carboncoins.png';
import BackButton from '../../components/BackButton';

class CarbonCoins extends React.Component {
  render() {
    return (
        <div style={{ width: '100vw', height: '100vh', 
          background: '#D8D8D8', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          {/* <BackButton style={{ width: '100%'}} backPath="/summary" /> */}
          <img src={carboncoins} style={{ marginTop: '16px', marginLeft: '32px', width: '80%', height: '80%' }} />
        </div>
    );
  }
}

export default CarbonCoins;