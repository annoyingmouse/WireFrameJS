import { Home } from "./modules/Home/Home.js";
import { About } from "./modules/About/About.js";
import { NotFound } from "./modules/NotFound/NotFound.js";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
];

export const router = new createRouter({ routes, history: createWebHistory() });