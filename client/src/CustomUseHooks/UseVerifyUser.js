import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "../Components/firebase";

const UseVerifyUser = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUid(user.uid);
      } else {
        setLoggedIn(false);
        setUid(null);
      }
      setIsPending(false);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return { loggedIn, isPending, uid };
};

export default UseVerifyUser;
