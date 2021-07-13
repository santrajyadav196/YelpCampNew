const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})
    .then((data)=>{
        console.log('Connection is open!!')
    })
    .catch((err)=>{
        console.log('Oh no error', err)
    })

// const sample = (array) => {
//    return array[Math.floor(Math.random() * array.length)];
// }

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
        await Campground.deleteMany({});
        for (let i = 0; i < 300; i++) {
            const random = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) +10;
            const camp = new Campground({
                author:'60c3bebb08e1063a14bcd507',
                location: `${cities[random].city}, ${cities[random].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description:'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
                price,
                geometry: 
                { "type" : "Point",
                 "coordinates" : [ 
                   cities[random].longitude,
                   cities[random].latitude,
                  ] 
                },
                images: [
                    {
                      url: 'https://res.cloudinary.com/santraj/image/upload/v1623607667/YelpCamp/j8thypepjkgbxok24tbw.jpg',
                      filename: 'YelpCamp/j8thypepjkgbxok24tbw'
                    },
                    {
                      url: 'https://res.cloudinary.com/santraj/image/upload/v1623607667/YelpCamp/po7w5igmy9otdc9ub8e0.jpg',
                      filename: 'YelpCamp/po7w5igmy9otdc9ub8e0'
                    },
                    {
                      url: 'https://res.cloudinary.com/santraj/image/upload/v1623607670/YelpCamp/ej3iveedwee2isomx41f.jpg',
                      filename: 'YelpCamp/ej3iveedwee2isomx41f'
                    },
                    {
                      url: 'https://res.cloudinary.com/santraj/image/upload/v1623607669/YelpCamp/svk1j1dkcozzjnfguivp.jpg',
                      filename: 'YelpCamp/svk1j1dkcozzjnfguivp'
                    }
                  ]
            })
            await camp.save();
        }
}

seedDB().then (()=>{
    mongoose.connection.close();
});