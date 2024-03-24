import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,publishedAt} = this.props;
    return (
      <div>
        <div className="card my-3" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczKk25hW9nn5zYaLJfqKnAEZy5bloy3dfgNLop-1WCnGOQLWKZre0ePnuXfH-OKIev50&usqp=CAU":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
              <p className="card-text"><small className="text-body-secondary">By {author?author:"Anonymous"} at {new Date(publishedAt).toGMTString()}</small></p>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
