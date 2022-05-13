import { useState, useEffect  } from 'react';
import {useParams} from "react-router-dom";

const Profile = () => {
	let {id} = useParams();
	let class_info;
	let users;
	const [info, setProfileInfo] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/profile', {
			   method: 'POST',
			   headers: {
			     'Content-Type': 'application/json'
			   },body: JSON.stringify({id})
 			}).then((res) => res.json())
      		  .then((data) => setProfileInfo(data));
	},[]);

	if(info == null){
		//console.log(class_info)
		return <h1>Still Loading</h1>;
	}
	else{
		console.log(info);
		return (<div>
				<h1> Profile of {info.name}</h1>
				<h2> Contact information: {info.email}</h2>
				</div>
				);
	}
}

export default Profile;