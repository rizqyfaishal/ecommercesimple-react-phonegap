import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Tappable from 'react-tappable';

import Refresh from '../../images/refresh.svg';

const ErrorPageWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    width: 40px;
  }
`;

class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <ErrorPageWrapper>
        <h3>Something happened</h3>
        <Tappable onTap={() => { dispatch(goBack())} }>
          <img src={Refresh} alt="refresh-icon" />
        </Tappable>
      </ErrorPageWrapper>
      )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);