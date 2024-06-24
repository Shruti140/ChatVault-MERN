import { useContext } from 'react';
import { AppBar, Toolbar, styled, Box ,Typography,Button} from '@mui/material';
import { AccountContext } from '../context/AccountProvider.jsx';
import LoginScreen from "./account/LoginScreen.jsx";
import ChatDialog from '../chat/ChatDialog.jsx';
import ParticlesComponent from './particle.js';
import logo from '../logo192.png';

const Component = styled(Box)`
    height: 100vh;
    background: #DCDCDC;
    z-index: 10;
`;

const Header =  styled(Box)`
    height: 125px;
    background-color: #122643;
    box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
    background-color: #122643;
    height: 90px;
    box-shadow: none;
`;


const Messenger = () => {
    const {account} = useContext(AccountContext);
    return(
        <>
        <ParticlesComponent />
        <Component>
            { account ?
                <>
                    <Header>
                        <Toolbar>
                            
                        </Toolbar>
                    </Header>
                    <ChatDialog/>
                </>
                :
                <>
                    <LoginHeader position="static">
                        <Toolbar>
                            <img src={logo} style={{width:"55px",height:"53px",margin:'12px'}} alt="Logo" />
                            <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                ChatVault
                            </Typography>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Signup</Button>
                        </Toolbar>
                    </LoginHeader>
                    <LoginScreen />
                </>
            }
        </Component>
        </>
    )
}

export default Messenger;
