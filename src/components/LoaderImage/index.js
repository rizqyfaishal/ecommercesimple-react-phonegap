import React from 'react';
import styled from 'styled-components';

import Loader from '../../images/loader.svg';

const LoaderImageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2rem;
	height: ${props => props.height || 'calc((100vh - 60px) / 2)'};
`;

const LoaderImage = (props) => 
	<LoaderImageWrapper>
		<img src={Loader} width="60" height="60" />
	</LoaderImageWrapper>

export default LoaderImage;