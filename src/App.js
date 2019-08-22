import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Characters from './characters-classes/character-reducer'

class App extends Component {
  constructor(props) {
		super(props)
		this.state = {
      data: [],
      target: ""
    }
  }

  componentDidMount () {
    fetch(`https://api.opendota.com/api/heroStats`)
			.then(response => response.json())
			.then(data => {

				this.setState({data: data});
		  })
      .catch(err => console.error(this.props.url, err.toString()))
    
    function search () { 
      let target = document.getElementsByClassName("character-item");
        for (var i = 0; i < target.length; i++) {
          if (target[i].getElementsByClassName("inner-character-span")[0].innerHTML.toLowerCase() ===
              document.getElementById("search").value.toLowerCase()) {
                target[i].className = "character-item chosen"
              } else {
                target[i].className = "character-item"
              }
        }
     }
    
    document.getElementById("btn").addEventListener("click", () => {
        search();
    })

    document.addEventListener("keydown", function(event) {
      if (event.which === 13) {
        search();
      }
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/" className="link">
            <span className="link-span">Drink Vodka. Play Dotka</span>
          </Link>
        </header>
          <Route path="/" exact render={() => (
            <main className="App-main">
            <div className="App-main">
              <div className="find-character">
                <input id="search" className="search-input" type="text"/>
                <button className="search-btn" id="btn">Search</button>
              </div>
              <div className="strength character-content">
                <span className="character-span">STRENGTH</span>
                <Characters type="str" json={this.state.data} />
              </div>
              <div className="intelligence character-content">
                <span className="character-span">INTELLIGENCE</span>
                <Characters type="int" json={this.state.data} />
              </div>
              <div className="agility character-content">
                <span className="character-span">AGILITY</span>
                <Characters type="agi" json={this.state.data} />
              </div>
            </div>
            </main>
            )}/>
          { this.state.data.map((item, i) => {
              return (
                <Route key={i} exact path={`/${item.localized_name}`} render={() => (
                  <main> 
                  <div className="character-props">
                    <img src={`https://api.opendota.com${item.img}`} alt="character" />
                    <h1 className="character-name">{item.localized_name}</h1>
                    <h2 className="character-role">Roles:</h2>
                    <ul>
                      {item.roles.map((item, i) => (
                        <li key={i} className="roles">{item}</li>
                      ))}
                    </ul>
                    <table>
                      <tbody className="tprops">
                        <tr>
                            <td>Base health: </td>
                            <td>{item.base_health}</td>
                        </tr>
                        <tr>
                            <td>Base health regen: </td>
                            <td>{item.base_health_regen === null ? "0" : item.base_health_regen}</td>
                        </tr>
                        <tr>
                            <td>Base mana regen: </td>
                            <td>{item.base_mana_regen}</td>
                        </tr>
                        <tr>
                            <td>Base attack: </td>
                            <td>{item.base_attack_min} - {item.base_attack_max}</td>
                        </tr>
                        <tr>
                            <td>Base str: </td>
                            <td>{item.base_str}</td>
                        </tr>
                        <tr>
                            <td>Base int: </td>
                            <td>{item.base_int}</td>
                        </tr>
                        <tr>
                            <td>Base agi: </td>
                            <td>{item.base_agi}</td>
                        </tr>
                        <tr>
                            <td>Move speed: </td>
                            <td>{item.move_speed}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </main>
                )}/>
              )
            })
          }
        <div>
          
        </div>
      </div>
    );
  }
}

// function App() {
  
// }

export default App;
