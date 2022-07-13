import { createWebHistory, createRouter } from "vue-router";
import LoginSign from "../views/LoginSignView.vue";
import Home from "../views/HomeView.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
