import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNull } from 'lodash';

import CustomInputText from '../../components/CustomInputText';
import CustomLabel from '../../components/CustomLabel';
import GradientButton from '../../components/GradientButton';
import ProductItem from '../../components/ProductItem';
import CustomNumberInput from '../../components/CustomNumberInput';
import CustomButton from '../../components/CustomButton';
import DealResult from '../../components/DealResult';
import ContactSelector from '../../components/ContactSelector';
import CustomAlert from '../../components/CustomAlert';
import LoaderImage from '../../components/LoaderImage';
import FieldErrorMessage from '../../components/FieldErrorMessage';


import {
	fetchDealProductDataAction,
	resetErrorsField,
	onPlusTapped,
	onMinusTapped,
	onRemoveItem,
	onPlusExpiredInDay,
	onMinusExpiredInDay,
	showSelectContactsDialog,
	hideSelectContactsDialog,
	onSelectContact,
	onItemPriceChange,
	resetItemErrorsField,
	saveEditedProductAction,
	onAddItem
} from './actions';

import {
  setToggleStatus
} from '../DealPage/actions';

import {
  TOGGLE_STATUS_BUY,
  TOGGLE_STATUS_SELL
} from '../DealPage/constants';


const EditDealPageWrapper = styled.div`
	& > div.result {
    margin: 0 -1rem;
  }
  padding: 0 1rem;
  & > div.product-name {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;

    & > h3 {
      margin: 1rem 0 0.5rem 0;
    }

    & > p {
      margin: 0.2rem 0 0 0.2rem;
      font-size: 80%;
    }
  }

  & > div.product-items {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    & > div:last-child {
      display: flex;
      justify-content: center;
    }
  }

  & > div.product-target {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;

    & > div:nth-child(1) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: stretch;
      & > div:nth-child(1) {
        width: 60%;
        display: flex;
        justify-content: stretch;
      }

      & > div:nth-child(2) {
        width: 40%;
      }
      & > p {
        font-size: 80%;
      }
    }

    & > div:nth-child(2) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: stretch;

      & > div:nth-child(1) {
        width: 60%;
        display: flex;
        justify-content: stretch;
      }

      & > div:nth-child(2) {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > p {
          font-size: 90%;
          text-align: center;
          margin: 0.2rem auto;
        }
      }
      
    }
`;

class EditDealPage extends Component {
	constructor(props) {
    super(props);
    this.onSelectContactTapped = this.onSelectContactTapped.bind(this);
    this.onCancelSelectDialog = this.onCancelSelectDialog.bind(this);
    this.onHandleChangeSelectContact = this.onHandleChangeSelectContact.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onPriceItemChange = this.onPriceItemChange.bind(this);
    this.onShareProductClick = this.onShareProductClick.bind(this);
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.onInputItemFieldChange = this.onInputItemFieldChange.bind(this);
  }


  onPriceItemChange(event, index) {
    const { dispatch, editDealPage } = this.props;
    if(editDealPage.productErrors.items[index]['price'].length > 0) {
      dispatch(resetItemErrorsField(index, 'price'));
    }
    dispatch(onItemPriceChange(index, event.target.value));
  }

  onInputItemFieldChange(e, index, key) {
    const { dispatch, editDealPage } = this.props;
    if(editDealPage.productErrors.items[index][key].length > 0) {
      dispatch(resetItemErrorsField(index, key));
    }
  }

  onInputFieldChange(e, key) {
    const { dispatch, editDealPage } = this.props;
    if(editDealPage.productErrors[key].length > 0) {
      dispatch(resetErrorsField(key));
    }
  }


  onShareProductClick() {
    const { editDealPage, dispatch, dealPage, match } = this.props;
    let total = 0;
    editDealPage.productData.item_data.forEach(item => {
      total += (item.quantity * item.price);
    })
    const requestData = {
      product_name: editDealPage.productData.productNameRef.current.value,
      expired_in_day: editDealPage.productData.expired_in_day,
      user_target: !isNull(editDealPage.productData.user_target) ? editDealPage.productData.user_target : null,
      status: 1,
      profile: dealPage.currentProfile,
      total: total,
      items: editDealPage.productData.item_data.map((item, index) => ({
        order_mo: index + 1,
        quantity: item.quantity,
        price: item.price,
        item_name: item.itemNameRef.current.value,
        status: 1
      })),
      item_data: editDealPage.productData.item_data.map((item, index) => ({
        order_mo: index + 1,
        quantity: item.quantity,
        price: item.price,
        item_name: item.itemNameRef.current.value,
        status: 1
      }))
    }
    dispatch(saveEditedProductAction(match.params.productId, requestData));
  }

