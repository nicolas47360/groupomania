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
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/post",
        name: "Post",
        component: Post,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/post/modify",
        name: "modifyPost",
        component: ModifyPost,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/post/delete",
        name: "deletePost",
        component: DeletePost,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/comment",
        name: "comment",
        component: CommentPost,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/comment/show",
        name: "commentshow",
        component: CommentShow,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/comment/modify",
        name: "commentmodify",
        component: ModifyComment,
        meta: {
            requiresAuth: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     const userId = localStorage.getItem("userId");
//     if (to.meta.requiresAuth && !userId) {
//         next({ name: 'Home' });
//     }
//     else { next({ name: 'Registration' }); }

// })

// router.beforeEach((to, from, next) => {
//     const userId = localStorage.getItem("userId")
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (userId != null) {
//             next({ name: 'Home' })
//         } else {
//             next({ name: 'Registarion' }) // go to wherever I'm going
//         }
//     } else {
//         next() // does not require auth, make sure to always call next()!
//     }
// })

export default router;
