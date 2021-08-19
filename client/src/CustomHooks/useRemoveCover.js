import { useContext, useEffect } from "react";

import { CoverContext } from '../Context/CoverContext';

export default function useRemoveCover() { 
  const [ cover, setCover ] = useContext(CoverContext);

  useEffect(() => {
    setCover(false);
  }, []);

}