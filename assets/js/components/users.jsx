import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';


function User(params) {
  function updateUser(ev){
    console.log("Inside update");
    api.fetchUserUpdateData();
  }
  return<Card>
    <CardBody><div> <p>User Name: {params.user.name} <br/> 
    <Link to={"/users/edit/" + params.user.id} onClick={updateUser}>Update Profile</Link>

    </p></div>
  </CardBody>
</Card>;

  function deleteuser(ev) {
   console.log("Inside Delete",params.user.id);
   api.delete_user(params.user.id);
  }
}



export default function Users(params) {

  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    { users }
  </div>;
}
