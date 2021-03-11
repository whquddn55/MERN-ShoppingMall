import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Button, Input, InputNumber } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const {TextArea} = Input;
const continents = [
    {key: 1, value: "Africa"},
    {key: 2, value: "Europe"},
    {key: 3, value: "Asia"},
    {key: 4, value: "North America"},
    {key: 5, value: "South America"},
    {key: 6, value: "Austrailia"},
    {key: 7, value: "Antarctica"},
]

function UploadProductPage(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);

    const user = useSelector(state=> state.user.userData);

    const onChnageTitle = (event) => {
        setTitle(event.currentTarget.value);
    } 
    const onChangeDescription = (event) => {
        setDescription(event.currentTarget.value);
    }
    const onChangePrice = (value) => {
        setPrice(value);
    }
    const onChangeContinent = (event) => {
        setContinent(event.currentTarget.value);
    }
    
    const onSubmitHanlder = (event) => {
        event.preventDefault();

        if(!title || !description || !price || !continent || !images) {
            return alert("Fill all types of input!");
        }

        axios.post('/api/product', {
            writer : user._id,
            title,
            description,
            price,
            continent,
            images,
        })
        .then(response =>  {
            if (response.data.success) {
                alert("Success to upload product");
                props.history.push('/');
            }
            else {
                alert("Fail to upload product");
            }
        })
    }

    return (
        <div style = {{maxWidth : "700px", margin : "2rem auto"}}>
            <div style = {{ textAlign : "center", marginBottom :"2rem"}} >
                <h2>여행 상품 업로드</h2>
            </div>
            
            <form onSubmit = {onSubmitHanlder}>
                <FileUpload refreshFunction = {setImages}/>
                <br/>
                <br/>
                <label>이름</label>
                <Input onChange = {onChnageTitle} value = {title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange = {onChangeDescription} value = {description}/>
                <br/>
                <br/>
                <label>가격($)</label>
                <br/>
                <InputNumber onChange = {onChangePrice} value = {price}/>
                <br/>
                <br/>
                <select onChange = {onChangeContinent} value = {continent}>
                    {continents.map((element, index) => {
                        return <option key ={element.key} value = {element.key}>{element.value}</option>
                    })}
                </select>
                <br/>
                <br/>
                <Button htmlType="submit">
                    확인
                </Button>
            </form>
        </div>
    )
}

export default UploadProductPage
