import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Components/Header'; 
import DefaultHeader from './Components/DefaultHeader';
import PostList from './Components/PostList';
import Upload from './Test Components/Upload';
import Cloudinary from './Test Components/Cloudinary';
import SMSForm from './Test Components/SMSForm';
import ForgotPassword from './Test Components/forgotPassword/ForgotPassword';
import EmailSent from './Test Components/forgotPassword/EmailSent';
import Signin from './Test Components/Signin';
import Signup from './Test Components/signup/Signup';
import Verify from './Test Components/signup/Verify'
import Success from './Test Components/signup/Success';
import ResetPassword from './Test Components/ResetPassword';

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
  return (
    <ThemeProvider theme={theme}>
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
            <Signin />
          </Route>
          <Route exact path="/signup">
            <DefaultHeader /> 
            <Signup />
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
            <ForgotPassword />
          </Route>
          <Route exact path="/forgot-password/email-sent">
            <DefaultHeader /> 
            <EmailSent />
          </Route>
          <Route exact path="/user/:userId/reset-password/:token">
            <DefaultHeader /> 
            <ResetPassword />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
