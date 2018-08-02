import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.p`
  color: 'white';
  font-size: 30px;
`;

class Title extends React.Component {
  render() {
    return (
      <TitleWrapper>
        { this.props.msg }
      </TitleWrapper>
    );
  }
}

export default Title;