import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { isNull, isUndefined } from 'lodash';
import Select from 'react-select';

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
import ImageUploader from '../../components/ImageUploader';

const creationProductModeOptions = [
  {
    label: 'Buat product baru',
    value: 1,
  },
  {
    label: 'Pilih dari list product',
    value: 2,
  }
]

import {
  fetchUserContactsData,
  showSelectContactDialog,
  hideSelectContactDialog,
  onContactSelected,
  onContactFinalSelected,
  onAddItem,
  onRemoveItem,
  onPlusTap,
  onMinusTap,
  onPlusTapItem,
  onMinusTapItem,
  onItemPriceChange,
  saveProductAction,
  resetErrorsField,
  resetErrorsItemField,
  onUserChoiceCreationProductMode
} from './actions';

import {
  setToggleStatus,
} from '../DealPage/actions';

import {
  TOGGLE_STATUS_BUY,
  TOGGLE_STATUS_SELL
} from '../DealPage/constants';


const MakeDealPageWrapper = styled.div`
  & > div.result {
    margin: 0 -1rem;
  }

  & > div.creation-product-mode {
    margin-top: 1rem;

    & > .Select {
      z-index: 90;
    }
  }
  padding: 0 1rem;
  & > div > div.product-name {
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

    & > div.check {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
      h5 {
        margin: 0 5px;
      }
    }
  }

  & > div > div.product-items {
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

class MakeDealPage extends Component {

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
    this.handleCreationProductModeChange = this.handleCreationProductModeChange.bind(this);

    this.addToProductListCheckBox = React.createRef();
  }

  handleCreationProductModeChange(newOption) {
    const { dispatch } = this.props;
    dispatch(onUserChoiceCreationProductMode(newOption));
  }

  onPriceItemChange(event, index) {
    const { dispatch, makeDealPage } = this.props;
    if(makeDealPage.productErrors.items[index]['price'].length > 0) {
      dispatch(resetErrorsItemField(index, 'price'));
    }
    dispatch(onItemPriceChange(index, event.target.value));
  }

  onInputItemFieldChange(e, index, key) {
    const { dispatch, makeDealPage } = this.props;
    if(makeDealPage.productErrors.items[index][key].length > 0) {
      dispatch(resetErrorsItemField(index, key));
    }
  }

  onInputFieldChange(e, key) {
    const { dispatch, makeDealPage } = this.props;
    if(makeDealPage.productErrors[key].length > 0) {
      dispatch(resetErrorsField(key));
    }
  }


  onShareProductClick() {
    const { makeDealPage, dispatch, dealPage } = this.props;
    let total = 0;
    makeDealPage.product.itemData.forEach(item => {
      total += (item.quantity * item.price);
    })
    const requestData = {
      product_name: makeDealPage.product.productNameRef.current.value,
      expired_in_day: makeDealPage.product.expireInDay,
      user_target: !isNull(makeDealPage.product.userTarget) ? makeDealPage.product.userTarget.value : null,
      status: 1,
      profile: dealPage.currentProfile,
      total: total,
      items: makeDealPage.product.itemData.map((item, index) => ({
        order_mo: index + 1,
        quantity: item.quantity,
        price: item.price,
        item_name: item.itemNameRef.current.value,
        status: 1
      }))
    }
    dispatch(saveProductAction(requestData));
  }

  componentDidMount() {
    const { dispatch, global } = this.props;
    dispatch(setToggleStatus(TOGGLE_STATUS_SELL));
  }

  onAddItem() {
    const { dispatch } = this.props;
    dispatch(onAddItem());
  }

  onHandleChangeSelectContact(value) {
    const { dispatch, makeDealPage } = this.props;
    if(makeDealPage.productErrors['user_target'].length > 0) {
      dispatch(resetErrorsField('user_target'));
    }
    dispatch(onContactSelected(value));
  }


  onSelectContactTapped(event) {
    const { dispatch } = this.props;
    dispatch(showSelectContactDialog());
  } 

  onCancelSelectDialog() {
    const { dispatch } = this.props;
    dispatch(hideSelectContactDialog());
  }

  render() {
    const items = [];
    const { makeDealPage, dispatch, global } = this.props;
    if(makeDealPage.isLoading) {      
      return <LoaderImage />
    }
    return (
      <MakeDealPageWrapper>
        <div className="creation-product-mode">
          <Select 
            options={creationProductModeOptions} value={makeDealPage.creationProductMode} 
            onChange={this.handleCreationProductModeChange}
          />
        </div>
        { makeDealPage.creationProductMode.value == 1 ?
          <div>
            <div className="product-name">
              <h3>Produk Saya</h3>
              <CustomInputText placeholder="Penjelasan produk" 
                isError={makeDealPage.productErrors.product_name.length > 0}
                onChange={(e) => { this.onInputFieldChange(e, 'product_name')}}
                defaultValue={makeDealPage.tempRequestData.product_name}
                innerRef={makeDealPage.product.productNameRef}/>
              {makeDealPage.productErrors.product_name.map((error, index) => 
                <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
              )}
              <div className="check">
                <input id="product-check-box" type="checkbox" ref={this.addToProductListCheckBox} />
                <label htmlFor="product-check-box">
                  <h5>Tambahkan ke product list</h5>
                </label>
              </div>
            </div>
            <div className="product-items">
              <h3>Daftar Item</h3>
              <div className="items">
                {makeDealPage.product.itemData.map((item, index) => <ProductItem 
                  errors={makeDealPage.productErrors.items[index]}
                  defaultDataValues={makeDealPage.tempRequestData.items[index]}
                  resetErrorsFunction={this.onInputItemFieldChange}
                  orderNo={index+1}
                  item={item} key={index}
                  onPriceChange={this.onPriceItemChange}
                  onMinusTapItem={() => { dispatch(onMinusTapItem(index))}}
                  onPlusTapItem={() => { dispatch(onPlusTapItem(index))}}
                  onDelete={() => {dispatch(onRemoveItem(index))}}
                  isDeleteShow={makeDealPage.product.itemData.length > 1}/>)}
              </div>
              <div>
                <CustomButton onClick={this.onAddItem} 
                color="white" bg="#F48024">
                  + Tambah Item
                </CustomButton>
              </div>
            </div>
          </div> :
          <div className="product-list">
            
          </div>
        }
        <div className="product-target">
          <div>
            <div>
              <h4>Berlaku sampai dengan </h4>
            </div>
            <div>
              <CustomNumberInput 
                number={makeDealPage.product.expireInDay} 
                onMinusTap={() => { dispatch(onMinusTap()) }}
                onPlusTap={() => { dispatch(onPlusTap()) }}
                prefix="Hari" />
            </div>
          </div>
          <div>
            <div>
              <h4>Kirim penawaran ke</h4>
            </div>
            <div>
              {!isNull(makeDealPage.product.userTarget) && <p>{makeDealPage.product.userTarget.label}</p>}
              <CustomButton 
                color="white" 
                bg="#F48024" 
                onClick={this.onSelectContactTapped}>
                {isNull(makeDealPage.product.userTarget) ? 'Pilih' : 'Ganti' }
              </CustomButton>
              {makeDealPage.productErrors.user_target.map((error, index) => 
                  <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                )}
              <CustomAlert 
                title="Select Contact" 
                cancel={true}
                okButtonText="Select"
                cancelButtonText="Cancel"
                onCancelClick={this.onCancelSelectDialog}
                onOkClick={() => { dispatch(onContactFinalSelected())}}
                show={makeDealPage.showSelectContactDialog}>
                <ContactSelector
                  contacts={global.contactsData} 
                  handleChange={this.onHandleChangeSelectContact}
                  currentContactSelected={makeDealPage.product.userTarget} />
              </CustomAlert>
              { makeDealPage.successSaved && 
                <CustomAlert 
                  show={true}
                  cancel={false} 
                  noContent={true}
                  okButtonText="Ok!" 
                  title="Success Saved"
                  onOkClick={() => { dispatch(push('/content/shopping-list/seller')) }}></CustomAlert>
              }

            </div>
          </div>
        </div>
        <div className="result">
          <DealResult items={makeDealPage.product.itemData} 
            buttonTitle="Bagikan produk"
            onShareProductClick={this.onShareProductClick}/>
        </div>
      </MakeDealPageWrapper>
    )
  }
}


const mapStateToProps = (state) => ({
  global: state.get('global').toJS(),
  makeDealPage: state.get('makeDealPage').toJS(),
  dealPage: state.get('dealPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MakeDealPage);