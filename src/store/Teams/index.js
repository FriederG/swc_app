import * as firebase from "firebase";

export default {
  state: {
    loadedTeams: [
      {
        title: "Kiel",
        gender: "gender",
      },
    ],
  },
  mutations: {
    setLoadedTeams(state, payload) {
      state.loadedTeams = payload;
    },
    // createTeam() {
    //state.loadedNews.push(payload);
    //  },
    updateTeams(state, payload) {
      const team = state.loadedNews.find((team) => {
        return team.id === payload.id;
      });
      if (payload.title) {
        team.title = payload.title;
      }
      if (payload.gender) {
        team.gender = payload.gender;
      }
      if (payload.description) {
        team.description = payload.description;
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
    loadTeams({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("teams")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const teams = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            teams.push({
              id: key,
              title: obj[key].title,
              gender: obj[key].gender,
              date: obj[key].date,
              //creatorId: obj[key].creatorId,
            });
          }
          commit("setLoadedTeams", teams);
          commit("setLoading", false);
        });
    },

    createTeam(state, payload) {
      //console.log(payload.title);
      const team = {
        title: payload.title,
        gender: payload.gender,
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
    updateTeamsData({ commit }, payload) {
      commit("setLoading", true);
      //leeres Objekt, Dinge, die geupdated werden werden zugefügt
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.gender) {
        updateObj.gender = payload.gender;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("teams")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          //  commit("updateTeams", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    deleteTeamData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("teams")
        .child(payload.id)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("updateTeams", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },

  getters: {
    loadedTeams(state) {
      return state.loadedTeams.reverse((newsA, newsB) => {
        return newsA.date > newsB.date;
      });
    },
    featuredTeams(state, getters) {
      return getters.loadedNews.slice(0, 1);
    },
    loadedTeam(state) {
      return (meetupId) => {
        return state.loadedNews.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
};
