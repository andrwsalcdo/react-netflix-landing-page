// const xyz = react.createClas({}) this is depracated 
import React from 'react';
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
  render() {
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
        <Hero />
        <TitleList title="Search Results" url={this.state.searchUrl} />
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
class Navigation extends React.Component {
  render() {
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
}

// User Profile 
class UserProfile extends React.Component {
  render() {
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name">Andrew Salcedo</div>
          <div className="image"><img src="http://imgur.com/3LL7bcc.jpg" alt="profile" /></div>
        </div>
      </div> 
    );
  }
}

//////// HERO //////////
class Hero extends React.Component {
  render() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)' }}>
        <div className="content">
          <img className="logo" src="https://www.returndates.com/backgrounds/narcos.logo.png" alt="narcos background" />
          <h2>Season 2 now available</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
          <div className="button-wrapper">
            <HeroButton primary={true} text="Watch Now" />
            <HeroButton primary={false} text="+ My List" />
          </div>
        </div>
        <div className="overlay"></div>
      </div>  
    );
  }
}

// Hero Button 
class HeroButton extends React.Component {
  render() {
    return (
      <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
    );
  }
}

/////////// Title List ///////////
class TitleList extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      apiKey: '87dfa1c669eea853da609d4968d294be',
      data: [], 
      mounted: false
    };
  }
  loadContent() {
    let requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.state.apiKey;
    fetch(requestUrl).then((res) => {
      return res.json(); 
    }).then((data) => {
      this.setState({data : data}); 
    }).catch((err) => {
      console.log("there has been an error");
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.url !== this.props.url && nextProps.url !== '') {
      this.setState({mounted: true, url: nextProps.url}, () => {
        this.loadContent(); 
      }); 
    }
  }
  componentDidMount() {
    if(this.props.url !== ''){
      this.loadContent(); 
      this.setState({mounted: true});
    }
  }
  render() {
    let titles = '';
    if(this.state.data.results) {
      titles = this.state.data.results.map((title,i) => {
        if( i < 5) {
            let name = ""; 
            let backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path; 
            if(!title.name) {
              name = title.original_title; 
            } else {
              name = title.name; 
            }

            return (
              <Item key ={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
            );

            } else {
              return (<div key={title.id}></div>); 
            }
          });  
      }
      
      return (
          <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
            <div className="Title">
              <h1>{this.props.title}</h1>
              <div className="titles-wrapper">
                {titles}
              </div>
            </div>
          </div>
      );
  }
}

// Title List Item 
class Item extends React.Component {
  constructor(props) {
    super(); 
  }
  render() {
    return (
        <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
          <div className="overlay" >
            <div className="title">{this.props.title}</div>
            <div className="rating">{this.props.score} / 10</div>
            <div className="plot">{this.props.overview}</div>
            <ListToggle />
          </div>
        </div>
    );
  }
}

// List Toggle 
class ListToggle extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      toggled: false
    }
  } 
  // property initializer syntax to correctly bind callbacks. 
  handleClick = () => {
    (this.state.toggled) ? this.setState({ toggled: false}) : this.setState({ toggled: true }); 
  }
  render() {
    return (
      <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
        <div>
          <i className="fa fa-fw fa-plus"></i>
          <i className="fa fa-fw fa-check"></i>
        </div>
      </div>
    );
  }
}

export default App;

