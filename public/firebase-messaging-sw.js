/*if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}*/

importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js");

var config = {
  apiKey: "AIzaSyAsWovk-Pd2D4PVCxil8rtB94Yb0XGk3SM",
  authDomain: "schietwettercup.firebaseapp.com",
  databaseURL: "https://schietwettercup.firebaseio.com",
  projectId: "schietwettercup",
  storageBucket: "gs://schietwettercup.appspot.com",
  messagingSenderId: "977017215304",
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onMessage((payload) => console.log("Message received", payload));

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
