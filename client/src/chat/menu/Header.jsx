import { useContext , useState} from "react";

import { Box, styled } from '@mui/material';
import { Chat as MessageIcon, MoreVert } from '@mui/icons-material';

import { AccountContext } from "../../context/AccountProvider.jsx";

import HeaderMenu from './HeaderMenu.jsx';
import InfoDrawer from "../../components/drawer/Drawer.jsx";

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    border-radius: 10px;
`;
const Image = styled('img') ({
    height: 40,
    width: 40,
    borderRadius: '50%'
})

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;


const Header = () => {

    const [openDrawer,setOpenDrawer]= useState(false);
    const { account } = useContext(AccountContext);
    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return(
        <>
            <Component>
                <Image src={account.picture} alt="dp" onClick={()=>toggleDrawer()} />
                <Wrapper>
                    <MessageIcon/>
                    <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true}/>
        </>
    )
}

export default Header;