const mongoose = require('mongoose');
const { HotelSchema } = require('../../dist/schemas/hotel.schema.js');
const { EventVenueSchema } = require('../../dist/schemas/event-venue.schema.js');

const Hotel = mongoose.model('Hotel', HotelSchema);
const EventVenue = mongoose.model('EventVenue', EventVenueSchema);

mongoose
  .connect('mongodb://127.0.0.1:27017/hotel')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

const eventVenuesData = [
  {
    name: 'Borupgaard',
    meetingPerks: [
      '10 versatile meeting spaces with natural lighting',
      'Complimentary Wi-Fi',
      'On-site event coordinator',
      'Flexible seating arrangements',
    ],
    partyPerks: [
      'Rooftop garden party area',
      'Free valet parking',
      'Themed decor options',
      'Interactive team-building activities',
      'Gourmet catering services',
    ],
    meetingDesc:
      'Nestled by the harbor, Comwell Hotel Borupgaard offers a serene environment for productive meetings. The venue is equipped with modern amenities and a dedicated team to ensure a seamless event experience.',
    partyDesc:
      'Elevate your celebrations at Comwell Hotel Borupgaard, surrounded by scenic beauty and waterfront views. The rooftop garden party area and customizable themes make it an ideal choice for memorable events.',
  },
  {
    name: 'Copenhagen Portside',
    meetingPerks: [
      '17 meeting rooms - max capacity up to 450 people',
      'Free parking',
      'State-of-the-art audiovisual equipment provided',
      'Customized catering options available',
    ],
    partyPerks: [
      'banquet hall with a sea view for 150 people.',
      'Professional event planning assistance',
      'Live entertainment options available',
    ],
    meetingDesc:
      'Beautiful scenery and close to Copenhagen Harbour. The many beautiful green areas around the hotel also make Comwell Hotel Copenhagen Portside perfect for both team building and team development activities.',
    partyDesc:
      'Beautiful scenery and close to Copenhagen Harbour. The many beautiful green areas around the hotel also make Comwell Hotel Copenhagen Portside perfect for outdoor events.',
  },
  {
    name: 'Klarskovgaard',
    meetingPerks: [
      'Executive boardroom with panoramic city views',
      'High-speed internet access',
      'Catering packages available',
      'Audioconferencing facilities',
    ],
    partyPerks: [
      'Skyline ballroom for grand celebrations',
      'Valet parking services',
      'Live DJ and dance floor',
      'Interactive photo booth',
      'Late-night snack bar',
    ],
    meetingDesc:
      'Comwell Hotel Klarskovgaard provides a sophisticated setting for corporate meetings. Enjoy breathtaking city views from the executive boardroom and take advantage of top-notch amenities to enhance your meeting experience.',
    partyDesc:
      'Host an unforgettable party at Comwell Hotel Klarskovgaard with a skyline ballroom and entertainment options like a live DJ and interactive photo booth. Valet parking and late-night snack bar add to the allure of your event.',
  },
  {
    name: 'Køge Strand',
    meetingPerks: [
      'Spacious conference rooms surrounded by lush gardens',
      'Free on-site parking',
      'Wellness breaks with yoga sessions',
      'Customizable meeting packages',
    ],
    partyPerks: [
      'Enchanting garden venue for outdoor parties',
      'Complimentary shuttle service',
      'Interactive garden games',
      'Gourmet farm-to-table catering',
      'Live acoustic music performances',
    ],
    meetingDesc:
      'Immerse yourself in nature at Comwell Hotel Køge Strand, where spacious conference rooms seamlessly blend with lush gardens. Enjoy wellness breaks with yoga sessions to rejuvenate during your meetings.',
    partyDesc:
      'Celebrate amidst the beauty of nature at  Comwell Hotel Køge Strand enchanting garden venue. Interactive garden games, farm-to-table catering, and live acoustic music ensure a magical experience for your outdoor party.',
  },
  {
    name: 'H.C. Andersen Odense',
    meetingPerks: [
      'Sky lounge with panoramic city skyline views',
      'High-tech presentation facilities',
      'Dedicated event concierge',
      'Flexible seating arrangements',
    ],
    partyPerks: [
      'Exclusive rooftop terrace for glamorous parties',
      'VIP parking services',
      'LED dance floor and light show',
      'Craft cocktail mixology bar',
      'Professional event photographer',
    ],
    meetingDesc:
      'Elevate your meetings at Comwell Hotel H.C. Andersen Odense, boasting a sky lounge with breathtaking city skyline views. High-tech presentation facilities and a dedicated event concierge ensure a polished corporate experience.',
    partyDesc:
      "Host a glamorous party at Metropolitan Sky Lounge's exclusive rooftop terrace. Enjoy VIP parking, an LED dance floor with a light show, a craft cocktail mixology bar, and capture the memories with a professional event photographer.",
  },
  {
    name: 'Hvide Hus Aalborg',
    meetingPerks: [
      'Intimate meeting rooms with a cozy ambiance',
      'Convenient on-site parking',
      'Complimentary Wi-Fi',
      'Flexible catering options',
    ],
    partyPerks: [
      'Charming rooftop terrace for intimate gatherings',
      'Easy access to local attractions',
      'Live acoustic duo for entertainment',
      'Local artisanal food and beverage options',
      'Personalized event coordination',
    ],
    meetingDesc:
      'Discover the charm of intimate meetings at Town Square Boutique Hotel. Our cozy meeting rooms offer a welcoming ambiance, and with convenient on-site parking, complimentary Wi-Fi, and flexible catering options, your business gatherings are sure to be a success.',
    partyDesc:
      'Host intimate gatherings at our charming rooftop terrace with picturesque views of the town. Enjoy easy access to local attractions, entertainment from a live acoustic duo, and savor the best of local artisanal food and beverage options. Our personalized event coordination ensures a memorable celebration.',
  },
];

async function populateWithEventVenues() {
  try {
    await Promise.all(
      eventVenuesData.map(async eventVenueData => {
        const eventVenue = new EventVenue(eventVenueData);
        eventVenue.hotel_id = await getHotelId(eventVenueData);
        const savedVenue = await eventVenue.save();
        console.log('Added venue to hotel', savedVenue);
      }),
    );
  } catch (error) {
    console.error(error);
  }
  mongoose.connection.close();
}

async function getHotelId(eventVenueData) {
  const hotel = await Hotel.findOne({ name: eventVenueData.name });
  return hotel._id;
}

mongoose.connection.on('error', err => {
  console.log(err);
});

mongoose.connection.once('open', populateWithEventVenues);
