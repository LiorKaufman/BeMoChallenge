import ReactGA from 'react-ga';

import store from '../store';

console.log(store);

const trackingId = 'UA-1234567890-1'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

if (store.auth) {
  ReactGA.set({
    userId: store.auth.user._id,
    // any data that is relevant to the user session
    // that you would like to track with google analytics
  });
}
