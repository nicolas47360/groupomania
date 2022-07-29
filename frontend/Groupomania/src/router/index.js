import { createWebHistory, createRouter } from "vue-router";
import LoginSign from "../views/LoginSignView.vue";
import Home from "../views/HomeView.vue";
import Profil from "../views/ProfilView.vue";
import Post from "../views/PostView.vue";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
