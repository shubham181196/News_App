import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsUrl,author,date}=this.props;
    return (
      <div className='my-2'>
        
        <div className="card" >
        <img src={imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read more</a>
            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toDateString()}</small></p>
        </div>
        </div>
            </div>
            )
  }
}

export default NewsItem
