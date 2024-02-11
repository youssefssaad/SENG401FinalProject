import React, { useEffect } from 'react';

const GoogleSignIn = ({ onSignInSuccess, onSignInFailure }) => {
  useEffect(() => {
    const initGoogleSignIn = () => {
      window.gapi.signin2.render('google-signin-button', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignInSuccess,
        'onfailure': onSignInFailure
      });
    };

    if (window.gapi) {
      initGoogleSignIn();
    } else {
      window.addEventListener('gapi-loaded', initGoogleSignIn);
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => window.dispatchEvent(new Event('gapi-loaded'));
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup the script when component unmounts
      window.removeEventListener('gapi-loaded', initGoogleSignIn);
    };
  }, [onSignInSuccess, onSignInFailure]);

  return <div id="google-signin-button"></div>;
};

export default GoogleSignIn;
