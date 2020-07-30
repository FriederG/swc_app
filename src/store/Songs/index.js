//import * as firebase from "firebase";
import firebase from "firebase";
import "firebase/database";

export default {
  state: {
    loadedSongs: [
      {
        title: "Umbrella",
        rating: "0",
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

    setLoadedSongs(state, payload) {
      state.loadedSongs = payload;
    },

    // createTeam() {
    //state.loadedNews.push(payload);
    //  },
    updateSongs(state, payload) {
      const song = state.loadedSongs.find((song) => {
        return song.id === payload.id;
      });
      if (payload.title) {
        song.title = payload.title;
      }
      if (payload.rating) {
        song.rating = payload.rating;
      }
    },
  },
  actions: {
    loadSongs({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("songs")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const songs = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            songs.push({
              id: key,
              title: obj[key].title,
              rating: obj[key].rating,
            });
          }

          commit("setLoadedSongs", songs);
          commit("setLoading", false);
        });
    },

    createSong(state, payload) {
      const song = {
        title: payload.title,
        rating: 0,
      };
      let key;
      firebase
        .database()
        .ref("songs")
        .push(song)
        .then((data) => {
          key = data.key;
          return key;
        })

        .catch((error) => {
          console.log(error);
        });
    },

    UpVoteSong({ commit }, payload) {
      commit("setLoading", true);
      //leeres Objekt, Dinge, die geupdated werden werden zugefügt
      const updateObj = {};
      updateObj.rating = payload.rating + 1;
      firebase
        .database()
        .ref("songs")
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
    DownVoteSong({ commit }, payload) {
      commit("setLoading", true);
      //leeres Objekt, Dinge, die geupdated werden werden zugefügt
      const updateObj = {};
      updateObj.rating = payload.rating - 1;
      firebase
        .database()
        .ref("songs")
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
      if (payload.selfScore) {
        updateObj.totalScore = payload.selfScore + payload.oldSelfScore;
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

    deleteSongData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("songs")
        .child(payload.id)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("updateSongs", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },

  getters: {
    loadedSongs(state) {
      return state.loadedSongs.reverse((newsA, newsB) => {
        return newsA.rating > newsB.rating;
      });
    },
  },
};
