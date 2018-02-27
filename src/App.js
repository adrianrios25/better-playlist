import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
}

let fakeServerData = {
  user: {
    name: 'Adrian',
    playLists: [
      {
        name: "Favorites",
        songs: [{name: "fav 1", duration: 312},
                {name: "fav 2", duration: 312},
                {name: "fav 3", duration: 312},
                {name: "fav 4", duration: 312}
              ]
      },
      {
        name: "Love Song",
        songs: [{name: "love 1", duration: 312},
                {name: "love 2", duration: 312},
                {name: "love 3", duration: 312},
                {name: "love 4", duration: 312}
              ]
      },
      {
        name: "Rock",
        songs: [{name: "rock 1", duration: 312},
                {name: "rock 2", duration: 312},
                {name: "rock 3", duration: 312},
                {name: "rock 4", duration: 312}
              ]
      },
      {
        name: "Pop",
        songs: [{name: "pop 1", duration: 312},
                {name: "pop 2", duration: 312},
                {name: "pop 3", duration: 312},
                {name: "pop 4", duration: 312}
              ]
      }
    ]
  }
}

class PlayListCounter extends Component{
  render() {
    return(
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playLists.length} playist</h2>
      </div>
    );
  }  
}


class HoursCounter extends Component{
  render() {
    let allSongs = this.props.playLists.reduce((songs, eachPlayList) => {
      return songs.concat(eachPlayList.songs)
    }, [])

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{totalDuration / 60} hours</h2>
      </div>
    );
  } 
}



class Filter extends Component{
  render(){
    return(
      <div style={defaultStyle}>
        <img/>
        <input type="text" name="" id="" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component{
  render(){
    let playList = this.props.playList
    return(
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>{playList.name}</h3>
        <ul>
          {playList.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );

  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount(){
    setTimeout(() =>{
      this.setState({serverData: fakeServerData})
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
        <h1 style={{...defaultStyle, 'font-size': '3rem'}}>
          {this.state.serverData.user.name}'s Playlist
        </h1>
        <PlayListCounter playLists={this.state.serverData.user.playLists}/>
        <HoursCounter playLists={this.state.serverData.user.playLists}/>
        <Filter onTextChange={text => this.setState({filterString: text})}/>
        {this.state.serverData.user.playLists.filter(playList =>
          playList.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
        ).map(playList =>
          <Playlist playList={playList}/>
        )}
        </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
