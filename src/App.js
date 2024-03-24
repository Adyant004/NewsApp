import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  pageSize = 6
  apiKey = process.env.REACT_APP_NEWS_APP;
  state = {
    progress:0 
  }

  setProgress = (progress) =>{
    this.setState({progress: progress})
  }
    render() {
      return (
        <div>
          <Router>
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            />
            <Navbar />
            <Routes>
              <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={6} country="us" category="general" />} ></Route>
              <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={6} country="us" category="business" />} ></Route>
              <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={6} country="us" category="entertainment" />} ></Route>
              <Route path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={6} country="us" category="general" />} ></Route>
              <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={6} country="us" category="health" />} ></Route>
              <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={6} country="us" category="science" />} ></Route>
              <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={6} country="us" category="sports" />} ></Route>
              <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={6} country="us" category="technology" />} ></Route>
            </Routes>
          </Router>
        </div>
      )
    }
  }
