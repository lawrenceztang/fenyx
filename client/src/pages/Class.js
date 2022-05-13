import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';

async function retrieveClassInfo(params) {
 return fetch('http://localhost:3001/class_display', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(params)
 })
   .then(data => data.json())
}


//Implement loading indicator: 
//https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
const ClassPage = () => {
	let {id} = useParams();
	const [class_info, setClassInfo] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/class_display', {
			   method: 'POST',
			   headers: {
			     'Content-Type': 'application/json'
			   },body: JSON.stringify(id)
 			}).then(data => setClassInfo(data.json()))
	});

	if(class_info == null){
		return <h1>Still Loading</h1>;
	}
	else{
		return <h1> Found </h1>;
	}
};

export default ClassPage;