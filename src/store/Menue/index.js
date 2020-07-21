import * as firebase from "firebase";

export default {
  state: {
    //Menü-Items, wenn keine DB-Verbindung besteht
    loadedMenueItems: [
      /*{ icon: "mdi-newspaper", title: "News", link: "/news" },
      {
        icon: "mdi-table",
        title: "Spielpläne/Ergebnisse",
        link: "/spielplan",
        isActive: true,
      },
      {
        icon: "mdi-arrow-expand-vertical",
        title: "Gruppentabelle",
        link: "/results",
        isActive: true,
      },*/
      {
        icon: "mdi-beer",
        title: "Pegelstand",
        link: "/pegelstand",
        isActive: true,
      },
      //{ icon: "mdi-instagram", title: "Insta-Feed", link: "/instafeed" },
      /* {
        icon: "mdi-music",
        title: "Musikwünsche",
        link: "/musik",
        isActive: true,
      },
      { icon: "mdi-map", title: "Karte", link: "/map", isActive: true },
      //{ icon: "mdi-calendar", title: "Adventskalender", link: "/calendar" },
      {
        icon: "mdi-camera",
        title: "Fotos",
        link: "/fotos",
        isActive: true,
      },*/
      {
        icon: "mdi-football-australian",
        title: "Turnierinformationen",
        link: "/about",
        isActive: true,
      },
      { icon: "mdi-help", title: "FAQ", link: "/faq", isActive: true },
      /* {
        icon: "mdi-hanger",
        title: "Fundsachen",
        link: "/fundsachen",
        isActive: true,
      },*/
      {
        icon: "mdi-chat-outline",
        title: "Feedback",
        link: "/feedback",
        isActive: true,
      },
    ],
  },
  mutations: {
    setLoadedMenueItems(state, payload) {
      state.loadedMenueItems = payload;
    },
    createMenueItem() {
      //state.loadedNews.push(payload);
    },
    updateMenueItem(state, payload) {
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
    //load news jetzt mit live update
    loadMenueItems({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("menueItems")
        //sobald sich etwas in der Firebase ändert
        .on("value", function (snapshot) {
          const items = [];
          const obj = snapshot.val();
          //Daten aus firebase in Array überführen
          for (let key in obj) {
            items.push({
              id: key,
              title: obj[key].title,
              icon: obj[key].icon,
              link: obj[key].link,
              isActive: obj[key].isActive,
            });
          }
          commit("setLoadedMenueItems", items);
          commit("setLoading", false);
        });
    },

    createMenuItem() {
      const menueItemData = {
        icon: "mdi-newspaper",
        title: "News",
        link: "/news",
        isActive: false,
      };

      let key;
      firebase
        .database()
        .ref("menueItems")
        .push(menueItemData)
        .then((data) => {
          key = data.key;
          return key;
        })

        .catch((error) => {
          console.log(error);
        });
    },

    updateMenueItemData({ commit }, payload) {
      commit("setLoading", true);
      //leeres Objekt, Dinge, die geupdated werden werden zugefügt
      const updateObj = {};
      if (payload.isActive === true) {
        updateObj.isActive = false;
      }
      if (payload.isActive === false) {
        updateObj.isActive = true;
      }
      firebase
        .database()
        .ref("menueItems")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          //commit("updateMenueItema", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    deleteMenueItemData({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("menueItems")
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
    loadedMenueItems(state) {
      return state.loadedMenueItems.reverse((newsA, newsB) => {
        return newsA.date > newsB.date;
      });
    },

    loadedMenueItem(state) {
      return (meetupId) => {
        return state.loadedMenueItems.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
  },
};
