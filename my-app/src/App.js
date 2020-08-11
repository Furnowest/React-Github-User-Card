import React from "react";
import axios from "axios";
import "./App.css";


class App extends React.Component {
  constructor() {
    console.log();
    super();
    this.state = {
      users: [],
      followers: [
      'tetondan',
      'dustinmyers',
      'justsml',
      'luishrd',
      'bigknell']
    };
  }

  componentDidMount() {
    console.log("CDM running");
    axios
      .get('https://api.github.com/users/furnowest')
      .then((res) => {
        console.log("respond", res);
        this.setState({ users: res.data });
      })
      .catch((err) => console.log(err))
      .then()
      axios
      .get('https://api.github.com/users/furnowest/followers')
      .then((res)=>{
        this.setState({followers: res.data});
        console.log("folloers respond", res)
      })
      .catch((err) => console.log(err))
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.users !== this.state.users) {
      console.log("user have changed!");
    }
    if (prevState.followers !== this.state.followers) {
      console.log("State updated, userType", this.state.usersType);
    }
  }


  handleChanges = (e) => {
    console.log("handleChanges called",this.state.usersType);
    this.setState({
     
      ...this.state,
      usersType: e.target.value
    });
  };

  render() {
    console.log("Render");
    return (
      <div className="App">
        <h1>Git User</h1>
        <input
          type="text"
          value={this.state.usersType}
          onChange={this.handleChanges}/>
<button onClick={this.fetchUsers}>Fetch Users</button>
<div className="users">
		          <h1>{this.state.users.login}</h1>
		          <img width="200" className="user" src={this.state.users.avatar_url} />
		          {this.state.followers.map((followers) => {
		            return (
		              <div>
		                <h2>{followers.login}</h2>
		                <img width="200" src={followers.avatar_url} />
		              </div>
		            );
		          })}


          
        </div>

      </div>
    );
  }
}

export default App;
