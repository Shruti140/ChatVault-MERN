import { useContext } from "react";
import { Box, Dialog ,styled} from "@mui/material";

import { AccountContext } from "../context/AccountProvider.jsx";
import EmptyChat from "./chat/EmptyChat.jsx";
import Menu from "./menu/MenuChat.jsx";
import ChatBox from "./chat/ChatBox.jsx";

const dialogStyle = {
    height: '95%',
    width: '100%',
    margin: '15px',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '20px',
    boxShadow: 'none',
    overflow: 'scroll'
};

const Component = styled(Box)`
    display: flex;
`;
    
const LeftComponent = styled(Box)`
    min-width: 35vw;
`;
    
const RightComponent = styled(Box)`
    width: 73%;
    min-width: 300px;
    height: 90%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
`;


const ChatDialog = () => {

    const {person}= useContext(AccountContext);

    return(
        <Dialog
            open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
        >
            <Component>
                <LeftComponent>
                    <Menu/>
                </LeftComponent>
                <RightComponent>
                    {
                        Object.keys(person).length  ? <ChatBox/> : <EmptyChat />
                    }
                </RightComponent>
            </Component>
        </Dialog>
    )

}

export default ChatDialog;