import React from 'react'
import {useDispatch} from 'react-redux'
import {updateCartItemQuantity} from '../../../../_action/user_action'
import {Table, InputNumber, message} from 'antd'

function UserCardBlock(props) {
    const dispatch = useDispatch();

    const columns = [
        {
            title : 'Product Image',
            dataIndex : 'image',
            render: (text) => <img src={`http://localhost:3000/${text}`} style = {{height : '100px', width : '150px'}} />
        },
        {
            title : 'Product Description',
            dataIndex : 'description',
        },
        {
            title : 'Product Quantity',
            dataIndex : 'quantity',
            render: (text, record, index) => (
            <InputNumber 
                min = {1} 
                max = {10}
                defaultValue = {text} 
                formatter = {value => `${value} EA`}
                onChange = {(value) => onQuantityChangeHandler(index, value)}
            />)
        },
        {
            title : 'Product Price',
            dataIndex : 'price',
            render: (text) => (`$ ${text}`)
        },
    ]
    const data = props.products.map((value, index) => {
        return {
            key : index,
            image : value.images[0],
            description : value.title,
            quantity : value.quantity,
            price : value.price
        }
    })

    const rowSelection = {
        onChange : props.setSelected
      };

    function onQuantityChangeHandler(index, value) {
        const hide = message.loading({content : "changing....", key:'loading'});
        dispatch(updateCartItemQuantity(props.products[index]._id, value))
        .then(response => {
            hide();
            if (response.payload.success) {
                message.success({content : "Success to change quantity", key:'loading'});
                props.setProducts(response.payload.product);
            }
            else {
                message.error("Fail to change quantity");
            }
        })
    }

    return (
        <div>
            <Table 
                rowSelection={rowSelection} 
                columns = {columns} 
                dataSource = {data} 
                pagination = {{hideOnSinglePage : true}}
                bordered/>
        </div>
        
    )
}

export default UserCardBlock
