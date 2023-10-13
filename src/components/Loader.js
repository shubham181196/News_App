import React, { Component } from 'react'
import Spinner from '../Spinner.gif'

export class Loader extends Component {
  
  render() {
    return (
      <div className='text-center'>
        <img src={Spinner} alt="loading"/>
      </div>
    )
  }
}

export default Loader
