import * as types from "./constants";
import axios from "axios";


export function create_message(message,firstname,channel) {
	return (dispatch, state) => {
		axios.post(`http://localhost:9000/api/v1/message`,
		{
			message: message,
			firstname: firstname,
			channel: channel,	
		})
		.then((result) => {
			console.log("message -", result);

			dispatch({
				type: types.CREATE_MESSAGE,
				payload: result.data
			})
		})
	}
}

export function create_user(firstname,lastname,email,channel) {
	return (dispatch, state) => {
		axios.post('http://localhost:9000/api/v1/user',
		{ 
			firstname: firstname,
			lastname: lastname, 
			email: email,
			channel: channel,
			
		})
		.then((result) => {
			dispatch({
				type: types.CREATE_USER,
				payload: result.data
			});
		})
		.catch((e) => { console.log('create_user - ', e) })
	};
}; 

// export function get_channel() {
// 	return (dispatch, state) => {
// 		axios.get('http://localhost:9000/message/channel?=33')
// 		.then((result) => {
// 			console.log(result)
// 		})
// 		.catch((e) => { console.log('get channel - ', e) })
// 	};
// }; 
