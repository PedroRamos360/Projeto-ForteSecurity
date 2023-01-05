import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { BiTrashAlt } from "react-icons/bi"

import Product from './Product'
import '../styles/cart.css'

export default function Cart(props) {
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('products').then((response) => {
            setProducts(response.data);
        })
    }, [])

    function handleAddProduct() {
        if (newProductName === '') {
            alert('Digite um nome para o produto');
            return;
        }
        if (newProductPrice === '' || newProductPrice === 0) {
            alert('Digite um preço para o produto');
            return;
        }

        api.post('products', {
            name: newProductName,
            price: Number(newProductPrice),
            cartId: props.id
        }).then((response) => {
            setProducts([...products, response.data]);
            setNewProductName('');
            setNewProductPrice('');
        })
    }

    function handleCartDelete() {
        api.delete(`carts/${props.id}`)
        window.location.reload()
    }


    return (
        <div className='cart'>
            <div className="button-group">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Produto"
                        value={newProductName}
                        onChange={(event) => setNewProductName(event.target.value)}
                    />
                    <input
                        type="number"
                        class="form-control"
                        placeholder="Preço"
                        value={newProductPrice}
                        onChange={(event) => setNewProductPrice(event.target.value)}
                    />
                    <button type="button" class="btn btn-primary" onClick={handleAddProduct}>Adicionar</button>
            </div>
            <hr width='300px' />
            <div className="cart-header">
                <h4 className='cart-title'>{props.name}</h4>
                <button className="delete-container delete-cart" onClick={handleCartDelete}>
                    <BiTrashAlt color='white' />
                </button>
            </div>

            <hr width="300px"/>

            <div className="products">
                {products.map((product) => {
                    if (product.cartId === props.id) {
                        return (
                            <Product
                                id={product.id}
                                name={product.name}
                                price={product.price}
                            />
                        )
                    }
                })}
            </div>

        </div>
    )
}