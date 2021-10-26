
import React from 'react'
import HomePageComp from'./HomePage'
import {Route,Switch,BrowserRouter} from 'react-router-dom'
import addUserComp from './AddUser'
import userEditComp from './UserEdit'

function HostPageComp()
{
    return(

        <div>

           <BrowserRouter>

        <Switch>

          <Route exact path = "/" component = {HomePageComp}/>
          <Route exact path = "/add/:id" component = {addUserComp}/>
          <Route exact path = "/userEdit/:id" component = {userEditComp}/>

        </Switch> 

        </BrowserRouter>

        </div>
    )
}

export default HostPageComp;