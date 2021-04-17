import LandingPage from './components/LandingPage.vue'
import LoginPage from './components/Login.vue'
import RegisterStudent from './components/RegisterStudent.vue'
import RegisterTutor from './components/RegisterTutor.vue'
import HomeStudent from './components/HomeStudent.vue'
import HomeTutor from './components/HomeTutor.vue'
import BrowseTutor from './components/BrowseTutors.vue'
import MyTutors from './components/MyTutors.vue'
import RequestForm from './components/RequestForm.vue'
import Dashboard from './components/Dashboard.vue'
import LogoutPage from './components/Logout.vue'

export default [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/logout', component: LogoutPage },
    { path: '/registerStudent', component: RegisterStudent },
    { path: '/registerTutor', component: RegisterTutor },
    { path: '/homeStudent', component: HomeStudent },
    { path: '/homeTutor', component: HomeTutor },
    { path: '/browseTutor', component: BrowseTutor },
    { path: '/myTutors', component: MyTutors },
    { path: '/requestForm', name:'requestForm',component: RequestForm,props:true },
    { path: '/dashboard', component: Dashboard }
    
]