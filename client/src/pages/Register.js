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
          <input style={{left: "50%", float: "center"}} type="text" name="name" value={inputs.name} placeholder="Name" required onChange={handleChange}/>
          <br></br>
          <input style={{left: "50%", float: "center"}} type="text" name="year" value={inputs.graduation_year} placeholder="Graduation Year" required onChange={handleChange}/>
          <br></br>
          <input style={{left: "50%", float: "center"}} type="text" name="major" value={inputs.major} placeholder="Major" onChange={handleChange}/>
          <br></br>
          <input style={{left: "50%", float: "center"}} type="text" name="email" value={inputs.email} placeholder="Email" required onChange={handleChange}/>
          <br></br>
          <input style={{left: "50%", float: "center"}} type="text" name="password" value={inputs.pass} placeholder="Password" required onChange={handleChange}/>
          <br></br>
          <input style={{left: "50%", float: "center"}} type="submit" value="Submit" />
        </form>
    ); 
}
export default Register
