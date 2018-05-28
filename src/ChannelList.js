import React from 'react';

import axios from 'axios';

export default class ChannelList extends React.Component {

  state = {
    persons: [],
    channels: [],
    nouveau: true
  }

  getIndex(index){
    console.log(index)
    console.log(this.state.channels[index])
    var toz = this.state.channels[index]
    this.props.callbackFromParent(toz)
    
    //console.log(index)
  }

  componentDidMount() {
    console.log("ayooooooo")
    this.interval = setInterval(() => {
    axios.get(`http://localhost:9000/api/v1/message`)
      .then(res => {  
        const persons = res.data;
        this.setState({ persons });
        for(var i=0; i <= this.state.persons.length; i++){
            console.log("boucle 1")
            this.setState({ nouveau: true,});

            if(this.state.channels.length == 0){
                console.log("initialisation..")
                this.state.channels.push(persons[i].channel)
            }
            else{
                for(var j=0; j < this.state.channels.length; j++){
                    console.log("boucle 2")
                    if(persons[i].channel == this.state.channels[j]){
                        this.setState({ nouveau: false,});
                        console.log("identique")
                    }
                }
                console.log(this.state.nouveau)
                console.log("sorti boucle 2")
                if(this.state.nouveau == true){
                    this.state.channels.push(persons[i].channel)
                }
                console.log("preparation lancement boucle 1")
            }
            
            
        }
        console.log(this.state.channels)
      })}, 5000);
  }

  render() {
    return (
        
      <ul>
        { this.state.channels.map((channel,index) => 
        <button key={index}
        onClick={() =>{this.getIndex(index)}}>
        {channel}</button>)}
      </ul>
      
    )
  }
}
