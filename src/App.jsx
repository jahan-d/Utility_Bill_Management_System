import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Routes from "./router/Routes";

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) localStorage.setItem("userEmail", currentUser.email);
      else localStorage.removeItem("userEmail");
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes />
    </>
  );
}

export default App;
