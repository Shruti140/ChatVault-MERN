import { Box, styled, Typography, Divider } from '@mui/material';
import emptyChatImage from '../../Message.PNG';

const Component = styled(Box)`
    background: #dddddd59;
    padding: 20px 10px;
    text-align: center;
    height: 100%;
    border: 1px solid grey;
`;

const Container = styled(Box)`
    padding: 0 200px;
`;
    
const Image = styled('img')({
    marginTop: 70,
    width: 400
})

const Title = styled(Typography)`
    font-size: 32px;
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
    margin-top: 25px 0 10px 0;
`;

const SubTitle = styled(Typography)`
    font-size: 14px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;

const EmptyChat = () => {
    
    return (
        <Component>
            <Container>
                <Image src={emptyChatImage} alt="empty" />
                <Title>ChatVault</Title>
                <SubTitle>Welcome to ChatVault - Secure Messaging for Everyone</SubTitle>
                <SubTitle>Now send and receive messages using our Application.</SubTitle>
                <StyledDivider />
            </Container>
        </Component>
    )
}

export default EmptyChat;