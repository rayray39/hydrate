import { Box, Button } from "@mantine/core"
import { useEffect, useState } from "react"

function Analyze() {
    const [allHydrationData, setAllHydrationData] = useState([]);

    const fetchAllHydrationData = async () => {
        const response = await fetch('http://localhost:5000/api/hydration/all', {
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })

        if (!response.ok) {
            console.log('Error in fetching hydration data for analytics.');
            return;
        }

        const data = await response.json();
        console.log(data.message)
        setAllHydrationData(data.allData);
    }

    useEffect(() => {
        fetchAllHydrationData();
    }, [])

    return <>
        <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            This is the analyze page
        </Box>
    </>
}

export default Analyze