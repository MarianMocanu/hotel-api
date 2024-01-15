const mongoose = require('mongoose');
const { HotelSchema } = require('../../dist/schemas/hotel.schema.js');
const { RoomSchema } = require('../../dist/schemas/room.schema.js');
const { ServiceSchema } = require('../../dist/schemas/service.schema.js');

const Hotel = mongoose.model('Hotel', HotelSchema);
const Room = mongoose.model('Room', RoomSchema);
const Service = mongoose.model('Service', ServiceSchema);

mongoose
  .connect('mongodb://mongodb:27017/hotel')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

const hotelsData = [
  {
    name: 'Borupgaard',
    town: 'Snekkersten',
    address: 'Nørrevej 80, 3070 Snekkersten',
    image: '',
  },
  {
    name: 'Copenhagen Portside',
    town: 'Nordhavn',
    address: 'Alexandriagade 1, 2150 København',
    image: '',
  },
  {
    name: 'Klarskovgaard',
    town: 'Korsør',
    address: 'Korsør Lystskov 30, 4220 Korsør',
    image: '',
  },
  {
    name: 'Køge Strand',
    town: 'Køge',
    address: 'Strandvejen 111, 4600 Køge',
    image: '',
  },
  {
    name: 'H.C. Andersen Odense',
    town: 'Odense',
    address: 'Claus Bergs Gade 7, 5000 Odense',
    image: '',
  },
  {
    name: 'Hvide Hus Aalborg',
    town: 'Aalborg',
    address: 'Vesterbro 2, 9000 Aalborg',
    image: '',
  },
];

async function populateWithHotels() {
  const rooms = await Room.find();
  const packages = await Service.find({ type: 'package' });
  const addons = await Service.find({ type: 'addon' });
  try {
    await Promise.all(
      hotelsData.map(async hotelData => {
        const hotel = new Hotel(hotelData);
        hotel.rooms = getRandomRoomIds(rooms, 10);
        hotel.services = addons;
        const randomNum = Math.floor(Math.random() * packages.length);
        console.log('random number', randomNum);
        for (let i = 0; i < randomNum; i++) {
          const randomIndex = Math.floor(Math.random() * packages.length);
          hotel.services.push(packages[randomIndex]);
        }
        const savedHotel = await hotel.save();
        console.log('Hotel', savedHotel);
      }),
    );
  } catch (error) {
    console.error(error);
  }
  mongoose.connection.close();
}

function getRandomRoomIds(rooms, numRooms) {
  const roomIds = [];
  for (let i = 0; i < numRooms; i++) {
    const randomIndex = Math.floor(Math.random() * rooms.length);
    const room = rooms.splice(randomIndex, 1)[0]; // Remove the room from the array
    roomIds.push(room._id);
  }
  return roomIds;
}

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.once('open', populateWithHotels);
