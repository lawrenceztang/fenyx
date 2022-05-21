import { useState, useEffect  } from 'react';
import {useParams} from "react-router-dom";
import { Grid } from 'gridjs-react';


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
    console.log(info)
    const classes = [];
    for(var i = 0; i < info.classes.length; i++){
        classes[i] = [info.classes[i]];
    }
    console.log(classes);
    return (
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
    );
	}
}

export default Profile;
