import { useState ,useEffect, useRef} from 'react';
import { Box,styled } from "@mui/material";
import { useContext } from "react";

import { AccountContext } from "../../context/AccountProvider";
import { getMessage, newMessage } from '../../service/api';

import Footer from './Footers';
import Message from './Message';

const Wrapper = styled(Box)`
    background: rgb(123,141,175);
    background: linear-gradient(90deg, rgba(123,141,175,0.6502976190476191) 0%, rgba(12,27,48,1) 0%, rgba(27,48,65,0.9808298319327731) 100%, rgba(146,167,180,1) 100%);
`;

const StyledFooter = styled(Box)`
    height: 55px;
    background: #ededed;
    position: absolute;
    width: 100%;
    bottom: 0
`;
    
const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 10px;
`;


const Messages = ({person,conversation}) => {

    const [value, setValue] = useState('');
    const [messages,setMessage]=useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    
    const [file,setFile] = useState();
    const [image,setImage] = useState('');
    const scrollRef = useRef();
    
    const {account, socket, newMessageFlag, setNewMessageFlag}= useContext(AccountContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []);

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ transition: "smooth" })
    // }, [messages]);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessage(conversation._id);
            setMessage(data);
        }
        conversation._id && getMessageDetails();
    }, [conversation._id, person._id, newMessageFlag]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
            setMessage((prev) => [...prev, incomingMessage]);

    }, [incomingMessage, conversation]);

    const sendText= async(e) =>{
        const code= e.KeyCode || e.which;
        if(code === 13) { 
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: account.sub,
                    conversationId: conversation._id,
                    receiverId: person.sub,
                    type: 'file',
                    text: image
                };
            }

            socket.current.emit('sendMessage', message);

            await newMessage(message);
            setValue('');
            setFile('');
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    }

    return(
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message=>(
                        <Container ref={scrollRef}>
                            <Message message={message}/>
                        </Container>
                    ))
                }
            </Component>
            <Footer 
                sendText={sendText} 
                setValue={setValue} 
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
            />
        </Wrapper>
    )
}

export default Messages;