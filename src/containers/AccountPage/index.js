import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isUndefined, isNull, isEmpty } from 'lodash';


import TitleBar from '../../components/TitleBar';

import GradientButton from '../../components/GradientButton';
import CustomButton from '../../components/CustomButton';
import CustomInputText from '../../components/CustomInputText';
import CustomLabel from '../../components/CustomLabel';
import CustomTextArea from '../../components/CustomTextArea';
import FieldErrorMessage from '../../components/FieldErrorMessage';
import ProfileList from '../../components/ProfileList';

import { onLogoutTapped } from '../../actions';
import { 
  setEnableEdittingAccountInfo,
  setDisableEdittingAccountInfo,
  setEnableEdittingAddress,
  setDisableEdittingAddress,
  setEnableEdittingPaymentMethod,
  setDisableEdittingPaymentMethod,
  onSaveAccountInfoAction,
  onSaveAddressAction,
  onSavePaymentMethodAction,
  onResetFieldErrors
} from './actions';

const AccountPageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:nth-child(1) {
    height: 50px;
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    justify-content: stretch;

    & > div:not(:last-child) {
      padding: 0.5rem 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;

      & > div:nth-child(1) {
        height: 50px;
      }

      & > div:not(:first-child) {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

        & > div:first-child {
          width: 55%;

          & input {
            margin-bottom: 0.5rem;
          }

          & p {
            margin: 0 0 0 0.2rem;
            font-size: 80%;
          }
          display: flex;
          flex-direction: column;

          & > div > div, & > div {
            display: flex;
            flex-direction: column;
          }
        }
        & > div:last-child {
          width: 45%;
          display: flex;
          justify-content: flex-end;
        }
      }


      & h5, & h4 {
        margin: 0.2rem 0;
      }

      & button {
        margin-left: 0.5rem;
      }

      border-bottom: 1px solid #ccc;

    } 


    & > div:last-child {
      margin-top: 2rem;
      display: flex;
      justify-content: stretch;
      align-items: center;
      & > button {
        width: 100%;
        margin: 0;
        display: block;
      }

    }
  }
