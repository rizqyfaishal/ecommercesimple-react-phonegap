import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import { isNull } from 'lodash';
import ImageUploader from '../../components/ImageUploader';
import { invoiceStatus } from '../../components/InvoiceBuyerItem';
import Loader from '../../images/loader.svg';


import { 
  fetchInvoiceDataAction, 
  onUserRemoveImage,
  postImageUploadAction,
  onUserChoiceImage 
} from './actions';

import { convertToRupiah } from '../../utils';
import LoaderImage from '../../components/LoaderImage';
import TitleBar from '../../components/TitleBar';


const InvoiceBuyerDetailPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
  & p {
    margin: 0.5rem 0;
    font-size: 85%;
  }
  & h4 {
    margin: 0.5rem 0;
  }
  & > div:nth-child(2) {
    display: flex;
    margin-top: 55px;
    padding: 0 1rem;
    flex-direction: column;

    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      & > div {
        & > h2 {
          margin: 0.5rem 0;
        }

        & > p {
          margin: 0;
          color: #948e8e;
        }

        
        &:first-child {
          width: 40%;
        }
        &:last-child {
          width: 60%;
          align-items: flex-end;
          & > div {
            & > h4, & > p {
              margin: 0.5rem 0;
              text-align: right;
            }
          }
        }
      }
    }

    & > div:nth-child(2) {
      border-bottom: 1px solid #ddd;
    }

    & > div:nth-child(3) {
      display: flex;
      justify-content: flex-start;
      & > div {
        width: 50%;

        &:last-child {
          justify-self: flex-end;
          & > p, & > h4 {
            text-align: right;
          }
        }
      }
    }
    & > div:nth-child(4) {
      border-bottom: 1px solid #ddd;
    }

    & > div:nth-child(6) {
      & > div.sudah-upload {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > h4 {
          background-color: #F48024;
          color: white;
          padding: 2px 5px;
          border-radius: 3px;
        }

        & > img {
          max-width: 350px;
        }
      }
      & > div > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }

    & > div:nth-child(5) {
      border-bottom: 1px solid #ddd;
      & h5 {
        margin: 0.5rem 0;
      }

      & > h4 {
        margin: 1rem 0 0.5rem 0;
      }
      & > div {
        display: flex;
        flex-direction: column;

        & > div.summary-header {
          border-bottom: 1px solid #aaa;
          display: flex;
          justify-content: flex-start;
          & > div:first-child {
            width: 60%;
          }

          & > div:last-child {
            width: 40%;
            text-align: right;
          }
        }

        & > div.summary-detail {
          & > div {
            &:last-child {
              border-bottom: none;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
            & > div:first-child {
              width: 50%;
              & > p {
                margin: 0.5rem 0;
                &:first-child {
                  font-weight: bold;
                }
              }
            }

            & > div:last-child {
              width: 50%;
              text-align: right;

              & > p {
                margin: 0.5rem 0;
                font-weight: bold;
              }
            }
          }

        }
      }
    }
  }

`;

class InvoiceBuyerDetailPage extends Component {
  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.readFile = this.readFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchInvoiceDataAction(match.params.productId));
  }

  onUploadClick() {
    const { dispatch, invoiceBuyerDetailPage, match } = this.props;
    dispatch(postImageUploadAction(invoiceBuyerDetailPage.tempImage, match.params.productId));
  }

  onRemoveImage() {
    const { dispatch, match } = this.props;
    dispatch(onUserRemoveImage()); 
  }

  handleImageChange(event) {
    const { dispatch } = this.props;
    const file = event.target.files[0];
    this.readFile(file)
      .then(fileData => {
        dispatch(onUserChoiceImage(fileData.file, fileData.dataURL));
      })
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }


  render() {
    const { invoiceBuyerDetailPage, dispatch } = this.props;
    console.log(cordova.file);
    if(invoiceBuyerDetailPage.isLoading || isNull(invoiceBuyerDetailPage.invoiceData)) {
      return <InvoiceBuyerDetailPageWrapper>
        <TitleBar title="Invoice Detail" />
        <LoaderImage />
      </InvoiceBuyerDetailPageWrapper>
    }
    const invoice = invoiceBuyerDetailPage.invoiceData;
    return <InvoiceBuyerDetailPageWrapper>
      <TitleBar title="Invoice Detail" />
      <div>
        <div>
          <div>
            <h2>Order #{ invoice.product }</h2>
            <p>{invoice.product_data.user_target_data.first_name} {invoice.product_data.user_target_data.last_name}</p>
          </div>
          <div>
            <div>
              <p>Order date:</p>
              <h4>{moment(invoice.order_date).format("DD MMM YYYY")}</h4>
            </div>
          </div>
        </div>
        <div>
          <h2>Rp. {convertToRupiah(invoice.product_data.total)},00</h2>
        </div>
        <div>
          <div>
            <h4>Billed To:</h4>
            <p>{invoice.user_target_additional_information_data.address}</p>
          </div>
          <div>
            <h4>Shipped To:</h4>
            <p>{invoice.address_shipped_to}</p>
          </div>
        </div>
        <div>
          <h4>Metode Pembayaran:</h4>
          <p>{invoice.user_sender_additional_information_data.payment_method}</p>
        </div>
        <div>
          <h4>Product summary:</h4>
          <div>
            <div className="summary-header">
              <div>
                <h5>Items</h5>
              </div>
              <div>
                <h5>Subtotal</h5>
              </div>
            </div>
            <div className="summary-detail">
              { invoice.product_data.item_data.map((item, index) => {
                return <div key={index}>
                  <div>
                    <h4>{item.item_name}</h4>
                    <p>{item.quantity} x @Rp. {convertToRupiah(item.price)},00</p>
                  </div>
                  <div>
                    <h4>Rp. {convertToRupiah(item.quantity*item.price)},00</h4>
                  </div>
                </div>
              })}
              <div>
                <h4>Total Rp. {convertToRupiah(invoice.product_data.total)},00</h4>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>{invoice.status == 1 ? 'Bukti pembayaran:' : 'Status pembayaran:' }</h4>
          { invoice.status == 1 &&
            <div>
              <p>Mohon bayar sebelum <strong>{moment(invoice.order_date).add(7, 'days').format("DD MMM YYYY")}</strong>. 
                Invoice akan hangus jika tidak mengupload bukti transfer.</p>
              <div>
                { invoiceBuyerDetailPage.isUploadingImage && 
                  <img src={Loader} width="50" />
                }

                { !invoiceBuyerDetailPage.isUploadingImage && 
                    <ImageUploader 
                      currentImage={invoiceBuyerDetailPage.tempImage}
                      currentImageURL={invoiceBuyerDetailPage.tempImageUrl}
                      onUploadClick={this.onUploadClick}
                      onRemoveImage={this.onRemoveImage}
                      errors={invoiceBuyerDetailPage.errors} 
                      onChange={this.handleImageChange}/>
                  }
                </div>
            </div>
          }
          { invoice.status == 2 && 
            <div className="sudah-upload">
              <h4>{invoiceStatus[invoice.status - 1]}</h4>
              <img alt="bukti-pembayaran" src={`http://178.128.82.252:17519${invoice.attachment_data.image_data.image}`} />
            </div>
          } 
        </div>
      </div>
    </InvoiceBuyerDetailPageWrapper>
  } 
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  invoiceBuyerDetailPage: state.get('invoiceBuyerDetailPage').toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceBuyerDetailPage);