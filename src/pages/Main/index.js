import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api'
import './style.css'


export default class Main extends Component{
    state = {
        listProducts: [],
        productInfo:{}, 
        page:1
    }
    
    componentDidMount(){
        this.loadProducts()

    }

    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);
        
        const {docs, ...productInfo} = response.data

        this.setState ({
            listProducts: response.data.docs,
            productInfo,
            page
        })

    };

    prevPag = () =>{
        const {page, productInfo} = this.state

        if(page===1){return;}

        let pageNumber=page-1

        this.loadProducts(pageNumber)
    }

    nextPag = () =>{
        const {page, productInfo} = this.state

        if(page===productInfo.pages){return;}

        let pageNumber=page+1

        this.loadProducts(pageNumber)
    }

    render(){
        const { listProducts, page, productInfo } = this.state;
        return (
            <div className="product-list">
                {
                    listProducts.map(product => (
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>

                            <Link to={`/products/${product._id}`}>Acessar</Link>
                        </article>
                    ))
                }
                <div className="actions">
                    <button 
                    disabled={page===1}
                    onClick={this.prevPag}>Before</button>
                    
                    <button 
                    disabled={page===productInfo.pages}
                    onClick={this.nextPag}>Next</button>
                </div>
            </div>
            
        )
    }
}