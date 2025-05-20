import { Box, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import HydrationBarChart from "./hydrationBarChart";

function Analyze() {
    const [allHydrationData, setAllHydrationData] = useState<{ date: string; water: number; coffee: number; tea: number }[]>([]);

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
        console.log(data.allData);
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
            <Text>{'Analytics Page'}</Text>

            <Box mt={40} style={{
                width:'60%',
            }}>
                <HydrationBarChart hydrationData={allHydrationData} />
            </Box>
        </Box>
    </>
}

export default Analyze