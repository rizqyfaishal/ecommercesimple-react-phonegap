import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import moment from 'moment';

import CustomButton from '../../components/CustomButton';
import GradientButton from '../../components/GradientButton';
import LoaderImage from '../../components/LoaderImage';
import CustomAlert from '../../components/CustomAlert';
import { convertToRupiah } from '../../utils';
import {
  fetchMyDealProductsAction,
  onSwitchNextOfferAction,
  showCancelDealDialog,
  showAcceptDealDialog,
  showNegotiateDealDialog,
  hideCancelDealDialog,
  hideAcceptDealDialog,
  hideNegotiateDealDialog,
  onAcceptDealRequestAction,
  onCancelDealRequestAction,
  onNegotiateDealRequestAction
} from './actions';

import {
  setToggleStatus
} from '../DealPage/actions';

import {
  TOGGLE_STATUS_BUY,
  TOGGLE_STATUS_SELL
} from '../DealPage/constants';

const MyDealPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;



  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;

    & > div:nth-child(1) {
      display: flex;
      border-bottom: 1px solid #ddd;
      padding: 0 1rem;
      justify-content: flex-start;
      align-items: center;

      & > div:nth-child(1) {
        width: 60%;
        & > h5 {
          margin: 1rem 0 0.5rem 0;
        }
      }

      & > div:nth-child(2) {
        width: 40%;
        justify-self: flex-end;
        & > h5 {
          text-align: right;
          margin: 1rem 0 0.5rem 0;
        }
      }
    }

    & > div:nth-child(3) {
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 1rem;

      & > div {
        padding-left: 0.5rem;
      }
    }

    & > div:nth-child(2) {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0;
        & > div > h4, & > div > h6 {
          margin: 0.2rem 0;
        } 

        & > div > h6 {
          font-size: 85%;
          font-weight: normal;
        }

        & > div:nth-child(1) {
          width: 60%;
        }
        & > div:nth-child(2) {
          width: 40%;
          & > h4 {
            text-align: right;
          }
        }
      }
    }
  }

  & > div:nth-child(1) {
    margin-top: 10px;
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
    & > div:nth-child(1) {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      & > div:nth-child(1) {
        & > h2 {
          margin-top: 0;
          margin-bottom: 10px;
        }

        & > h5 {
          margin: 0;
        }
      }

      & > div:nth-child(2) {
        & > h3 {
          font-size: 120%;
        } 
      }
    }

    & > div:nth-child(2) {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;

      & > div:nth-child(1) {
        & > h6 {
          margin-top: 0;
          margin-bottom: 10px;
          text-align: right;
        }
        & > h6.price {
          margin-top: 0;
          margin-bottom: 10px;
          text-align: right;
          font-size: 120%;
        }


      }

      & > div:nth-child(2) {
        & > button {
          margin: 1rem 0;
        }
      }
    }

  }

  & > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    grid-template-columns: 1fr 1fr;
  }

  & > div.no-found-deal {
    & > p {
      font-size: 150%;
    }
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: none;
  }


