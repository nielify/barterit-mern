import { useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import LinearLoader from './Utilities/LinearLoader';
import DefaultHeader from './Components/DefaultHeader';
import Header from './Components/Header';
import Marketplace from './Components/Marketplace/Marketplace';
import CreatePost from './Components/CreatePost/CreatePost';
import Item from './Components/Item/Item';
import MyProfile from './Components/MyProfile/MyProfile';
import SavedItems from './Components/SavedItems/SavedItems';
import User from './Components/User/User';
import Upload from './TestComponents/Upload';
import Cloudinary from './TestComponents/Cloudinary';
import SMSForm from './TestComponents/SMSForm';
import ForgotPassword from './TestComponents/forgotPassword/ForgotPassword';
import EmailSent from './TestComponents/forgotPassword/EmailSent';
import Expired from './TestComponents/forgotPassword/Expired';
import ResetPasswordSuccess from './TestComponents/forgotPassword/ResetPasswordSuccess';
import Signin from './Components/Signin';
import Signup from './TestComponents/SignUp/SignUp';
import Verify from './TestComponents/SignUp/Verify'
import Success from './TestComponents/SignUp/Success';
import ResetPassword from './TestComponents/ResetPassword';
import LoadingCover from './Components/LoadingCover';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { UserContext } from './Context/UserContext';
import { CoverContext } from './Context/CoverContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f'
    },
    seconday: {
      light: '#5393ff',
      main: '#009688',
      dark: '#1c54b2'
    },
  },
});

function App() {
  const history = useHistory();

  const [ showProgress, setShowProgress ] = useState(false);
  const [ user, setUser ] = useContext(UserContext);
  const [ cover, setCover ] = useContext(CoverContext);

  return (
    <ThemeProvider theme={theme}>
      <LinearLoader showProgress={showProgress} />
      { cover && <LoadingCover /> }
      { user._id ? <Header /> : <DefaultHeader />}
      <Switch>
        <Route exact path="/">
          <Marketplace />
        </Route>
        <Route exact path="/create-post">
          <CreatePost />
        </Route>
        <Route exact path="/item/:id">
          <Item />
        </Route>
        <Route exact path="/profile">
          <MyProfile />
        </Route>
        <Route exact path="/saved-items">
          <SavedItems />
        </Route>
        <Route exact path="/user/:id">
          <User />
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
          <Signin setShowProgress={setShowProgress} />
        </Route>
        <Route exact path="/signup">
          <Signup setShowProgress={setShowProgress}/>
        </Route>
        <Route exact path="/signup/verify">
          <Verify />
        </Route>
        <Route exact path="/signup/success">
          <Success />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword setShowProgress={setShowProgress}/>
        </Route>
        <Route exact path="/forgot-password/email-sent">
          <EmailSent />
        </Route>
        <Route exact path="/forgot-password/expired">
          <Expired />
        </Route>
        <Route exact path="/forgot-password/success">
          <ResetPasswordSuccess />
        </Route>
        <Route exact path="/user/:userId/reset-password/:token">
          <ResetPassword setShowProgress={setShowProgress} />
        </Route>
        <Route path="/*">
          <h2>Error 404: Page Not Found</h2>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
