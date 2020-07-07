import * as firebase from "firebase";

export default {
  state: {
    loadedGames: [
      {
        title: "Kiel",
        time: "19999999999",
      },
    ],
    loadedTeamGames: [
      {
        title: "Kiel",
        time: "19999999999",
      },
    ],
  },
  mutations: {
    setLoadedGames(state, payload) {
      state.loadedGames = payload;
    },

    setLoadedTeamGames(state, payload) {
      state.loadedTeamGames = payload;
    },
    // createTeam() {
    //state.loadedNews.push(payload);
    //  },
    updateGames(state, payload) {
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
    loadGames({ commit }) {
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
              team1Title: obj[key].team1Title,
              team2: obj[key].team2,
              team2Title: obj[key].team2Title,
              scoreTeam1: obj[key].scoreTeam1,
              scoreTeam2: obj[key].scoreTeam2,
              //creatorId: obj[key].creatorId,
            });
          }
          commit("setLoadedGames", games);
          commit("setLoading", false);
        });
    },

    //TEst ---------------------------------------------------------------------
    loadTeamGames({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("teams/")
        //.child("-MB-R-j1zBmVLSqrv0KF")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const teamGames = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            teamGames.push({
              id: key,
              otherScore: obj[key].otherScore,
              selfScore: obj[key].selfScore,
            });
          }
          commit("setLoadedTeamGames", teamGames);
          commit("setLoading", false);
        });
    },

    createGame(state, payload) {
      //Name des Team 1 in Payload Team1 aufgrund des Keys aus der Team-Node ziehen
      firebase
        .database()
        .ref("teams/" + payload.team1)
        .child("/title")
        .once("value")
        .then(function (snapshot) {
          let titleTeam1 = snapshot.val();
          console.log("Team 1:" + titleTeam1);
          //Name des Teams 2 aus der Firebase ziehen
          firebase
            .database()
            .ref("teams/" + payload.team2)
            .child("/title")
            .once("value")
            .then(function (snapshot) {
              let titleTeam2 = snapshot.val();
              console.log("Team 2:" + titleTeam2);

              //Daten aus der SpielplanVerwaltung.vue
              //Und Title der Teams, die gerade aubgerufen wurden
              const game = {
                pitch: payload.pitch,
                gameGender: payload.gameGender,
                team1: payload.team1,
                team1Title: titleTeam1,
                team2Title: titleTeam2,
                team2: payload.team2,
                scoreTeam1: payload.scoreTeam1,
                scoreTeam2: payload.scoreTeam2,
                date: payload.date.toISOString(),
                //creatorId: getters.user.id,
              };
              let key;
              firebase
                .database()
                .ref("games")
                .push(game)
                .then((data) => {
                  key = data.key;
                  return key;
                })

                .catch((error) => {
                  console.log(error);
                });
            });
        });
    },

    updateGamesData({ commit }, payload) {
      console.log(payload.team1OldGameScore);
      console.log("team2OldGameScore:" + payload.team2OldGameScore);
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

      if (payload.team1OldGameScore === "") {
        payload.team1OldGameScore = 0;
        var keinScore1 = true;
      }
      if (payload.team2OldGameScore === "") {
        payload.team2OldGameScore = 0;
        var keinScore2 = true;
      }
      //Statistiken updaten für die Teams ------------------------------------------------------------
      //Team 1
      //Bisherige Daten abrufen
      firebase
        .database()
        .ref("teams/")
        .child(payload.team1)
        .once("value")
        .then(function (snapshot) {
          //Alle Daten des Teams
          let OldTeam1Data = snapshot.val();

          let oldTotalScore1 = OldTeam1Data.totalScore;
          let oldOpponentScore1 = OldTeam1Data.opponentScore;
          let oldWins1 = OldTeam1Data.wins;
          let oldLosses1 = OldTeam1Data.losses;
          let oldDraws1 = OldTeam1Data.draw;

          console.log("Alter Total Score Team 1:" + oldTotalScore1);
          console.log("Alter Opponent Score Team 1:" + oldOpponentScore1);
          console.log("Alte Wins Team 1:" + oldWins1);
          console.log("Alter Niederlagen Team 1:" + oldLosses1);

          //Neue Scores eintragen
          console.log("Team 1: " + payload.team1);
          console.log("Score Team 1: " + payload.scoreTeam1);

          const updateObjStat1 = {};
          if (payload.scoreTeam1 || payload.scoreTeam2) {
            //Total Score --------------------------------------------------------------------------
            //Wenn noch keine Einträge da sind, auf Null setzen, damit keine Fehler
            if (oldTotalScore1 === "") {
              oldTotalScore1 = 0;
            }

            updateObjStat1.totalScore =
              parseInt(oldTotalScore1) +
              parseInt(payload.scoreTeam1) -
              parseInt(payload.team1OldGameScore);
            //Opponent Score -----------------------------------------------------------------------
            if (oldOpponentScore1 === "") {
              oldOpponentScore1 = 0;
            }

            if (payload.scoreTeam2 === "") {
              payload.scoreTeam2 = 0;
            }
            updateObjStat1.opponentScore =
              parseInt(oldOpponentScore1) +
              parseInt(payload.scoreTeam2) -
              parseInt(payload.team2OldGameScore);
            //Wins ---------------------------------------------------------------------------------
            //Wenn ein Sieg eingetragen wurde
            console.log("Payload Score Team 1:" + payload.scoreTeam2);
            console.log("Payload Score Team 2:" + payload.scoreTeam1);
            if (parseInt(payload.scoreTeam1) > parseInt(payload.scoreTeam2)) {
              //Wenn vorher eine Niederlage eingetragen ist
              if (
                parseInt(payload.team1OldGameScore) <
                parseInt(payload.team2OldGameScore)
              ) {
                updateObjStat1.wins = oldWins1 + 1;
                console.log("Sieg erhöht");
                updateObjStat1.losses = oldLosses1 - 1;
              }
              //Wenn vorher ein Unentschieden eingetragen ist
              if (payload.team1OldGameScore === payload.team2OldGameScore) {
                //Wenn vorher gar kein Score eingetragen war
                if (keinScore1 === true && keinScore2 === true) {
                  updateObjStat1.wins = oldWins1 + 1;
                  console.log("Unentschieden ohne Abzug");
                } else {
                  updateObjStat1.wins = oldWins1 + 1;
                  updateObjStat1.draw = oldDraws1 - 1;
                }
              }
            }
            //Losses -------------------------------------------------------------------------------
            if (parseInt(payload.scoreTeam1) < parseInt(payload.scoreTeam2)) {
              console.log("Niederlage");
              //Wenn bisher ein Siege eingetragen ist
              if (
                parseInt(payload.team1OldGameScore) >
                parseInt(payload.team2OldGameScore)
              ) {
                updateObjStat1.wins = oldWins1 - 1;
                console.log("Niederlage erhöht");
                updateObjStat1.losses = oldLosses1 + 1;
              }
              //Wenn bisher ein Unentschieden eingetragen ist
              if (payload.team1OldGameScore === payload.team2OldGameScore) {
                //Wenn vorher gar kein Score eingetragen war
                if (keinScore1 === true && keinScore2 === true) {
                  updateObjStat1.losses = oldLosses1 + 1;
                  console.log("Unentschieden ohne Abzug");
                } else {
                  updateObjStat1.losses = oldLosses1 + 1;
                  updateObjStat1.draw = oldDraws1 - 1;
                }
              }
            }
            //Draw ----------------------------------------------------------------------------------
            if (parseInt(payload.scoreTeam1) === parseInt(payload.scoreTeam2)) {
              console.log("Unentschieden");
              //Wenn vorher ein Sieg eingetragen war
              if (
                parseInt(payload.team1OldGameScore) >
                parseInt(payload.team2OldGameScore)
              ) {
                updateObjStat1.draw = oldDraws1 + 1;
                updateObjStat1.wins = oldWins1 - 1;
                console.log("Sieg abgezogen");
              }
              //Wenn vorher eine Niederlage eingetragen war
              if (
                parseInt(payload.team1OldGameScore) <
                parseInt(payload.team2OldGameScore)
              ) {
                updateObjStat1.losses = oldLosses1 - 1;
                console.log("Niederlage abgezogen");
                updateObjStat1.draw = oldDraws1 + 1;
              }
              //Wenn vorher ein Unentschieden eingetragen war
              if (
                parseInt(payload.team1OldGameScore) ===
                  parseInt(payload.team2OldGameScore) &&
                keinScore1 === true &&
                keinScore2 === true
              ) {
                updateObjStat1.draw = oldDraws1 + 1;
                console.log("Sieg abgezogen");
              }
            }
          }
          firebase
            .database()
            .ref("teams")
            .child(payload.team1)
            .update(updateObjStat1)
            .then(() => {
              commit("setLoading", false);
              //  commit("updateTeams", payload);
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        });

      //Für Team 2 -----------------------------------------------------------------------------------
      //----------------------------------------------------------------------------------------------
      //Bisherige Daten abrufen

      firebase
        .database()
        .ref("teams/")
        .child(payload.team2)
        .once("value")
        .then(function (snapshot) {
          //Alle Daten des Teams
          let OldTeam2Data = snapshot.val();

          let oldTotalScore2 = OldTeam2Data.totalScore;
          let oldOpponentScore2 = OldTeam2Data.opponentScore;
          let oldWins2 = OldTeam2Data.wins;
          let oldLosses2 = OldTeam2Data.losses;
          let oldDraws2 = OldTeam2Data.draw;

          //Neue Scores eintragen
          const updateObjStat2 = {};
          if (payload.scoreTeam2 || payload.scoreTeam1) {
            //Total Score --------------------------------------------------------------------------
            //Wenn noch keine Einträge da sind, auf Null setzen, damit keine Fehler
            if (oldTotalScore2 === "") {
              oldTotalScore2 = 0;
            }
            if (payload.team2OldGameScore === "") {
              payload.team2OldGameScore = 0;
              //var keinScore2 = true;
            }
            updateObjStat2.totalScore =
              parseInt(oldTotalScore2) +
              parseInt(payload.scoreTeam2) -
              parseInt(payload.team2OldGameScore);
            //Opponent Score -----------------------------------------------------------------------
            if (oldOpponentScore2 === "") {
              oldOpponentScore2 = 0;
            }
            if (payload.team1OldGameScore === "") {
              payload.team2OldGameScore = 0;
              //var keinScore1 = true;
            }
            if (payload.scoreTeam1 === "") {
              payload.scoreTeam1 = 0;
            }
            updateObjStat2.opponentScore =
              parseInt(oldOpponentScore2) +
              parseInt(payload.scoreTeam1) -
              parseInt(payload.team1OldGameScore);
            //Wins ---------------------------------------------------------------------------------
            //Wenn ein Sieg eingetragen wurde
            console.log("Payload Score Team 1:" + payload.scoreTeam2);
            console.log("Payload Score Team 2:" + payload.scoreTeam1);
            if (parseInt(payload.scoreTeam2) > parseInt(payload.scoreTeam1)) {
              //Wenn vorher eine Niederlage eingetragen ist
              if (
                parseInt(payload.team2OldGameScore) <
                parseInt(payload.team1OldGameScore)
              ) {
                updateObjStat2.wins = oldWins2 + 1;
                console.log("Sieg erhöht");
                updateObjStat2.losses = oldLosses2 - 1;
              }
              //Wenn vorher ein Unentschieden eingetragen ist
              if (payload.team2OldGameScore === payload.team1OldGameScore) {
                //Wenn vorher gar kein Score eingetragen war
                if (keinScore1 === true && keinScore2 === true) {
                  updateObjStat2.wins = oldWins2 + 1;
                  console.log("Unentschieden ohne Abzug");
                } else {
                  updateObjStat2.wins = oldWins2 + 1;
                  updateObjStat2.draw = oldDraws2 - 1;
                }
              }
            }
            //Losses -------------------------------------------------------------------------------
            if (parseInt(payload.scoreTeam2) < parseInt(payload.scoreTeam1)) {
              console.log("Niederlage Team 2");
              //Wenn bisher ein Siege eingetragen ist
              if (
                parseInt(payload.team2OldGameScore) >
                parseInt(payload.team1OldGameScore)
              ) {
                updateObjStat2.wins = oldWins2 - 1;
                console.log("Niederlage erhöht");
                updateObjStat2.losses = oldLosses2 + 1;
              }
              //Wenn bisher ein Unentschieden eingetragen ist
              if (payload.team2OldGameScore === payload.team1OldGameScore) {
                //Wenn vorher gar kein Score eingetragen war
                if (keinScore1 === true && keinScore2 === true) {
                  updateObjStat2.losses = oldLosses2 + 1;
                } else {
                  updateObjStat2.losses = oldLosses2 + 1;
                  updateObjStat2.draw = oldDraws2 - 1;
                }
              }
            }
            //Draw ----------------------------------------------------------------------------------
            if (parseInt(payload.scoreTeam1) === parseInt(payload.scoreTeam2)) {
              console.log("Unentschieden");
              //Wenn vorher ein Sieg eingetragen war
              if (
                parseInt(payload.team2OldGameScore) >
                parseInt(payload.team1OldGameScore)
              ) {
                updateObjStat2.draw = oldDraws2 + 1;
                updateObjStat2.wins = oldWins2 - 1;
              }
              //Wenn vorher eine Niederlage eingetragen war
              if (
                parseInt(payload.team2OldGameScore) <
                parseInt(payload.team1OldGameScore)
              ) {
                updateObjStat2.losses = oldLosses2 - 1;
                console.log("Niederlage abgezogen");
                updateObjStat2.draw = oldDraws2 + 1;
              }
              //Wenn vorher ein Unentschieden eingetragen war
              if (
                parseInt(payload.team1OldGameScore) ===
                  parseInt(payload.team2OldGameScore) &&
                keinScore1 === true &&
                keinScore2 === true
              ) {
                updateObjStat2.draw = oldDraws2 + 1;
              }
            }
          }
          //Daten übertragen
          firebase
            .database()
            .ref("teams")
            .child(payload.team2)
            .update(updateObjStat2)
            .then(() => {
              commit("setLoading", false);
              //  commit("updateTeams", payload);
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        });
    },

    //Spiele löschen ---------------------------------------------------------------------------------------------------
    //Muss auch Spielstände und Statistiken abziehen, um die Integrität der Daten einzuhalten
    deleteGameData({ commit }, payload) {
      console.log(payload.team1OldGameScore);
      console.log("team2OldGameScore:" + payload.team2OldGameScore);

      if (payload.team1OldGameScore === "") {
        payload.team1OldGameScore = 0;
        var keinScore1 = true;
      }
      if (payload.team2OldGameScore === "") {
        payload.team2OldGameScore = 0;
        var keinScore2 = true;
      }
      //Statistiken updaten für die Teams ------------------------------------------------------------
      //Team 1
      //Bisherige Daten abrufen
      firebase
        .database()
        .ref("teams/")
        .child(payload.team1)
        .once("value")
        .then(function (snapshot) {
          //Alle Daten des Teams
          let OldTeam1Data = snapshot.val();

          let oldTotalScore1 = OldTeam1Data.totalScore;
          let oldOpponentScore1 = OldTeam1Data.opponentScore;
          let oldWins1 = OldTeam1Data.wins;
          let oldLosses1 = OldTeam1Data.losses;
          let oldDraws1 = OldTeam1Data.draw;

          console.log("Alter Total Score Team 1:" + oldTotalScore1);
          console.log("Alter Opponent Score Team 1:" + oldOpponentScore1);
          console.log("Alte Wins Team 1:" + oldWins1);
          console.log("Alte Niederlagen Team 1:" + oldLosses1);

          //Neue Scores eintragen
          console.log("Team 1: " + payload.team1);
          console.log("Score Team 1: " + payload.scoreTeam1);

          const updateObjStat1 = {};

          //Total Score --------------------------------------------------------------------------
          //Wenn noch keine Einträge da sind, auf Null setzen, damit keine Fehler
          if (oldTotalScore1 === "") {
            oldTotalScore1 = 0;
          }

          updateObjStat1.totalScore =
            parseInt(oldTotalScore1) - parseInt(payload.team1OldGameScore);
          //Opponent Score -----------------------------------------------------------------------
          if (oldOpponentScore1 === "") {
            oldOpponentScore1 = 0;
          }

          updateObjStat1.opponentScore =
            parseInt(oldOpponentScore1) - parseInt(payload.team2OldGameScore);
          //Wins ---------------------------------------------------------------------------------
          //Wenn ein Sieg eingetragen war
          if (payload.team1OldGameScore > payload.team2OldGameScore) {
            updateObjStat1.wins = oldWins1 - 1;
          }
          //Wenn vorher eine Niederlage eingetragen war
          if (payload.team1OldGameScore < payload.team2OldGameScore) {
            updateObjStat1.losses = oldLosses1 - 1;
          }
          //Wenn vorher ein Unentschieden eingetragen war
          if (payload.team1OldGameScore === payload.team2OldGameScore) {
            //Wenn vorher gar kein Score eingetragen war
            if (keinScore1 === true && keinScore2 === true) {
              updateObjStat1.wins = oldWins1;
              console.log("Unentschieden ohne Abzug");
            } else {
              updateObjStat1.draw = oldDraws1 - 1;
            }
          }
          firebase
            .database()
            .ref("teams")
            .child(payload.team1)
            .update(updateObjStat1)
            .then(() => {
              commit("setLoading", false);
              //  commit("updateTeams", payload);
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        });

      //Für Team 2 -----------------------------------------------------------------------------------
      //----------------------------------------------------------------------------------------------
      //Bisherige Daten abrufen
      firebase
        .database()
        .ref("teams/")
        .child(payload.team2)
        .once("value")
        .then(function (snapshot) {
          //Alle Daten des Teams
          let OldTeam2Data = snapshot.val();

          let oldTotalScore2 = OldTeam2Data.totalScore;
          let oldOpponentScore2 = OldTeam2Data.opponentScore;
          let oldWins2 = OldTeam2Data.wins;
          let oldLosses2 = OldTeam2Data.losses;
          let oldDraws2 = OldTeam2Data.draw;

          const updateObjStat2 = {};

          //Total Score --------------------------------------------------------------------------
          //Wenn noch keine Einträge da sind, auf Null setzen, damit keine Fehler
          if (oldTotalScore2 === "") {
            oldTotalScore2 = 0;
          }

          updateObjStat2.totalScore =
            parseInt(oldTotalScore2) - parseInt(payload.team2OldGameScore);
          //Opponent Score -----------------------------------------------------------------------
          if (oldOpponentScore2 === "") {
            oldOpponentScore2 = 0;
          }

          updateObjStat2.opponentScore =
            parseInt(oldOpponentScore2) - parseInt(payload.team1OldGameScore);
          //Wins ---------------------------------------------------------------------------------
          //Wenn ein Sieg eingetragen war
          if (payload.team2OldGameScore > payload.team1OldGameScore) {
            updateObjStat2.wins = oldWins2 - 1;
          }
          //Wenn vorher eine Niederlage eingetragen war
          if (payload.team2OldGameScore < payload.team1OldGameScore) {
            updateObjStat2.losses = oldLosses2 - 1;
          }
          //Wenn vorher ein Unentschieden eingetragen war
          if (payload.team2OldGameScore === payload.team1OldGameScore) {
            //Wenn vorher gar kein Score eingetragen war
            if (keinScore1 === true && keinScore2 === true) {
              updateObjStat2.wins = oldWins2;
              console.log("Unentschieden ohne Abzug");
            } else {
              updateObjStat2.draw = oldDraws2 - 1;
            }
          }
          firebase
            .database()
            .ref("teams")
            .child(payload.team2)
            .update(updateObjStat2)
            .then(() => {
              commit("setLoading", false);
              //  commit("updateTeams", payload);
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        });
      //Löschen durchführen
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
    loadedGames(state) {
      return state.loadedGames.sort((newsA, newsB) => {
        return newsA.time > newsB.time;
      });
      //      state.loadedGames.sort(function (a, b) {
      //      return new Date(b.time) - new Date(a.time);
      //  });
    },

    loadedTeamGames(state) {
      return state.loadedTeamGames.sort((newsA, newsB) => {
        return newsA.time > newsB.time;
      });
      //      state.loadedGames.sort(function (a, b) {
      //      return new Date(b.time) - new Date(a.time);
      //  });
    },

    loadedGame(state) {
      return (meetupId) => {
        return state.loadedNews.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
};
