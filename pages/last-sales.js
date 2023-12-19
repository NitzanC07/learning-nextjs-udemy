/**
 * * Client-side data fetching
 * 
 */

import { useEffect, useState } from "react";
// import useSWR from "swr";


function LastSalesPage() {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // const { data, error } = useSWR('https://nextjs-learning-b3b77-default-rtdb.firebaseio.com/sales.json');

    // useEffect(() => {
    //     if (data) {
    //         const transformedSales = [];
    //         for (const key in data) {
    //             transformedSales.push({
    //                 id: key,
    //                 username: data[key].username,
    //                 volume: data[key].volume
    //             })
    //         }
    //         setSales(transformedSales)
    //     }

    // }, [data]);
    
    // if (error) {
    //     return <p>Faild to load.</p>
    // }

    // if (!data || !sales) {
    //     return <p>Loading...</p>
    // }


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

    if (!sales) {
        return <p>No data yet.</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {
                sales.map(sale => (
                    <li key={sale.id}>
                        {sale.username} - {sale.volume}$
                    </li>
            ))}
        </ul>
    );
}

export default LastSalesPage;