import React from 'react';
import styled from 'styled-components';

import CustomButton from '../../components/CustomButton';
import { convertToRupiah } from '../../utils';

const ProductListWrapper = styled.div`
  margin-top: 1rem;
  & > h4 {
    text-align: center;
  }
  & > div.product-items {
    & > div.product-item {
      padding: 0.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: 4px;
      border: 1px solid #ddd;
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      & > div {
        display: flex;
        flex-direction: column;
        & > div:nth-child(1) {
          & > h2 {
            margin: 0;
          }
        }
        & > div:nth-child(2) {
          & > h4 {
            margin: 0;
          }
        }

        &.control {
          margin-top: 1rem;
          display: flex;
          align-items: center;
        }

        &.item-list {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;

          & > div.header {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #bbb;
            padding-bottom: 0.5rem;
            & > div {
              width: 50%;
              &:nth-child(1) {

              }

              &:last-child {
                align-items: flex-end;
                & > h3 {
                  text-align: right;
                }
              }
            }
            & h3 {
              margin: 0;
            }
          }

          & > div.body {
            & > div.item {
              display: flex;
              justify-content: center;
              & > div:first-child {
                width: 50%;
              }
              & > div:last-child {
                width: 50%;
                & > h3, & > p {
                  margin: 0.5rem;
                  text-align: right;
                }
              }
              &:not(:last-child) {
                border-bottom: 1px solid #ddd;
              }
            }
          }
          & > div.total {
            border-top: 1px solid #bbb;

            & > h3 {
              text-align: right;
            }
          }
        }
      }
    }
  }
`;

const ProductList = (props) => {
  return (
    <ProductListWrapper>
      { props.products.length > 0 ?
        <div className="product-items">
            { props.products.map((product, index) => {
              return <div className="product-item" key={product.id}>
                <div>
                  <div>
                    <h2>{ product.product_name }</h2>
                  </div>
                  <div>
                    <h4>Total : Rp. { convertToRupiah(product.total) },00</h4>
                  </div>
                </div>
                { index != props.currentExpandItemIndex &&
                  <div className="control">
                    <CustomButton color="white" bg="#F48024" 
                      onClick={() => { props.onExpandItem(index) }}>Show items</CustomButton>
                  </div>
                }
                { index == props.currentExpandItemIndex && 
                  <div className="item-list">
                    <div className="header">
                      <div>
                        <h3>Nama Item</h3>
                      </div>
                      <div>
                        <h3>Subtotal</h3>
                      </div>
                    </div>
                    <div className="body">
                      { product.items.map(item => {
                        return <div className="item">
                          <div>
                            <h3>{item.item_name}</h3>
                          </div>
                          <div>
                            <h3>Rp. { convertToRupiah(item.quantity * item.price) }</h3>
                            <p>@{ item.quantity }x{item.price}</p>
                          </div>
                        </div>
                      })}
                    </div>
                    <div className="total">
                      <h3>
                        Total : Rp. { convertToRupiah(product.total) },00
                      </h3>
                    </div>
                  </div>
                }
              </div>
            })
          } 
        </div>: 
        <h4>Belum ada product terbuat</h4>
      }
    </ProductListWrapper>
  )
}

export default ProductList;