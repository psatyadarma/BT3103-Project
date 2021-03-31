import LandingPage from './components/LandingPage.vue'
import LoginPage from './components/Login.vue'
import RegisterPage from './components/Register.vue'

export default [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
]