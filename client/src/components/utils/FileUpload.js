import React, {useState, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios';

function FileUpload(props) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        props.refreshFunction(images);
    }, [images])

    const onDropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }
        formData.append("file",files[0]);
        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...images, response.data.filePath]);
                }
                else {
                    alert("Fail to post image to server")
                }
            })
    }

    const onDeleteHandler = (index) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <div style = {{display : 'flex'}}>
            <Dropzone onDrop={onDropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div 
                        style = {{width : 300, height : 240, border : '1px solid lightgray',
                                display: 'flex', alignItems:'center', justifyContent: 'center'}}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined style = {{fontSize : 40}}/>
                    </div>
                    </section>
                )}
            </Dropzone>
            <div style = {{ display:'flex', width: '350px', height: '240px', overflowX:'scroll'}}>

                {images.map((element, index) => {
                    return <div onClick = {() => onDeleteHandler(index)} key = {index}>
                                <img style = {{minWidth: '300px', width:'300px', height: '240px' }}
                                    src = {`http://localhost:3000/${element}`}
                                />
                            </div>
                })}
            </div>
        </div>
    )
}

export default FileUpload
