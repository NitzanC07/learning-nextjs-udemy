import path from 'path';
import fs from 'fs/promises'; 

/** 
 * * ISR - Incremental Static Regeneration page component.
 * * With both functions getStaticProps and getStaticPaths to define that page. 
 */

import { Fragment } from "react";

function ProductDetailsPage(props) {
    const {loadedProduct} = props;
    
    if (!loadedProduct) {
        <p>Loading...</p>
    }

    return (
        <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // This gave the absoulte path to data file.
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const data = await getData()

    const prodcut = data.products.find(product => product.id === productId)

    return {
        props: {
            loadedProduct: prodcut
        }
    }
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);

    const pathsWithParams = ids.map((id) => ({params: {pid: id}}))

    return {
        paths: pathsWithParams,
        fallback: false
    }
}

export default ProductDetailsPage;