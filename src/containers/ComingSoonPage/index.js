import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const ComingSoonPageWrapper = styled.div`

`;

class ComingSoonPage extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return <h1>ComingSoonPage</h1>;
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoonPage);