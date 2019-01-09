import React, { Component } from 'react';
import './App.css';
import Player from './components/players'
import cr7 from '../src/img/ronaldo.jpg'
import lm10 from '../src/img/lm10.jpg'
import pogba from '../src/img/paul.jpg'
import axios from 'axios'
//import Scaledrone from 'scaledrone-node-push'

const playerData = [
  {
    name: 'Ronaldo',
    goals: 30,
    votes: 0,
    id: 1,
    image: cr7
  },
  {
    name: 'Messi',
    goals: 8,
    votes: 0,
    id: 2,
    image: lm10
  },
  {
    name: 'Pogba',
    goals: 26,
    votes: 0,
    id: 3,
    image: pogba
  }
];

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

class App extends Component {

  constructor(){
    super()
    this.drone = new window.Scaledrone("vIh5lXOnewFxNIeC", {
      data: this.state.users
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      console.log("Connected to room")
      const user = {...this.state.users};
      user.id = this.drone.clientId;
      this.setState({user});
      console.log(user)
    });
      const room = this.drone.subscribe("votes");
      room.on('data', data => console.log('Received data:', data));
  }

  state = {
    playerDetails: [],
    users:{
      username: randomName()
    },
    votes: ''

  }

  componentDidMount() {
    this.setState({ playerDetails: playerData })

  }

  handleEvent = playerId => {
    //console.log(playerId)

    const castVote = {
      votingFor: playerId,
    }

    axios.post(`http://localhost:4000/vote`, {castVote}).then(
      res =>{
        //console.log(res.data[0])
        const message = res.data[0];
        this.drone.publish({
          room: "votes",
          message
        });
       
      }
    )

    this.state.playerDetails.map(player => {
      if (player.name === playerId) {
        return Object.assign({}, player, {
          votes: player.votes++
        });
      } else {
        return player;
      }
    });
    //console.log(this.state.playerDetails)
    //console.log(updatedList)
    this.setState({
      playerDetails: this.state.playerDetails
    });
    }

  render() {
    return playerData.map(player =>

      <Player
        key={player.id}
        name={player.name}
        goals={player.goals}
        image={player.image}
        votes={player.votes}
        id={player.id}
        onVoteCasted={this.handleEvent}
      />);
  }
}

export default App;
