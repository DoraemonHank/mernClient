import React,{useState} from 'react'
import {Switch,Route} from "react-router-dom";
import HomeComponent from './components/home-component';
import NavComponent from './components/nav-component';
import RegisterComponent from './components/register-component'; 
import LoginComponent from './components/login-component';
import ProfileComponent from './components/profile-component';
import CourseComponent from './components/course-component';
import AuthService from './services/auth.service';
import PostCourseComponent from './components/postCourse-component';
import EnrollComponent from './components/enroll-component';

const App = () => {
  let [currentUser,setCurrentUser] = useState(AuthService.getCurrentUser()); // The initial value is null because nobody is my current user first
    

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route path='/' exact>
          <HomeComponent />
        </Route>

        <Route path='/register' exact>
          <RegisterComponent />
        </Route>

        <Route path='/login' exact>
          <LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>

        <Route path='/profile' exact>
          <ProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>

        <Route path='/course' exact>
          <CourseComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>

        <Route path='/postCourse' exact>
          <PostCourseComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>

        <Route path='/enroll' exact>
          <EnrollComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App

