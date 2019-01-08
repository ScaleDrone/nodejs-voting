import React, { Component } from 'react';
import './App.css';
import Player from './components/players'
import cr7 from '../src/img/ronaldo.jpg'
import lm10 from '../src/img/lm10.jpg'
import pogba from '../src/img/paul.jpg'

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

class App extends Component {

  state = {
    playerDetails: [],
     
  }

  componentDidMount(){
    this.setState({playerDetails: playerData})
  }

  handleEvent = playerId => {
    console.log(playerId)

    // make Scaledrone request.




    this.state.playerDetails.map(player => {
      if (player.name === playerId) {
        return Object.assign({}, player, {
          votes: player.votes ++ 
        });
      } else {
        return player;
      }
    });
    console.log(this.state.playerDetails)
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
    votes ={player.votes}
    id = {player.id}
    onVoteCasted = {this.handleEvent} 
    />);
  }
}

export default App;
