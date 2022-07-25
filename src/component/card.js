import { Card, Container } from 'react-bootstrap'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdOutlineAddShoppingCart, MdShare } from "react-icons/md";
import Masonry from 'react-masonry-css'

export default function Cardlist() {
    const [ products, setproducts ] = useState([]);
    const link = 'https://dummyjson.com/products'

    const getData = async () => {
        try {
            const response = await axios.get(link)
            const json = JSON.stringify(response.data.products)
            const list = JSON.parse(json)
            setproducts(list)
            console.log(list)
        } catch (error) {
            alert(error.message);
        }
    };

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container className='cardlist'>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {products.map((item)=>
                    <Card className='card'>
                        <div className='cardImg'>
                            <Card.Img variant="top" src={item.images[0]} />
                        </div>
                        <Card.Body style={{ borderTop: "brown solid 1px"}}>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>Price: <span className='price'>${item.price}</span></Card.Text>
                            <div style={{ display: "flex" }}>
                                <p className='cart'><MdOutlineAddShoppingCart /> ADD TO CART</p>
                                <div><MdShare /></div>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </Masonry>
        </Container>
    )
}