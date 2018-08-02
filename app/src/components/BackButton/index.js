import React from 'react';
import styled from 'styled-components';

import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const buttonStyle = ({
});

const buttonLabelStyle = {
  color: 'white',
  textDecorationColor: 'white',
  textDecoration: 'underline',
};

class BackButton extends React.Component {
  render() {
    return (
      <Link to={this.props.backPath}>
        <Button style={buttonStyle}>
          <div style={buttonLabelStyle}> {this.props.msg || '< voltar'} </div>
        </Button>
      </Link>
    );
  }
}

export default BackButton;