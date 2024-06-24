import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from '@react-oauth/google';

import AccountProvider from './context/AccountProvider';

function App() {
  
  const clientId = '543796020165-pgo6fib5k1l9tb042v7f966t2gr66ke6.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
