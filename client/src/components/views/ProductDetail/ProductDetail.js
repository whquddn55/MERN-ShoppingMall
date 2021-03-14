import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Row, Col,} from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {continents} from '../../utils/Datas'

function ProductDetail(props) {
    const productId = props.match.params.productId;
    const [productInfo, setProductInfo] = useState();

    useEffect(() => {
        console.log(productId);
        axios.get(`/api/product/${productId}`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setProductInfo(response.data.productInfo);
                }
                else {
                    alert(`Fail to get product info, Id : ${productId}`);
                }
            })
    }, [])

    if (productInfo) {
        return ( 
            <div style = {{marginTop : '3vh', paddingLeft: '100px', paddingRight: '100px'}}>
                <h4 style = {{textAlign:'left', margin : '1rem auto'}}>{continents[productInfo.continent].value}</h4>
                    <Row gutter = {16, 16}>
                        <Col lg = {12} xs = {24}>
                            <ProductImage items = {productInfo.images}/>
                        </Col>
                        <Col lg = {12} xs = {24}>
                            <ProductInfo productInfo={productInfo}/>
                        </Col>
                    </Row>
            </div>
        )
    }
    else return (<div></div>)
}

export default ProductDetail
