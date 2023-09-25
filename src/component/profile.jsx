import React from 'react';
import { useState ,useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import auth from '../sevices/authService';

function Profile(props) {
const [user,setUser]=useState({type:""});

useEffect(()=>{
    async function findUser() {
        const university=await auth.getUniversities();
        const porfessor=await auth.getPorfessors();
        const student=await auth.getStudents();
        if(university.find(uni=>uni.email===auth.getCurrentUser())){
            setUser(university.find(uni=>uni.email===auth.getCurrentUser()))
        }
        else if(porfessor.find(por=>por.email===auth.getCurrentUser())){
            setUser(porfessor.find(por=>por.email===auth.getCurrentUser()))
        }
        else if(student.find(stu=>stu.email===auth.getCurrentUser())){
            setUser(student.find(stu=>stu.email===auth.getCurrentUser()))
        }
      }
  
      findUser();
},[])


    if (!auth.getCurrentUser()) return <Navigate to="/login" />;
    return (
        <div>
            {user.type==="student" && <Navigate to="/studentProfile" />}
            {user.type==="porfessor" && <Navigate to="/porfessorProfile" />}
            {user.type==="university" && <Navigate to="/universityProfile" />}
        </div>
    );
}

export default Profile;