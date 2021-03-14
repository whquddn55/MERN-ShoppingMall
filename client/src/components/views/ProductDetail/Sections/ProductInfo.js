import React from 'react'
import {Button, message} from 'antd'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../../../_action/user_action'

function ProductInfo(props) {
    const productInfo = props.productInfo;
    const dispatch = useDispatch();

    function onCartHandler(event) {
        dispatch(addToCart(productInfo._id)).then(response => {
            if (response.payload.success) {
                message.success("Success add to cart!");
            }
            else {
                message.error("Fail add to cart");
            }
        });
    }

    return (
        <div>
            <div>
                <h2>{productInfo.title}</h2>
                <div style = {{display:'flex'}}>
                    <p>{productInfo.views} views</p>
                    <p style = {{marginLeft:'auto'}}>{productInfo.sold} sold</p>
                </div>
                {/*상품폄 갯수, 별점*/}
            </div>
            <hr/>
            <div>
                <h2>${productInfo.price} dollars</h2> 
                <h4>in sale</h4>
            </div>
            <br/><br/><br/>
            <hr/>
            <div style= {{backgroundColor:'lightgrey', padding:'10px'}}>
                {productInfo.description}
            </div>
            <div style={{display:'flex', justifyContent:'center', paddingTop:'50px'}}>
                <Button onClick = {onCartHandler} shape='round' type = 'primary' danger>Add to Cart</Button>
            </div>

            
        </div>
    )
}

export default ProductInfo
