import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router";
import CourseService from "../services/course.service";


const CourseComponent = (props) => {
    let {currentUser,setCurrentUser} = props;
    const history = useHistory();
    const handleTakeToLogin = () =>{
        history.push("/login");
    }

    let [courseData,setCourseData] = useState(null);
    useEffect(() =>{
        console.log("Using effect");
        let _id = "";
        if(currentUser){
            _id = currentUser.user._id;
        }

        if(currentUser.user.role == "instructor"){
            // get course from backend
            CourseService.get(_id)
            .then(data =>{
                console.log(data);
                setCourseData(data); // set course data to state
            })
            .catch(err =>{
                console.log(err);
            })
        }
        else if(currentUser.user.role == "student"){
            CourseService.getEnrolledCourses(_id)
            .then(data =>{
                console.log(data);
                setCourseData(data); // set course data to state
            })
            .catch(err =>{
                console.log(err);
            })
        }
        
    },[]);

  return (
    <div style={{padding:"3rem"}}>
        {
            // If user dosen't login
            !currentUser &&
            <div>
                <p>You must login before seeing your course</p>
                <button onClick={handleTakeToLogin} className="btn btn-primary btn-lg">
                    Take me to login page
                </button>
            </div>
        }
        {
            // If user is instructor
            currentUser && currentUser.user.role == "instructor" &&
            <div>
                <h1>Welcpme to instructor's Course page.</h1>
            </div>
        }
        
        {
            // If user is student
            currentUser && currentUser.user.role == "student" &&
            <div>
                <h1>Welcpme to student's Course page.</h1>
            </div>
        }

        {
            currentUser && courseData && courseData.data.length !=0 && // courseData and courseData.data are both array 
            <div>
                <p>Here 's the data we got back from server</p>
                {
                    courseData.data.map(course =>{
                        return  <div key={course._id} className="card" style={{width:"18rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{course.title}</h5>
                                        <p className="card-text">{course.description}</p>
                                        <p className="card-text">Student count: {course.students.length}</p>
                                        <button className="btn btn-primary">{course.price}</button>
                                    </div>
                                </div>
                    })
                }
            </div>
        }
    </div>
  )
}

export default CourseComponent