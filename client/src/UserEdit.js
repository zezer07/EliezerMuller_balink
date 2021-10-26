import React from 'react'
import './App.css';
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";

function UserEditComp(props) {
    
const [id] = useState(props.match.params.id)
const [firstName,setFirstName] = useState()
const [age,setAge] = useState(0)
const [lastName,setLastName] = useState()
const [phone,setPhone] = useState()
const [ages,setAges] =useState([])
const { register, handleSubmit, watch, formState: { errors } } = useForm();

useEffect(()=>{

    async function loadData()
    {
    let status = await axios.get("http://localhost:8000/api/users/" + props.match.params.id)
    let user = status.data
    let fullName = user.firstName + " " + user.lastName
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setAge(user.age)
    setPhone(user.phone.toString())
    chooseAges()
    } loadData() 

},[])

const chooseAges=()=>
{
  let  agesList = [...Array(121).keys()]
  agesList.toString()
  setAges(agesList)
  
}

const update=async()=>
{
    let ageNumberString = age
    let ageNumberParse = parseInt(ageNumberString)

    let obj = {id : id, firstName : firstName, lastName : lastName, 
               age : ageNumberParse, phone : phone}

    let status = await axios.put("http://localhost:8000/api/users/" + id,obj)
    let msg = status.data  
    if(msg=='Updated')
    {
    alert('Update succefully')
    props.history.push("/")
    }
    else {alert('An error has occured')}
 
}

let items = ages.map((item,index)=>{
  return <option key ={index} value={item}>{item}</option> 
  })
  return (

    <div>
      
      <h2 className="titleColor">Edit User </h2>

      <form onSubmit={handleSubmit(update)}>

        <input type="text" {...register("firstName", {onChange:(e)=>{setFirstName(e.target.value)}, required: true , pattern: /^[A-Za-z]+$/i})} id="firstname" value = {""+firstName}/> <br/> 
        {errors.firstName && <span className="error">Invalid first name</span>} <br/>

        <input type="text" {...register("lastName", {onChange:(e)=>{setLastName(e.target.value)}, required: true , pattern: /^[A-Za-z]+$/i})} id ="lastname"  value = {""+lastName}/> <br/> 
        {errors.lastName && <span className="error">Invalid last name</span>} <br/>

   
         <select {...register("age", {onChange:(e)=>{setAge(e.target.value)},required: true, type:Number})} className="input" id="age">
          
          <option>{age}</option>
           {items}
           </select> <br/> 
           {errors.age && <span className="error">Invalid age</span>} <br/>
              
        <input {...register("phoneNumber", {onChange:(e)=>{setPhone((e.target.value))},required: true ,value:{} , pattern: /^\d+$/, minLength:10, maxLength:10})} type="text" id="phone" value= {phone}/> <br/> 
        {errors.phoneNumber && <span className="error">Invalid Phone </span>} <br/>


        <div className="wrapper center">
    
      <input className="button left" type="submit" value="Save"/>

    <div className="button right" onClick={()=>{props.history.push('/')}}>Back </div>

     </div>
      
      </form>

    </div>
  );
}

export default UserEditComp;