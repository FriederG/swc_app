//import * as firebase from "firebase";
import firebase from "firebase";
import "firebase/database";

export default {
  state: {
    loadedTeams: [
      {
        title: "Kiel",
        gender: "gender",
      },
    ],
    loadedSelectTeams: [
      {
        title: "Kiel",
        gender: "gender",
      },
    ],
  },
  mutations: {
    //Hier bin ich
    registerTeamForGame(state, payload) {
      const id = payload.id;
      if (
        state.loadedTeams.registeredMeetups.findIndex(
          (meetup) => meetup.id === id
        ) >= 0
      ) {
        return;
      }
      state.team.registeredGames.push(id);
      state.team.fbKeys[id] = payload.fbKey;
    },

    setLoadedTeams(state, payload) {
      state.loadedTeams = payload;
    },

    setLoadedSelectTeams(state, payload) {
      state.loadedSelectTeams = payload;
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
              group: obj[key].group,
              gender: obj[key].gender,
              date: obj[key].date,
              totalScore: obj[key].totalScore,
              opponentScore: obj[key].opponentScore,
              wins: obj[key].wins,
              losses: obj[key].losses,
              points: obj[key].points,
              scoreDifference: obj[key].scoreDifference,
              draw: obj[key].draw,
            });
          }
          commit("setLoadedTeams", teams);
          commit("setLoading", false);
        });
    },

    loadSelectTeams({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("teams")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const teams = ["Alle Teams"];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            teams.push({
              id: key,
              title: obj[key].title,
              group: obj[key].group,
              gender: obj[key].gender,
              date: obj[key].date,
              totalScore: obj[key].totalScore,
              opponentScore: obj[key].opponentScore,
              wins: obj[key].wins,
              losses: obj[key].losses,
              points: obj[key].points,
              scoreDifference: obj[key].scoreDifference,
              draw: obj[key].draw,
            });
          }
          commit("setLoadedSelectTeams", teams);
          commit("setLoading", false);
        });
    },

    createTeam(state, payload) {
      //console.log(payload.title);
      const team = {
        title: payload.title,
        gender: payload.gender,
        totalScore: payload.totalScore,
        opponentScore: payload.opponentScore,
        wins: payload.wins,
        losses: payload.losses,
        draw: payload.draw,
        group: payload.group,
        points: 0,
        scoreDifference: 0,
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
      if (payload.group) {
        updateObj.group = payload.group;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      if (payload.selfScore) {
        updateObj.totalScore = payload.selfScore + payload.oldSelfScore;
      }
      if (payload.otherScore) {
        updateObj.opponentScore = payload.otherScore;
      }
      if (payload.losses) {
        updateObj.losses = payload.losses;
      }
      if (payload.scoreDiffernce) {
        updateObj.scoreDifference = payload.scoreDiffernce;
      }
      if (payload.draw) {
        updateObj.draw = payload.draw;
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

    updateTeamsData2({ commit }, payload) {
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
      if (payload.selfScore) {
        updateObj.totalScore = payload.selfScore;
      }
      if (payload.otherScore) {
        updateObj.opponentScore = payload.otherScore;
      }

      if (payload.losses) {
        updateObj.losses = payload.losses;
      }
      if (payload.draw) {
        updateObj.draw = payload.draw;
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

    registerTeam1ForGame({ commit }, payload) {
      commit("setLoading", true);
      const team1 = payload.id;
      console.log("team1:" + team1);
      firebase
        .database()
        .ref("/teams/" + team1)
        .child("/games/")
        .push(payload)
        .then((data) => {
          commit("setLoading", false);
          commit("registerTeamForGame", { id: payload, fbKey: data.key });
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    registerTeam2ForGame({ commit }, payload) {
      commit("setLoading", true);
      const team1 = payload.id;
      console.log("team1:" + team1);
      firebase
        .database()
        .ref("/teams/" + team1)
        .child("/games/")
        .push(payload)
        .then((data) => {
          commit("setLoading", false);
          commit("registerTeamForGame", { id: payload, fbKey: data.key });
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

    loadedSelectTeams(state) {
      return state.loadedSelectTeams.reverse((newsA, newsB) => {
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
