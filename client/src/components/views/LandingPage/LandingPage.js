import React, {useEffect, useState} from 'react';
import {Button, Card, Row, Col} from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage(props) {
    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [lastPostSize, setLastPostSize] = useState(4)

    const limit = 4;

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        axios.post('/api/product/products', {
            limit,
            skip
        }).then(response => {
            if (response.data.success) {
                setLastPostSize(response.data.productsInfo.length);
                setProducts([...products, ...response.data.productsInfo]);
            }
            else {
                alert("Fail to get product information");
            }
        })
        setSkip(skip + limit);
    }

    const onLoadMore = () => {
        getProducts();
    }

    const renderCards =  products.map((product, index) => {
        return ( 
            <Col lg={6} md={8} s={12} xs={24}  key = {index}>

                <Card
                    cover={<ImageSlider images={product.images}/>}
                >
                    <Meta 
                        title = {product.title}
                        description = {product.description}
                    />
                </Card> 
            </Col>
        )
    })

    return (
        <div style = {{width : '75%', margin : '3rem auto'}}>
            <div style = {{textAlign:'center'}}>
                <h2>Let's Travel Anywhere</h2>
            </div>

            <Row gutter={16, 16}>
                {renderCards}
            </Row>


            {lastPostSize == limit &&
                <div style = {{ display : 'flex', justifyContent:'center'}}>
                    <Button onClick = {onLoadMore}>더 보기</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage;
