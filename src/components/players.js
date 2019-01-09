import React, { Component } from 'react';

class Player extends Component {

    handleClick = () => {
        this.props.onVoteCasted(this.props.name)

    }

    render() {
        return (
            <div className="App">
                <img class="rounded-circle" alt="players" src={this.props.image} />
                <div class="mt-2">
                    <h5 class="card-title">{this.props.name}</h5>
                </div>
                <h5>Goals: {this.props.goals} </h5>
                <div>
                    <h2> Votes: {this.props.votes} </h2>
                </div>
                <div class="mb-3">
                    <button type="button" onClick={this.handleClick} class="btn btn-primary btn-lg">Vote For {this.props.name}</button>
                </div>
            </div>

        );
    }
}

export default Player;
