import React from 'react'
import {Table, InputNumber} from 'antd'

function UserCardBlock(props) {

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
            render: (text) => (
            <InputNumber 
                min = {1} 
                max = {10}
                defaultValue = {text} 
                formatter = {value => `${value} EA`}
                onChange = {onQuantityChangeHandler}
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

    function onQuantityChangeHandler(value) {
        console.log(value);
        /** redux 통해서 quantity 변경 */
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
