import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  clearArticles: function(){
    return axios.delete("/api/articles")
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  updateArticle: function(id) {
    return axios.put('/api/articles/' + id, { "saved": true })
  },
  getSaved: function() {
    return axios.get('/api/articles/saved')
  }
};
