const express = require('express')
const Article = require('./models/article')
const articleJSON = require('./articles/articles.json')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
 
    //  const Article = JSON.parse(articleJSON);
  const articles = articleJSON
  const article = {id:'id',slug:'slug',createdAt: Date.now()}
  console.log(article.createdAt);
  articles.push(article);
  articles.forEach((article)=>{ 
    // article.createdAt = JSON.parse(article.createdAt);
    
  })
  
  
    res.render('articles/index', { articles: articles })

  })
  


app.use('/articles', articleRouter)

app.listen(5500, ()=>{
  console.log('Server started at 5500.');
  const article = {id:'id',slug:'slug',createdAt:  Date.now()}
  console.log(article.createdAt);
  
  console.log(new Date(article.createdAt).toDateString())
});