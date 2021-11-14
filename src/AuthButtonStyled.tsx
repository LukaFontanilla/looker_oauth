import React, { useEffect, useState } from "react";
import { ComponentsProvider, Button } from "@looker/components";

import { oauth_login } from "./Oauth";

export const AuthButtonStyled = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const access_info = sessionStorage.getItem("access_info");
    if (access_info) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  useEffect(() => {
    const { access_token } = JSON.parse(sessionStorage.getItem("access_info"));
    console.log(sessionStorage.getItem("access_info"));
    fetch("https://dcl.dev.looker.com:19999/api/4.0/user", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        }
      })
      .then((userData) => {
        console.log(userData);
      });
  }, [authed]);

  const handleSignIn = () => {
    oauth_login("dcl.dev.looker.com");
  };

  return (
    <ComponentsProvider>
      <Button size="large" iconBefore="LogoRings" onClick={handleSignIn}>
        {authed ? "Signed In" : "Sign In to Looker"}
      </Button>
      {authed ? "https://dcl.dev.looker.com" : ""}
    </ComponentsProvider>
  );
};
