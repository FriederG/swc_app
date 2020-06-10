import * as firebase from "firebase";

export default {
  state: {
    loadedNews: [
      {
        imageUrl:
          "https://www.sueddeutsche.de/image/sz.1.4648823/1200x675?v=1571647880",
        id: "1",
        title: "Event Nummer 1",
        date: new Date(),
        description: "Das Erste Meeting",
      },
      {
        imageUrl:
          "https://media1.faz.net/ppmedia/aktuell/sport/3942937322/1.6396371/mmobject-still_full/der-haka-zieht-immer.jpg",
        id: "2",
        title: "Zweites Meetup",
        date: new Date(),
        description: "Das Zweite Meeting",
      },
    ],
  },
  mutations: {
    setLoadedNews(state, payload) {
      state.loadedNews = payload;
    },
    createNews(state, payload) {
      state.loadedNews.push(payload);
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

    updateMeetupData({ commit }, payload) {
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
  },

  getters: {
    loadedNews(state) {
      return state.loadedNews.sort((newsA, newsB) => {
        return newsA.date > newsB.date;
      });
    },
    featuredNews(state, getters) {
      return getters.loadedNews.slice(0, 5);
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
