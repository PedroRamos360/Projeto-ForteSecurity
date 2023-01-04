import React from 'react'
import '../styles/product.css'
import { BiTrashAlt } from "react-icons/bi"
import api from '../services/api'

export default function Product(props) {
    function handleProductDelete() {
        api.delete(`products/${props.id}`)
        window.location.reload()
    }

    return (
        <div className="product-container2">
            <div className='product-container'>
                <p className='product-text'>{props.name}</p>
                <p className='product-text'>R$ {props.price}</p>
            </div>
            <button className="delete-container" onClick={handleProductDelete}>
                <BiTrashAlt color='white' />
            </button>
        </div>
    )
}