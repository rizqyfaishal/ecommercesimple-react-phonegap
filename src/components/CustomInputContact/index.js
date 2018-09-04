import React from 'react';
import styled from 'styled-components';
import Phonebook from '../../images/phonebook_2.svg';

const CustomInputText = styled.input`
	border-radius: 7px;
	border: 1px solid ${props => props.isError ? 'red' : '#ddd'};
	padding: 0.7rem;
	color: #3b3d42;
	background-color: #fff;
	&:focus {
		outline: none;
		border-color: ${props => props.isError ? 'red' : '#F48024'};
	}
`;

const CustomInputContactWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: stretch;
	position: relative;
	& > button {
		border: 1px solid #F48024;
		width: 40px;
		position: absolute;
		right: 2px;
		background-color: #F48024;
		outline: none;
		border: none;
		&:active {
			background-color: #dc771f;
		}
		height: 100%;
		border-radius: 0 7px 7px 0;
		img {
			width: 25px;
		}
	} 
	& > input {
		width: calc(100% - 30px);
	}
`;

const CustomInputContact = (props) => {
	return (
		<CustomInputContactWrapper>
			<CustomInputText placeholder={props.placeholder} innerRef={props.inputRef}/>
			<button onClick={props.onClick}>
				<img src={Phonebook} />
			</button>
		</CustomInputContactWrapper>
	)
}

export default CustomInputContact;