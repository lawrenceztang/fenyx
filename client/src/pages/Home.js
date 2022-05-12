import { useState } from 'react';
const Home = () =>{
	const [search_input, setInput] = useState();

	const handleSearchChange = (event) => {
		console.log(event.target.value);
		setInput(event.target.value)
	}

	const handleSubmit = (event) => {
		console.log("Searching " + search_input);
		event.preventDefault();
	}

	return (<div>
				<h1>Landing Page</h1>
				<form>
					<input
					 value={search_input}
					 onChange={handleSearchChange}
					/>
					<button type="submit">Search </button>
				</form>
		   </div>);
};

export default Home;