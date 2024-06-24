import { useContext, useEffect } from 'react';
import { Card, styled, CardContent, Typography, Button, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { AccountContext } from '../../context/AccountProvider.jsx';
import { addUser } from '../../service/api.js';

const Subtitle = styled(Typography)({
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#122643',
});

const RootContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
});

const StyledCard = styled(Card)({  
    maxWidth: 400,
    padding: '2rem',
    borderRadius: 8,
});

const Title = styled(Typography)({
    marginBottom: '1rem',
    textAlign: 'center',
});

const StyledButton = styled(Button)({
    marginTop: '1rem',
    backgroundColor: '#122643',
});


const LoginScreen = () => {
    const { setAccount } = useContext(AccountContext);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setAccount(JSON.parse(savedUser));
        }
    }, [setAccount]);

    const onLoginSuccess = (res) => {
        let decoded = jwtDecode(res.credential);
        setAccount(decoded);
        addUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded));
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <RootContainer >
            <StyledCard style={{position:'absolute'}}>
                <CardContent>
                    <Title variant="h4" component="h1">
                        Welcome to ChatVault
                    </Title>
                    <Subtitle variant="body1">
                        Sign in with your Google account for a seamless experience.
                    </Subtitle>
                    <StyledButton variant="contained" fullWidth sx={{ '&.MuiButton-root:hover':{bgcolor: 'transparent'}} }>
                        <GoogleLogin
                            buttonText="Login with Google"
                            onSuccess={onLoginSuccess}
                            onError={onLoginFailure}
                        />
                    </StyledButton>
                    <Button variant="text" fullWidth style={{ marginTop: '1rem', color: '#122643' }}>
                        New User? Sign Up
                    </Button>
                </CardContent>
            </StyledCard>
        </RootContainer>
    );
};

export default LoginScreen;
