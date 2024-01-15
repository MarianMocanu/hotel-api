const mongoose = require('mongoose');
const { RoomSchema } = require('../../dist/schemas/room.schema.js');

const Room = mongoose.model('Room', RoomSchema);

mongoose
  .connect('mongodb://mongodb:27017/hotel')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

async function populateWithRooms() {
  const roomsData = [
    {
      name: 'Standard Single Room',
      description:
        'Our standard rooms are furnished in a modern, Nordic style and have a large bathroom.',
      type: 'single',
      facilities: [
        'single bed',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
      ],
      price: 1117,
      maxGuests: 1,
      booked_dates: [],
    },
    {
      name: 'Standard Double Room',
      description:
        'Our standard rooms are furnished in a modern, Nordic style and have a large bathroom.',
      type: 'double',
      facilities: [
        'double bed',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
      ],
      price: 1361,
      maxGuests: 2,
      booked_dates: [],
    },
    {
      name: 'Standard Twin Room',
      description:
        'Our standard rooms are furnished in a modern, Nordic style and have a large bathroom.',
      type: 'twin',
      facilities: [
        'double bed',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
      ],
      price: 1200,
      maxGuests: 2,
      booked_dates: [],
    },
    {
      name: 'Double Double Room',
      description:
        'Make your visit memorable in our 4-person superior room. This beautifully decorated room has two double beds (or 1 double bed and 2 single beds on request) with quality bed linen and hypoallergenic duvets and pillows. The room contains a small work and sitting area with a flat screen TV where you can stream your own favorite channels. The bathroom is equipped with a shower, guest articles from Ecooking and a hairdryer. There is also a wardrobe with ironing equipment and a kettle for free coffee and tea. All our rooms are non-smoking, have free high-speed WiFi, en-suite bathrooms, blackout curtains and are soundproofed.',
      type: 'doubledouble',
      facilities: [
        'double beds',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
      ],
      price: 2946,
      maxGuests: 4,
      booked_dates: [],
    },
    {
      name: 'Superior Room',
      description:
        'Make your visit memorable in our superior double room with a double bed (or two single beds on request) with quality bed linen and hypoallergenic pillows and duvets. The room contains a small work and sitting area with a flat screen TV where you can stream your own favorite channels. The bathroom is equipped with a shower or bathtub, guest articles from Ecooking and a hairdryer. Additional amenities include a work area, wardrobe with ironing facilities and a kettle for free coffee and tea.',
      type: 'doublesuperior',
      facilities: [
        'double bed',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
        'coffe and tea set',
      ],
      price: 2946,
      maxGuests: 2,
      booked_dates: [],
    },
    {
      name: 'Junior Suite',
      description:
        'Our junior suite is beautifully furnished with Danish design classics and has an impressive room with a double bed (or two single beds on request) with quality bed linen and hypoallergenic duvets and pillows. The junior suite includes a work and sitting area as well as a flat-screen TV where you can stream your own favorite channels. The bathroom is equipped with a shower, guest articles from Ecooking and a hairdryer. There is also a wardrobe with ironing equipment and a kettle for free coffee and tea.',
      type: 'juniorsuite',
      facilities: [
        'double bed',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
        'coffe and tea set',
        'coffee machine',
      ],
      price: 3962,
      maxGuests: 2,
      booked_dates: [],
    },
    {
      name: 'Executive Suite',
      description:
        'Make your visit memorable in our non-smoking Executive Suite. Featuring 1 Double bed (or 2 Twin beds upon request) with sumptuous linens, a small kitchen area with a refrigerator, and a comfortable sitting area, this beautifully appointed room makes for an inspired stay. The bathroom includes pampering bath products, a hair dryer, and both a shower and bathtub. Stay connected with free WiFi and a flat-screen TV. Additional amenities include blackout curtains, a desk, wardrobe with an iron and ironing board, and kettle with complimentary coffee and tea.',
      type: 'juniorsuite',
      facilities: [
        'double bed',
        'air conditioning',
        'armchair',
        'iron & board',
        'tv',
        'free Wi-Fi',
        'workplace',
        'blow-dryer',
        'deposit box',
        'coffe and tea set',
        'coffee machine',
        'bathtub',
      ],
      price: 4162,
      maxGuests: 2,
      booked_dates: [],
    },
  ];
  for (let i = 0; i < 10; i++) {
    await Room.insertMany(roomsData);
    console.log(7 * (i + 1), 'rooms created');
  }
  mongoose.connection.close();
}

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.once('open', populateWithRooms);
