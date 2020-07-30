//import * as firebase from "firebase";
import firebase from "firebase";
import "firebase/database";

export default {
  state: {
    loadedNews: [
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
    setLoadedNews(state, payload) {
      state.loadedNews = payload;
    },
    createNews() {
      //state.loadedNews.push(payload);
    },
    updateNews(state, payload) {
      const news = state.loadedNews.find((news) => {
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
    /*
        loadNews({ commit }) {
          commit("setLoading", true);
          //um realtime Updates zu bekommen statt once auf .on
          firebase
            .database()
            .ref("meetups")
            .once("value")
            .then((data) => {
              const meetups = [];
              const obj = data.val();
              //Daten aus firebase in Array überführen
              for (let key in obj) {
                meetups.push({
                  id: key,
                  title: obj[key].title,
                  description: obj[key].description,
                  imageUrl: obj[key].imageUrl,
                  location: obj[key].location,
                  date: obj[key].date,
                  creatorId: obj[key].creatorId,
                });
              }
              commit("setLoadedNews", meetups);
              commit("setLoading", false);
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        },*/

    //load news jetzt mit live update
    loadNews({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("news")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const news = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            news.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              //creatorId: obj[key].creatorId,
            });
          }
          commit("setLoadedNews", news);
          commit("setLoading", false);
        });
    },

    createNews({ commit }, payload) {
      const news = {
        title: payload.title,
        description: payload.description,
        date: payload.date.toISOString(),
        //creatorId: getters.user.id,
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref("news")
        .push(news)
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
            .child("news/" + key + "." + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          return fileData.ref.getDownloadURL().then((downloadUrl) => {
            imageUrl = downloadUrl;
            return firebase
              .database()
              .ref("news")
              .child(key)
              .update({ imageUrl: downloadUrl });
          });
        })
        .then((downloadUrl) => {
          commit("createNews", {
            ...news,
            imageUrl: imageUrl,
            id: key,
            downloadUrl: downloadUrl,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateNewsData({ commit }, payload) {
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
        .ref("news")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateNews", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    deleteNewsData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("news")
        .child(payload.id)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("updateNews", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },

  getters: {
    loadedNews(state) {
      return state.loadedNews.reverse((newsA, newsB) => {
        return newsA.date > newsB.date;
      });
    },
    featuredNews(state, getters) {
      return getters.loadedNews.slice(0, 1);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedNews.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
};
