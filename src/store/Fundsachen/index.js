import * as firebase from "firebase";

export default {
  state: {
    loadedLostItems: [
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
    setLoadedLostItems(state, payload) {
      state.loadedLostItems = payload;
    },
    onCreateLostItem() {
      //state.loadedNews.push(payload);
    },
    createLostItem() {
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
    loadLostItems({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("lostItems")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const lostItems = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            lostItems.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              //creatorId: obj[key].creatorId,
            });
          }
          commit("setLoadedLostItems", lostItems);
          commit("setLoading", false);
        });
    },

    createLostItems({ commit }, payload) {
      const lostItem = {
        title: payload.title,
        description: payload.description,
        date: payload.date.toISOString(),
        //creatorId: getters.user.id,
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref("lostItems")
        .push(lostItem)
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
            .child("lostItems/" + key + "." + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          return fileData.ref.getDownloadURL().then((downloadUrl) => {
            imageUrl = downloadUrl;
            return firebase
              .database()
              .ref("lostItems")
              .child(key)
              .update({ imageUrl: downloadUrl });
          });
        })
        .then((downloadUrl) => {
          commit("createLostItem", {
            ...lostItem,
            imageUrl: imageUrl,
            id: key,
            downloadUrl: downloadUrl,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateLostItemsData({ commit }, payload) {
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
        .ref("lostItems")
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

    deleteLostItemsData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("lostItems")
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
    loadedLostItems(state) {
      return state.loadedLostItems.reverse((newsA, newsB) => {
        return newsA.date > newsB.date;
      });
    },
    featuredLostItems(state, getters) {
      return getters.loadedLostItems.slice(0, 1);
    },
  },
};
