// Initialize the  Supabase JS client
import { Box, Button, Group, TextInput } from '@mantine/core';
import { createClient } from '@supabase/supabase-js'
import { useState, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

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

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [otpToken, setOtpToken] = useState<string>('');

    const handleEmail = (event: { currentTarget: { value: SetStateAction<string>; }; }) => {
        setEmail(event.currentTarget.value);
    }

    const handleOtpToken = (event: { currentTarget: { value: SetStateAction<string>; }; }) => {
        setOtpToken(event.currentTarget.value);
    }

    // send OTP to user's email
    const sendOtp = async () => {
        console.log("sending OTP to user's email...");
        const { error } = await supabase.auth.signInWithOtp({ email });
        
        if (error) {
            console.error('Error sending OTP:', error.message);
        } else {
            console.log('OTP sent to email.');
        }
    };

    // verify the user's OTP
    const verifyOtp = async () => {
        // token refers to the OTP received by the user
        console.log(`email = ${email}`);
        console.log(`otp token = ${otpToken}`);

        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: otpToken,
            type: 'email', // use 'magiclink' if you go that route
        });

        // clear fields after signing in
        setEmail('');
        setOtpToken('');

        if (error) {
            console.error('OTP verification failed:', error.message);
        } else {
            console.log('OTP verification successful:', data.session);
            navigate('/home');
        }
    };

    return <>
        <Box style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            <Box mb={40} style={{
                fontWeight:'bold',
                fontSize: 32,
                letterSpacing: 2
            }}>{"HYDRATE"}</Box>

            <Box>
                <TextInput size='md' label='Email' placeholder='Enter your email here' value={email} onChange={handleEmail}/>

                <TextInput size='md' label='OTP' placeholder='Enter the OTP here' value={otpToken} onChange={handleOtpToken}/>

                <Group style={{ 
                    marginTop: 40,
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Button variant="default" size='md' onClick={sendOtp} disabled={email.length === 0} >Get OTP</Button>
                    <Button variant="default" size='md' onClick={verifyOtp} disabled={email.length === 0 || otpToken.length === 0} >Sign In</Button>
                </Group>
            </Box>
        </Box>
    </>
}

export default SignIn