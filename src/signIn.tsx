// Initialize the  Supabase JS client
import { Alert, Box, Button, Group, Popover, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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

    // email entered by user
    const [email, setEmail] = useState<string>('');

    // otp entered by user
    const [otpToken, setOtpToken] = useState<string>('');

    // controls the state of the popover when get OTP button is clicked
    const [popoverOpened, {open, close}] = useDisclosure(false);

    // opens the alert when OTP sending error occurs
    const [otpSendError, setOtpSendError] = useState<boolean>(false);

    // opens the alert when the OTP verification error occurs
    const [otpVerifyError, setOtpVerifyError] = useState<boolean>(false);

    const handleEmail = (event: { currentTarget: { value: SetStateAction<string>; }; }) => {
        setEmail(event.currentTarget.value);
    }

    const handleOtpToken = (event: { currentTarget: { value: SetStateAction<string>; }; }) => {
        setOtpToken(event.currentTarget.value);
    }

    // returns true if the email contains both '@' and '.com'
    const isValidEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.com$/;
        return regex.test(email);
    };

    // send OTP to user's email
    const sendOtp = async () => {
        if (!isValidEmail(email)) {
            // check for valid email
            console.log('Error sending OTP: invalid email.');
            setOtpSendError(true);
            return;
        }

        console.log("sending OTP to user's email...");
        const { error } = await supabase.auth.signInWithOtp({ email });
        
        if (error) {
            console.error('Error sending OTP:', error.message);
            setOtpSendError(true);
        } else {
            console.log('OTP sent to email.');
            setOtpSendError(false);
            open(); // open the popover to ask user to check email
        }
    };

    // verify the user's OTP
    const verifyOtp = async () => {
        // token refers to the OTP received by the user
        console.log(`email = ${email}`);
        console.log(`otp token = ${otpToken}`);

        if (otpToken.length !== 6) {
            // check for valid OTP
            console.log('OTP verification failed: OTP not equal to 6 digits.')
            setOtpVerifyError(true);
            return;
        }
        if (!isValidEmail(email)) {
            // check for valid email
            console.log('Error sending OTP: invalid email.');
            setOtpSendError(true);
            return;
        }

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
            setOtpVerifyError(true);
        } else {
            console.log('OTP verification successful:', data.session);
            setOtpVerifyError(false);
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
                {
                    otpSendError &&
                    <Alert variant="light" color="red" withCloseButton onClose={() => setOtpSendError(false)} title="OTP Sending Error" >
                        Error in sending OTP to email, ensure email is valid.
                    </Alert>
                }

                {
                    otpVerifyError &&
                    <Alert variant="light" color="red" withCloseButton onClose={() => setOtpVerifyError(false)} title="OTP Verification Error" >
                        Error in verifying OTP, ensure OTP is valid.
                    </Alert>
                }
            </Box>

            <Box>
                <TextInput size='md' label='Email' placeholder='Enter your email here' value={email} onChange={handleEmail}/>

                <TextInput size='md' label='OTP' placeholder='Enter the OTP here' value={otpToken} onChange={handleOtpToken}/>

                <Group style={{ 
                    marginTop: 40,
                    display:'flex',
                    justifyContent:'center'
                }}>

                    <Popover opened={popoverOpened} onClose={close} width={160} position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <Button variant="default" size='md' onClick={sendOtp} disabled={email.length === 0} >Get OTP</Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Text size="xs" style={{ textAlign:'center' }}>Check your email for the OTP.</Text>
                        </Popover.Dropdown>
                    </Popover>

                    <Button variant="default" size='md' onClick={verifyOtp} disabled={email.length === 0 || otpToken.length === 0} >Sign In</Button>
                </Group>
            </Box>
        </Box>
    </>
}

export default SignIn