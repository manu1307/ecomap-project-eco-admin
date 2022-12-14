import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { idState, signUpSelector } from "../states/SignUp/signUpState";
import GenderInput from "./UI/Input/GenderInput";
import NormalInput from "./UI/Input/NormalInput";
import NumberInput from "./UI/Input/NumberInput";
import { useRouter } from "next/router";
import axios from "axios";

const AuthButton = styled.button`
	border: 1px solid #00aea4;
	width: 150px;
	padding: 10px 20px;
	margin-left: 40px;
	border-radius: 10px;
	color: #00aea4;
	font-weight: bold;
	&:hover {
		transition: all 0.2s ease-in-out;
		background-color: #00aea4;
		color: white;
	}
`;

const SubmitButton = styled.button`
	border: 1px solid #00aea4;
	width: 200px;
	padding: 10px 20px;
	border-radius: 10px;
	color: #00aea4;
	font-weight: bold;
	font-size: 20px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background-color: #00aea4;
		color: white;
	}
`;
const FormItemLayout = (props) => {
	const { label, input, button } = props;
	return (
		<div className='w-full flex items-center' style={{ marginTop: "8px" }}>
			<div id='label' style={{ width: "16%" }}>
				{label}
				<sup style={{ color: "red" }}>*</sup>
			</div>
			{input}
			{button && button}
		</div>
	);
};

export default function SignUpForm() {
	const router = useRouter();

	const SignUpData = useRecoilValue(signUpSelector);
	const [idInput, setIdInput] = useRecoilState(idState);
	const {
		id,
		password,
		passwordConfirm,
		phoneNumber,
		name,
		businessNumber,
		birthday,
		gender,
	} = SignUpData;

	const PhoneAuth = (event) => {
		event.preventDefault();
		console.log("phone auth start");
	};

	const goHome = () => {
		router.push("localhost:3000/");
	};

	const signUpPost = async (event) => {
		event.preventDefault();
		console.log(
			typeof id,
			typeof password,
			typeof passwordConfirm,
			typeof phoneNumber,
			typeof businessNumber,
			typeof birthday,
			typeof gender,
			typeof id,
			password,
			passwordConfirm,
			phoneNumber,
			name,
			businessNumber,
			birthday,
			gender
		);
		axios({
			method: "post",
			url: "http://43.200.176.153:8080/api/v1/members/signup",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				loginId: id,
				password: password,
				confirmPassword: passwordConfirm,
				name: name,
				businessNumber: phoneNumber,
				phoneNumber: businessNumber,
				birthday: birthday,
				gender: gender,
			}),
		}).then((response) => console.log(response));
		// const response = await fetch(
		//   "http://43.200.176.153:8080/api/v1/members/signup",
		//   {
		//     method: "POST",
		//     headers: {
		//       "Content-Type": "application/json",
		//     },
		//     body: JSON.stringify({
		//       loginId: id,
		//       password: password,
		//       confirmPassword: passwordConfirm,
		//       businessNumber: phoneNumber,
		//       phoneNumber: businessNumber,
		//       birthday: birthday,
		//       gender: gender,
		//     }),
		//   }
		// );
		// const statusCode = response.status;

		// console.log(statusCode);
	};

	const doubleCheckId = async () => {
		console.log(id);
		const response = await fetch(
			`http://43.200.176.153:8080/api/v1/members/check?loginId=${id}`
		);
		console.log(response);

		// const fetchData = await response.json();
		// if (!fetchData.check) {
		//   alert("????????? ???????????? ????????????.");
		//   setIdInput(idInput);
		// }
	};

	return (
		<>
			<div className='font-bold text-3xl text-center mb-10 max-w-screen-xl'>
				????????????
			</div>
			<form
				className='w-full'
				onSubmit={
					() => {
						return false;
					}
					// signUpPost
				}>
				<FormItemLayout
					label='?????????'
					input={
						<NormalInput
							placeholder='???????????? ???????????????'
							type='text'
							onChange={(event) => {
								console.log(event.target.value);
							}}
							name='id'
						/>
					}
					button={
						<AuthButton
							onClick={(event) => {
								event.preventDefault();
								doubleCheckId();
							}}>
							????????????
						</AuthButton>
					}></FormItemLayout>
				<FormItemLayout
					label='????????????'
					input={
						<NormalInput
							placeholder='??????????????? ???????????????'
							type='password'
							name='password'
						/>
					}></FormItemLayout>
				<FormItemLayout
					label='???????????? ??????'
					input={
						<NormalInput
							placeholder='??????????????? ?????? ??? ???????????????'
							type='password'
							name='passwordConfirm'
						/>
					}></FormItemLayout>

				<FormItemLayout
					label='??????'
					input={
						<NormalInput
							placeholder='????????? ??????????????????'
							type='text'
							name='name'
						/>
					}></FormItemLayout>
				<FormItemLayout
					label='????????????'
					input={
						<NormalInput
							placeholder='????????? ??????????????????'
							type='tel'
							name='phoneNumber'
						/>
					}
					button={
						<AuthButton onClick={PhoneAuth}>????????????</AuthButton>
					}></FormItemLayout>
				<FormItemLayout
					label='???????????????'
					input={
						<NormalInput
							placeholder='????????? ??????????????????'
							type='tel'
							name='businessNumber'
						/>
					}
					button={
						<AuthButton onClick={PhoneAuth}>????????????</AuthButton>
					}></FormItemLayout>
				<FormItemLayout
					label='????????????'
					input={<NormalInput type='date' name='birthday' />}></FormItemLayout>
				<FormItemLayout label='??????' input={<GenderInput />}></FormItemLayout>

				{/* <div>???????????? ?????? ?????? ???</div> */}
				<div className='w-full text-center mt-10'>
					<SubmitButton onClick={goHome}>??????</SubmitButton>
					<SubmitButton onClick={signUpPost}>????????????</SubmitButton>
				</div>
			</form>
		</>
	);
}
