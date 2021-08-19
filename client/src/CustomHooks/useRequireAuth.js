import { useContext, useEffect } from "react";
import { useHistory } from "react-router";

import { CoverContext } from '../Context/CoverContext';
import { UserContext } from "../Context/UserContext";

export default function useRequireAuth() { 
  const history = useHistory();
  const [ cover, setCover ] = useContext(CoverContext);
  const [ user, setUser ] = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    }) 
      .then(res => res.json())
      .then(data => {
        if (data.redirect) {
          history.push(data.url);
          setCover(false);
        }
        else {
          setUser(data.user);
          setCover(false);
        }
      })
      .catch(err => console.log(err));
  }, []);
}