import axios from "axios";
const API_URL = "https://hankmern.herokuapp.com/api/courses";

class CourseService{

    #getJwt(){
        let token = "";

        // get JWT from localStorage
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }
        return token;
    };

    // Add new course
    post(title,description,price){
        let token = this.#getJwt();
        return axios.post( // post to api/courses route
                            API_URL,
                            {title,description,price}, // req.body

                            // must be set JWT because we set JWT and api/courses together on backend
                            {
                                headers:{Authorization: token} // assign JWT to header
                            }
                         );
    }

    get(_id){
        let token = this.#getJwt();

        return axios.get(
                            API_URL + "/instructor/" + _id,

                            // must be set JWT because we set JWT and api/courses together on backend
                            {       
                                headers:{Authorization: token} // assign JWT to header
                            }
                        )
    }

    getEnrolledCourses(_id){
        let token = this.#getJwt();
        return axios.get(
                            API_URL + "/student/" + _id,
                            {       
                                headers:{Authorization: token} // assign JWT to header
                            }
                        )
    }

    getCourseByName(name){
        let token = this.#getJwt();
        return axios.get(
            API_URL + "/findByName/" + name,
            {       
                headers:{Authorization: token} // assign JWT to header
            }
        )
    }

    enroll(course_id,user_id){
        let token = this.#getJwt();
        return axios.post(
            API_URL + "/enroll/" + course_id,
            {user_id}, // req.body
            {       
                headers:{Authorization: token} 
            }
        )
    }

}

export default new CourseService();