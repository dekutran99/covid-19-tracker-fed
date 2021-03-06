import React from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

export default function RegisterModal(props) {

	const [user, setUser] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');

	async function register(evt) {

		// let url = "http://127.0.0.1:8000/"
		let url = "https://apic19gt.tranquanghuy.me/"
		let path = "auth/register"

		let myHeaders = new Headers();

		let raw = {
			username: user,
			email: email,
			password: pass
		}

		let body = JSON.stringify(raw)

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: body,
			redirect: 'follow',
			credentials: 'include'
		};

		// indicate where there is error in request
		let error;

		await fetch(url + path, requestOptions)
			.then(response => {
				if (!response.ok) {
					error = true;
				} else {
					error = false;
				}
				return response.json();
			})
			.then(data => {
				if (error === false) {
					console.log('Sign up successful')
				} else if (error === true) {
					console.log('Sign up failed');
					let msg = '';
					for (let key in data) {
						msg += key + ': ' + data[key] + '\n'
					}
					alert(msg);
				}
			})
			.catch(
				error => console.log('error', error)
			);

		props.onHide();
		window.location.reload();
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter') {
			register();
		}
	}

	return (
		<Modal
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<strong>Create an account</strong>
			</Modal.Header>
			<Modal.Body>
				<Form role="form">
					<Form.Group>
						<InputGroup className="input-group-alternative mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="fa" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Username"
								type="text"
								onChange={e => setUser(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="input-group-alternative mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="fa" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Email"
								type="email"
								onChange={e => setEmail(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="input-group-alternative">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="fa" />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								placeholder="Password"
								type="password"
								autoComplete="off"
								onChange={e => setPass(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</InputGroup>
					</Form.Group>
					<Row className="my-1">
						<Col xs="12">
							<div className="custom-control custom-control-alternative custom-checkbox">
								<input
									className="custom-control-input"
									id="customCheckRegister"
									type="checkbox"
								/>
								<label
									className="custom-control-label"
									htmlFor="customCheckRegister"
								>
									<span>
										I agree with the{" "}
										<a
											href="www.google.com"
										>
											Privacy Policy
                                  		</a>
									</span>
								</label>
							</div>
						</Col>
					</Row>
					<div className="text-center">
						<Button
							className="mt-4 mb-0"
							variant="primary"
							type="button"
							onClick={register}
						>
							Sign up
                        </Button>
					</div>
				</Form>
			</Modal.Body>

		</Modal>
	);
}