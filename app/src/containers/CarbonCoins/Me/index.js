import React from 'react';
import styled from 'styled-components';

import Page from '../../Summary/Page';

class Me extends React.Component {
  render() {
    return (
      <Page title="Suas CarboCoins" kmValue={30} ccValue={150} lastRun={98} />
    );
  }
}

export default Me;
