import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { CoverProvider } from './Context/CoverContext';
import { ActiveChatProvider } from './Context/ActiveChatContext';
import { AdminCoverProvider } from './Context/AdminCoverContext';
import { IDImageContextProvider } from './Context/IDImageContext';
import { FaceImageContextProvider } from './Context/FaceImageContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <FaceImageContextProvider>
      <IDImageContextProvider>
        <AdminCoverProvider>
          <ActiveChatProvider>
            <CoverProvider>
              <UserProvider>
                <Router>
                  <App />
                </Router>
              </UserProvider>
            </CoverProvider>
          </ActiveChatProvider>
        </AdminCoverProvider>
      </IDImageContextProvider>
    </FaceImageContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

