"use client";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleAuthButton() {

  const handleGoogleSuccess = (credentialResponse) => {

    if (!credentialResponse?.credential) {
      console.error("No credential returned from Google");
      return;
    }

    const idToken = credentialResponse.credential;

    const decoded = jwtDecode(idToken);

    console.log("Google login success");
    console.log("User:", decoded);

    /*
      decoded contains:
      email
      name
      picture
      sub (Google user id)
      email_verified
    */

  };

  const handleGoogleError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="w-full flex justify-center mt-4">

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}

        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
      />

    </div>
  );
}