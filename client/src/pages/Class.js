import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";


const ClassPage = () => {
	let {id} = useParams();
	let class_info;
	let users;
	const [info, setClassInfo] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/class_display', {
			   method: 'POST',
			   headers: {
			     'Content-Type': 'application/json'
			   },body: JSON.stringify({id})
 			}).then((res) => res.json())
      		  .then((data) => setClassInfo(data));
	},[]);

	if(info == null || info.class_info == null){
		//console.log(class_info)
		return <h1>Still Loading</h1>;
	}
	else{
		console.log("Class Info: " + JSON.stringify(info.class_info) );
		class_info = info.class_info;
		users = info.users;
		return (<div>
					<h1> {info.class_info.title} </h1>
					<ul>
						{users.map(x =>
							<li key={x.id}><Link to={"/profile/" + x.id}> 
							{x.name}
							</Link> </li>)}
					</ul>
				</div>
				);
	}
};

export default ClassPage;