`;


class MyDealPage extends Component {

  constructor(props) {
    super(props);

    this.onDealTapped = this.onDealTapped.bind(this);
    this.onCancelTapped = this.onCancelTapped.bind(this);
    this.onNegoTapped = this.onNegoTapped.bind(this);

    this.onAcceptActionClick = this.onAcceptActionClick.bind(this);
    this.onNegotiateActionClick = this.onNegotiateActionClick.bind(this);
    this.onCancelActionClick = this.onCancelActionClick.bind(this);

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setToggleStatus(TOGGLE_STATUS_BUY));
    dispatch(fetchMyDealProductsAction());
  }

  onAcceptActionClick() {
    const { dispatch, myDealPage } = this.props;
    dispatch(onAcceptDealRequestAction(myDealPage.myDealProducts[myDealPage.currentProductId].id));
  }

  onCancelActionClick() {
    const { dispatch, myDealPage } = this.props;
    dispatch(onCancelDealRequestAction(myDealPage.myDealProducts[myDealPage.currentProductId].id))
  }

  onNegotiateActionClick() {
    const { dispatch, myDealPage } = this.props;
    dispatch(onNegotiateDealRequestAction(myDealPage.myDealProducts[myDealPage.currentProductId].id))
  }

  onDealTapped() {
    const { dispatch } = this.props;
    dispatch(showAcceptDealDialog());
  }

  onCancelTapped() {
    const { dispatch } = this.props;
    dispatch(showCancelDealDialog());
  }

  onNegoTapped() {
    const { dispatch } = this.props;
    dispatch(showNegotiateDealDialog());
  }

  render() {
    let total = 0;
    const { myDealPage, dispatch } = this.props;
    console.log(myDealPage);
    if(isNull(myDealPage.myDealProducts) || myDealPage.isLoading) {
      return <LoaderImage />;
    } else if(!isNull(myDealPage.myDealProducts) && myDealPage.myDealProducts.length == 0) {
      return <MyDealPageWrapper>
        <div className="no-found-deal">
          <p>No available deal</p>
          <CustomButton onClick={() => { dispatch(fetchMyDealProductsAction())} } 
            color="white" bg="#F48024">
              Refresh
          </CustomButton>
        </div>
      </MyDealPageWrapper>
    } 
    const product = myDealPage.currentProductData;
    return (
        <MyDealPageWrapper>
          <div>
            <div>
              <div>
                <h2>{product.user_sender_data.first_name} {product.user_sender_data.last_name}</h2>
                <h5>{product.product_name}</h5>
              </div>
              <div>
                <h3>Rp. { convertToRupiah(product.total) },00</h3>
              </div>
            </div>
            <div>
              <div>
                <h6>Date: &nbsp;{ moment(product.created_at).format('DD MMM YY  HH:mm A').toString() }</h6>
                <h6>Expiration: &nbsp;
                  { moment(product.created_at).add(product.expired_in_day, 'days').format('DD MMM YY  HH:mm A').toString() }</h6>
              </div>
              <div>
                <GradientButton color1="#f6d365" color2="#fda085" onClick={this.onDealTapped}>
                  Ok! Deal
                </GradientButton>
                <CustomAlert 
                  okButtonText="Ok"
                  cancelButtonText="Cancel"
                  cancel
                  onCancelClick={() => { dispatch(hideAcceptDealDialog())} }
                  onOkClick={this.onAcceptActionClick}
                  show={myDealPage.showAcceptDialog} title="Accept Deal">
                  <h3>Are you sure?</h3>
                </CustomAlert>
                <CustomAlert
                  onOkClick={() => { dispatch(fetchMyDealProductsAction()); }} 
                  show={myDealPage.successAccepted}
                  title="Deal Accepted"
                  noContent={true}
                  okButtonText="Ok">
                </CustomAlert>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h5>Items</h5>
              </div>
              <div>
                <h5>Amounts</h5>
              </div>
            </div>
            <div>
              {product.item_data.map(item => {
                return (
                    <div key={item.id}>
                      <div>
                        <h4>{item.item_name}</h4>
                        <h6 className="price">{item.quantity} x @Rp. {convertToRupiah(item.price)},00</h6>
                      </div>
                      <div><h4>Rp. {convertToRupiah(item.price * item.quantity) },00</h4></div>
                    </div>
                  )
              })}
            </div>
            <div>
              <div>
                <h4>Total</h4>
              </div>
              <div>
                <h4>Rp. {convertToRupiah(product.total)},00</h4>
              </div>
            </div>
          </div>
          <div>
            <div>
              <CustomButton color="white" bg="#5bc0de" onClick={this.onNegoTapped}>Nego</CustomButton>
              <CustomAlert 
                  okButtonText="Ok"
                  cancelButtonText="Cancel"
                  cancel
                  onCancelClick={() => { dispatch(hideNegotiateDealDialog())} }
                  onOkClick={this.onNegotiateActionClick}
                  show={myDealPage.showNegotiateDialog} title="Negotiate to sender">
                  <h3>Are you sure?</h3>
                </CustomAlert>
                <CustomAlert
                  onOkClick={() => { dispatch(fetchMyDealProductsAction()); }} 
                  show={myDealPage.successNegotiated}
                  title="Negotiate successfully sended"
                  noContent={true}
                  okButtonText="Ok">
                </CustomAlert>
            </div>
            <div>
              <CustomButton color="white" bg="#d9534f" onClick={this.onCancelTapped}>Batal</CustomButton>
              <CustomAlert 
                  okButtonText="Ok"
                  cancelButtonText="Cancel"
                  cancel
                  onCancelClick={() => { dispatch(hideCancelDealDialog())} }
                  onOkClick={this.onCancelActionClick}
                  show={myDealPage.showCancelDialog} title="Cancel deal">
                  <h3>Are you sure?</h3>
                </CustomAlert>
                <CustomAlert
                  onOkClick={() => { dispatch(fetchMyDealProductsAction()); }} 
                  show={myDealPage.successCanceled}
                  title="Deal canceled"
                  noContent={true}
                  okButtonText="Ok">
                </CustomAlert>
            </div>
          </div>
        </MyDealPageWrapper>
      )
  }
}


const mapStateToProps = (state) => ({
  myDealPage: state.get('myDealPage').toJS()
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDealPage);