import { StylesHome } from 'public/scripts/StylesHome'
import React from 'react'

export default function Carrito({children}) {
    return (
        <>
        <style jsx>
        {`
        
        .conttt {
            width:100%;
            height:100vh
        }
        
        
        
        .shopping-cart {
    position: fixed;
    top: 0;
    right: -100%;
    z-index: 1000;
    width: 35rem;
    height: 100vh;
    background-color: var(--white);
    padding: 2rem;
    padding-top: 8rem;
    overflow-y: scroll;
}

.active {
    right: 0;
    box-shadow: var(--dark--shadow);
    transition: .4s linear;
}

.shopping-cart::-webkit-scrollbar{
    width: 1rem;
}

.shopping-cart::-webkit-scrollbar-track{
    background-color: var(--white);
}

.shopping-cart::-webkit-scrollbar-thumb {
    background-color: var(--green);
}
.box {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    position: relative;
    margin-bottom: 1rem;
}
.box img {
    height: 7rem;
}

.fa-times {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    font-size: 2rem;
    color: var(--light-color);
    cursor: pointer;
}

.fa-times:hover {
    color: var(--orange);
}

.content h3{
    color: var(--black);
    font-size: 1.8rem;
    padding-bottom: .5rem;
}
.content span {
    font-size: 1.5rem;
    color: var(--light-color);
}
.multiply {
    margin: 0 1rem;
}

.total {
    text-align: center;
    font-size: 2rem;
    padding: 1rem 0;
    color: var(--light-color);
}
.total span {
    color: var(--orange);
}


`}
      </style>
<div>
    {children}
</div>

    


       
        </>
    )
}

