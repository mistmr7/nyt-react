import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import API from "../utils/API";
import axios from 'axios'
import cheerio from 'cheerio'
import { List, ListItem } from '../components/List'
import DeleteBtn from '../components/Delete-btn/Delete-btn'

class Articles extends Component {
  state = {
    articles: [],
    title: '',
    description: '',
    link: '',
    note: '',
    saved: false
  };

  componentDidMount() {
    this.loadArticles();
  }

  clearArticles = () => {
    API.clearArticles()
  }

  scrapeArticles = () => {
    axios.get("http://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article.css-180b3ld").each(function() {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).find('a').find('h2').text()
        result.description = $(this).find('p').text()
        result.link = 'https://www.nytimes.com/' + $(this).find("a").attr("href")
        
        console.log(result)

        // Create a new Article using the `result` object built from scraping
        API.saveArticle({
          title: result.title,
          description: result.description,
          link: result.link,
          saved: false
        })
        .then(res => this.loadArticles())
        .catch(err => console.log(err))    
      })
    })
  }

  buttonClickHandler = (event) => {
    if(event.target.className.includes('scrape-btn')){
      this.scrapeArticles()
    } else if (event.target.className.includes('clear-btn')) {
      this.clearArticles()
    }
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", description: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="container">
        <Jumbotron 
        click={this.buttonClickHandler}/>
        {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <DeleteBtn
                      onClick={() => this.deleteArticle(article._id)} />
                    <a href={article.link}><h3>{article.title}</h3></a>
                    <p>{article.description}</p>                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
      </div>
    );
  }
}

export default Articles;
