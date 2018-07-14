import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CustomAlert from '../../components/CustomAlert';

const ComingSoonPageWrapper = styled.div`

`;

class ComingSoonPage extends Component {

	constructor(props) {
		super(props);
		this.onButtonClick = this.onButtonClick.bind(this);
		this.onOutsideClick = this.onOutsideClick.bind(this);
		this.onInsideClick = this.onInsideClick.bind(this);
		this.state = {
			show: false
		}
	}

	onButtonClick() {
		this.setState({
			show: true
		})
	}

	onInsideClick(event) {
		event.stopPropagation();
	}

	onOutsideClick(event) {
	}

	render() {
		return <div>
			<button onClick={this.onButtonClick}>Click</button>
			<CustomAlert show={this.state.show}
				title="Add Contact"
				okButtonText="Save"
				cancelButtonText="Cancel"
				onInsideClick={this.onInsideClick}
				onOutsideClick={this.onOutsideClick}/>
		</div>;
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoonPage);