import React, { Component } from 'react';
import './App.css';
// import Card from './components/Card';
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";
import Header from "./components/Header";
import 'tachyons';
import Scroll from './components/Scroll';
import ErrorHandler from './ErrorHandler';
// import { robots } from "./robots";


class App extends Component {
  constructor () {
    super()
    this.state = {
      robots: [],
      searchfield: "",

    }
  }

  onSearchChange = (event) => {
    this.state.searchfield = event.target.value;
    // console.log(this.state.searchfield);
    // this.setState({ searchfield:event.target.value });

  }

  onButtonClick = (event) => {
    console.log(this.state.searchfield);
    this.setState({ searchfield:this.state.searchfield });
  }

  componentDidMount = () => {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(user => this.setState( { robots : user}))
  }



  render() {

    const { searchfield, robots } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
      <div className="wrapper">
        <div className="navbar">
          <Header>
            <SearchBox searchChange={this.onSearchChange} buttonClick={this.onButtonClick}  />
          </Header>
        </div>
        <div className='tc robot-list'>
          <ErrorHandler>
            <Scroll>
              <CardList robot={filteredRobots}  />
            </Scroll>
          </ErrorHandler>
        </div>
      </div>
    );
  }
}




export default App;
