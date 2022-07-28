import { createWebHistory, createRouter } from "vue-router";
import LoginSign from "../views/LoginSignView.vue";
import Home from "../views/HomeView.vue";
import Profil from "../views/ProfilView.vue";

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
        path:"/profil",
        name: "Profil",
        component: Profil,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
