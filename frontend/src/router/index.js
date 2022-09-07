import { createWebHistory, createRouter } from "vue-router";
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
        path: "/",
        name: "Registration",
        component: LoginSign,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
        }
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

// router.beforeEach((to) => {
//     if (to.meta.requiresAuth) {
//         return { name: 'Home' }
//     }
// })

export default router;
