export const cars = [
  // First Class
  {
    id: 101,
    imgSrc: "/assets/imgs/cars/Mercedes-S-Class-VIP.png",
    title: "Mercedes-Benz S-Class",
    details: "The ultimate expression of luxury and status.",
    description: "The Mercedes-Benz S-Class sets the standard for automotive luxury, offering an expansive interior, first-class comfort, and state-of-the-art technology for the most discerning travelers.",
    passenger: 4,
    luggage: 2,
    price: 1550, // Premium price
    carType: "Sedan",
    brand: "Mercedes",
    category: "First Class", // New field
    pageurl: "/Mercedes-S-Class"
  },
  {
    id: 102,
    imgSrc: "/assets/imgs/cars/BMW-7-Series-VIP.png",
    title: "BMW 7 Series (i7)",
    details: "Innovation meets executive luxury.",
    description: "Experience the pinnacle of BMW luxury with the 7 Series. Featuring a spacious cabin, executive lounge seating, and cutting-edge features for a serene and productive journey.",
    passenger: 4,
    luggage: 2,
    price: 1550,
    carType: "Sedan",
    brand: "BMW",
    category: "First Class",
    pageurl: "/BMW-7-Series"
  },
  {
    id: 103,
    imgSrc: "/assets/imgs/cars/Audi-A8-VIP.png",
    title: "Audi A8L",
    details: "Sophisticated luxury with commanding presence.",
    description: "The Audi A8L offers a perfect blend of elegance and technology. With extra legroom and a refined interior, it ensures a smooth and relaxing ride for VIP travellers.",
    passenger: 4,
    luggage: 2,
    price: 1500,
    carType: "Sedan",
    brand: "Audi",
    category: "First Class",
    pageurl: "/Audi-A8"
  },

  // Business Class
  {
    id: 1,
    imgSrc: "/assets/imgs/cars/BMW-5-Series-VIP.png",
    title: "BMW 5 Series",
    details: "Dynamic performance for business professionals.",
    description: "The BMW 5 Series combines sportiness with comfort, making it an ideal choice for business transfers. Enjoy a quiet cabin and smooth ride in this executive sedan.",
    passenger: 4,
    luggage: 2,
    price: 1150,
    carType: "Sedan",
    brand: "BMW",
    category: "Business Class",
    pageurl: "/BMW-5-series"
  },
  {
    id: 104,
    imgSrc: "/assets/imgs/cars/Mercedes-E-Class-VIP.png",
    title: "Mercedes-Benz E-Class",
    details: "The benchmark for executive business travel.",
    description: "Elegant, comfortable, and reliable. The Mercedes-Benz E-Class is the preferred choice for corporate travelers, offering a refined interior and superior ride quality.",
    passenger: 4,
    luggage: 2,
    price: 1150,
    carType: "Sedan",
    brand: "Mercedes",
    category: "Business Class",
    pageurl: "/Mercedes-E-Class"
  },
  {
    id: 105,
    imgSrc: "/assets/imgs/cars/Audi-A6-VIP.png",
    title: "Audi A6",
    details: "Modern design and advanced technology.",
    description: "The Audi A6 delivers a premium travel experience with its high-quality interior and smooth performance, perfect for airport transfers and city meetings.",
    passenger: 4,
    luggage: 2,
    price: 1150,
    carType: "Sedan",
    brand: "Audi",
    category: "Business Class",
    pageurl: "/Audi-A6"
  },

  // Luxury SUV
  {
    id: 4,
    imgSrc: "/assets/imgs/cars/BMW-X7-VIP.png",
    title: "BMW X7",
    details: "Spacious luxury for up to 6 passengers.",
    description: "A top-of-the-line SUV ideal for airport transfers, business travel, family transport, and exclusive events. With three rows of luxury seating and generous luggage space.",
    passenger: 6,
    luggage: 3,
    price: 1300,
    carType: "SUV",
    brand: "BMW",
    category: "Luxury SUV",
    pageurl: "/BMW-X7"
  },
  {
    id: 106,
    imgSrc: "/assets/imgs/cars/Mercedes-GLS-VIP.png",
    title: "Mercedes-Benz GLS",
    details: "The S-Class of SUVs.",
    description: "A premium full-size SUV ideal for airport transfers, executive travel, and family trips. Its spacious three-row layout and refined finish ensure a prestigious ride.",
    passenger: 6,
    luggage: 3,
    price: 1400,
    carType: "SUV",
    brand: "Mercedes",
    category: "Luxury SUV",
    pageurl: "/Mercedes-GLS"
  },
  {
    id: 106,
    imgSrc: "/assets/imgs/cars/Audi-Q7-VIP.png",
    title: "Audi Q7",
    details: "Versatile luxury and comfort.",
    description: "The Audi Q7 offers a spacious and high-tech interior, making it an excellent choice for groups or families who refuse to compromise on style and comfort.",
    passenger: 6,
    luggage: 3,
    price: 1300,
    carType: "SUV",
    brand: "Audi",
    category: "Luxury SUV",
    pageurl: "/Audi-Q7"
  },

  // Luxury Van (V-Class)
  {
    id: 7, // Keeping original ID
    imgSrc: "/assets/imgs/cars/Mercedes-V-Class-VIP.png", // Using new specific image
    title: "Mercedes-Benz V-Class", // Updated Title
    details: "Executive People Mover for Corporate Groups.",
    description: "Experience group travel in style with the Mercedes-Benz V-Class. Perfect for corporate roadshows and airport transfers, offering conference-style seating and premium finishes.", // Updated Description
    passenger: 7,
    passengerDisplay: "5-7",
    luggage: 5,
    luggageDisplay: "4-5",
    price: 1100, // Adjusted price for V-Class
    carType: "People Mover",
    brand: "Mercedes",
    category: "Luxury Van",
    pageurl: "/Mercedes-V-Class" // Updated to correct dedicated page
  },

  // Minibus (Sprinter)
  {
    id: 6,
    imgSrc: "/assets/imgs/cars/Mercedes-Sprinter-VIP.png",
    title: "Mercedes-Benz Sprinter",
    details: "Premium transport for larger groups.",
    description: "The Mercedes-Benz Sprinter is the ultimate solution for large group transfers, offering standing height, ample luggage space, and a comfortable ride for up to 11 passengers.",
    passenger: 11,
    passengerDisplay: "8-11",
    luggage: 10,
    luggageDisplay: "10",
    price: 950,
    carType: "People Mover",
    brand: "Mercedes",
    category: "Minibus",
    pageurl: "/Mercedes-Benz-Sprinter"
  }
];

