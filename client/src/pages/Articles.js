import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import API from "../utils/API";
import axios from 'axios'
import cheerio from 'cheerio'
import { List, ListItem } from '../components/List'
import DeleteBtn from '../components/Delete-btn/Delete-btn'
import SaveBtn from '../components/SaveBtn/SaveBtn'



class Articles extends Component {
  state = {
    articles: [],
    note: '',
    savedArticles: []
  };

  componentDidMount() {
    this.loadArticles();
    this.loadSavedArticles();
  }

  clearArticles = () => {
    API.clearArticles()
    .then(res => {
      this.loadArticles()
      this.state.savedArticles.forEach(article => {
        API.saveArticle({
          title: article.title,
          description: article.description,
          link: article.link,
          saved: true
        })
      })
    }).then(res=> {
      this.loadSavedArticles()
    })    
  }

  scrapeArticles = async () => {
    
    axios.get("https://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article.css-180b3ld").each(function() {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).find('a').find('h2').text()
        result.description = $(this).find('a').find('p').text() || 'No description found for this article'
        result.link = 'https://www.nytimes.com/' + $(this).find("a").attr("href")
        console.log(result)
        // Create a new Article using the `result` object built from scraping
        API.saveArticle({
          title: result.title,
          description: result.description,
          link: result.link
        })  
      })    
    }).then(res => {
      this.loadArticles()
      this.setState({
        articles: this.state.articles
      })
    })
    
  }

  buttonClickHandler = (event) => {
    if(event.target.className.includes('scrape-btn')){
      this.scrapeArticles().then(this.loadArticles())
    } else if (event.target.className.includes('clear-btn')) {
      this.clearArticles()
    }
    
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => {
        this.setState({ articles: res.data}, console.log(res.data))
        console.log(this.state.savedArticles)
      })
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  sendToSaved = (name) => {
    API.updateArticle(name)
      .then(res => {
        this.loadSavedArticles()
        this.setState({
          savedArticles: this.state.savedArticles
        })
      })
    // .then(res => {
    //   API.updateArticle(res.data)
    // })
    //   .then(res=> {
    //     console.log(this.state.savedArticles)
    //   }
    // )  
  }

  loadSavedArticles = () => {
    API.getSaved()
      .then(res => {
        this.setState({ savedArticles: res.data }, console.log(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="container">
        <Jumbotron 
        click={this.buttonClickHandler}/>
        <div className="container" style={{marginBottom: "30px"}}>
        <h2 className="text-center">Scraped Articles</h2>
          <List>
            {this.state.articles.map(article => (
              <ListItem key={article._id} id={article._id}>
                <a href={article.link}><h3>{article.title}</h3></a>
                <p>{article.description}</p>
                <SaveBtn key={article._id} name={article._id} onClick={() => this.sendToSaved(article._id)}>Save</SaveBtn>                    
              </ListItem>
            ))}
          </List>
        </div>
        <div className="container">
        <h2 className="text-center">Saved Articles</h2>
          <List className="saved" style={{marginTop: "20px"}}>
            {this.state.savedArticles.map(article => (
              <ListItem key={article._id}>
                <DeleteBtn
                  onClick={() => this.deleteArticle(article._id)} />
                <a href={article.link}><h3>{article.title}</h3></a>
                <p>{article.description}</p>                    
              </ListItem>
            ))}
          </List>
        </div>      
      </div>
      
    );
  }
}

export default Articles;
