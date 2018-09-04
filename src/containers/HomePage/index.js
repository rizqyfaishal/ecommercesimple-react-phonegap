import React, { Component } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';

import { isUndefined, isNull } from 'lodash';

import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import CustomAlert from '../../components/CustomAlert';
import CustomInputContact from '../../components/CustomInputContact';
import CustomLabel from '../../components/CustomLabel';
import ProfileSelector from '../../components/ProfileSelector';
import ContactList from '../../components/ContactList';
import CustomInputText from '../../components/CustomInputText';

import Search from '../../images/search.svg';


let contactData = [];


document.addEventListener('deviceready', () => {
  navigator.contactsPhoneNumbers.list(function(contacts) {
     contactData = contacts;
  }, function(error) {
     console.error(error);
  });
}, false)


const HomePageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;

	& > div > div > div:nth-child(2) {
		& > div {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			justify-content: stretch;
			margin: 0.5rem;
		}
	}

	& div.input-search {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		& > input {
      padding-left: 2rem;
    }
    & > img {
      position: absolute;
      left: 10px;
      top: 10px;
    }
	}
`

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.onGettingStartedTapped = this.onGettingStartedTapped.bind(this);
		this.onLoginHereTapped = this.onLoginHereTapped.bind(this);
		this.onShareQuota = this.onShareQuota.bind(this);
		this.onCancelSelectDialog = this.onCancelSelectDialog.bind(this);
		this.onPhoneBookClick = this.onPhoneBookClick.bind(this);
		this.onSearchKeyChange = this.onSearchKeyChange.bind(this);
		this.onContactClick = this.onContactClick.bind(this);
		this.onShareQuotaOkClick = this.onShareQuotaOkClick.bind(this);
		this.inputRef = [
			React.createRef(), React.createRef()
		]
		this.state = {
			showShareQuotaDialog: false,
			showPhoneBookDialog: false,
			currentPhoneBook: -1,
			contacts: [],
			searchKey: ''
		}
	}

	onSearchKeyChange(event) {
		this.setState({
			searchKey: event.target.value
		})
	}

	onShareQuotaOkClick() {
		this.setState({ showShareQuotaDialog: false });
		this.inputRef.forEach(ref => {
			ref.current.value = '';
		})
	}

	onContactClick(index) {
		const renderedContacts = contactData.filter(contact => {
			return `${contact.firstName + (!isUndefined(contact.middleName) ? ' ' + contact.middleName : '') 
			+ (!isUndefined(contact.lastName) ? ' ' + contact.lastName : '')}`.indexOf(this.state.searchKey) != -1 ||
				contact.phoneNumbers[0].number.indexOf(this.state.searchKey) != -1;
		})
		console.log(this.inputRef[this.state.currentPhoneBook]);
		this.inputRef[this.state.currentPhoneBook].current.value = renderedContacts[index].phoneNumbers[0].number
		this.setState({
			searchKey: '',
			showPhoneBookDialog: false,
			currentPhoneBook: -1
		})
	}

	componentWillMount() {
		const { dispatch, global } = this.props;
	}

	onPhoneBookClick(index) {
		this.setState({
			currentPhoneBook: index,
			showPhoneBookDialog: true
		})
	}

	onCancelSelectDialog() {
		this.setState({
			showShareQuotaDialog: false
		})
	}

	onGettingStartedTapped(event) {
		const { dispatch } = this.props;
		dispatch(push('/register'));
	}

	onShareQuota() {
		this.setState({
			showShareQuotaDialog: true
		})
	}

	onLoginHereTapped(event) {
		event.preventDefault();
		const { dispatch } = this.props;
		dispatch(push('/login'));
	}

	render() {
		const renderedContacts = contactData.filter(contact => {
			return `${contact.firstName + (!isUndefined(contact.middleName) ? ' ' + contact.middleName : '') 
			+ (!isUndefined(contact.lastName) ? ' ' + contact.lastName : '')}`.indexOf(this.state.searchKey) != -1 ||
				contact.phoneNumbers[0].number.indexOf(this.state.searchKey) != -1;
		})
		return (<HomePageContainer>
			<CustomButton bg="rgb(234, 115, 11)" color="#fff" onClick={this.onShareQuota}>
				Share Quota
			</CustomButton>
			<CustomAlert
        title="Share quota" 
        cancel={true}
        level={1}
        okButtonText="Ok"
        cancelButtonText="Cancel"
        onCancelClick={this.onCancelSelectDialog}
        onOkClick={this.onShareQuotaOkClick}
        show={this.state.showShareQuotaDialog}>
        	<div>
        		<CustomInputContact 
        		placeholder="Your phone number" inputRef={this.inputRef[0]} onClick={() => { this.onPhoneBookClick(0)}} />
        	</div>
        	<div>
        		<CustomInputContact 
        		placeholder="Your phone number" inputRef={this.inputRef[1]} onClick={() => { this.onPhoneBookClick(1)}} />
        	</div>
        </CustomAlert>
        <CustomAlert
        title="Select phone number" 
        level={2}
        okButtonText="Cancel"
        onCancelClick={this.onCancelSelectDialog}
        onOkClick={() => { this.setState({ showPhoneBookDialog: false, currentPhoneBook: -1, searchKey: '' }); }}
        show={this.state.showPhoneBookDialog}>
        	<div className="input-search">
            <CustomInputText placeholder="Search contact" onChange={this.onSearchKeyChange}/>
            <img src={Search} alt="Search" width="15"/>
           </div>
        	<ContactList contacts={renderedContacts} isClickable={true} onContactClick={this.onContactClick}/>
        </CustomAlert>
		</HomePageContainer>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	};
}

const mapStateToProps = (state) => {
	return {
		global: state.get('global').toJS(),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);