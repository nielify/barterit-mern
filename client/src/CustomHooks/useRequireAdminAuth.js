import { useContext, useEffect } from "react";
import { useHistory } from "react-router";

import { CoverContext } from '../Context/CoverContext';
import { UserContext } from "../Context/UserContext";
import { AdminCoverContext } from "../Context/AdminCoverContext";

export default function useRequireAuth() { 
  const history = useHistory();
  const [ cover, setCover ] = useContext(CoverContext);
  const [ user, setUser ] = useContext(UserContext);
  const [ adminCover, setAdminCover ] = useContext(AdminCoverContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    }) 
      .then(res => res.json())
      .then(data => {
        console.log('from requiredadminquth',data);
        if (data.redirect) {
          history.push(data.url);
          setCover(false);
        }
        else if (data.user.type === 'admin'){
          setUser(data.user);
          setCover(false);
          setAdminCover(false);
        }
      })
      .catch(err => console.log(err));
  }, []);
}