import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from '../views/Posts.vue'
import PostView from "../views/PostView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Posts',
        component: Posts,
        meta: {
            title: "Posts",
        },
    }
    , {
        path: '/posts/:postId',
        name: 'PostView',
        component: PostView,
        meta: {
            title: "View Post",
        },
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | TryCar Task`;
    next();
});
export default router
