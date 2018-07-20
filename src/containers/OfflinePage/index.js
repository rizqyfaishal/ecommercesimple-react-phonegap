import React, { Component } from 'react';
import styled from 'styled-components';

import NoWifi from '../../images/no-wifi.svg';


const OfflinePageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

class OfflinePage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <OfflinePageWrapper>
			<img src={NoWifi} alt="no-wifi-images" width="70" />
			<h3>You are offline</h3>
		</OfflinePageWrapper>
	}
}

export default OfflinePage;