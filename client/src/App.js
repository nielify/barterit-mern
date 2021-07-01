import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import LinearLoader from './Utilities/LinearLoader';
import Header from './Components/Header'; 
import DefaultHeader from './Components/DefaultHeader';
import PostList from './Components/PostList';
import Upload from './TestComponents/Upload';
import Cloudinary from './TestComponents/Cloudinary';
import SMSForm from './TestComponents/SMSForm';
import ForgotPassword from './TestComponents/forgotPassword/ForgotPassword';
import EmailSent from './TestComponents/forgotPassword/EmailSent';
import Expired from './TestComponents/forgotPassword/Expired';
import ResetPasswordSuccess from './TestComponents/forgotPassword/ResetPasswordSuccess';
import Signin from './TestComponents/Signin';
import Signup from './TestComponents/signup/Signup';
import Verify from './TestComponents/signup/Verify'
import Success from './TestComponents/signup/Success';
import ResetPassword from './TestComponents/ResetPassword';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#26a69a',
      main: '#009688',
      dark: '#00897b'
    },
  },
});

function App() {
  const [ showProgress, setShowProgress ] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <LinearLoader showProgress={showProgress} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <PostList />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
          <Route exact path="/cloudinary">
            <Cloudinary />
          </Route>
          <Route exact path="/sms">
            <SMSForm />
          </Route>
          <Route exact path="/signin">
            <DefaultHeader /> 
            <Signin setShowProgress={setShowProgress}/>
          </Route>
          <Route exact path="/signup">
            <DefaultHeader /> 
            <Signup setShowProgress={setShowProgress}/>
          </Route>
          <Route exact path="/signup/verify">
            <DefaultHeader /> 
            <Verify />
          </Route>
          <Route exact path="/signup/success">
            <DefaultHeader /> 
            <Success />
          </Route>
          <Route exact path="/forgot-password">
            <DefaultHeader /> 
            <ForgotPassword setShowProgress={setShowProgress}/>
          </Route>
          <Route exact path="/forgot-password/email-sent">
            <DefaultHeader /> 
            <EmailSent />
          </Route>
          <Route exact path="/forgot-password/expired">
            <DefaultHeader /> 
            <Expired />
          </Route>
          <Route exact path="/forgot-password/success">
            <DefaultHeader /> 
            <ResetPasswordSuccess />
          </Route>
          <Route exact path="/user/:userId/reset-password/:token">
            <DefaultHeader /> 
            <ResetPassword setShowProgress={setShowProgress} />
          </Route>
          <Route path="/*">
            <DefaultHeader /> 
            <h2>Error 404: Page Not Found</h2>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
