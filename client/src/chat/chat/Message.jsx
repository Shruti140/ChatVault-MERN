import { useContext } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';
import { AccountContext } from '../../context/AccountProvider.jsx';
import { downloadMedia, formatDate } from '../../utils/common-utils.js';
import { iconPDF } from '../../constants/data.js';

const Wrapper = styled(Box)`
    background: #ececed;
    padding: 6px;
    margin: 4px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 15px 15px 15px 0;
    word-break: break-word;
`;

const Own = styled(Box)`
    background: #d3e2f1;
    padding: 6px;
    margin: 4px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto ;
    display: flex;
    border-radius: 15px 15px 0 15px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Message = ({message}) => {
    
    const { account } = useContext(AccountContext);

    return (
        <>
            {
                account.sub === message.senderId ? 
                <Own>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Own>
            : 
                <Wrapper>
                    {
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>
                }
            </>
    )
}

const TextMessage = ({ message }) => {
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

const ImageMessage = ({ message }) => {

    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf-icon" style={{ width: 60 , height: 50}} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                : 
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
                />
                {formatDate(message.createdAt)}
            </Time>
        </div>
    )
}

export default Message;