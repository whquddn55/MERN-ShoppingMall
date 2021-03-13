import React from 'react'
import {Carousel} from 'antd'

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key = {index} >
                        <img style = {props.style}
                            src={`http://localhost:3000/${image}`} 
                            loading= 'lazy'
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
