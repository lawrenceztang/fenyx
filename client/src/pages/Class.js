import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import useScript from '../hooks/useScript';

export const Chart = (gradeData) => {
	const chartData = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
			// data: gradeData,
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
	return (
		<div style={{marginLeft: "50%"}}>
			<h3 style={{textAlign: "center"}}>Grade Distribution</h3>
			<Bar data={chartData} redraw={true} options={{
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {  // not 'yAxes: [{' anymore (not an array anymore)
					  ticks: {
						color: "black",
						font: {
						  size: 15
						},
					  }
					},
					x: {  // not 'xAxes: [{' anymore (not an array anymore)
					  ticks: {
						color: "black",
						font: {
						  size: 30
						},
					  }
					}	
				}			
			}}/>
		</div>
	);
}

export const PeopleTable = props => {
	return(
		<table style={{ width: "50%", float: "left"}}>
			<tr>
				<th>Name</th>
				<th>Year</th>
				<th>Etc.</th>
			</tr>
			{props.people.map(x =>
				<tr>
					<td>
						<Link to={"/profile/" + x.id}>{x.name}</Link>	 
					</td>
					<td>
						{x.year}
					</td>
				</tr>			
			)}
		</table>
	);
  }


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
		console.log(info.users);
		return (
			<div>
				<h1> {info.class_info.title} </h1>
				<h3> {info.class_info.fullNameInstructors} </h3>
				<div>{info.class_info.descrip}</div>
				<div>
					<h2>People</h2>
					<PeopleTable people={users}/>
					<Chart gradeData={class_info.grades}/>
				</div>
			</div>
		);
	}
};

export default ClassPage;