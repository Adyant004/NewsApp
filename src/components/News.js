import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0
    }

    document.title = `News24 : ${this.Capitalize(this.props.category)}`
  }

  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    this.props.setProgress(20);
    let data = await fetch(url)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a19f49dd5e524c8aa6c018366d44b186&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a19f49dd5e524c8aa6c018366d44b186&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a19f49dd5e524c8aa6c018366d44b186&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({
      page: this.state.page + 1
    })
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center'>News24 - Top {this.Capitalize(this.props.category)} Headlines</h1>
        <h1 className='text-center' style={{marginTop: "50px"}}>News24 - Top {this.Capitalize(this.props.category)} Headlines</h1>
        { this.state.loading && <Spinner /> }
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner />}
        >
          <div className="container my-3">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className='col md-4' key={element.url}>
                <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} author={element.author} publishedAt={element.publishedAt} newsUrl={element.url} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
