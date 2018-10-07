import React from 'react';
import HeaderContainer from './headerContainer';
import { Container } from 'semantic-ui-react';

export default (props) => {
  return (
      <Container>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
        <h1 style = {{
            marginTop: '20px',
            marginWidth: '50px'
        }}>
          Decentralized Charity Platform
        </h1>
        <HeaderContainer />
        {props.children}
      </Container>
  );
};
