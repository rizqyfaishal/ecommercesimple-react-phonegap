import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Select from 'react-select';
import { isUndefined } from 'lodash';

import TitleBar from '../../components/TitleBar';
import LoaderImage from '../../components/LoaderImage';
import CustomInputText from '../../components/CustomInputText';
import ContactList from '../../components/ContactList';
import CustomButton from '../../components/CustomButton';
import ContactMultiSelector from '../../components/ContactMultiSelector';
import CustomAlert from '../../components/CustomAlert';
import WarningMessage from '../../components/WarningMessage';

import Search from '../../images/search.svg';

import api from '../../api';

import {
  fetchUserContactsRequestAction,
  onUserSelectContacts,
  showAlert,
  hideAlert,
  onSavingContacts,
  onUserSearchContact,
  importContactsFromPhoneBooks
} from './actions';

import {
  updateContactsByPhoneBook
} from '../../utils';


const ContactPageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:first-child {
    height: 50px;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  & > div:last-child {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: strecth;
    align-items: strecth;

    & > div:nth-child(1) {
      flex-direction: column;
      display: flex;
      justify-content: stretch;
      align-items: stretch;

      & > div {
        margin: 0.5rem 0 0 0;
      }

      & > div:last-child {
        display: flex;
        flex-direction: column;
        position: relative;
        & > input {
          padding-left: 2rem;
        }
        & > img {
          position: absolute;
          left: 10px;
          top: 10px;
        }
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
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.onInsideClick = this.onInsideClick.bind(this);
    this.onOkDialogClick = this.onOkDialogClick.bind(this);
    this.onCancelDialogClick = this.onCancelDialogClick.bind(this);
    this.onSearchKeyChange = this.onSearchKeyChange.bind(this);
    this.importFromPhoneBook = this.importFromPhoneBook.bind(this);
  }

  importFromPhoneBook() {
    const { dispatch } = this.props;
    console.log(updateContactsByPhoneBook);
    updateContactsByPhoneBook(dispatch, importContactsFromPhoneBooks);
  }

  componentWillMount() {
    const { dispatch, contactPage } = this.props;
    // dispatch(fetchUserContactsRequestAction());
  }

  onInsideClick(event) {
    // event.stopPropagation(); 

  }

  onSearchKeyChange(event) {
    const { dispatch } = this.props;
    dispatch(onUserSearchContact(event.target.value));
  }

  onOkDialogClick() {
    const { dispatch, contactPage, global } = this.props;
    dispatch(onSavingContacts({ 
      contact_users: contactPage.selectedContacts.map(contact => 
        ({ contact_user: contact.value, owner: global.userData.data.id }))
    }));
  }

  onCancelDialogClick() {
    const { dispatch, contactPage } = this.props;
    dispatch(hideAlert());
  }

  getUsers(input) {
    if(!input) {
      return Promise.resolve({ options: []})
    }
    return api(`/auth/get-all-users-data/?q=${input}`, 'GET', null)
      .then(response => response.status == 200 ? response.data : [])
      .then(data => {
        return { options: data.map(option => ({ label: option.username, value: option.id })) }
      })
  }

  handleChange(values) {
    const { dispatch, contactPage } = this.props;
    dispatch(onUserSelectContacts(values));
  }

  onAddContact(event) {
    const { dispatch, contactPage } = this.props;
    dispatch(showAlert());
  }

  onOutsideClick() {
    const { dispatch } = this.props;
    dispatch(hideAlert());
  }

  render() {
    const { value, contactPage, global } = this.props;
    const searchKey = contactPage.searchKey;
    const usernames = global.contactsData
        .filter(contact => contact.label.indexOf(searchKey) != -1);
    return <ContactPageWrapper>
      <div>
        <TitleBar title="Contacts" />
      </div>
      <div>
        <CustomAlert 
          show={contactPage.showAlert}
          onInsideClick={this.onInsideClick}
          onOkClick={this.onOkDialogClick}
          onCancelClick={this.onCancelDialogClick}
          title="Add Contact" 
          okButtonText="Save" 
          cancel
          cancelButtonText="Cancel">
           <ContactMultiSelector 
              loadOptions={this.getUsers}
              onChange={this.handleChange} 
              value={contactPage.selectedContacts} />
        </CustomAlert>
      </div>
      { contactPage.isLoading ? 
        <LoaderImage /> : 
        <div>
          <div>
            { !isUndefined(global.flashMessages.saveContactsSuccess) && 
              <WarningMessage>
                {global.flashMessages.saveContactsSuccess}
              </WarningMessage>
            }
            <div>
              <CustomInputText placeholder="Search contact" onChange={this.onSearchKeyChange}/>
              <img src={Search} alt="Search" width="15"/>
            </div>
          </div>
          <div>
            <ContactList contacts={usernames} />
          </div>
          <div>
            <CustomButton color="#fff" bg="#F48024" onClick={this.onAddContact}>
              + Tambah Kontak
            </CustomButton>
             <CustomButton color="#fff" bg="#F48024" onClick={this.importFromPhoneBook}>
              Import dari phonebook
            </CustomButton>
          </div>
      </div>}
    </ContactPageWrapper>
  }
}


const mapStateToProps = (state) => ({
  global: state.get('global').toJS(),
  contactPage: state.get('contactPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);