import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        let postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      authenticateUser(vuexContext, authData) {
        let authURL =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.APIkey;

        if (!authData.isLogin) {
          authURL =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.APIkey;
        }
        return this.$axios
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            let expirationDate =
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000;
            this.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem("tokenExpiration", expirationDate);
            Cookie.set("jwt", result.idToken);
            Cookie.set("expirationDate", expirationDate);
          })
          .catch(error => console.log(error.response.data.error.message));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) return;
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) return;
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
          if (new Date() > expirationDate || !token) {
            console.log("No token or invalid token");
            vuexContext.dispatch("logout");
          } else vuexContext.commit("setToken", token);
        }
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .put(
            process.env.baseUrl +
              "/posts/" +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            editedPost
          )
          .then(result => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return axios
          .post(
            process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token,
            createdPost
          )
          .then(result => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: result.data.name
            });
          });
      },
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(process.env.baseUrl + "/posts.json")
          .then(response => {
            const postArray = [];
            for (const key in response.data) {
              postArray.push({ ...response.data[key], id: key });
            }
            vuexContext.commit("setPosts", postArray);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      logout(vuexContext) {
        // when running on the server side
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        // when running on the client side
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
