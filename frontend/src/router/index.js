import { createWebHistory, createRouter } from "vue-router";
import { isLoggedIn } from "../utils/auth";
import LoginSign from "../views/LoginSignView.vue";
import Home from "../views/HomeView.vue";
import Profil from "../views/ProfilView.vue";
import Post from "../views/PostView.vue";
import CommentPost from "../components/CommentView.vue";
import DeletePost from "../components/DeletePost.vue";
import ModifyPost from "../components/ModifyPost.vue";
import CommentShow from "../components/CommentShow.vue";
import ModifyComment from "../components/ModifyComment.vue";

const routes = [
    {
        path: "/login",
        name: "Registration",
        component: LoginSign,
        meta: {
            allowAnonymous: true
        }
    },
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/profil",
        name: "Profil",
        component: Profil,
    },
    {
        path: "/post",
        name: "Post",
        component: Post,
    },
    {
        path: "/post/modify",
        name: "modifyPost",
        component: ModifyPost,
    },
    {
        path: "/post/delete",
        name: "deletePost",
        component: DeletePost,

    },
    {
        path: "/comment",
        name: "comment",
        component: CommentPost,
    },
    {
        path: "/comment/show",
        name: "commentshow",
        component: CommentShow,
    },
    {
        path: "/comment/modify",
        name: "commentmodify",
        component: ModifyComment,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name == 'Registration' && isLoggedIn()) {
        next({ path: '/' })
    }
    else if (!to.meta.allowAnonymous && !isLoggedIn()) {
        next({
            path: '/login',
        })
    }
    else {
        next()
    }
})

export default router;
