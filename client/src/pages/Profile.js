import { useState, useEffect  } from 'react';
import {useParams} from "react-router-dom";
import { Grid } from 'gridjs-react';


const Profile = () => {
	let {id} = useParams();
	let class_info;
	let users;
	const [info, setProfileInfo] = useState(null);

	useEffect(() => {
		fetch('/profile', {
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
    console.log(info)
    const classes = [];
    for(var i = 0; i < info.classes.length; i++){
        classes[i] = [info.classes[i]];
    }
    console.log(classes);
    return (
    <div>
        <button onClick={console.log('hello')} class={"py-2 mb-4 px-4 border rounded-md text-white bg-blue-600"}>
            Add Class 
        </button>
        <Grid
          data={
              classes
          }
          columns={['Class']}
          search={true}
          pagination={{
            enabled: true,
            limit: 10,
          }}
        />
    </div>
    );
	}
}

export default Profile;
