import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        users: [],
        comments: null,
        pages: 1,
        currentPage: 1,
        currentPost: null,

    },
    mutations: {
        parseLinkHeader(state, linkHeader) {
            const linkHeadersArray = linkHeader.split(", ").map(header => header.split("; "));
            const linkHeadersMap = linkHeadersArray.map(header => {
                const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
                const thisHeaderUrl = header[0].slice(1, -1);
                return [thisHeaderRel, thisHeaderUrl]
            });
            if (linkHeadersMap.length == 3) {
                state.pages = linkHeadersMap[2][1].split('page=')[1];
            } else {
                state.pages = linkHeadersMap[3][1].split('page=')[1];
            }
        },
        setCurrentPost(state, post) {
            state.currentPost = post
        },
        setComments(staste, comments) {
            staste.comments = comments;
        }
    },
    actions: {
        async getPosts({dispatch, commit, state}, url) {
            commit('setCurrentPost', [])
            commit('setComments', [])
            state.posts = [];
            var dataPosts = await axios.get(url);
            commit('parseLinkHeader', dataPosts.headers.link)
            if (state.users.length == 0) {
                await dispatch("getUser");
            }
            dataPosts.data.forEach(async (post) => {
                let user = state.users.find(element => element.id == post.userId)
                const data = {
                    id: post.id,
                    body: post.body,
                    title: post.title,
                    user: user,
                };
                state.posts.push(data);

            });

        },
        async getUser({state}) {
            let user = await axios.get("https://jsonplaceholder.typicode.com/users");
            user.data.forEach((user) => {
                const userInfo = {
                    id: user.id,
                    name: user.name,
                    phone: user.phone.split(' ')[0]
                };
                state.users.push(userInfo)
            });
        },
        async getPost({commit}, postId) {
            let post = null;
            await axios.get("https://jsonplaceholder.typicode.com/posts/" + postId).then(async function (response) {
                let comments = await axios.get("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments");
                let user = await axios.get("https://jsonplaceholder.typicode.com/users/" + response.data.userId);
                post = {
                    id: response.data.id,
                    body: response.data.body,
                    title: response.data.title,
                    comments: comments.data,
                    user: user.data
                }
                commit('setCurrentPost', post)
            });

        },
        async getComments({commit}, params) {
            let comments = await axios.get("https://jsonplaceholder.typicode.com/posts/" + params.postId + "/comments?_limit=" + params.limit);
            console.log(comments.data);
            commit('setComments', comments.data)
        }
    },
    modules: {},
    getters: {
        currentPage(state) {
            return state.currentPage;
        }
    }
})
