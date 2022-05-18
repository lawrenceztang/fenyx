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
	const container = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%"
	}

	const header = {
		width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

	}

	const [search_input, setInput] = useState("");
	const [search_result, setResult] = useState(null);

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

	return (<div style={container}>
				{!search_result && 
				<div id="title" style={header}>
					<h1>Landing Page</h1>
				</div>
			  }
			  {search_result && 
			  <div id="filler" style={{height: "5%"}}>
			  </div>
			  }
				<div class="input-group" style={{justifyContent: "center"}}>
					<div class="form-outline" style={{width: "50%"}}>
						<input placeholder="Search Class" id="searchForm" class="form-control"
						 value={search_input}
						 onChange={handleSearchChange}
						/>
					</div>
						<button type="submit" onClick={handleSubmit}>Search </button>
				</div>
				{search_result && 
				<div style={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center"}}>
							{search_result.map(x => 
								<div key={x.id}><Link to={"/class/" + x.id}> Name: {x.name}, Professor {x.professor} </Link></div>
								)}
				</div>
			 }
		   </div>);
};

export default Home;