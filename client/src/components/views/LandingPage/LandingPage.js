import React, {useEffect, useState} from 'react';
import {Button, Card, Row, Col} from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import {continents} from './Sections/Datas';

function LandingPage(props) {
    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [lastPostSize, setLastPostSize] = useState(4)
    const [filter, setFilter] = useState({
        continent : [],
        price : [],
    })

    const limit = 4;

    useEffect(() => {
        getProducts({limit});
    }, [])

    useEffect(() => {
        console.log(skip);
    }, [skip])

    const getProducts = (body, loadMore = false) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    setLastPostSize(response.data.productsInfo.length);
                    if (loadMore)
                        setProducts([...products, ...response.data.productsInfo]);
                    else
                        setProducts(response.data.productsInfo);
                }
                else {
                    alert("Fail to get product information");
                }
            })
    }

    const onLoadMore = () => {
        getProducts({limit, skip : skip + limit}, true);
        setSkip(skip + limit);
    }

    const renderCards = () => products.map((product, index) => {
        return (<Col lg={6} md={8} s={12} xs={24}  key = {index}>
                    <Card
                        cover={<ImageSlider images={product.images}/>}
                    >
                        <Meta 
                            title = {product.title}
                            description = {product.description}
                        />
                    </Card> 
                </Col>)
    })

    const handleFilters = (filters, category) => {
        
        const newFilters = {...filter};
        newFilters[category] = filters;
        
        getProducts({limit, filter : newFilters});
        setSkip(0); 
    }

    return (
        <div style = {{width : '75%', margin : '3rem auto'}}>
            <div style = {{textAlign:'center'}}>
                <h2>Let's Travel Anywhere</h2>
            </div>


            <CheckBox list = {continents} handleFilters={filters => handleFilters(filters, "continent")}/>



            <Row gutter={16, 16}>
                {renderCards()}
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
