// import * as mongoose from 'mongoose';
// import * as faker from '@faker-js/faker';
// import * as Schema from '../../dist/schemas/user.schema.js';

// return;
// const User = mongoose.model('User', UserSchema);

// mongoose
//   .connect('mongodb://localhost:27017/hotel', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     console.log(err);
//   });

// async function populateWithUsers() {
//   for (let i = 0; i < 10; i++) {
//     const user = new User({
//       name: faker.name.firstName() + ' ' + faker.name.lastName(),
//       email: faker.internet.email(),
//       password: 'qwerty',
//       phone: faker.phone.phoneNumber(),
//       address: faker.address.streetAddress(),
//       dob: faker.date.past(),
//     });
//     console.log('User', i, user);
//     await user.save();
//   }
//   mongoose.connection.close();
// }

// populateWithUsers();
