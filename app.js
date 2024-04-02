const path = require('path');
const cors= require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose')

const errorController = require('./controllers/error');
const User= require('./models/user')

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk('6609b807f46cb8c63f6062f5')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://komal123:komal123@atlascluster.qquzra1.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasCluster')
.then(result=>{
  User.findOne().then(user =>{
    if(!user){
      const user= new User({
    name: "komal",
    email: "komal@gmail.com",
    cart: {
      items: []
    }
  });
  user.save();
    }
  });
  
  app.listen(3000);
}).catch(err =>{
  console.log(err);
})