// * React
import React from "react";
import ReactDOM from "react-dom/client";

// * Bootstrap
import "bootswatch/dist/zephyr/bootstrap.min.css";

// * React-router-dom
import { HashRouter, Route, Routes,} from "react-router-dom";

// * Components
import App from "./App";
import Auth from "./Components/Auth/Auth";
import BlockRout from "./Components/BlockRouts/BlockRoutAuth";
import BlockRoutPatient from "./Components/BlockRouts/BlockRoutPatient";
import ChangePassword from "./Components/Auth/ChangeAuth";
import Config from "./Components/Other/Config";
import AddFriend from "./Components/FriendComponents/AddFriend";
import FriendInfo from "./Components/FriendComponents/FriendInfo";
import FriendRequest from "./Components/FriendComponents/FriendRequest";
import ViewFriends from "./Components/FriendComponents/ViewFriends";
import FriendInfoBlock from "./Components/BlockRouts/FriendInfoBlock";
import Header from "./Components/Other/Header";
import Panel from "./Components/PatientComponents/Panel";
import PatientPage from "./Components/PatientComponents/PatientPage";
import UserContext from "./UserContext";
import { Toaster } from "react-hot-toast";

console.log(import.meta.env.VITE_URL_API);

// * APP
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <main className="h-100">
      <UserContext>
        
        <HashRouter>
          <Toaster/>
          <Header></Header>
          
          <Routes >
            <Route path="/" element={<App />} />
            <Route
              path="/login"
              element={
                <BlockRout type="auth">
                  <Auth type="login" />
                </BlockRout>
              }
            />
            <Route
              path="/signup"
              element={
                <BlockRout type="auth">
                  <Auth />
                </BlockRout>
              }
            />
            <Route
              path="/panel"
              element={
                <BlockRout type="page">
                  <Panel />
                </BlockRout>
              }
            />
            <Route
              path="/friends"
              element={
                <BlockRout type="page">
                  <ViewFriends />
                </BlockRout>
              }
            />
            <Route
              path="/friends/add"
              element={
                <BlockRout type="page">
                  <AddFriend />
                </BlockRout>
              }
            />
            <Route
              path="/friends/requests"
              element={
                <BlockRout type="page">
                  <FriendRequest />
                </BlockRout>
              }
            />
            <Route
              path="/friends/info/:user_id"
              element={
                <BlockRout type="page">
                  <FriendInfoBlock>
                    <FriendInfo/>
                  </FriendInfoBlock>
                </BlockRout>
              }
            />
            <Route
              path="/viewinfo/:id"
              element={
                <BlockRout type="page">
                  <ChangePassword type="password" />
                </BlockRout>
              }
            />
            <Route
              path="/config"
              element={
                <BlockRout type="page">
                  <Config />
                </BlockRout>
              }
            />
            <Route
              path="/changepassword"
              element={
                <BlockRout type="page">
                  <ChangePassword type="password" />
                </BlockRout>
              }
            />
            <Route
              path="/patient/:patient_id"
              element={
                <BlockRout type="page">
                  <BlockRoutPatient>
                    <PatientPage />
                  </BlockRoutPatient>
                </BlockRout>
              }
            />
          </Routes>
        </HashRouter>
      </UserContext>
    </main>
  </React.StrictMode>
);
