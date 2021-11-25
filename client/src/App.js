import { Route, Switch } from 'react-router-dom';
import { useState, useContext } from 'react';

//Utilities Components
import LinearLoader from './Utilities/LinearLoader';
import DefaultHeader from './Utilities/DefaultHeader';
import Header from './Utilities/Header/Header';
import LoadingCover from './Utilities/LoadingCover';
import AdminHeader from './Utilities/AdminHeader';

//Page Components
import Marketplace from './Components/Marketplace/Marketplace';
import CreatePost from './Components/CreatePost/CreatePost';
import Item from './Components/Item/Item';
import MyProfile from './Components/MyProfile/MyProfile';
import ProfileSearchResults from './Components/ProfileSearchResults/ProfileSearchResults';
import SavedItems from './Components/SavedItems/SavedItems';
import User from './Components/User/User';
import Map from './Components/Map';
import UserVerification from './Components/UserVerification/IDSelection/IDSelection'
import IDScan from './Components/UserVerification/IDScan/IDScan';
import FaceScan from './Components/UserVerification/FaceScan/FaceScan';
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
import Report from './Components/Admin/Report/Report';
import Users from './Components/Admin/Users/Users';
import Posts from './Components/Admin/Posts/Posts';
import TermsAndConditions from './Components/TermsAndConditions';

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
      { user.type === 'admin' ? <AdminHeader/> : user._id ? <Header /> : <DefaultHeader />}
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
        <Route exact path="/profile/search/:name">
          <ProfileSearchResults />
        </Route>
        <Route exact path="/saved-items">
          <SavedItems />
        </Route>
        <Route exact path="/user/:id">
          <User />
        </Route>
        <Route exact path="/negotiations">
          <Negotiations />
        </Route>
        <Route exact path="/map/:id">
          <Map />
        </Route>
        <Route exact path="/user-verification/id-selection">
          <UserVerification />
        </Route>
        <Route exact path="/user-verification/id-scan">
          <IDScan />
        </Route>
        <Route exact path="/user-verification/face-scan">
          <FaceScan />
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
        <Route exact path="/admin/reports">
          <Report />
        </Route>
        <Route exact path="/admin/users">
          <Users />
        </Route>
        <Route exact path="/admin/posts">
          <Posts />
        </Route>
        <Route exact path="/terms-and-conditions">
          <TermsAndConditions />
        </Route>
        <Route path="/*">
          <h2>Error 404: Page Not Found</h2>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
