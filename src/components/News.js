import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from './Loader';
import PropTypes from 'prop-types';


export class News extends Component {
  
  static defaultProp={
    country:"in",
    pageSize:8,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalPage:0,
      error:false
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}- Headlines`
  }
 
  async update(){
    
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    try{
      let data = await fetch(url);
      let parseData = await data.json();
      if(parseData.status!=="error"){
         this.setState({
          articles: parseData.articles,
          loading:false,
          page:this.state.page,
          totalPage:Math.ceil(parseData.totalResults/this.props.pageSize),
          error:false
        });
      }else{
        this.setState({
          loading:false,
          error:true
        })
        
      
        
      }
    }catch(error){
      console.log(error);
    }
    
  }
  async componentDidMount() {
    // const url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5dcf11c73e3e455e87292586d7e80754&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   loading:false,
    //   page:this.state.page,
    //   totalPage:Math.ceil(parseData.totalResults/this.props.pageSize)
    // });
    await this.update();
  }
  next=async ()=>{
    // this.setState({loading:true});
    //   let url =
    //     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5dcf11c73e3e455e87292586d7e80754&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({
    //     articles: parseData.articles,
    //     loading:false,
    //     page:this.state.page+1,
    //     totalPage:Math.ceil(parseData.totalResults/this.props.pageSize)
    //   });
    
     this.setState({
      page:this.state.page+1,
      loading:true}
    );
    await this.update();
      
  }
  prev=async ()=>{
    // this.setState({loading:true});
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5dcf11c73e3e455e87292586d7e80754&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   loading:false,
    //   page:this.state.page-1,
    //   totalPage:Math.ceil(parseData.totalResults/this.props.pageSize)
    // });
    
    await this.setState({
        page:this.state.page-1,
        loading:true}
    );
    await this.update();
    
    
}
  fabricate(url){
      if(url[url.length-1]==='/'){
        let fabricatedURL=url.slice(0,url.length-1);
        return fabricatedURL;
      } 
      else return url;
  }
  render() {
    return (
      <>
      <div className="container">
        <h2 className="mb-3 text-center" style={{margin:"30px 0px"}}>{`Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h2>
        {this.state.loading===true &&<Loader/>}
        {!this.state.error && !this.state.loading }<div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0, 40):"This is default title"}
                  description={element.description?element.description.slice(0, 88):"Default description is given in order to keep uniformity of sapcing"}
                  imageurl={element.urlToImage?this.fabricate(element.urlToImage):process.env.PUBLIC_URL + '/OIP.jfif'}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        {this.state.error && !this.state.loading &&<img src="..." className="img-fluid" alt="error occured"></img>}
      </div>
      {(!this.state.error || !this.state.loading) &&
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prev}>previous</button>
            <button disabled={this.state.page>=this.state.totalPage} type="button" className="btn btn-dark" onClick={this.next}>Next</button>
        </div>}
      
      </>
    );
  }
}

export default News;
