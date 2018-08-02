import React from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu'

import MenuList from './MenuList';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '24px',
    height: '20px',
    left: '32px',
    top: '18px',
  },
  bmMenuWrap: {
    left: '0px',
    top: '0px',
  },
  bmBurgerBars: {
    height: '2px',
    width: '24px',
    background: 'white',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#D8D8D8',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    color: '#5E0D61',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
  },
  bmOverlay: {
    top: '0px',
    left: '0px',
    background: 'rgba(0, 0, 0, 0.3)',
  }
}

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  height: 56px;
  top: 0;
  left: 0;
  z-index: 2091839021830981298309128;
`;

class BurguerMenu extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange = ({ isOpen }) => {
    this.setState({ menuOpen: isOpen })
  }

  closeMenu = () => {
    this.setState({ menuOpen: false })
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    return (
      <Wrapper>
        <Menu
          width={ 256 }
          styles={styles}
          isOpen={this.state.menuOpen}
          onStateChange={this.handleStateChange}>
          <MenuList data-side-menu onClick={this.closeMenu} />
        </Menu>
      </Wrapper>
    );
  }
}

export default BurguerMenu;