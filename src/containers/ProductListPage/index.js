import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isUndefined } from 'lodash';

import CustomAlert from '../../components/CustomAlert';
import TopNavBar from '../../components/TopNavBar';
import ProfileSelector from '../../components/ProfileSelector';
import ProductList from '../../components/ProductList';
import CircleFloatingButton from '../../components/CircleFloatingButton';
import CustomInputText from '../../components/CustomInputText';
import ProductItem from '../../components/ProductItem';
import CustomButton from '../../components/CustomButton';
import DealResult from '../../components/DealResult';
import LoaderImage from '../../components/LoaderImage';
import WarningMessage from '../../components/WarningMessage';
import FieldErrorMessage from '../../components/FieldErrorMessage';



import {
  TOGGLE_STATUS_PRODUCT_LIST,
  PRODUCT_LIST_PAGE_LIST_MODE,
  PRODUCT_LIST_PAGE_CREATE_MODE
} from './constants';

import {
  showProfileDialog,
  hideProfileDialog,
  onUserSelectedProfile,
  onUserCanceledSelectProfile,
  changeMode,
  onAddItem,
  onRemoveItem,
  onPlusTapItem,
  onMinusTapItem,
  onCancelDealResult,
  onResetErrorFields,
  onItemPriceChange,
  onResetItemErrorFields,
  onSaveProduct,
  fetchProductList,
  onUserSelectedProfileFinal,
  onExpandItem as onExpandItemAction
} from './actions';

const ProductListPageWrapper = styled.div`
  position: relative;
  & > div {
    margin-bottom: 70px;
  }
  & > div.product-list {
    margin-top: 120px;
    padding: 0 1rem;
  }
  & > div > div.product-creation{
    padding: 0 1rem;
    margin-top: 95px;
    margin-bottom: 2rem;

    & > div.result {
      margin
    }

    & > div.product-items {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;

      & > div:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    & > div.product-name {
      display: flex;
      justify-content: stretch;
      align-items: stretch;
      flex-direction: column;
      & > h3 {
        margin: 1.2 rem 0 0.5rem 0;
      }

      & > div.check {
        display: flex;
        justify-content: stretch;
        align-items: center;
        & > label > h5 {
          margin: 0;
        }
      }
    }
  }
`;

class ProductListPage extends Component {

  constructor(props) {
    super(props);
    this.onLeftTapped = this.onLeftTapped.bind(this);
    this.onRightTapped = this.onRightTapped.bind(this);
    this.onProfileTapped = this.onProfileTapped.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.saveNewProfileFromDialog = this.saveNewProfileFromDialog.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onShareProductClick = this.onShareProductClick.bind(this);
    this.onPriceItemChange = this.onPriceItemChange.bind(this);
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.onCancelButtonClickDealResult = this.onCancelButtonClickDealResult.bind(this);
    this.onInputItemFieldChange = this.onInputItemFieldChange.bind(this);
    this.onExpandItem = this.onExpandItem.bind(this);

    this.createNewProfileRef = React.createRef();
    this.profileDescriptionRef = React.createRef();
    this.addToProductListCheckBox = React.createRef();
  }

  onExpandItem(index) {
    const { dispatch } = this.props;
    dispatch(onExpandItemAction(index));
  }

  onCancelButtonClickDealResult(e) {
    console.log(e);
    const { dispatch } = this.props;
    dispatch(onCancelDealResult());
  }

  onInputItemFieldChange(event, index, key) {
    const { dispatch } = this.props;
    dispatch(onResetItemErrorFields(index, key));
  }

  onInputFieldChange(event, key) {
    const { dispatch } = this.props;
    dispatch(onResetErrorFields(key));
  }

