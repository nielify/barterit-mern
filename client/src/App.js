import {
  useHistory,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'

import LoadingCover from './Components/LoadingCover'
import LinearLoader from './Utilities/LinearLoader'
import DefaultHeader from './Components/DefaultHeader'
import Header from './Components/Header'
import Marketplace from './Components/Marketplace/Marketplace'
import CreatePost from './Components/CreatePost/CreatePost'
import Item from './Components/Item/Item'
import MyProfile from './Components/MyProfile/MyProfile'
import SavedItems from './Components/SavedItems/SavedItems'
import User from './Components/User/User'
import Upload from './TestComponents/Upload'
import Cloudinary from './TestComponents/Cloudinary'
import SMSForm from './TestComponents/SMSForm'
import ForgotPassword from './TestComponents/forgotPassword/ForgotPassword'
import EmailSent from './TestComponents/forgotPassword/EmailSent'
import Expired from './TestComponents/forgotPassword/Expired'
import ResetPasswordSuccess from './TestComponents/forgotPassword/ResetPasswordSuccess'
import Signin from './TestComponents/Signin'
import Signup from './TestComponents/signup/Signup'
import Verify from './TestComponents/signup/Verify'
import Success from './TestComponents/signup/Success'
import ResetPassword from './TestComponents/ResetPassword'

import { CssBaseline } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { UserContext } from './Context/UserContext'
import Negotiation from './Components/Negotiation/Negotiation'
import { Route, Switch } from 'react-router-dom';
import { useState, useContext } from 'react';

//Utilities Components
import LinearLoader from './Utilities/LinearLoader';
import DefaultHeader from './Utilities/DefaultHeader';
import Header from './Utilities/Header';
import LoadingCover from './Utilities/LoadingCover';

//Page Components
import Marketplace from './Components/Marketplace/Marketplace';
import CreatePost from './Components/CreatePost/CreatePost';
import Item from './Components/Item/Item';
import MyProfile from './Components/MyProfile/MyProfile';
import SavedItems from './Components/SavedItems/SavedItems';
import User from './Components/User/User';
import Upload from './TestComponents/Upload';
import Cloudinary from './TestComponents/Cloudinary';
import SMSForm from './TestComponents/SMSForm';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import EmailSent from './Components/ForgotPassword/EmailSent';
import Expired from './Components/ForgotPassword/Expired';
import ResetPasswordSuccess from './Components/ForgotPassword/ResetPasswordSuccess';
import Signin from './Components/Signin';
import Signup from './Components/SignUp/SignUp';
import Verify from './Components/SignUp/Verify'
import Success from './Components/SignUp/Success';
import ResetPassword from './Components/ResetPassword';

//Contexts
import { UserContext } from './Context/UserContext';
import { CoverContext } from './Context/CoverContext';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f'
    },
    secondary: {
      light: '#aaa',
      main: '#888',
      dark: '#aaa'
    },
  },
});

function App() {
  const [ showProgress, setShowProgress ] = useState(false);
  const [ user ] = useContext(UserContext);
  const [ cover ] = useContext(CoverContext);

  return (
    <ThemeProvider theme={theme}>
      <LinearLoader showProgress={showProgress} />
      { cover && <LoadingCover /> }
      { user._id ? <Header /> : <DefaultHeader />}
      <Switch>
        <Route exact path="/">
          <Marketplace />
        </Route>
        <Route exact path="/negotiation">
          <Negotiation />
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
          <Signup setShowProgress={setShowProgress} />
        </Route>
        <Route exact path="/signup/verify">
          <Verify />
        </Route>
        <Route exact path="/signup/success">
          <Success />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword setShowProgress={setShowProgress} />
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
  )
}

export default App
