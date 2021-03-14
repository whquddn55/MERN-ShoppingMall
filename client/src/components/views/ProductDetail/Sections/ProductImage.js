import React from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
    return (
        <div>
           <ImageGallery items = {props.items.map(value => ({
               original:`http://localhost:3000/${value}`,
               thumbnail: `http://localhost:3000/${value}`,
            }))}
            />
        </div>
    )
}

export default ProductImage
