import React, { useEffect, useState } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';

import './styles/global.css';
import './styles/home.css';
import Cart from './components/Cart';
import api from './services/api';

function App() {
    const [carts, setCarts] = useState([])
    const [newCartName, setNewCartName] = useState('');

    function handleAddCart() {
        if (newCartName === '') {
            alert('Digite um nome para o carrinho');
            return;
        }
        api.post('carts', {
            name: newCartName,
        }).then((response) => {
            setCarts([...carts, response.data]);
            setNewCartName('');
        })
    }

    useEffect(() => {
        api.get('carts').then((response) => {
            setCarts(response.data);
        })
    }, [])

    return (
        <main id="container">
            <header>
                <h1 id="title">Carrinhos de Compras <AiOutlineShoppingCart color="blue" /></h1>

                <div className='button-group'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome do Carrinho"
                        value={newCartName}
                        onChange={(event) => setNewCartName(event.target.value)}
                    />
                    <button type="button" class="btn btn-success" onClick={handleAddCart}>Adicionar</button>
                </div>
            </header>
            <hr className="header-line"/>

            <div className='carts-container'>
                {carts.map((cart) => (
                    <Cart
                        id={cart.id}
                        name={cart.name}
                        price={cart.price}
                    />
                ))}
            </div>


        </main>
    );
}

export default App;
