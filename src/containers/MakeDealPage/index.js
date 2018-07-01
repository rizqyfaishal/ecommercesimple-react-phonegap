import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import CustomInputText from '../../components/CustomInputText';
import CustomLabel from '../../components/CustomLabel';
import GradientButton from '../../components/GradientButton';
import ProductItem from '../../components/ProductItem';
import CustomNumberInput from '../../components/CustomNumberInput';
import CustomButton from '../../components/CustomButton';
import DealResult from '../../components/DealResult';
import ContactSelector from '../../components/ContactSelector';

const items = [
	{
		quantity: 1,
		price: 12000,
		orderNo: 1,
	}
]

const contacts = [
	{
		userId: 1,
		name: 'Rizqy Faishal'
	}
]
const MakeDealPageWrapper = styled.div`
	& > div.product-name {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		align-items: start;

		& > h3 {
			margin: 1rem 0 0.5rem 0;
		}
	}

	& > div.product-items {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 3rem 1fr 36px;
		& > button {
			margin: 0;
			display: block;
		}

		& > div:nth-child(3) {
			justify-self: center;
		}
	}

	& > div.product-target {
		padding: 1rem 0;
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 3fr 2fr;
		grid-template-areas: "expire-in expire-in-input"
			"user-target user-target-input";
		align-items: center;
		& > div:nth-child(1) {
			grid-area: expire-in;
			justify-self: start;

			& > p {
				font-size: 80%;
			}
		}

		& > div:nth-child(2) {
			grid-area: expire-in-input;
			justify-self: stretch;
		}

		& > div:nth-child(3) {
			grid-area: user-target;
			justify-self: start;
		}

		& > div:nth-child(4) {
			grid-area: user-target-input;
			justify-self: center;

			& > button {
				display: block;
			}
		}
	}

	& > div.result {
		margin: 0 -1rem;
	}
`;

class MakeDealPage extends Component {

	constructor(props) {
		super(props);
		this.onSelectContactTapped = this.onSelectContactTapped.bind(this);

	}

	onSelectContactTapped(event) {
		const wrapper = document.createElement('div');
		ReactDOM.render(<ContactSelector contacts={contacts}/>, wrapper);

		const content = wrapper.firstChild;
		swal({
			title: 'Select Contact',
			content: content,
			closeOnClickOutside: true,
		  buttons: {
		    Select: true,
		  },
		})
		.then((value) => {
		  switch (value) {
		    default:
		      swal("Got away safely!");
		  }
		});
	}

	render() {
		return (
			<MakeDealPageWrapper>
				<div className="product-name">
					<h3>Produk Saya</h3>
					<CustomInputText placeholder="Penjelasan produk" />
				</div>
				<div className="product-items">
					<h3>Daftar Item</h3>
					<div class="items">
						{items.map(item => <ProductItem item={item} key={item.orderNo}/>)}
					</div>
					<div>
						<CustomButton onClick={() => console.log('clicked')} 
						color="white" bg="#F48024">
							+ Tambah Item
						</CustomButton>
					</div>
				</div>
				<div className="product-target">
					<div>
						<h4>Berlaku sampai dengan </h4>
					</div>
					<div>
						<CustomNumberInput number={0} prefix="Hari" />
					</div>
					<div>
						<h4>Kirim penawaran ke</h4>
					</div>
					<div>
						<CustomButton color="white" bg="#F48024" onClick={this.onSelectContactTapped}>Pilih</CustomButton>
					</div>
				</div>
				<div className="result">
					<DealResult items={items} />
				</div>
			</MakeDealPageWrapper>
		)
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MakeDealPage);