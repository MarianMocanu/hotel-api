const mongoose = require('mongoose');
const { ServiceSchema } = require('../../dist/schemas/service.schema.js');

const Service = mongoose.model('Service', ServiceSchema);

const servicesData = [
  {
    title: 'Pampering stay',
    price: 588,
    description:
      'Pull the plug, exhale. And go all in on pampering. The pampering stay offers coffee and homemade cake on arrival, welcome bubbles, a 3-course dinner/buffet, and our large breakfast buffet.',
    type: 'package',
  },
  {
    title: 'Spa Delight',
    price: 806,
    description:
      'Indulge in a luxurious spa experience with our Spa Delight package. This package includes access to all our spa facilities, a personalized spa treatment, and a healthy gourmet meal. Perfect for relaxation and rejuvenation.',
    type: 'package',
  },
  {
    title: 'Accommodation with breakfast buffet',
    price: 0,
    description: 'Accommodation with large breakfast buffet with organic and local specialities',
    type: 'package',
  },
  {
    title: 'Stay with 2-course dinner',
    price: 496,
    description:
      'Enjoy a lovely stay with dinner of fresh seasonal produce at one of our selected hotels. This stay is incl. 2-course dinner, overnight stay and breakfast.',
    type: 'package',
  },
  {
    title: 'Baby bed',
    price: 150,
    description: 'The price is for the entire stay.',
    type: 'addon',
  },
  {
    title: 'Early check-in',
    price: 200,
    description: 'Check in 2 hours earlier',
    type: 'addon',
  },
  {
    title: 'Late departure',
    price: 200,
    description: 'Check out 2 hours later.',
    type: 'addon',
  },
  {
    title: 'Access to AquaSpa',
    price: 349,
    description: 'Access to the pool, sauna and other spa amenities.',
    type: 'addon',
  },
];

mongoose
  .connect('mongodb://mongodb:27017/hotel')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

async function populateWithServices() {
  await Service.insertMany(servicesData);
  console.log(servicesData.length, 'services created');
  mongoose.connection.close();
}

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.once('open', populateWithServices);
