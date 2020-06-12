import * as firebase from "firebase";

export default {
  state: {
    loadedTeams: [],
  },
  mutations: {
    setLoadedNews(state, payload) {
      state.loadedNews = payload;
    },
    // createTeam() {
    //state.loadedNews.push(payload);
    //  },
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

    createTeam(state, payload) {
      console.log(payload.title);
      const team = {
        title: payload.title,
        date: payload.date.toISOString(),
        //creatorId: getters.user.id,
      };
      let key;
      firebase
        .database()
        .ref("teams")
        .push(team)
        .then((data) => {
          key = data.key;
          return key;
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
