import * as firebase from "firebase";

export default {
  state: {
    loadedGames: [
      {
        title: "Kiel",
        time: "19999999999",
      },
    ],
  },
  mutations: {
    setLoadedGroups(state, payload) {
      state.loadedGames = payload;
    },
    // createTeam() {
    //state.loadedNews.push(payload);
    //  },
    updateGroups(state, payload) {
      const team = state.loadedNews.find((team) => {
        return team.id === payload.id;
      });
      if (payload.title) {
        team.title = payload.title;
      }
      if (payload.description) {
        team.description = payload.description;
      }
    },
  },
  actions: {
    //load news jetzt mit live update
    loadGroups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("games")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const games = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            games.push({
              id: key,
              time: obj[key].date,
              pitch: obj[key].pitch,
              gameGender: obj[key].gameGender,
              team1: obj[key].team1,
              team2: obj[key].team2,
              scoreTeam1: obj[key].scoreTeam1,
              scoreTeam2: obj[key].scoreTeam2,
              //creatorId: obj[key].creatorId,
            });
          }
          commit("setLoadedGames", games);
          commit("setLoading", false);
        });
    },

    createGroup(state, payload) {
      console.log(payload.title);
      const group = {
        groupGender: payload.groupGender,
        groupName: payload.groupName,
        groupTeam1: payload.groupTeam1,
        groupTeam2: payload.groupTeam2,
        groupTeam3: payload.groupTeam3,
        groupTeam4: payload.groupTeam4,
        groupTeam5: payload.groupTeam5,
        groupTeam6: payload.groupTeam6,
        groupTeam7: payload.groupTeam7,
        groupTeam8: payload.groupTeam8,

        date: payload.date.toISOString(),
        //creatorId: getters.user.id,
      };
      let key;
      firebase
        .database()
        .ref("groups")
        .push(group)
        .then((data) => {
          key = data.key;
          return key;
        })

        .catch((error) => {
          console.log(error);
        });
    },
    updateGroupData({ commit }, payload) {
      commit("setLoading", true);
      //leeres Objekt, Dinge, die geupdated werden werden zugefügt
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      if (payload.scoreTeam1) {
        updateObj.scoreTeam1 = payload.scoreTeam1;
      }
      if (payload.scoreTeam2) {
        updateObj.scoreTeam2 = payload.scoreTeam2;
      }
      firebase
        .database()
        .ref("games")
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

    deleteGroupData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("games")
        .child(payload.id)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("updateGames", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },

  getters: {
    loadedGroups(state) {
      return state.loadedGames.sort((newsA, newsB) => {
        return newsA.time > newsB.time;
      });
      //      state.loadedGames.sort(function (a, b) {
      //      return new Date(b.time) - new Date(a.time);
      //  });
    },
    featuredGroups(state, getters) {
      return getters.loadedNews.slice(0, 1);
    },
    loadedGroup(state) {
      return (meetupId) => {
        return state.loadedNews.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
};