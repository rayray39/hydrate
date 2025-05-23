import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initialize the  Supabase JS client
import { createClient } from '@supabase/supabase-js'
import { Box } from "@mantine/core";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, 
    {
        global: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }
);

function ProtectedRoute({ child }:{ child:React.ReactNode }) {
    const [loading, setLoading] = useState(true);               // Track if session is still loading
    const [authenticated, setAuthenticated] = useState(false);  // Whether user is logged in
    const navigate = useNavigate();                             // Used to redirect

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();  // Ask Supabase if user is logged in

            if (session) {
                setAuthenticated(true);             // User is logged in
            } else {
                navigate('/');                 // Not logged in -> redirect to sign in page
            }
            setLoading(false);                    // Done checking
        };

        checkSession();
    }, [navigate])

    if (loading) {
        return <Box style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh'
        }}>
            Loading...
        </Box>
    }

    return authenticated ? child : null;
}

export default ProtectedRoute