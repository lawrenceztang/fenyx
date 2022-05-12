import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleEmailChange = (event) => {
		console.log(event.target.value);
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event) => {
		console.log(event.target.value);
		setPassword(event.target.value)
	}

	const handleSubmit = (event) => {
		console.log("Logging in with " + email + " and password" + password);
		event.preventDefault();
	}
	return(
		<div>
			<h1>Login Page</h1>
			<form>
				<div>
				<label>Email</label>
				<input
					 value={email}
					 onChange={handleEmailChange}
					/>
				</div>
				<div>
				<label>Password</label>
				<input
					 value={password}
					 onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">Search </button>
			</form>
		</div>
		)
}

export default Login;