import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {

  state = {
    persons: []
  }

  componentDidMount() {
    this.interval = setInterval(() => {
    axios.get(`http://localhost:9000/api/v1/message/channel/${this.props.channel}`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })}, 5000);
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.firstname+": "}{person.message}</li>)}
      </ul>
    )
  }
}

// componentDidMount() {
//   this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
// }
