import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { LoginContext } from "./context/LoginContext";
import Home from "./screens/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profie from "./screens/Profie";
import Createpost from "./screens/Createpost";
import Modal from "./components/Modal";
import UserProfie from "./components/UserProfile";
import MyFolliwngPost from "./screens/MyFollowingPost";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route exact path="/profile" element={<Profie />} />
            <Route path="/createPost" element={<Createpost />} />
            <Route path="/profile/:userid" element={<UserProfie />} />
            <Route path="/followingpost" element={<MyFolliwngPost />} />
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
