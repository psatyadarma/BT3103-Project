import LandingPage from './components/LandingPage.vue'
import LoginPage from './components/Login.vue'
import RegisterStudent from './components/RegisterStudent.vue'
import RegisterTutor from './components/RegisterTutor.vue'

export default [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/registerStudent', component: RegisterStudent },
    { path: '/registerTutor', component: RegisterTutor }
]