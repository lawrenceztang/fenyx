import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";


async function lookUpClasses(params){
 console.log(params)
 return fetch('/class_search', {
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
        console.log(search_input);
	    const result = await lookUpClasses({
	      search_input
	    });
        console.log(result);
	    setResult(result.classes);
	  };

	const handleSearchChange = (event) => {
		setInput(event.target.value);
	};



	// const handleSubmit = (event) => {
	// 	console.log("Searching " + search_input);
	// 	event.preventDefault();
	// }
	if(search_result){
		console.log("Search result: " + search_result[0]);
	}
	return (<div style={container}>
				{!search_result && 
				<div id="title" style={header}>
					<h1>Fenyx</h1>
				</div>
			  }
			  {search_result && 
			  <div id="filler" style={{height: "5%", margin: "1%"}}>
			  </div>
			  }
				<div class="input-group" style={{justifyContent: "center"}}>
					<div class="form-outline" style={{width: "50%"}}>
						<input placeholder="Search Class" id="searchForm" class="form-control"
						 value={search_input}
						 onChange={handleSearchChange}
						/>
					</div>
						<button class="btn" style={{background: "deepskyblue"}}
						type="submit" onClick={handleSubmit}>Search </button>
				</div>
				{search_result && 
				<div style={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center",
										 justifyContent: "space-around"}}>
							{search_result.map(x => 
								<div key={x.id} style={{margin: "1%", minWidth: "75%"}}
										 class="container-md card">
									<Link to={"/class/" + x.id}> 
									{"CMSC " + x.class_num + " "+ x.class_title + " Section: " + x.section_id}</Link>
									<p>
									{"Instructors: " + x.instructors + ", Quarter: " + x.quarter}
									</p>
									{(x.cross_listings != 'None') && 
									<p> {"Cross Listed as: " + x.cross_listings}
									</p>
								   }
								</div>
								)}
				</div>
			 }
		   </div>);
};

export default Home;