  onPriceItemChange(e, index) {
    const { dispatch } = this.props;
    dispatch(onItemPriceChange(index, e.target.value));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProductList()); 
  }

  onShareProductClick() {
    const { dispatch, productListPage } = this.props;
    const product_name = productListPage.product.productNameRef.current.value;
    const included_on_list = true;
    const profile = productListPage.currentProfile.value;
    const total = productListPage.product.itemData
      .map(data => data.quantity * parseFloat(data.price))
      .reduce((acc, curr) => acc + curr);
    const items = productListPage.product.itemData.map(data => ({
      item_name: data.itemNameRef.current.value,
      price: data.price,
      quantity: data.quantity
    }))
    dispatch(onSaveProduct({ product_name, included_on_list, total, items, profile }));
  }

  onAddItem() {
    const { dispatch } = this.props;
    dispatch(onAddItem());
  } 

  onRemoveItem(index) {
    console.log(index);
    const { dispatch } = this.props;
    dispatch(onRemoveItem(index));
  }

  onProfileTapped(event) {
    const { dispatch } = this.props;
    dispatch(onUserSelectedProfile(event.target.value));
  }

  changeMode() {
    const { dispatch } = this.props;
    dispatch(changeMode());
  }

  onRemoveImage() {

  }

  handleImageChange() {

  }

  saveNewProfileFromDialog() {

  }

  onLeftTapped(event) {
    const { dispatch } = this.props;
    dispatch(showProfileDialog());
  }

  onRightTapped(event) {
    console.log(event);
  }

  render() {
    const { global, productListPage, dispatch } = this.props;
    let content;
    console.log(productListPage.currentProfile);
    if(productListPage.isLoading) {
      content = <LoaderImage />
    } else if(productListPage.mode == PRODUCT_LIST_PAGE_LIST_MODE) {
      content = <div className="product-list">
        { !isUndefined(global.flashMessages.saveProductSuccess) && 
          <WarningMessage>
            {global.flashMessages.saveProductSuccess}
          </WarningMessage>
        }
        <ProductList products={productListPage.products
            .filter(product => product.profile == productListPage.currentProfile.value)}
            onExpandItem={this.onExpandItem}
            currentExpandItemIndex={productListPage.currentExpandItemIndex} />
      </div>;
    } else {
      content = <div>
              <div className="product-creation">
                <div className="product-name">
                  <h3>Produk Saya</h3>
                  <CustomInputText placeholder="Penjelasan produk" 
                    isError={productListPage.productErrors.product_name.length > 0}
                    onChange={(e) => { this.onInputFieldChange(e, 'product_name')}}
                    defaultValue={productListPage.tempRequestData.product_name}
                    innerRef={productListPage.product.productNameRef}/>
                  {productListPage.productErrors.product_name.map((error, index) => 
                    <FieldErrorMessage key={index}>{error}</FieldErrorMessage>
                  )}
                </div>
                <div className="product-items">
                  <h3>Daftar Item</h3>
                  <div className="items">
                    {productListPage.product.itemData.map((item, index) => <ProductItem 
                      errors={productListPage.productErrors.items[index]}
                      defaultDataValues={productListPage.tempRequestData.items[index]}
                      resetErrorsFunction={this.onInputItemFieldChange}
                      orderNo={index+1}
                      item={item} key={index}
                      onPriceChange={(e) => this.onPriceItemChange(e, index)}
                      onMinusTapItem={() => { dispatch(onMinusTapItem(index))}}
                      onPlusTapItem={() => { dispatch(onPlusTapItem(index))}}
                      onDelete={() => { dispatch(onRemoveItem(index)) }}
                      isDeleteShow={productListPage.product.itemData.length > 1}/>)}
                  </div>
                  <div>
                    <CustomButton onClick={this.onAddItem} 
                    color="white" bg="#F48024">
                      + Tambah Item
                    </CustomButton>
                  </div>
                </div>
              </div>
              <div className="result">
                <DealResult items={productListPage.product.itemData} 
                  buttonTitle="Simpan Produk"
                  cancelButton={true}
                  cancelButtonTitle="Cancel"
                  onCancelButtonClick={this.onCancelButtonClickDealResult}
                  onShareProductClick={this.onShareProductClick}/>
              </div>
            </div>;
    }
    return <ProductListPageWrapper>
       <TopNavBar title="Logo" status={TOGGLE_STATUS_PRODUCT_LIST}
          freezeToggle={true}
          currentProfileImage={productListPage.profiles[productListPage.currentProfileIndex].pict}
          currentProfileText={'Profile'}
          onLeftTapped={this.onLeftTapped}
          rightButtonHide={productListPage.profiles.length <= 1}
          leftButtonHide={false}
          onRightTapped ={this.onRightTapped}
          statusActionText="Switch Profile"
        />
        <CustomAlert show={productListPage.showProfileDialog} 
          onOkClick={() => { dispatch(onUserSelectedProfileFinal()); }}
          onCancelClick={() => { dispatch(onUserCanceledSelectProfile()); }}
          title="Select Profile" 
          okButtonText="Select" 
          okButtonDisabled={productListPage.isLoading}
          cancelButtonText="Cancel"
          cancel={true}>
          <ProfileSelector name="profile" profiles={productListPage.profiles} 
            tempImage={productListPage.tempImage}
            tempImageUrl={productListPage.tempImageUrl}
            onProfileTapped={this.onProfileTapped}
            onRemoveImage={this.onRemoveImage}
            isSaving={productListPage.isLoadingDialog}
            handleImageChange={this.handleImageChange}
            imageErrors={productListPage.errors}
            newProfileErrors={productListPage.newProfileErrors}
            createNewProfileRef={this.createNewProfileRef}
            descriptionFieldRef={this.profileDescriptionRef}
            onSaveNewProfileClick={this.saveNewProfileFromDialog} />
        </CustomAlert>
        { content } 
        { !productListPage.isLoading && 
          productListPage.mode == PRODUCT_LIST_PAGE_LIST_MODE && 
          <CircleFloatingButton onClick={this.changeMode} /> }
        
    </ProductListPageWrapper>
  }
}


const mapStateToProps = (state) => ({
  productListPage: state.get('productListPage').toJS(),
  global: state.get('global').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);