`;

class AccountPage extends Component {

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.onSetDisableAccountInfoEdit = this.onSetDisableAccountInfoEdit.bind(this);
    this.onSetEnableAccountInfoEdit = this.onSetEnableAccountInfoEdit.bind(this);
    this.onSaveAccountInfo = this.onSaveAccountInfo.bind(this);
    this.onSaveAddress = this.onSaveAddress.bind(this);
    this.onSavePaymentMethod = this.onSavePaymentMethod.bind(this);

    this.onSetDisableAddressEdit = this.onSetDisableAddressEdit.bind(this);
    this.onSetEnableAddressEdit = this.onSetEnableAddressEdit.bind(this);

    this.onSetDisablePaymentMethodEdit = this.onSetDisablePaymentMethodEdit.bind(this);
    this.onSetEnablePaymentMethodEdit = this.onSetEnablePaymentMethodEdit.bind(this);

    this.onInputFieldChange = this.onInputFieldChange.bind(this);

  }

  componentWillMount() {
    const { dispatch, global } = this.props;
    if(global.isLoggedIn) {
      if(!isNull(global.userData) && isEmpty(global.userData.address) && isEmpty(global.userData.payment_method)) {
        dispatch(push('/content/fill-additional-information'));
      }
    } else {
      dispatch(push('/login'));
    }
    
  }

  onInputFieldChange(mainKey, key) {
    const { dispatch, global, accountPage } = this.props;
    if(accountPage[mainKey][key].length > 0) {
      dispatch(onResetFieldErrors(mainKey, key))
    }
  }

  onSaveAddress() {
    const { dispatch, global } = this.props;
    const userData = {
      first_name: this.firstNameField.value,
      last_name: this.lastNameField.value,
      email: this.emailField.value,
      username: this.usernameField.value,
    }
    dispatch(onSaveAccountInfoAction(userData, global.userData.data.id));
  }

  onSavePaymentMethod() {
    const { dispatch, global, accountPage } = this.props;
    const requestData = {
      payment_method: this.paymentMethodField.value
    }
    dispatch(onSavePaymentMethodAction(requestData, global.userData.id));
  }

  onSaveAddress() {
    const { dispatch, global, accountPage } = this.props;
    const requestData = {
      address: this.addressField.value,
    }
    dispatch(onSaveAddressAction(requestData, global.userData.id));
  }


  onSaveAccountInfo() {
    const { dispatch, global } = this.props;
    const userData = {
      first_name: this.firstNameField.value,
      last_name: this.lastNameField.value,
      email: this.emailField.value,
      username: this.usernameField.value,
      phone_number: this.phoneNumberField.value,
    }
    dispatch(onSaveAccountInfoAction(userData, global.userData.id));
  }

  onSetEnableAddressEdit() {
    const { dispatch } = this.props;
    dispatch(setEnableEdittingAddress());
  }

  onSetDisableAddressEdit() {
    const { dispatch } = this.props;
    dispatch(setDisableEdittingAddress());
  } 

  onSetEnablePaymentMethodEdit() {
    const { dispatch } = this.props;
    dispatch(setEnableEdittingPaymentMethod());
  }

  onSetDisablePaymentMethodEdit() {
    const { dispatch } = this.props;
    dispatch(setDisableEdittingPaymentMethod());
  }

  onSetDisableAccountInfoEdit() {
    const { dispatch } = this.props;
    dispatch(setDisableEdittingAccountInfo());
  }

  onSetEnableAccountInfoEdit() {
    const { dispatch } = this.props;
    console.log(setEnableEdittingAccountInfo)
    dispatch(setEnableEdittingAccountInfo());
  }

  onLogout() {
    const { dispatch } = this.props;
    dispatch(onLogoutTapped());
  }

  render() {
    const account = this.props.global.userData;
    const { accountPage, global } = this.props;
    return (
        <AccountPageWrapper>
          <div>
            <TitleBar title="Account" />
          </div>
          <div>
            <div>
              <div>
                <h3>ACCOUNT INFO</h3>
              </div>
              { !accountPage.accountInfoEditted && 
                <div>
                  <div>
                    <h4>{account.first_name} {account.last_name}</h4>
                    <h4>{account.phone_number}</h4>
                    <h5>username: {account.username}</h5>
                    <h5>email : {account.email}</h5>
                  </div>
                  <div>
                    <CustomButton onClick={this.onSetEnableAccountInfoEdit} 
                      color="white" bg="#F48024">
                       Edit
                    </CustomButton>
                  </div>
                </div>
              }
              {
                accountPage.accountInfoEditted &&
                <div className="accountInfoEditted">
                  <div>
                    <div>
                      <div>
                          <CustomLabel 
                            isError={accountPage.accountInfoErrors.first_name.length > 0}>First name</CustomLabel>
                          <CustomInputText
                            onChange={() => this.onInputFieldChange('accountInfoErrors', 'first_name')}
                            innerRef={ref => { this.firstNameField = ref; }}
                            defaultValue={account.first_name}
                            isError={accountPage.accountInfoErrors.first_name.length > 0}
                            placeholder="First Name"/> 
                          { accountPage.accountInfoErrors.first_name.map((error, index) => 
                            <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                          )}
                      </div>
                      <div>
                        <CustomLabel 
                          isError={accountPage.accountInfoErrors.last_name.length > 0}>Last name</CustomLabel>
                        <CustomInputText
                          onChange={() => this.onInputFieldChange('accountInfoErrors', 'last_name')}
                          innerRef={ref => { this.lastNameField = ref; }}
                          isError={accountPage.accountInfoErrors.last_name.length > 0}
                          defaultValue={account.last_name}
                          placeholder="Last Name"/>
                          { accountPage.accountInfoErrors.last_name.map((error, index) => 
                              <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                            )}
                      </div>
                    </div>
                     <div>
                      <CustomLabel 
                        isError={accountPage.accountInfoErrors.phone_number.length > 0}>Phone number</CustomLabel>
                      <CustomInputText
                        onChange={() => this.onInputFieldChange('accountInfoErrors', 'phone_number')}
                        innerRef={ref => { this.phoneNumberField = ref; }}
                        isError={accountPage.accountInfoErrors.phone_number.length > 0}
                        defaultValue={account.phone_number}
                        placeholder="Phone number" />
                        { accountPage.accountInfoErrors.phone_number.map((error, index) => 
                              <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                            )}
                    </div>
                    <div>
                      <CustomLabel 
                        isError={accountPage.accountInfoErrors.username.length > 0}>Username</CustomLabel>
                      <CustomInputText
                        onChange={() => this.onInputFieldChange('accountInfoErrors', 'username')}
                        innerRef={ref => { this.usernameField = ref; }}
                        isError={accountPage.accountInfoErrors.username.length > 0}
                        defaultValue={account.username}
                        placeholder="Username" />
                        { accountPage.accountInfoErrors.username.map((error, index) => 
                              <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                            )}
                    </div>
                    <div>
                      <CustomLabel 
                        isError={accountPage.accountInfoErrors.email.length > 0}>Email</CustomLabel>
                      <CustomInputText 
                        onChange={() => this.onInputFieldChange('accountInfoErrors', 'email')}
                        innerRef={ref => { this.emailField = ref; }}
                        defaultValue={account.email}
                        isError={accountPage.accountInfoErrors.email.length > 0}
                        placeholder="Email" />
                        { accountPage.accountInfoErrors.email.map((error, index) => 
                              <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                            )}
                    </div>
                  </div>
                  <div>
                    <CustomButton onClick={this.onSetDisableAccountInfoEdit} 
                      color="white" bg="#3e549a">
                       Cancel
                    </CustomButton>
                    <CustomButton onClick={this.onSaveAccountInfo} 
                      disabled={accountPage.isSavingAccountInfo} 
                      color="white" bg="#F48024">
                       Save
                    </CustomButton>
                  </div>
                </div>
              }
            </div>
            <div>
              <div>
                <h3>YOUR PROFILES</h3>
              </div>
              <div>
                <ProfileList profiles={global.profiles} />
              </div>
            </div>
            <div>
              <div>
                <h3>ADDRESS</h3>
              </div>
              { !accountPage.addressEditted && 
                <div>
                  <div>
                    <h5>{account.address}</h5>
                  </div>
                  <div>
                     <CustomButton onClick={this.onAddItem}
                      onClick={this.onSetEnableAddressEdit}
                      color="white" bg="#F48024">
                       Edit
                    </CustomButton>
                  </div>
                </div>
              }
              {
                accountPage.addressEditted &&
                <div>
                  <div>
                    <CustomTextArea 
                      placeholder="Your address"
                      onChange={() => { this.onInputFieldChange('addressErrors', 'address')}}
                      isError={accountPage.addressErrors.address.length > 0}
                      innerRef={ref => { this.addressField = ref; }}
                      defaultValue={account.address}/>
                    {accountPage.addressErrors.address.map((error, index) => 
                        <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                      )}
                  </div>
                  <div>
                    <CustomButton onClick={this.onSetDisableAddressEdit} 
                      color="white" bg="#3e549a">
                       Cancel
                    </CustomButton>
                    <CustomButton onClick={this.onSaveAddress} 
                      disabled={accountPage.isSavingAddress}
                      color="white" bg="#F48024">
                       Save
                    </CustomButton>
                  </div>
                </div>
              }
            </div>
            <div>
              <div>
                <h3>PAYMENT METHOD</h3>
              </div>
              { !accountPage.paymentMethodEditted && 
                <div>
                  <div>
                    <h5>{account.payment_method}</h5>
                  </div>
                  <div>
                     <CustomButton onClick={this.onAddItem} 
                      onClick={this.onSetEnablePaymentMethodEdit}
                      color="white" bg="#F48024">
                       Edit
                    </CustomButton>
                  </div>
                </div>
              }
              {
                accountPage.paymentMethodEditted &&
                <div>
                  <div>
                    <CustomTextArea placeholder="Metode pembayaran" 
                      onChange={() => { this.onInputFieldChange('paymentMethodErrors', 'payment_method')}}
                      isError={accountPage.paymentMethodErrors.payment_method.length > 0}
                      innerRef={ref => { this.paymentMethodField = ref; }}
                      defaultValue={account.payment_method}/>
                       {accountPage.paymentMethodErrors.payment_method.map((error, index) => 
                        <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                      )}
                  </div>
                  <div>
                     <CustomButton onClick={this.onSetDisablePaymentMethodEdit} 
                      color="white" bg="#3e549a">
                       Cancel
                    </CustomButton>
                    <CustomButton onClick={this.onSavePaymentMethod} 
                      disabled={accountPage.isSavingPaymentMethod}
                      color="white" bg="#F48024">
                       Save
                    </CustomButton>
                  </div>
                </div>
              }
            </div>
            <div>
              <GradientButton color1="#f6d365" color2="red" onClick={this.onLogout}>
                Logout
              </GradientButton>
            </div>
          </div>
        </AccountPageWrapper> 
      )
  }
}


const mapStateToProps = (state) => ({
  global: state.get('global').toJS(),
  accountPage: state.get('accountPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);