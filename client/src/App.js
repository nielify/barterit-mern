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
import Map from './Components/Map';
import Signin from './Components/Signin';
import Signup from './Components/SignUp/SignUp';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Verify from './Components/SignUp/Verify'
import Success from './Components/SignUp/Success';
import EmailSent from './Components/ForgotPassword/EmailSent';
import Expired from './Components/ForgotPassword/Expired';
import ResetPasswordSuccess from './Components/ForgotPassword/ResetPasswordSuccess';

//test components
import Upload from './TestComponents/Upload';
import Cloudinary from './TestComponents/Cloudinary';
import SMSForm from './TestComponents/SMSForm';
import Negotiations from './TestComponents/Negotiation/Negotiations';

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
        <Route exact path="/negotiations">
          <Map />
        </Route>
        {/* <Route exact path="/map/:id">
          <Map />
        </Route> */}
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
