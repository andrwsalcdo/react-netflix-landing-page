import React, { Component } from 'react';
import Logo from './Logo.js';
import './App.css';

//////// /////////////
 ///   Components ///
/////////////////

// Container 
let App = React.createClass({
  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function() {
    return {searchTerm: "", searchUrl: ""}; 
  }, 
  handleKeyUp: function(e) {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      let searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey; 
      this.setState({searchUrl:searchUrl}); 
    }
  }, 
  handleChange: function(e) {
    this.setState({searchTerm: e.target.value}); 
  }, 
  render: function() {
    return (
      <div>
        <header className="Header">
          <Logo />
          <Navigation />
          <div id="search" className="Search">
            <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} type="search" placeholder="Search for a title..." value={this.state.searchTerm} />
          </div>
          <UserProfile />
        </header>
        {/*<Hero />*/}
        {/*<TitleList title="Search Results" url={this.state.searchUrl} />
        <TitleList title="Top TV picks for Jack" url='discover/tv?sort_by=popularity.desc&page=1' />
        <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />
        <TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1' />
        <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />
        <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' />*/}
      </div>
   ); 
  }
});

// Navigation 
let Navigation = React.createClass({
  render: function() {
    return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Browse</li>
            <li>My List</li>
            <li>Top picks</li>
            <li>Recent</li>
          </ul>
        </nav>
      </div>
    ); 
  }
}); 

// User Profile 
let UserProfile = React.createClass({
  render: function() {
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name">Andrew Salcedo</div>
          <div className="image"><img src="http://imgur.com/3LL7bcc.jpg" alt="profile" /></div>
        </div>
      </div> 
    );
  }
}); 


export default App;