export const carTypes = ["All", "Sedan", "SUV", "People Mover"];
export const carBrands = ["All", "Mercedes", "Audi", "BMW"];
export const features = [
  "+100.000 passengers transported",
  "Instant confirmation",
  "All-inclusive pricing",
  "Secure Payment by credit card, debit card or Paypal",
];
export const extras = [
  {
    id: 1,
    title: "Child Seat",
    price: 12,
    description:
      "Suitable for toddlers weighing 0-18 kg (approx 0 to 4 years).",
  },
  {
    id: 2,
    title: "Booster seat",
    price: 12,
    description:
      "Suitable for children weighing 15-36 kg (approx 4 to 10 years).",
  },
  {
    id: 3,
    title: "Vodka Bottle",
    price: 12,
    description: "Absolut Vodka 0.7l Bottle",
  },
  {
    id: 4,
    title: "Bouquet of Flowers",
    price: 12,
    description: "A bouquet of seasonal flowers prepared by a local florist",
  },
  {
    id: 5,
    title: "Alcohol Package",
    price: 12,
    description: "A bouquet of seasonal flowers prepared by a local florist",
  },
  {
    id: 6,
    title: "Airport Assistance and Hostess Service",
    price: 12,
    description: "A bouquet of seasonal flowers prepared by a local florist",
  },
  {
    id: 7,
    title: "Bodyguard Service",
    price: 12,
    description: "A bouquet of seasonal flowers prepared by a local florist",
  },
];
