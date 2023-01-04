import React, { useEffect, useState } from 'react';

import './styles/global.css';
import './styles/home.css';
import Product from './components/Product';
import api from './services/api';

function App() {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');

    function handleAddProduct() {
        api.post('products', {
            name: newProductName,
            price: Number(newProductPrice),
            cartId: "fasdf"
        }).then((response) => {
            setProducts([...products, response.data]);
            setNewProductName('');
            setNewProductPrice('');
        })
    }

    useEffect(() => {
        api.get('products').then((response) => {
            setProducts(response.data);
        })
    }, [])

    return (
        <main id="container">
            <header>
                <h1 id="title">Carrinho de Compras</h1>
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
            </header>
            <hr className="header-line"/>

            {products.map((product) => (
                <Product
                    id={product.id}
                    name={product.name}
                    price={product.price}
                />
            ))}

        </main>
    );
}

export default App;
