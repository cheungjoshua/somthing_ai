import "./App.scss";
import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Setup from "./pages/Setup";
import Chat from "./pages/Chat";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LoginModal from "./pages/Login/LoginModal";
import SignUpModal from "./pages/Signup/SignUpModal";
import CharacterProvider from "./contexts/CharacterContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState();

  return (
    <>
      <Nav
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login setShowLogin={setShowLogin} setLoggedUser={setLoggedUser} />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setShowSignUp={setShowSignUp}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          <Route path="/setup" element={<Setup />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="*"
            element={<h1 align="center">Error 404: Page Not Found!</h1>}
          />
        </Routes>
      </CharacterProvider>
      {showLogin && (
        <LoginModal
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setLoggedUser={setLoggedUser}
          showCloseBtn
        />
      )}
      {showSignUp && (
        <SignUpModal
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          setLoggedUser={setLoggedUser}
          showCloseBtn
        />
      )}
    </>
  );
}

export default App;
