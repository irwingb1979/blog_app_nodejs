const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

// BlogPost.create({
//     title: 'Titulo de mi post 2',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam felis dui, a aliquet metus blandit at. Aenean interdum massa sed nunc pretium, sit amet cursus arcu ultrices. I'
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// })

var id = '60de729dc4216e37543d5fe2'
BlogPost.findByIdAndUpdate(id, {
    title: 'Titulo post 01'
},  (error, blogpost) => {
    console.log(error, blogpost)
})