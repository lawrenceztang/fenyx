import { useState } from 'react';
import ReactDOM from 'react-dom/client';

async function registerUser(params){
 console.log(params)
 return fetch('/add_user', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(params)
 })
   .then(data => data.json())
}

const Register = () => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = async e => {
         e.preventDefault();
         const result = await registerUser({
             inputs
         });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={inputs.name} onChange={handleChange}/>
          </label>
          <br></br>
          <label>
            Email:
            <input type="text" name="email" value={inputs.email} onChange={handleChange}/>
          </label>
          <br></br>
          <label>
            Password:
            <input type="text" name="password" value={inputs.pass}  onChange={handleChange}/>
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
    ); 
}
export default Register
