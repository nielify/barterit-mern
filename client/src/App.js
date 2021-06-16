import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import PostList from './Components/PostList';
import Upload from './Test Components/Upload';
import Cloudinary from './Test Components/Cloudinary';
import SMSForm from './Test Components/SMSForm';
import Signin from './Test Components/Signin';
import Signup from './Test Components/Signup/Signup';
import Verify from './Test Components/Signup/Verify/Verify'

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
            <Signin />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signup/verify">
            <Verify />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;
