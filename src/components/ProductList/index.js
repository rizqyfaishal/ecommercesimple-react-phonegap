import React from 'react';
import styled from 'styled-components';

const ProductListWrapper = styled.div`

`;

const ProductList = (props) => {
  return (
    <ProductListWrapper>
      { props.products.length > 0 ?
        'haha' : 
        <h4>Belum ada product terbuat</h4>
      }
    </ProductListWrapper>
  )
}

export default ProductList;