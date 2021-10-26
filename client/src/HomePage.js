
import {useState,useEffect} from 'react'
import React from 'react'
import './Design.css'
import'./App.css';
import axios from 'axios'

function HomePageComp(props)
{

    const [users, setUsers]  = useState([])

    useEffect(async()=>
    {
        let status = await axios.get("http://localhost:8000/api/users")
        let allUsers = status.data
        setUsers(allUsers)

    },[])

    const editUser =(e,id)=>
    {
        users.map((item) => console.log('item.id' + item.id))
        if (e.target.cellIndex === undefined) {return;}
        else{
            props.history.push('/userEdit/' + id)
        }
    }

    const check=()=>
    {
        let lastId = 0;
        for(var i = 0; i < users.length ; i++){
            console.log('users[i].id' + users[i].id)
            if(users[i].id > lastId){
                lastId = users[i].id;
            }
        }
        
        props.history.push("/add/" + lastId)
    }

    const deleteUser=async(event, id)=>
    {
        event.preventDefault();
        let status = await axios.delete("http://localhost:8000/api/users/" + id)
        let data =status.data

        if(data=='Deleted')
        {
            alert('A user has deleted')
        }

        else{alert('An error that occured')}

        var newUsers = [];
        for(var i = 0; i < users.length; i++){
            
            if(users[i].id != id){
                newUsers.push(users[i]);
            }
        }
        
        setUsers(newUsers);
    }

    return(

       
   <div>

            <h2 className="titleColor">Home Page</h2>

            <div>

        <table className="center">
                <tbody>
            <tr>

             
             <th> ID</th>
             <th >FirstName</th> 
             <th >LastName</th> 
             <th >Age</th>
             <th >phone</th>
              <th></th>
            </tr>

        {

            users.map((item,index)=>
            {
             
            return  <tr key ={index} onClick={e=>{editUser(e,item.id)}}>
                                
                   <td >{item.id}</td>
                   <td >{item.firstName}</td>
                   <td >{item.lastName}</td>
                   <td >{item.age}</td>
                   <td >{item.phone}</td>
                   <td><div className="buttonRond buttonDelete" onClick={(e)=>deleteUser(e, item.id)}>-</div></td>
             </tr>
    
            })

        }
            </tbody>
            </table>

        </div>
          
          <br/><br/>


        <div className="floatUnderTable center">

            <div className="buttonRond" onClick={(e)=>check()}>+</div> 

        </div>

        </div>
    )
}

export default HomePageComp;