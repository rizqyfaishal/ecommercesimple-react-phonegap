import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const AddProfilePageWrapper = styled.div`

`;

class AddProfilePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

  }
}

const mapStateToProps = (state) => ({
  addProfilePage: state.get('addProfilePage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProfilePage);