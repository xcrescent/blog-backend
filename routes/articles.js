const express = require('express')
// const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: {title:'',description:'',markdown: ''} })
})

router.get('/edit/:id', async (req, res) => {

  console.log(req.params.id)

  // const 'use strict';
  
  // var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
  // var Message = require('azure-iot-device').Message;
  // var connectionString = '<deviceConnectionString>';
  // var client = clientFromConnectionString(connectionString);
  
  function printResultFor() {
    return function printResult(err, res) {
      if (err) console.log(op + ' error: ' + err.toString());
      if (res) console.log(op + ' status: ' + res.constructor.name);
      // client.close();
    };
  }
  
  // var connectCallback = function (err) {
  //   if (err) {
  //     console.log('Could not connect: ' + err);
  //   } else {
  //     console.log('Client connected');
  //     var data = 'Hello IoT Hub!';
      // var message = new Message(data);
      // console.log('Sending message: ' + message.getData());
      // client.sendEvent(message, printResultFor('send', client));
  //   }
  // };
  
  // client.open(connectCallback); = req.params.id
  res.render('articles/edit', { article: {title:'id',description:'slug',markdown: new Date(),id:'id',slug:'slug',createdAt: new Date()} })
})

router.get('/:slug', async (req, res) => {
  console.log(req.params.slug)
  // const article = await Article.findOne({ slug: req.params.slug })
  const article = {id:'id',slug:'slug',createdAt: new Date()}
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article ={id:'id',slug:'slug',createdAt: Date.now()}
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  // req.article = await Article.findById(req.params.id)
  console.log(req.params.id)
  req.article = {id:'id',slug:'slug',createdAt: new Date()}
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {

  // await Article.findByIdAndDelete(req.params.id)
  console.log(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      // article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router