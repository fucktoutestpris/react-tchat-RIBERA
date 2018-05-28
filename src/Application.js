import React, { Component } from 'react';
import logo from './logo.svg';
import PersonList from './PersonList.js'
import ChannelList from './ChannelList.js'
import './Application.css';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {
	create_user,
	create_message
} from "./services/chat/actions";

class Application extends Component {

	state = {
		firstname: "",
		lastname: "",
		email: "",
		isAdmin: false,
		message:"",
		channel: Math.floor(Math.random() * Math.floor(100)),
		submitted: false,
		channelRecu:""
		
	}

	myCallback = (dataFromChild) => {
		console.log(dataFromChild)
		
		console.log("on est la" + dataFromChild)
		var toz = dataFromChild.toString();
		console.log(toz)
		this.setState({ channel: toz});
		console.log(this.state.channel)
    }

	// usernameSubmitHandler(event) {
	// 	//event.preventDefault();
	// 	if(this.state.firstname == 'admin' && this.state.lastname == 'admin'){
	// 	  this.setState({isAdmin:true});
	// 	  console.log(this.state.isAdmin);
	// 	  this.setState({ submitted: true});
	// 	}
	// 	else{
	// 	this.setState({ submitted: true,});
	// 	}
	// }

	render() {
		return (
			<div className="App">

				{
					this.state.submitted == false ?
						<div>
							firstname : <input type="text" onChange={(e) => { this.setState({ firstname: e.target.value }) }} /><br></br>
							lastname : <input type="text" onChange={(e) => { this.setState({ lastname: e.target.value }) }} /><br></br>
							email : <input type="text" onChange={(e) => { this.setState({ email: e.target.value }) }} /><br></br>
						
							<button onClick={() => {
								this.props.create_user(this.state.firstname, this.state.lastname, this.state.email,this.state.channel.toString())
								//console.log(this.props.chat.user.firstname)
								this.setState({ submitted: true,});
								console.log(this.props.chat.user.firstname)
								
							}} >validate</button>
						</div>
						
					:
						<div>
							{this.state.firstname == 'admin' && this.state.lastname == 'admin'?
							<div>
							<div>
								Bonjour Admin 
								<br/><div className="Channel">
									Channel Admin {this.state.channel}
								</div>
								<div className="Message">
									Message
								</div>
							</div>
							<div>
								<div className="ChannelArea">

								<ChannelList callbackFromParent={this.myCallback}/>
									
								</div>
								<div className="MessageArea">
								
								<PersonList channel={this.state.channel}/>
								
								</div>
								<input type="text" onChange={(e) => {this.setState({ message: e.target.value}) }}/>
									<button onClick={() =>{
										this.props.create_message(this.state.message, this.state.firstname, this.state.channel.toString())
										console.log(this.props.chat.user.firstname)
										
									}} >

									Envoyer
									</button>
							</div>
							</div>
							:
							<div>
								{console.log(this.props.chat.user.firstname)}
								{console.log(this.props.chat.user.lastname)}
								{console.log(this.state.firstname)}
								
								Bonjour FDP
								<br/><div className="Channel">
									Channel Lambda
								</div>
								<div className="Message">
									Message
								</div>
								<div>
								<div className="ChannelArea">

								{/* <ChannelList callbackFromParent={this.myCallback}/> */}
									
								</div>
								<div className="MessageArea">
								
								<PersonList channel={this.state.channel}/>
								
								</div>
								<input type="text" onChange={(e) => {this.setState({ message: e.target.value}) }}/>
									<button onClick={() =>{
										this.props.create_message(this.state.message, this.state.firstname, this.state.channel.toString())
										console.log(this.props.chat.user.firstname)
										
									}} >

									Envoyer
									</button>
							</div>
							</div>
							
							
							}
						</div>
				}

			</div>
		);
	}

}

const mapStateToProps = (state) => ({
	chat: state.chat,
});

const mapActionsToProps = (dispatch) => ({
	create_user: bindActionCreators(create_user, dispatch),
	create_message: bindActionCreators(create_message, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)( Application );


