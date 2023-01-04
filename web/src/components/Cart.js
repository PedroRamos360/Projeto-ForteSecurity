import React from 'react'

export default function Cart(props) {
    useEffect(() => {
        api.get('products').then((response) => {
            setProducts(response.data);
        })
    }, [])


    return (
        <>
        <div className="cart">
            <h1>{props.title}</h1>
        </div>
        <hr className="header-line" />
        {products.map((product) => (
            <Product
                id={product.id}
                name={product.name}
                price={product.price}
            />
        ))}
        </>
    )
}