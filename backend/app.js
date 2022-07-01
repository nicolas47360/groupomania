const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userroutes');
const authRoutes = require('./routes/authroutes');
const postRoutes = require('./routes/postroutes')
const commentRoutes = require('./routes/commentroutes');

const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const app = express();


mongoose.connect(process.env.MONOGO_DB_CONNEXION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(express.urlencoded())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes)


module.exports = app;