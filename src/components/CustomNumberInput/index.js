import React from 'react';
import styled from 'styled-components';
import Tappable from 'react-tappable';


import Plus from '../../images/plus.svg';
import Minus from '../../images/minus.svg';

const CustomTapPlus = styled.button`
	background-color: transparent;
	border: none;
	display: block;
	margin: 0 auto;

	
`;

const CustomTapMinus = styled.button`
	background-color: transparent;
	border: none;
	display: block;
	margin: 0 auto;
`;

const CustomNumberInputWrapper = styled.div`
	display: grid;
	grid-template-columns: 30px 1fr 30px;
	grid-template-rows: 30px;
	grid-template-areas: "minus number plus";
	justify-items: stretch;
	align-items: stretch;	
	border-radius: 4px;
	overflow: hidden;
	border: 1px solid #ccc;
	& > div:nth-child(1) {
		grid-area: minus;
		background-color: #F48024;
		margin-left: -1px;
		& > button {
			height: 100%;
			width: 100%;
			display: grid;
			justify-items: center;
			align-items: center;

			&:active {
				background-color: #e0751f;
			}

			&:disabled {
				background-color: #efa467;
			}
		}
	}

	& > div:nth-child(2) {
		grid-area: number;
		align-self: center;
		justify-self: stretch;
		display: grid;
		justify-items: stretch;
		align-items: center;
		& > span {
			display: block;
			margin: 0.7rem;
		}
	}

	& > div:nth-child(3) {
		grid-area: plus;
		background-color: #F48024;
		margin-right: -1px;
		& > button {
			height: 100%;
			width: 100%;
			display: grid;
			justify-items: center;
			align-items: center;

			&:active {
				background-color: #e0751f;
			}
		}


	}
`;

const CustomNumberInput = (props) => {
	return (
			<CustomNumberInputWrapper>
				<div>
					<CustomTapMinus onTap={props.onMinusTap} disabled>
						<img src={Minus} alt="minus" width="16" />
					</CustomTapMinus>
				</div>
				<div><span>{props.number} {props.prefix}</span></div>
				<div>
					<CustomTapPlus onTap={props.onPlusTap}>
						<img src={Plus} alt="plus" width="16" />
					</CustomTapPlus>
				</div>
			</CustomNumberInputWrapper>
		)
}

export default CustomNumberInput;