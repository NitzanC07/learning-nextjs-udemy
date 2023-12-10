import path from 'path';
import fs from 'fs/promises'; 

import { Fragment } from "react";

function ProductDetailsPage(props) {
    const {loadedProduct} = props;
    
    return (
        <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // This gave the absoulte path to data file.
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const prodcut = data.products.find(product => product.id === productId)

    return {
        props: {
            loadedProduct: prodcut
        }
    }
}

export default ProductDetailsPage;