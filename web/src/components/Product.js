import React from 'react'
import '../styles/product.css'

export default function Product(props) {
    return (
        <div className='product-container'>
            <p className='product-text'>{props.name}</p>
            <p className='product-text'>{props.price}</p>
        </div>
    )
}