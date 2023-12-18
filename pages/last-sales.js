/**
 * * Client-side data fetching
 * 
 */

import { useEffect, useState } from "react";



function LastSalesPage() {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://nextjs-learning-b3b77-default-rtdb.firebaseio.com/sales.json')
        .then(response => response.json())
        .then(data => {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            
            setSales(transformedSales);
            setIsLoading(false);
        })
        .catch(error => {
            console.log("Error:", error);
        })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!sales) {
        return <p>No data yet</p>
    }

    console.log(sales);

    return (
        <ul>
            {
                sales.map(sale => (
                    <li key={sale.id}>
                        {sale.username} - {sale.volume}
                    </li>
            ))}
        </ul>
    );
}

export default LastSalesPage;