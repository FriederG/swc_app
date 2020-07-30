//import * as firebase from "firebase";
import firebase from "firebase";
import "firebase/database";

export default {
  state: {
    loadedPhotos: [
      {
        imageUrl:
          "https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png",
        id: "1",
        title: "Fehler beim Laden der Daten",
        date: new Date(),
        description:
          "Leider können wir keine Verbindung zur Datenbank herstellen. Das Laden der Echtzeitdaten (Spielergebnissse, News etc.) ist im privaten Fenster nicht möglich.",
      },
    ],
  },
  mutations: {
    setLoadedPhotos(state, payload) {
      state.loadedPhotos = payload;
    },
    onCreatePhoto() {
      //state.loadedNews.push(payload);
    },
    createPhoto() {
      //state.loadedNews.push(payload);
    },
    updatePhoto(state, payload) {
      const news = state.loadedPhotos.find((news) => {
        return news.id === payload.id;
      });
      if (payload.title) {
        news.title = payload.title;
      }
      if (payload.description) {
        news.description = payload.description;
      }
    },
  },
  actions: {
    loadPhotos({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("photos")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const photos = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            photos.push({
              id: key,
              title: obj[key].title,
              imageUrl: obj[key].imageUrl,
              //creatorId: obj[key].creatorId,
            });
          }
          commit("setLoadedPhotos", photos);
          commit("setLoading", false);
        });
    },

    createPhoto({ commit }, payload) {
      const photo = {
        title: "Foto",
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref("photos")
        .push(photo)
        .then((data) => {
          key = data.key;
          return key;
        })

        .then((key) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref()
            .child("photos/" + key + "." + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          return fileData.ref.getDownloadURL().then((downloadUrl) => {
            imageUrl = downloadUrl;
            return firebase
              .database()
              .ref("photos")
              .child(key)
              .update({ imageUrl: downloadUrl });
          });
        })
        .then((downloadUrl) => {
          commit("createPhoto", {
            ...photo,
            imageUrl: imageUrl,
            id: key,
            downloadUrl: downloadUrl,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePhotoData({ commit }, payload) {
      commit("setLoading", true);
      //leeres Objekt, Dinge, die geupdated werden werden zugefügt
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("photos")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          //commit("updateLostItems", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    deletePhotoData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("photos")
        .child(payload.id)
        .remove()
        .then(() => {
          commit("setLoading", false);
          //commit("updateLostItems", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },

  getters: {
    loadedPhotos(state) {
      return state.loadedPhotos.reverse((newsA, newsB) => {
        return newsA.date > newsB.date;
      });
    },
  },
};
