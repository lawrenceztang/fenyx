import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

async function lookUpClasses(params){
 return fetch('http://localhost:3001/class_search', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(params)
 })
   .then(data => data.json())
}

const Home = () =>{
	const [search_input, setInput] = useState("");
	const [search_result, setResult] = useState([]);

	const handleSubmit = async e => {
	    e.preventDefault();
	    const result = await lookUpClasses({
	      search_input
	    });
	    console.log(result.classes[0]);
	    setResult(result.classes);
	  };

	const handleSearchChange = (event) => {
		console.log(event.target.value);
		setInput(event.target.value);
	};



	// const handleSubmit = (event) => {
	// 	console.log("Searching " + search_input);
	// 	event.preventDefault();
	// }

	return (<div>
				<h1>Landing Page</h1>
				<form>
					<label> Class Lookup</label>
					<input
					 value={search_input}
					 onChange={handleSearchChange}
					/>
					<button type="submit" onClick={handleSubmit}>Search </button>
				</form>
				<div>
					<ul>
						{search_result.map(x => 
							<li key={x.id}><Link to="/"> Name: {x.name}, Professor {x.professor} </Link></li>
							)}
					</ul>
				</div>
		   </div>);
};

export default Home;