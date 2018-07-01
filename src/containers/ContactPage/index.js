import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Select from 'react-select';
import swal from 'sweetalert';
import TitleBar from '../../components/TitleBar';
import CustomInputText from '../../components/CustomInputText';
import ContactList from '../../components/ContactList';
import CustomButton from '../../components/CustomButton';
import ContactMultiSelector from '../../components/ContactMultiSelector';
import Search from '../../images/search.svg';

const usernames = [
			{
				label: 'Rizqy Faishal',
				value: 1
			},
			{
				label: 'Wahyu P',
				value: 2
			},
		]

const ContactPageWrapper = styled.div`
	display: flex;
	flex-direction: column;

	& > div:first-child {
		height: 50px;
	}

	& > div:last-child {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: strecth;
		align-items: center;

		& > div:nth-child(1) {
			width: 100%;
			position: relative;
			display: flex;
			justify-content: stretch;
			align-items: center;

			& > input {
				width: 100%;
				padding-left: 2rem;
			}
			& > img {
				position: absolute;
				left: 10px;
				top: 10px;
			}
		}

		& > div:nth-child(2) {
			width: 100%;
			margin-top: 1rem;
		}
		& > div:last-child {
			width: 100%;
			margin-top: 1.5rem;
			display: flex;
			justify-content: center;
			& > button {
				margin: 0 auto;
			}
		}
	}
`;

class ContactPage extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.onAddContact = this.onAddContact.bind(this);
		this.state = {
			value: []
		}
	}

	handleChange(value) {
		console.log(value);
		this.setState({ value });
	}

	onAddContact(event) {
		console.log(event);
		const wrapper = document.createElement('div');
		const { value } = this.state;
		ReactDOM.render(<ContactMultiSelector options={usernames} 
				value={value} 
				onChange={this.handleChange} />, wrapper);

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
		const { value } = this.state;
		return <ContactPageWrapper>
			<div>
				<TitleBar title="Contacts" />
			</div>
			<div>
				<div>
					<CustomInputText placeholder="Search contact" />
					<img src={Search} alt="Search" width="15"/>
				</div>
				<div>
					<ContactList contacts={usernames} />
				</div>
				<div>
					<CustomButton color="#fff" bg="#F48024" onClick={this.onAddContact}>
						+ Tambah Kontak
					</CustomButton>
				</div>
			</div>
		</ContactPageWrapper>
	}
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);