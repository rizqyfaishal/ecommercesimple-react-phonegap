import React from 'react';
import styled from 'styled-components';

import CircleNumber from '../../components/CircleNumber';
import CustomInputText from '../../components/CustomInputText';
import CustomNumberInput from '../../components/CustomNumberInput';
import CustomButton from '../../components/CustomButton';

const ProductItemWrapper = styled.div`
	display: grid;
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: repeat(8, 1fr);
	grid-template-areas: 
		"order-no item-name item-name item-name item-name item-name item-name item-name"
		"price price price price price quantity quantity quantity"
		"subtotal subtotal subtotal subtotal subtotal subtotal delete delete";
	justify-items: center;
	align-items: center;

	& > div:nth-child(1) {
		justify-self: start;
		grid-area: order-no;
	}

	& > div:nth-child(2) {
		display: grid;
		justify-self: stretch;
		grid-area: item-name;
	}

	& > div:nth-child(3) {
		justify-self: stretch;
		grid-area: price;
		display: grid;
		justify-items: stretch;
		align-items: center;
	}

	& > div:nth-child(4) {
		justify-self: end;
		grid-area: quantity;
		display: grid;
		justify-items: stretch;
		align-items: center;
	}

	& > div:nth-child(5) {
		justify-self: start;
		grid-area: subtotal;
	}

	& > div:nth-child(6) {
		justify-self: end;
		grid-area: delete;
	}
`;

const ProductItem = (props) => {
	return (
		<ProductItemWrapper>
			<div>
				<CircleNumber>{props.item.orderNo}</CircleNumber>
			</div>
			<div>
				<CustomInputText placeholder="Nama item" />
			</div>
			<div>
				<CustomInputText placeholder="Price" />
			</div>
			<div>
				<CustomNumberInput number={0}/>
			</div>
			<div>
				<h4>Subtotal : Rp. {props.item.price * props.item.quantity}</h4>
			</div>
			<div>
				<CustomButton color="white" bg="red">
					Delete
				</CustomButton>
			</div>

		</ProductItemWrapper>
	)
}

export default ProductItem;