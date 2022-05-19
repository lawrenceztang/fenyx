const getUsers = () => {
	return(
			  [
				  {
				    id: 1,
				    name: "William Wang",
				    email: "william@uchicago.edu",
				    password: "123456",
				    classes: ["CMSC 15200", "CMSC 15400", "CMSC 22000","CMSC 30000"]
				  },
				  {
				    id: 2,
				    name: "Oliver",
				    email: "william@uchicago.edu",
				    password: "123456",
				    classes: ["CMSC 15200", "CMSC 15400", "CMSC 22000","CMSC 30000"]
				  }
			]
		)
}

module.exports.getUsers = getUsers