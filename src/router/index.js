import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import CreatePost from '../views/CreatePost.vue';
import PostDetail from '../views/PostDetail.vue';
import SearchResults from '../views/SearchResults.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/create-post', name: 'CreatePost', component: CreatePost },
    { path: '/posts/:postId', name: 'PostDetail', component: PostDetail, props: true },
    {
        path: '/search',
        name: 'SearchResults',
        component: SearchResults,
        props: route => ({query: route.query.query}),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
