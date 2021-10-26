const express = require('express');
const usersBL = require('../models/usersBl')
const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
      let data = await usersBL.getAllUsers()
      return resp.json(data)
    })


router.route('/:id')
.get(async (req,resp) =>
{
      let id = req.params.id
      let data = await usersBL.getAllUsers()
      let users = [...data]
      let user = users.find(x=>x.id==id)
      if(user)
      {
      return resp.json(user)
      }
      else return resp.json('This user doesnt exist')
})

 
router.route('/')
.post(async(req,resp)=>
{
  let users = await usersBL.getAllUsers()
  let Id = 0;
  for (let index = 0; index < users.length; index++) {
    if(users[index].id > Id){
      Id = users[index].id
    }
  }
  let newUser = {id: Id + 1, firstName : req.body.firstName, lastName : req.body.lastName,
                 age : req.body.age, phone : req.body.phone}
  let newUsers = [...users,newUser]
  let data = await usersBL.addUser(newUsers)
  return resp.json(data)
})

router.route('/:id')
.put(async(req,resp)=>
{
  let data = await usersBL.getAllUsers()
  let users = [...data]
  let Id = req.params.id
  let index = users.findIndex(x=>x.id==Id)
  if(index!=-1)
  {
  users.splice(index,1)
  let updateUser = {id : Id, firstName : req.body.firstName, lastName : req.body.lastName, 
                    age : req.body.age, phone : req.body.phone}
  users.splice(index,0,updateUser)
  let status = await usersBL.addUser(users)
  return resp.json('Updated')
  }
  else {return resp.json('This user does not exist')}
})

router.route('/:id')
.delete(async(req,resp)=>
{
  let data = await usersBL.getAllUsers()
  let users = [...data]
  let Id = req.params.id
  let index = users.findIndex(x=>x.id==Id)
  if(index!=-1)
  {
  users.splice(index,1)
  let status = await usersBL.addUser(users)
  return resp.json('Deleted')
  }
  else {return resp.json('This user does not exist')}
})


module.exports = router;
