
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";

function AddUserComp(props) {

    const [firstName,setfirstName] =  useState()
    const [lastName,setLastName] =  useState()
    const [age,setAge] =  useState()
    const [phone,setPhone] =  useState()
    const [ages,setAges] =useState([])
    const [id,setId] = useState(parseInt(props.match.params.id) + 1)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(()=>{
      chooseAges()
    },[])

    const chooseAges=()=>
    {
      let  agesList = [...Array(121).keys()]
      setAges(agesList) 
    }

    const addUser=async(e)=>
    {       
        let obj ={id: id, firstName: firstName, lastName: lastName, age : age, phone: phone}
        let status = await axios.post("http://localhost:8000/api/users",obj)
        let msg = status.data

        let newId = id + 1

        setId(newId)

        if(msg=='Created')
        {    
          alert('A new user has created')  
          props.history.push("/")
        }
         
        else 
        {
          alert('An error has occured, please retry later')
        }
        
    }

    let items = ages.map((item,index)=>{
      return <option key ={index} value={item}>{item}</option> 
    })

  return (

    <div>

        <h2 className="titleColor">Add User</h2>

       <form onSubmit={handleSubmit(addUser)}>

       <input type="text" {...register("firstName", {onChange:(e)=>{setfirstName(e.target.value)}, required: true , pattern: /^[A-Za-z]+$/i})} placeholder="firstName"/> <br/>
        {errors.firstName && <span className="error">Invalid first name</span>} <br/>

        <input type="text" {...register("lastName", {onChange:(e)=>{setLastName(e.target.value)}, required: true , pattern: /^[A-Za-z]+$/i})} placeholder="lastName"/> <br/>
        {errors.lastName && <span className="error">Invalid last name</span>} <br/>
        
        <select {...register("age", {onChange:(e)=>{setAge(Number(e.target.value))},required: true, type:Number})}id="age" value={age}> 
        <option value="" disabled selected>Age</option>
            {items}
        </select> <br/>
        {errors.age && <span className="error">Invalid age</span>} <br/>
        

        <input {...register("phoneNumber", {onChange:(e)=>{setPhone(e.target.value)},required: true , pattern: /^\d+$/, minLength:10, maxLength:10})} type="text" placeholder="Phone"/> <br/>
        {errors.phoneNumber && <span className="error">Invalid Phone </span>} <br/>

        <div className="wrapper center">
    
        <input className="button left" type="submit" value="Add"/>

        <div className="button right" onClick={()=>{props.history.push('/')}}>Back </div>

         </div>

      </form>

    </div>
  );
}

export default AddUserComp;