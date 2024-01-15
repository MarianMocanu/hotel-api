const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { UserSchema } = require('../../dist/schemas/user.schema.js');

const User = mongoose.model('User', UserSchema);

mongoose
  .connect('mongodb://127.0.0.1:27017/hotel')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

async function populateWithUsers() {
  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.person.firstName() + ' ' + faker.person.lastName(),
      email: faker.internet.email(),
      password: 'qwerty',
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      dob: faker.date.past(),
    });
    const savedUser = await user.save();
    console.log('User', i, savedUser);
  }
  mongoose.connection.close();
}

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.once('open', populateWithUsers);
