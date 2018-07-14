import React from 'react';
import styled from 'styled-components';

import ContactMultiSelector from '../ContactMultiSelector';

const AlertOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow-y: auto;
	z-index: 10000;
	pointer-events: ${props => props.show ? 'auto' : 'none'};
	opacity: ${props => props.show ? 1 : 0};
	transition: opacity 0.3s;
	background-color: rgba(0,0,0,.4);
	text-align: center;

	&:before {
		content: " ";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
	}
`;

const AlertModal = styled.div`
	width: 478px;
	height: auto;
  opacity: ${props =>props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  animation: ${props => props.show ? 'showSweetAlert 0.3s' : 'none'};
  will-change: ${props => props.show ? 'transform' : 'none'};
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  position: static;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
  transform: scale(1);
  transform-origin: 50% 50%;
  z-index: 10001;
  transition: opacity .2s,-webkit-transform .3s;
  transition: transform .3s,opacity .2s;
  transition: transform .3s,opacity .2s,-webkit-transform .3s;
	@keyframes showSweetAlert {
		0% {
			transform: scale(1);
		}

		1% {
			transform: scale(.5);
		}

		45% {
			transform: scale(1.05);
		}

		80% {
			transform: scale(0.95);
		}

		100% {
			transform: scale(1);
		}
	}
	@media (max-width: 500px) {
		& {
			width: calc(100% - 20px);
		}
	}
`;


const AlertTitle = styled.div`
	color: rgba(0,0,0,.65);
  font-weight: 600;
  text-transform: none;
  position: relative;
  display: block;
  padding: 13px 16px;
  font-size: 27px;
  line-height: normal;
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #E9EEF1;
`;

const AlertFooter = styled.div`
	background-color: rgb(245,248,250);
  margin-top: 32px;
  border-top: 1px solid #E9EEF1;
  overflow: hidden;
  text-align: right;
  padding-top: 13px;
  margin-top: 13px;
  padding: 13px 16px;
  border-radius: inherit;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const AlertContent = styled.div`
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: stretch;

	& > p.error-message {
		text-align: left;
		font-size: 80%;
		margin: 0.2rem 0 0 0.2rem;
	}
`;

const AlertButton = styled.button`
	padding: 7px 19px;
  border-radius: 2px;
  background-color: ${props => props.cancel ? '#3e549a' : (props.disabled ? '#ddd' : '#F48024')};
  font-size: 12px;
  border: 1px solid ${props => props.cancel ? '#3e549a' : '#F48024'};
  text-shadow: 0px -1px 0px rgba(0,0,0,0.3);
  color: white;
  box-shadow: none;
  cursor: pointer;
  font-weight: 600;
  margin-left: 1rem;
`;

const CustomAlert = (props) => 
	<AlertOverlay show={props.show} onClick={props.onOutsideClick}>
		<AlertModal show={props.show} onClick={props.onInsideClick}>
			<AlertTitle>{props.title}</AlertTitle>
			<AlertContent>
				{props.children}
			</AlertContent>
			<AlertFooter>
				{ props.cancel && <AlertButton 
					cancel={props.cancel} 
					onClick={props.onCancelClick}>{props.cancelButtonText}</AlertButton>}
				<AlertButton disabled={props.okButtonDisabled} 
					onClick={props.onOkClick}>{props.okButtonText}</AlertButton>
			</AlertFooter>
		</AlertModal>
	</AlertOverlay>;


export default CustomAlert;