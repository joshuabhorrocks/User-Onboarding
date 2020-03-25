import React, {useState}from 'react';
import Form from "./Form";
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    password: "",
})
const onInputChange = event => {
  const iChange = event.target.name;
  const newInputVal = event.target.value;

  setFormVal({
    ...formVal,
    [iChange]: newInputVal, 
  })
}
const onFormSubmit = event => {
  event.preventDefault();
  const newUsers = {
      name: formVal.name,
      email: formVal.email,
      password: formVal.password,
  }
  setUsers([...users, newUsers])
}
  return (
    <div className="App">
      <header className="App-header">
        <Form 
         onInputChange = {onInputChange}
         formVal = {formVal}
         onFormSubmit={onFormSubmit}
         />
        <h3>List of Profiles: </h3>
        {
          users.map(user => <div key={user.id}>{user.name} {user.email} {user.password}</div>)
        }
      </header>
    </div>
  );
}

export default App;