  // componentWillMount() {
  //   const { dispatch } = this.props;
  // }

  onAddItem() {
    const { dispatch } = this.props;
    dispatch(onAddItem());
  }

  onHandleChangeSelectContact(value) {
    const { dispatch, editDealPage } = this.props;
    if(editDealPage.productErrors['user_target'].length > 0) {
      dispatch(resetErrorsField('user_target'));
    }
    dispatch(onSelectContact(value));
  }


  onSelectContactTapped(event) {
    const { dispatch } = this.props;
    dispatch(showSelectContactsDialog());
  } 

  onCancelSelectDialog() {
    const { dispatch } = this.props;
    dispatch(hideSelectContactsDialog());
  }

	componentDidMount() {
		const { dispatch, match } = this.props;
		dispatch(setToggleStatus(TOGGLE_STATUS_SELL));
		dispatch(fetchDealProductDataAction(match.params.productId));
	}

	render() {
    const { editDealPage, dispatch, global } = this.props;
    console.log(editDealPage);
    if(editDealPage.isLoading) {      
      return <LoaderImage />
    }
		return (
			<EditDealPageWrapper>
				<div className="product-name">
          <h3>Produk Saya</h3>
          <CustomInputText placeholder="Penjelasan produk" 
            isError={editDealPage.productErrors.product_name.length > 0}
            onChange={(e) => { this.onInputFieldChange(e, 'product_name')}}
            defaultValue={editDealPage.tempRequestData.product_name} 
            innerRef={editDealPage.productData.productNameRef}/>
          {editDealPage.productErrors.product_name.map((error, index) => 
            <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
          )}
        </div>
        <div className="product-items">
          <h3>Daftar Item</h3>
          <div className="items">
            {editDealPage.productData.item_data.map((item, index) => <ProductItem 
              errors={editDealPage.productErrors.items[index]}
              defaultDataValues={editDealPage.tempRequestData.item_data[index]}
              resetErrorsFunction={this.onInputItemFieldChange}
              orderNo={index+1}
              item={item} key={index}
              onPriceChange={this.onPriceItemChange}
              onMinusTapItem={() => { dispatch(onMinusTapped(index))}}
              onPlusTapItem={() => { dispatch(onPlusTapped(index))}}
              onDelete={() => { dispatch(onRemoveItem(index)) }}
              isDeleteShow={editDealPage.productData.item_data.length > 1}/>)}
          </div>
          <div>
            <CustomButton onClick={this.onAddItem} 
            color="white" bg="#F48024">
              + Tambah Item
            </CustomButton>
          </div>
        </div>
        <div className="product-target">
          <div>
            <div>
              <h4>Berlaku sampai dengan </h4>
            </div>
            <div>
              <CustomNumberInput 
                number={editDealPage.productData.expired_in_day} 
                onMinusTap={() => { dispatch(onMinusExpiredInDay()) }}
                onPlusTap={() => { dispatch(onPlusExpiredInDay()) }}
                prefix="Hari" />
            </div>
          </div>
          <div>
            <div>
              { editDealPage.successSaved && 
                <CustomAlert 
                  show={true}
                  cancel={false} 
                  noContent={true}
                  okButtonText="Ok!" 
                  title="Success Saved"
                  onOkClick={() => { dispatch(push('/content/shopping-list/seller'))}}></CustomAlert>
              }
            </div>
          </div>
        </div>
        <div className="result">
          <DealResult items={editDealPage.productData.item_data} 
          	buttonTitle="Simpan perubahan"
          	onShareProductClick={this.onShareProductClick}/>
        </div>
			</EditDealPageWrapper>
		)
	}
}

const mapStateToProps = state => ({
	editDealPage: state.get('editDealPage').toJS(),
	global: state.get('global').toJS(),
	dealPage: state.get('dealPage').toJS()
});

const mapDispatchToProps = dispatch => ({
	dispatch: dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(EditDealPage);