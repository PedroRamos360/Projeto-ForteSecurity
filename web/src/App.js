import React from 'react';
import './styles/global.css';
import './styles/home.css';
import Product from './components/Product';

function App() {
    return (
        <main id="container">
            <header>
                <h1 id="title">Carrinho de Compras</h1>
            </header>
            <hr />

            <Product name="banana" price={3.99} />
            <Product name="banana" price={3.99} />
            <Product name="banana" price={3.99} />

        </main>
    );
}

export default App;
