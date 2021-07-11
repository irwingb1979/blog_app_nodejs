const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()

app.use(express.static('public')) // para que lea la carpeta public
// const path = require('path') //para los path

// template ejs
const ejs = require('ejs')
app.set('view engine', 'ejs')

//Mongoose
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://irwin:Nathy@cluster0.dlo47.mongodb.net/my_database', { useNewUrlParser: true, useUnifiedTopology: true })

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Model
// const BlogPost = require('./models/BlogPost')


//Image
app.use(fileUpload());

//Midlewares
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const expressSession = require('express-session');

app.use(expressSession({
   secret: 'keyboard cat'
}))

app.use('/posts/store', validateMiddleWare)

//Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

global.loggedIn = null;

app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});


// app.listen(4000, () => {
//    console.log('Escuchando port 4000');
// })

let port = process.env.PORT;

if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})

//List all post
app.get('/', homeController)



app.get('/about', (req, res) => {
   //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
   res.render('about')
})

app.get('/contact', (req, res) => {
   //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
   res.render('contact')
})


app.get('/post/new', authMiddleware, newPostController)

app.get('/post/:id',  getPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));

