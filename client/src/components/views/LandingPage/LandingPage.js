import React, {useEffect, useState} from 'react';
import {Button, Card, Row, Col, Divider} from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox'
import {continents, prices} from './Sections/Datas';

function LandingPage(props) {
    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [lastPostSize, setLastPostSize] = useState(4)
    const [filter, setFilter] = useState({
        continent : [],
        price : {},
    }) // why use state?

    const limit = 4;

    useEffect(() => {
        getProducts({limit});
    }, [])

    useEffect(() => {
        getProducts({limit});
        setSkip(0); 
    }, [filter])

    const getProducts = (body, loadMore = false) => {
        axios.post('/api/product/products', {...body, filter})
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

        setFilter(newFilters);
    }

    return (
        <div style = {{width : '75%', margin : '3rem auto'}}>
            <div style = {{textAlign:'center'}}>
                <h2>Let's Travel Anywhere</h2>
            </div>


            <Row gutter = {16, 16} >
                <Col lg = {12} xs = {24}>
                    <CheckBox list = {continents} handleFilters={filters => handleFilters(filters, "continent")}/>
                </Col>
                <Col  lg = {12} xs = {24}>
                    <RadioBox list = {prices} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>



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
