import {
  DestinationDetail,
  StateInfo
} from '../types';

export const ALL_INDIAN_STATES: StateInfo[] = [
  // Central India
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    capital: 'Bhopal',
    region: 'Central',
    tagline: 'The Heart of Incredible India',
    description: 'Home to historic forts, UNESCO world heritage stupas, tiger sanctuaries, and the famous Malwa culinary heritage.',
    districtsCount: 55,
    famousFoods: ['Indori Poha & Jalebi', 'Bhutte Ka Kees', 'Bhopali Gosht Korma', 'Dal Bafla', 'Mawa Bati', 'Garadu'],
    topDestinations: ['Bhopal', 'Indore', 'Ujjain', 'Pachmarhi', 'Gwalior', 'Khajuraho', 'Orchha', 'Sehore', 'Vidisha'],
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chhattisgarh',
    code: 'CG',
    capital: 'Raipur',
    region: 'Central',
    tagline: 'Full of Surprises & Tribal Heritage',
    description: 'Land of lush green sal forests, mighty Chitrakote waterfalls, and distinct rice-based delicacies.',
    districtsCount: 33,
    famousFoods: ['Chila', 'Fara', 'Bafauri', 'Muthia', 'Dehori'],
    topDestinations: ['Raipur', 'Bastar', 'Jagdalpur', 'Bilaspur', 'Sirpur'],
    coverImage: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80'
  },

  // North India
  {
    name: 'Rajasthan',
    code: 'RJ',
    capital: 'Jaipur',
    region: 'North',
    tagline: 'The Land of Kings & Grand Fortresses',
    description: 'Golden sand dunes, majestic palaces, royal havelis, vibrant handicraft bazaars, and rich Marwari hospitality.',
    districtsCount: 50,
    famousFoods: ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Pyaaz Kachori', 'Ker Sangri', 'Mawa Kachori'],
    topDestinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'Mount Abu', 'Ajmer', 'Bikaner', 'Bundi'],
    coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    capital: 'Lucknow',
    region: 'North',
    tagline: 'Explore the Divine & Nawabi Heritage',
    description: 'From the sacred spiritual ghats of Kashi to the royal Awadhi feasts of Lucknow and the iconic Taj Mahal in Agra.',
    districtsCount: 75,
    famousFoods: ['Galouti Kebab', 'Varanasi Tamatar Chaat', 'Banarasi Paan', 'Kachori Sabzi', 'Malaiyyo', 'Mathura Peda', 'Petha'],
    topDestinations: ['Varanasi', 'Lucknow', 'Agra', 'Ayodhya', 'Mathura', 'Prayagraj', 'Vrindavan', 'Sarnath', 'Meerut'],
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Punjab',
    code: 'PB',
    capital: 'Chandigarh',
    region: 'North',
    tagline: 'Golden Fields, Spiritual Serenity & Big Feasts',
    description: 'The sacred sanctum of the Golden Temple, lively folk traditions, vibrant dhabas, and rich buttery Punjabi cuisine.',
    districtsCount: 23,
    famousFoods: ['Amritsari Kulcha', 'Sarson Da Saag & Makki Di Roti', 'Amritsari Lassi', 'Chole Bhature', 'Butter Chicken', 'Pinni'],
    topDestinations: ['Amritsar', 'Chandigarh', 'Patiala', 'Ludhiana', 'Jalandhar'],
    coverImage: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    capital: 'Shimla',
    region: 'North',
    tagline: 'Devbhoomi — Abode of Snow & Pine Valleys',
    description: 'Pristine Himalayan valleys, high-altitude passes, apple orchards, colonial hill stations, and Tibetan Buddhist culture.',
    districtsCount: 12,
    famousFoods: ['Dhaam', 'Siddu', 'Chana Madra', 'Babru', 'Trout Fish'],
    topDestinations: ['Manali', 'Shimla', 'Dharamshala', 'Spiti Valley', 'Kasol', 'Dalhousie', 'Bir Billing'],
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Uttarakhand',
    code: 'UK',
    capital: 'Dehradun',
    region: 'North',
    tagline: 'Simply Heaven in the Garhwal & Kumaon Hills',
    description: 'Sacred river confluences of the Ganga, yoga capital Rishikesh, alpine meadows, and majestic Himalayan peaks.',
    districtsCount: 13,
    famousFoods: ['Kafuli', 'Bhatt Ki Churkani', 'Bal Mithai', 'Singori', 'Aloo Ke Gutke'],
    topDestinations: ['Rishikesh', 'Haridwar', 'Nainital', 'Mussoorie', 'Auli', 'Kedarnath', 'Badrinath', 'Jim Corbett'],
    coverImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Jammu & Kashmir',
    code: 'JK',
    capital: 'Srinagar',
    region: 'North',
    tagline: 'Paradise on Earth',
    description: 'Shikaras on Dal Lake, snow-clad slopes of Gulmarg, saffron fields of Pampore, and the multi-course Wazwan feast.',
    districtsCount: 20,
    famousFoods: ['Rogan Josh', 'Gushtaba', 'Kahwa Tea', 'Kashmiri Dum Aloo', 'Haakh', 'Sheermal'],
    topDestinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Jammu', 'Doodhpathri'],
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ladakh',
    code: 'LA',
    capital: 'Leh',
    region: 'North',
    tagline: 'The Land of High Passes & Azure Lakes',
    description: 'Stunning moonscapes, ancient Tibetan gompas, azure Pangong Tso, sand dunes of Nubra, and raw adventure.',
    districtsCount: 2,
    famousFoods: ['Thukpa', 'Momos', 'Butter Tea (Gur Gur)', 'Skyu', 'Chhurpi'],
    topDestinations: ['Leh', 'Nubra Valley', 'Pangong Tso', 'Zanskar', 'Tso Moriri', 'Khardung La'],
    coverImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Delhi',
    code: 'DL',
    capital: 'New Delhi',
    region: 'North',
    tagline: 'The Heart of the Nation & Culinary Capital',
    description: 'Centuries of empire architecture, bustling Chandni Chowk gullies, monumental boulevards, and legendary street food.',
    districtsCount: 11,
    famousFoods: ['Chole Bhature', 'Butter Chicken', 'Parathas at Gali Paranthe Wali', 'Dahi Bhalla', 'Kulfi Falooda', 'Momos'],
    topDestinations: ['Old Delhi', 'New Delhi', 'Hauz Khas', 'Mehrauli', 'Connaught Place'],
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80'
  },

  // South India
  {
    name: 'Karnataka',
    code: 'KA',
    capital: 'Bengaluru',
    region: 'South',
    tagline: 'One State, Many Worlds',
    description: 'Silicon valley energy, grand royal Mysore palaces, UNESCO Hampi ruins, coffee estates of Coorg, and pristine beaches of Gokarna.',
    districtsCount: 31,
    famousFoods: ['Bisi Bele Bath', 'Mysore Pak', 'Neer Dosa', 'Mangalore Ghee Roast', 'Benne Dosa', 'Coorg Pandi Curry'],
    topDestinations: ['Bengaluru', 'Mysuru', 'Hampi', 'Coorg (Madikeri)', 'Gokarna', 'Chikmagalur', 'Udupi', 'Badami'],
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010e470bc55?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kerala',
    code: 'KL',
    capital: 'Thiruvananthapuram',
    region: 'South',
    tagline: "God's Own Country",
    description: 'Emerald backwaters, spice-scented hill stations, Ayurvedic healing, Kathakali art, and fragrant coconut seafood curries.',
    districtsCount: 14,
    famousFoods: ['Appam with Ishtu', 'Karimeen Pollichathu', 'Malabar Parotta & Beef Fry', 'Puttu & Kadala Curry', 'Sadya', 'Pazham Pori'],
    topDestinations: ['Kochi', 'Munnar', 'Alleppey (Alappuzha)', 'Wayanad', 'Varkala', 'Thekkady', 'Kovalam'],
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    capital: 'Chennai',
    region: 'South',
    tagline: 'Enchanting Dravidian Temples & Coastal Culture',
    description: 'Soaring gopurams of Madurai & Thanjavur, misty Nilgiri hills of Ooty, Coromandel beaches, and fiery Chettinad flavors.',
    districtsCount: 38,
    famousFoods: ['Chettinad Chicken', 'Filter Coffee', 'Idli-Sambar', 'Madurai Jigarthanda', 'Kothu Parotta', 'Pongal'],
    topDestinations: ['Chennai', 'Madurai', 'Ooty', 'Kanyakumari', 'Rameswaram', 'Thanjavur', 'Kodaikanal', 'Mahabalipuram'],
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Telangana',
    code: 'TS',
    capital: 'Hyderabad',
    region: 'South',
    tagline: 'The Pearl City of Nizami Splendor',
    description: 'Historic Golconda fort, Charminar, cutting-edge IT hubs, and world-renowned Hyderabadi Dum Biryani and Haleem.',
    districtsCount: 33,
    famousFoods: ['Hyderabadi Dum Biryani', 'Haleem', 'Mirchi Ka Salan', 'Double Ka Meetha', 'Sarva Pindi', 'Irani Chai & Osmania Biscuits'],
    topDestinations: ['Hyderabad', 'Warangal', 'Nagarjuna Sagar', 'Nizamabad', 'Bhadrachalam'],
    coverImage: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    capital: 'Amaravati',
    region: 'South',
    tagline: 'Spiritual Shrines, Coastal Charm & Piquant Flavors',
    description: 'The holy Tirupati Balaji shrine, coastal ports of Visakhapatnam, Buddhist sites, and famously spicy Andhra thalis.',
    districtsCount: 26,
    famousFoods: ['Gongura Pachadi', 'Andhra Royyala Iguru', 'Pesarattu', 'Pootharekulu', 'Nellore Chepala Pulusu'],
    topDestinations: ['Tirupati', 'Visakhapatnam', 'Araku Valley', 'Vijayawada', 'Srisailam', 'Lepakshi'],
    coverImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80'
  },

  // West India
  {
    name: 'Maharashtra',
    code: 'MH',
    capital: 'Mumbai',
    region: 'West',
    tagline: 'Unlimited Energy, Maratha Forts & Coastal Ghats',
    description: 'The bustling metropolis of Mumbai, hill escapes of Western Ghats, ancient Ajanta Ellora caves, and savory street snacks.',
    districtsCount: 36,
    famousFoods: ['Vada Pav', 'Misal Pav', 'Pav Bhaji', 'Puran Poli', 'Kolhapuri Mutton Sukka', 'Pithla Bhakri', 'Modak'],
    topDestinations: ['Mumbai', 'Pune', 'Lonavala', 'Mahabaleshwar', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Alibaug', 'Nashik', 'Shirdi'],
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Goa',
    code: 'GA',
    capital: 'Panaji',
    region: 'West',
    tagline: 'Sun, Sand, Portuguese Heritage & Susegad',
    description: 'Golden sandy beaches, whitewashed Baroque cathedrals, vibrant flea markets, feni, and aromatic Kokum seafood curries.',
    districtsCount: 2,
    famousFoods: ['Goan Fish Curry & Rice', 'Pork Vindaloo', 'Bebinca', 'Chicken Xacuti', 'Poi Bread', 'Feni'],
    topDestinations: ['North Goa (Calangute, Anjuna)', 'South Goa (Palolem, Colva)', 'Panaji', 'Old Goa', 'Dudhsagar Waterfalls'],
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    capital: 'Gandhinagar',
    region: 'West',
    tagline: 'Vibrant Colors, White Salt Deserts & Asiatic Lions',
    description: 'The white salt Rann of Kutch, Asiatic lions of Gir, stepwells of Patan, and sweet-savory Gujarati Farsan.',
    districtsCount: 33,
    famousFoods: ['Dhokla', 'Khandvi', 'Undhiyu', 'Thepla', 'Fafda Jalebi', 'Sev Khamani', 'Dabeli'],
    topDestinations: ['Ahmedabad', 'Rann of Kutch (Bhuj)', 'Gir National Park', 'Dwarka', 'Somnath', 'Vadodara', 'Statue of Unity'],
    coverImage: 'https://images.unsplash.com/photo-1596405838118-4ef0ea8293e2?auto=format&fit=crop&w=800&q=80'
  },

  // East India
  {
    name: 'West Bengal',
    code: 'WB',
    capital: 'Kolkata',
    region: 'East',
    tagline: 'The Cultural & Literary Capital of India',
    description: 'Colonial heritage, tramways, Durga Puja celebrations, tea hills of Darjeeling, and legendary sweets & fish curries.',
    districtsCount: 23,
    famousFoods: ['Kolkata Biryani', 'Kathi Rolls', 'Rosogolla', 'Mishti Doi', 'Macher Jhol', 'Shondesh', 'Puchka'],
    topDestinations: ['Kolkata', 'Darjeeling', 'Sundarbans', 'Kalimpong', 'Digha', 'Shantiniketan', 'Siliguri'],
    coverImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Odisha',
    code: 'OD',
    capital: 'Bhubaneswar',
    region: 'East',
    tagline: "India's Best Kept Secret",
    description: 'The Sun Temple at Konark, Puri Jagannath Temple, Chilika Lake migratory birds, and mouth-watering Chenna Poda.',
    districtsCount: 30,
    famousFoods: ['Chhena Poda', 'Dalma', 'Pakhala Bhata', 'Rasagola (Puri style)', 'Chhena Gaja', 'Machha Besara'],
    topDestinations: ['Puri', 'Bhubaneswar', 'Konark', 'Chilika Lake', 'Gopalpur', 'Cuttack'],
    coverImage: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bihar',
    code: 'BR',
    capital: 'Patna',
    region: 'East',
    tagline: 'The Cradle of Ancient Empires & Enlightenment',
    description: 'The Bodhi tree under which Lord Buddha attained enlightenment, ancient Nalanda University, and rustic earthy flavours.',
    districtsCount: 38,
    famousFoods: ['Litti Chokha', 'Khaja (Silao)', 'Sattu Paratha', 'Thekua', 'Bihari Kabab', 'Tilkut'],
    topDestinations: ['Bodh Gaya', 'Patna', 'Nalanda', 'Rajgir', 'Vaishali', 'Madhubani'],
    coverImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  },

  // Northeast India
  {
    name: 'Assam',
    code: 'AS',
    capital: 'Dispur',
    region: 'Northeast',
    tagline: 'Lush Tea Valleys & One-Horned Rhinos',
    description: 'Rolling green tea estates, the mighty Brahmaputra river, Kaziranga wildlife, and freshwater river island Majuli.',
    districtsCount: 35,
    famousFoods: ['Masor Tenga', 'Khaar', 'Duck Meat Curry', 'Pitha', 'Aloo Pitika', 'Assam Orthodox Tea'],
    topDestinations: ['Guwahati', 'Kaziranga National Park', 'Majuli Island', 'Jorhat', 'Manas National Park', 'Sivasagar'],
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Meghalaya',
    code: 'ML',
    capital: 'Shillong',
    region: 'Northeast',
    tagline: 'The Abode of Clouds & Living Root Bridges',
    description: 'Crystal-clear rivers of Dawki, cascading Nohkalikai waterfalls, mystical rainforests, and vibrant indie rock music.',
    districtsCount: 12,
    famousFoods: ['Jadoh', 'Dohneiiong', 'Tungrymbai', 'Pukhlein', 'Kyat (Rice Beer)'],
    topDestinations: ['Shillong', 'Cherrapunji (Sohra)', 'Dawki', 'Mawlynnong', 'Nongriat (Root Bridges)'],
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sikkim',
    code: 'SK',
    capital: 'Gangtok',
    region: 'Northeast',
    tagline: 'Sacred Glaciers & Mt. Kangchenjunga',
    description: 'Serene Buddhist monasteries, high-altitude Tsomgo lake, vibrant rhododendron sanctuaries, and organic cuisine.',
    districtsCount: 6,
    famousFoods: ['Momos', 'Thukpa', 'Gundruk Soup', 'Phagshapa', 'Sel Roti', 'Chhang'],
    topDestinations: ['Gangtok', 'Pelling', 'Lachung & Yumthang Valley', 'Yuksom', 'Namchi', 'Ravangla'],
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80'
  }
];

// Rich Curated High-Detail Locations Catalog
export const VERIFIED_LOCATIONS: Record<string, DestinationDetail> = {
  'bhopal': {
    location: {
      id: 'bhopal',
      name: 'Bhopal',
      hindiName: 'भोपाल',
      region: 'Central',
      state: 'Madhya Pradesh',
      district: 'Bhopal',
      tier: 'tier-2',
      pinCodes: ['462001', '462002', '462003', '462016', '462021', '462030'],
      coordinates: { lat: 23.2599, lng: 77.4126 },
      tagline: 'The Majestic City of Lakes & Nawabi Grandeur',
      overview: 'Bhopal seamlessly marries the serene waters of Upper & Lower Lakes with magnificent Nawabi mosques, UNESCO prehistoric caves at Bhimbetka, and an extraordinary culinary heritage that blends Mughal, Malwi, and royal Afghan nuances.',
      bestTimeToVisit: 'October to March (Pleasant evenings by the lake, 14°C - 26°C)',
      idealDuration: '2 - 3 Days',
      weatherSnippet: { temp: '22°C', condition: 'Pleasant & Breezy', bestSeason: 'Winter (Oct - Mar)' },
      coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
      ],
      famousFor: ['Upper Lake (Bada Talab)', 'Taj-ul-Masajid', 'Bhopali Gosht Korma', 'Sulaimani Chai', 'Bhimbetka Caves', 'Shaukat Mahal']
    },
    foods: [
      {
        id: 'bhopali-korma',
        name: 'Bhopali Gosht Korma',
        category: 'traditional_main',
        description: 'Rich, slow-cooked mutton simmered in a velvet gravy flavored with fried onions, yogurt, and royal Nawabi spices.',
        originLocation: 'Old Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        isVegetarian: false,
        spiceLevel: 'Medium',
        rating: 4.9,
        priceRange: '₹250 - ₹450',
        iconicPlacesToEat: ['Hakeem Hotel (New Market & MP Nagar)', 'Zam Zam (Ibrahimpura)', 'Under The Mango Tree (Jehan Numa Palace)'],
        imageUrl: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=600&q=80',
        tags: ['Nawabi', 'Royal Special', 'Slow Cooked']
      },
      {
        id: 'bhopal-poha',
        name: 'Bhopali Poha & Jalebi',
        category: 'breakfast',
        description: 'Steamed flattened rice spiced with mustard, turmeric, crunchy peanuts, topped with Ratlami Sev and served with hot, crispy saffron jalebis.',
        originLocation: 'Old Bhopal & New Market',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 4.8,
        priceRange: '₹30 - ₹60',
        iconicPlacesToEat: ['Sharma & Vishnu Fast Food (New Market)', 'Kalyan Ji Poha (Ibrahimpura)', 'Manohar Dairy & Restaurant (Hamidia Rd)'],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        tags: ['Breakfast', 'Street Food', 'Vegetarian']
      },
      {
        id: 'sulaimani-chai',
        name: 'Bhopali Sulaimani Namkeen Chai',
        category: 'beverage',
        description: 'Iconic pink/amber salt-and-sugar sweetened spiced tea brewed in a copper samovar with cardamom and a dollop of thick fresh cream (malai).',
        originLocation: 'Chatori Gali, Old City',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 4.7,
        priceRange: '₹15 - ₹30',
        iconicPlacesToEat: ['Raju Tea Stall (Old City)', 'Chatori Gali Vendors', 'VIP Road Chowpatty'],
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        tags: ['Heritage Drink', 'Old City Signature', 'Must Try']
      },
      {
        id: 'mawa-bati',
        name: 'Mawa Bati & Gulab Jamun',
        category: 'sweet',
        description: 'Crispy golden fried sweet dumpling stuffed with dried fruits, khoya, and mawa, soaked in cardamom-rose scented sugar syrup.',
        originLocation: 'Hamidia Road',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 4.9,
        priceRange: '₹40 - ₹80',
        iconicPlacesToEat: ['Manohar Dairy (Hamidia Road & MP Nagar)', 'Brijwasi Sweets'],
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
        tags: ['Royal Sweet', 'Mawa Treat']
      }
    ],
    places: [
      {
        id: 'upper-lake',
        name: 'Upper Lake (Bhojtal) & VIP Road',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: 'lake',
        description: 'Asia’s largest man-made lake created by Raja Bhoj in the 11th century. Famous for sunset boat cruises, speedboats, and scenic lakefront drives on VIP Road.',
        address: 'VIP Road & Van Vihar Road, Bhopal',
        coordinates: { lat: 23.2458, lng: 77.3824 },
        rating: 4.7,
        reviewsCount: 14200,
        entryFee: 'Free (Boating: ₹100 - ₹500)',
        timings: '6:00 AM - 9:00 PM',
        bestTimeToVisit: 'Evenings during Sunset',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tags: ['Boating', 'Sunset', 'Iconic']
      },
      {
        id: 'taj-ul-masajid',
        name: 'Taj-ul-Masajid',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: 'mosque',
        description: 'One of the largest mosques in Asia with towering 18-storey octagonal pink minarets, marble domes, and a grand courtyard.',
        address: 'NH 12, Motia Khan, Old Bhopal',
        coordinates: { lat: 23.2647, lng: 77.3941 },
        rating: 4.8,
        reviewsCount: 9800,
        entryFee: 'Free',
        timings: '6:00 AM - 7:00 PM (Closed during prayer times for tourists)',
        bestTimeToVisit: 'Morning Light (8:00 AM - 11:00 AM)',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
        tags: ['Architecture', 'Heritage', 'Spiritual']
      },
      {
        id: 'tribal-museum',
        name: 'Madhya Pradesh Tribal Museum',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: 'museum',
        description: 'A world-class architectural masterpiece showcasing the life, dwellings, mythology, and art of Gond, Bhil, Baiga, and Sahariya indigenous tribes.',
        address: 'Shyamla Hills, Bhopal',
        coordinates: { lat: 23.2386, lng: 77.3921 },
        rating: 4.9,
        reviewsCount: 11400,
        entryFee: '₹20 (Indians), ₹400 (Foreigners)',
        timings: '12:00 PM - 8:00 PM (Closed Mondays)',
        bestTimeToVisit: 'Afternoon / Evening',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        tags: ['Culture', 'Art', 'Museum']
      },
      {
        id: 'bhimbetka-caves',
        name: 'Bhimbetka Rock Shelters (UNESCO)',
        locationName: 'Bhopal',
        district: 'Raisen / Bhopal Border',
        state: 'Madhya Pradesh',
        category: 'monument',
        description: '30,000-year-old Paleolithic cave rock paintings inside thick teak forests depicting prehistoric hunting scenes and rituals.',
        address: 'Bhimbetka, Raisen District (45 km from Bhopal)',
        coordinates: { lat: 22.9372, lng: 77.6128 },
        rating: 4.8,
        reviewsCount: 8200,
        entryFee: '₹25 per person',
        timings: '7:00 AM - 5:30 PM',
        bestTimeToVisit: 'Morning (October to March)',
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        tags: ['UNESCO World Heritage', 'Prehistoric', 'Nature']
      }
    ],
    hotels: [
      {
        id: 'jehan-numa-palace',
        name: 'Jehan Numa Palace Hotel',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: 'luxury',
        starRating: 5,
        guestRating: 4.9,
        reviewsCount: 3200,
        pricePerNight: 9500,
        address: '157 Shamla Hill, Bhopal, MP 462013',
        coordinates: { lat: 23.2421, lng: 77.3912 },
        amenities: ['Royal Horse Riding', 'Spa & Wellness', 'Fine Dining Patio', 'Swimming Pool', 'Heritage Suites', 'Free High-speed Wi-Fi'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'taj-lakefront-bhopal',
        name: 'Taj Lakefront, Bhopal',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: '5-star',
        starRating: 5,
        guestRating: 4.9,
        reviewsCount: 2800,
        pricePerNight: 8800,
        address: 'Link Road No. 3, Prempura, Bhopal',
        coordinates: { lat: 23.2185, lng: 77.3872 },
        amenities: ['Infinity Lakeview Pool', 'Jiva Spa', 'House of Ming Restaurant', 'Fitness Center', 'Valet Parking'],
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'courtyard-marriott-bhopal',
        name: 'Courtyard by Marriott Bhopal',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: '4-star',
        starRating: 4,
        guestRating: 4.6,
        reviewsCount: 2400,
        pricePerNight: 5200,
        address: 'DB City Mall, Hoshangabad Rd, Arera Hills, Bhopal',
        coordinates: { lat: 23.2332, lng: 77.4321 },
        amenities: ['Direct Mall Access', 'Rooftop Pool', 'Multi-cuisine MoMo Cafe', 'Business Lounge'],
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hotel-lake-view-ashok',
        name: 'Hotel Lake View Ashok',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: '3-star',
        starRating: 3,
        guestRating: 4.2,
        reviewsCount: 1600,
        pricePerNight: 2800,
        address: 'Shamla Hills, Bhopal',
        coordinates: { lat: 23.2441, lng: 77.3892 },
        amenities: ['Lake View Rooms', 'Restaurant', 'Free Parking', 'Room Service'],
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mpt-bhojpal-retreat',
        name: 'MPT Wind & Waves, Upper Lake',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        category: 'budget',
        starRating: 3,
        guestRating: 4.3,
        reviewsCount: 1100,
        pricePerNight: 1800,
        address: 'Near Boat Club, Shyamla Hills, Bhopal',
        coordinates: { lat: 23.2435, lng: 77.3831 },
        amenities: ['Lakefront Garden', 'Air Conditioning', 'Free Breakfast', 'Travel Desk'],
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'under-mango-tree',
        name: 'Under The Mango Tree - Jehan Numa Palace',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        cuisine: ['Royal Bhopali Nawabi', 'Barbecue', 'Mughlai'],
        rating: 4.8,
        reviewsCount: 1850,
        priceForTwo: 2200,
        isPureVeg: false,
        address: 'Jehan Numa Palace, 157 Shamla Hills, Bhopal',
        coordinates: { lat: 23.2421, lng: 77.3912 },
        mustTryDishes: ['Bhopali Gosht Korma', 'Kakori Kebab', 'Shahi Tukda'],
        timings: '7:00 PM - 11:30 PM',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'manohar-dairy-bhopal',
        name: 'Manohar Dairy & Restaurant',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        cuisine: ['North Indian', 'Street Food', 'Sweets & Desserts', 'South Indian'],
        rating: 4.7,
        reviewsCount: 9200,
        priceForTwo: 500,
        isPureVeg: true,
        address: 'Hamidia Rd & MP Nagar Zone-1, Bhopal',
        coordinates: { lat: 23.2562, lng: 77.4082 },
        mustTryDishes: ['Chole Bhature', 'Dahi Vada', 'Mawa Bati', 'Rasgulla'],
        timings: '8:00 AM - 11:00 PM',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'hakeem-hotel',
        name: 'Hakeem Hotel',
        locationName: 'Bhopal',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        cuisine: ['Mughlai', 'Bhopali Non-Veg', 'Biryani'],
        rating: 4.6,
        reviewsCount: 4800,
        priceForTwo: 700,
        isPureVeg: false,
        address: 'New Market & MP Nagar Zone-1, Bhopal',
        coordinates: { lat: 23.2341, lng: 77.4012 },
        mustTryDishes: ['Chicken Changezi', 'Mutton Rogan Josh', 'Rumali Roti'],
        timings: '11:30 AM - 11:30 PM',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      }
    ],
    nearby: [
      {
        id: 'sanchi',
        name: 'Sanchi (UNESCO Great Stupa)',
        district: 'Raisen',
        state: 'Madhya Pradesh',
        distanceKm: 48,
        travelTime: '1 hr 10 mins',
        connectivity: 'NH 86 / Bhopal-Vidisha Highway & Regular Trains',
        famousAttractions: ['Great Stupa No. 1', 'Ashoka Pillar', 'Sanchi Archaeological Museum'],
        famousFood: ['Poha Jalebi', 'Dal Bafla'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'sehore',
        name: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        distanceKm: 38,
        travelTime: '45 mins',
        connectivity: 'Bhopal-Indore State Highway (SH 18)',
        famousAttractions: ['Crescent Water Park', 'Kubereshwar Dham', 'Ancient Ganesh Mandir'],
        famousFood: ['Sharbati Wheat Roti', 'Sev Namkeen', 'Poha'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'pachmarhi',
        name: 'Pachmarhi (Queen of Satpura)',
        district: 'Narmadapuram',
        state: 'Madhya Pradesh',
        distanceKm: 195,
        travelTime: '4 hrs 30 mins',
        connectivity: 'NH 45 / Hill Ghat Road via Pipariya',
        famousAttractions: ['Bee Falls', 'Dhoopgarh Sunset Point', 'Jata Shankar Caves'],
        famousFood: ['Bhutte Ka Kees', 'Wild Mahua Honey', 'Dal Bafla'],
        hasLuxuryHotels: true,
        coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80'
      }
    ],
    verifiedLuxuryCount: 2
  },

  'sehore': {
    location: {
      id: 'sehore',
      name: 'Sehore',
      hindiName: 'सीहोर',
      region: 'Central',
      state: 'Madhya Pradesh',
      district: 'Sehore',
      tier: 'small_town',
      pinCodes: ['466001', '466002', '466114', '466651'],
      coordinates: { lat: 23.2033, lng: 77.0844 },
      tagline: 'The Cradle of Golden Sharbati Wheat & Sacred Temples',
      overview: 'Sehore is a historic district town in the Malwa plateau flanked by the Siwan River. Renowned across India for producing the world’s finest Sharbati wheat, Sehore is famous for its centuries-old Sidh Ganesha Temple, Kubereshwar Dham, and serene rural agricultural beauty.',
      bestTimeToVisit: 'October to March (Crisp rural winter breeze, 12°C - 25°C)',
      idealDuration: '1 - 2 Days',
      weatherSnippet: { temp: '23°C', condition: 'Clear & Sunny', bestSeason: 'Winter (Oct - Mar)' },
      coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
      ],
      famousFor: ['GI Tag Sharbati Wheat', 'Sidh Ganesha Mandir', 'Kubereshwar Dham', 'Malwi Dal Bafla', 'Siwan River']
    },
    foods: [
      {
        id: 'sehore-dal-bafla',
        name: 'Sehore Malwi Dal Bafla',
        category: 'traditional_main',
        description: 'Authentic dough balls made with local Sharbati wheat flour, boiled in spiced water, wood-fire baked, drenched in pure desi ghee, served with spicy toor dal and garlic chutney.',
        originLocation: 'Sehore Town & Malwa Dhaba',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Medium',
        rating: 4.9,
        priceRange: '₹140 - ₹220 per thali',
        iconicPlacesToEat: ['Shri Ram Bhojnalaya (Bhopal Naka)', 'Malwa Heritage Dhaba', 'Hotel Saroj Restaurant'],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        tags: ['Desi Ghee', 'Traditional Feast', 'Sharbati Wheat']
      },
      {
        id: 'sehore-sharbati-roti',
        name: 'Fresh Sharbati Wheat Phulka & Sev Tamatar',
        category: 'traditional_main',
        description: 'Puffed soft rotis made from authentic Sehore Sharbati wheat grain paired with tangy spicy Malwi Sev Tamatar curry and fresh green chilies.',
        originLocation: 'Local Town Dhabas',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Spicy',
        rating: 4.8,
        priceRange: '₹80 - ₹150',
        iconicPlacesToEat: ['Pappu Da Dhaba (Indore Highway)', 'Highway Treat (MPT)', 'Annapurna Bhojnalaya'],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        tags: ['Local Specialty', 'Authentic Malwi']
      },
      {
        id: 'sehore-garadu',
        name: 'Winter Crispy Fried Garadu',
        category: 'snack',
        description: 'Deep-fried spiced purple yam cubes tossed in signature tangy jeeravan masala and fresh lime juice. A beloved winter street snack.',
        originLocation: 'Ganj Market, Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Spicy',
        rating: 4.7,
        priceRange: '₹40 - ₹70',
        iconicPlacesToEat: ['Ganj Bazaar Chaat Corners', 'Bus Stand Stalls'],
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
        tags: ['Winter Street Food', 'Crispy Snack']
      }
    ],
    places: [
      {
        id: 'sidh-ganesha-sehore',
        name: 'Ancient Sidh Ganesha Mandir (Gopalpur)',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        category: 'temple',
        description: 'Built during Vikramaditya era and renovated by Peshwa Baji Rao. Believed to be one of the four sacred Ganesha shrines of historical importance.',
        address: 'Gopalpur Village, Sehore, MP 466001',
        coordinates: { lat: 23.1952, lng: 77.0681 },
        rating: 4.8,
        reviewsCount: 5400,
        entryFee: 'Free',
        timings: '5:00 AM - 9:00 PM',
        bestTimeToVisit: 'Morning Aarti (6:00 AM) or Ganesh Utsav',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tags: ['Pilgrimage', 'Ancient Heritage', 'Spiritual']
      },
      {
        id: 'kubereshwar-dham',
        name: 'Shree Kubereshwar Dham',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        category: 'temple',
        description: 'A major pilgrimage destination on the Sehore-Indore route visited by lakhs of Shiva devotees for sacred Rudraksha and prayers.',
        address: 'Chitliya Hema, Sehore, MP 466001',
        coordinates: { lat: 23.1812, lng: 77.0421 },
        rating: 4.7,
        reviewsCount: 12800,
        entryFee: 'Free',
        timings: '24 Hours',
        bestTimeToVisit: 'Early Morning',
        imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
        tags: ['Shiva Shrine', 'Devotion']
      },
      {
        id: 'crescent-resort-waterpark',
        name: 'Crescent Water Park & Adventure Zone',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        category: 'adventure',
        description: 'Central India’s premier recreational water amusement park featuring wave pools, looping slides, and landscaped gardens.',
        address: 'Gram Chuna Hazuri, Indore-Bhopal Highway, Sehore',
        coordinates: { lat: 23.2114, lng: 77.1023 },
        rating: 4.4,
        reviewsCount: 3800,
        entryFee: '₹650 per person',
        timings: '10:00 AM - 6:00 PM',
        bestTimeToVisit: 'Summer & Post-Monsoon Weekends',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tags: ['Water Park', 'Family Fun']
      }
    ],
    hotels: [
      {
        id: 'crescent-resort-sehore',
        name: 'Crescent Spa & Resort Sehore',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        category: '4-star',
        starRating: 4,
        guestRating: 4.3,
        reviewsCount: 1250,
        pricePerNight: 3800,
        address: 'Indore-Bhopal Highway, Sehore, MP 466001',
        coordinates: { lat: 23.2114, lng: 77.1023 },
        amenities: ['Water Park Access', 'Swimming Pool', 'Multi-Cuisine Dining', 'Lush Lawns', 'Free Wi-Fi'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hotel-saroj-sehore',
        name: 'Hotel Saroj & Banquet',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        category: '3-star',
        starRating: 3,
        guestRating: 4.1,
        reviewsCount: 650,
        pricePerNight: 2100,
        address: 'Bhopal Naka, Main Road, Sehore',
        coordinates: { lat: 23.2045, lng: 77.0891 },
        amenities: ['AC Rooms', 'Pure Veg Restaurant', 'Room Service', 'Parking'],
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'mpt-highway-treat-dodi',
        name: 'MPT Highway Treat, Dodi (Sehore)',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        category: 'budget',
        starRating: 3,
        guestRating: 4.2,
        reviewsCount: 890,
        pricePerNight: 1600,
        address: 'NH 86, Dodi, Sehore District, MP',
        coordinates: { lat: 23.1523, lng: 76.8921 },
        amenities: ['Restaurant', 'Highway Parking', 'Clean Restrooms', 'Garden'],
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      },
      // Nearby Verified 5-Star Fallback (Strict rule compliance!)
      {
        id: 'jehan-numa-fallback',
        name: 'Jehan Numa Palace Hotel (Nearby Luxury)',
        locationName: 'Bhopal',
        district: 'Bhopal (Adjacent District)',
        state: 'Madhya Pradesh',
        category: '5-star',
        starRating: 5,
        guestRating: 4.9,
        reviewsCount: 3200,
        pricePerNight: 9500,
        address: 'Shamla Hills, Bhopal (36 km from Sehore)',
        coordinates: { lat: 23.2421, lng: 77.3912 },
        amenities: ['Heritage Palace', 'Spa', 'Equestrian Center', 'Swimming Pool'],
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        isNearbyCityFallback: true,
        fallbackCityName: 'Bhopal',
        distanceFromSearchedLocation: '36 km (42 mins via SH 18)'
      }
    ],
    restaurants: [
      {
        id: 'shri-ram-sehore',
        name: 'Shri Ram Bhojnalaya (Authentic Malwi Thali)',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        cuisine: ['Pure Vegetarian', 'Malwi Dal Bafla', 'Thali'],
        rating: 4.7,
        reviewsCount: 1400,
        priceForTwo: 350,
        isPureVeg: true,
        address: 'Near Bhopal Naka, Sehore',
        coordinates: { lat: 23.2041, lng: 77.0862 },
        mustTryDishes: ['Desi Ghee Dal Bafla', 'Kadhi Pakora', 'Churma Ladoo'],
        timings: '11:00 AM - 10:30 PM',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'pappu-dhaba-sehore',
        name: 'Pappu Da Dhaba & Highway Treat',
        locationName: 'Sehore',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        cuisine: ['Punjabi Dhaba', 'Sev Tamatar', 'Tandoori Roti'],
        rating: 4.4,
        reviewsCount: 980,
        priceForTwo: 400,
        isPureVeg: true,
        address: 'Indore-Bhopal Bypass Road, Sehore',
        coordinates: { lat: 23.1982, lng: 77.0741 },
        mustTryDishes: ['Sharbati Wheat Butter Roti', 'Paneer Tikka Masala', 'Lassi'],
        timings: '8:00 AM - Midnight',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
      }
    ],
    nearby: [
      {
        id: 'bhopal',
        name: 'Bhopal (Capital City of Lakes)',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        distanceKm: 38,
        travelTime: '45 mins',
        connectivity: '4-lane SH 18 Expressway & Frequent Intercity Buses',
        famousAttractions: ['Upper Lake', 'Taj-ul-Masajid', 'Tribal Museum', 'Jehan Numa Palace'],
        famousFood: ['Bhopali Korma', 'Sulaimani Chai', 'Mawa Bati'],
        hasLuxuryHotels: true,
        coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'indore',
        name: 'Indore (Street Food & Commercial Capital)',
        district: 'Indore',
        state: 'Madhya Pradesh',
        distanceKm: 155,
        travelTime: '2 hrs 45 mins',
        connectivity: 'Bhopal-Indore Super Highway (SH 18)',
        famousAttractions: ['Sarafa Night Food Market', 'Rajwada Palace', 'Chappan Dukan', 'Lal Bagh'],
        famousFood: ['Indori Poha-Jalebi', 'Bhutte Ka Kees', 'Garadu', 'Sev'],
        hasLuxuryHotels: true,
        coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'ujjain',
        name: 'Ujjain (Mahakaleshwar Jyotirlinga)',
        district: 'Ujjain',
        state: 'Madhya Pradesh',
        distanceKm: 152,
        travelTime: '2 hrs 40 mins',
        connectivity: 'Via Ashta-Dewas Highway / Direct Rail',
        famousAttractions: ['Mahakaleshwar Temple', 'Mahakal Lok Corridor', 'Ram Ghat Kshipra'],
        famousFood: ['Poha-Jalebi', 'Ujjaini Sev', 'Rabdi'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      }
    ],
    verifiedLuxuryCount: 0 // Explicitly 0 for small town!
  },

  'indore': {
    location: {
      id: 'indore',
      name: 'Indore',
      hindiName: 'इन्दौर',
      region: 'Central',
      state: 'Madhya Pradesh',
      district: 'Indore',
      tier: 'tier-1',
      pinCodes: ['452001', '452002', '452003', '452010', '452018'],
      coordinates: { lat: 22.7196, lng: 75.8577 },
      tagline: 'The Street-Food Capital & Cleanest City of India',
      overview: 'Indore is the commercial and gastronomic powerhouse of Madhya Pradesh. Awarded India’s cleanest city consecutive times, Indore is world-famous for its nocturnal street food market at Sarafa Bazaar, 56 Dukan, and historic Maratha Holkar dynasty palaces.',
      bestTimeToVisit: 'October to March (15°C - 28°C)',
      idealDuration: '2 - 3 Days',
      weatherSnippet: { temp: '24°C', condition: 'Pleasant & Clean', bestSeason: 'Winter (Oct - Mar)' },
      coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'
      ],
      famousFor: ['Sarafa Night Food Market', 'Chappan Dukan', 'Indori Poha-Jalebi', 'Bhutte Ka Kees', 'Rajwada Palace', 'Lal Bagh Palace']
    },
    foods: [
      {
        id: 'indori-poha-jalebi',
        name: 'Indori Poha with Sev & Jalebi',
        category: 'breakfast',
        description: 'Light, steaming hot flattened rice seasoned with fennel, turmeric, pomegranate pearls, chopped onions, generous scoops of spicy Ujjaini/Laung Sev, and crispy saffron jalebis.',
        originLocation: 'Chappan Dukan & Sarafa',
        district: 'Indore',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Medium',
        rating: 5.0,
        priceRange: '₹30 - ₹70',
        iconicPlacesToEat: ['Prashant Poha (Jail Road)', 'Vijay Chaat House (Chappan Dukan)', 'Ravi Alpahar (Old Palasia)'],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        tags: ['Iconic Breakfast', 'GI Pride', 'Must Eat']
      },
      {
        id: 'bhutte-ka-kees',
        name: 'Bhutte Ka Kees',
        category: 'street_food',
        description: 'Grated fresh sweet corn sautéed in mustard seeds, ginger, green chilies, and simmered gently in milk until creamy, garnished with fresh coconut and coriander.',
        originLocation: 'Sarafa Bazaar',
        district: 'Indore',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 4.9,
        priceRange: '₹50 - ₹100',
        iconicPlacesToEat: ['Joshi Dahi Bada House (Sarafa)', 'Sawariya Chaat (Sarafa)'],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        tags: ['Sarafa Midnight Special', 'Corn Delicacy']
      },
      {
        id: 'garadu-chaat',
        name: 'Spicy Garadu with Jeeravan Masala',
        category: 'snack',
        description: 'Crispy deep-fried yam tossed vigorously with signature aromatic 21-spice Indori Jeeravan powder and lime.',
        originLocation: 'Sarafa Night Market',
        district: 'Indore',
        state: 'Madhya Pradesh',
        isVegetarian: true,
        spiceLevel: 'Spicy',
        rating: 4.8,
        priceRange: '₹60 - ₹120',
        iconicPlacesToEat: ['Sarafa Night Vendors', '56 Dukan Stalls'],
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
        tags: ['Midnight Snack', 'Winter Special']
      }
    ],
    places: [
      {
        id: 'sarafa-bazaar',
        name: 'Sarafa Night Food Market',
        locationName: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        category: 'market',
        description: 'A bustling jewelry market by day that transforms at 8:30 PM into one of India’s most vibrant midnight street food carnivals until 2 AM.',
        address: 'Sarafa Bazaar, Old City, Indore',
        coordinates: { lat: 22.7182, lng: 75.8543 },
        rating: 4.9,
        reviewsCount: 26000,
        entryFee: 'Free',
        timings: '8:30 PM - 2:00 AM (Midnight)',
        bestTimeToVisit: 'Night (9:30 PM onwards)',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        tags: ['Street Food Paradise', 'Midnight Culture']
      },
      {
        id: 'rajwada-palace',
        name: 'Rajwada Palace',
        locationName: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        category: 'palace',
        description: 'Seven-storey historical royal residence of the Holkar dynasty built in 1747, showcasing a rare blend of Maratha, Mughal, and French architecture.',
        address: 'MG Road, Rajwada, Indore',
        coordinates: { lat: 22.7196, lng: 75.8577 },
        rating: 4.6,
        reviewsCount: 14500,
        entryFee: '₹20 (Indians)',
        timings: '10:00 AM - 5:00 PM',
        bestTimeToVisit: 'Afternoon / Evening Light Show',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tags: ['Holkar Heritage', 'Architecture']
      }
    ],
    hotels: [
      {
        id: 'radisson-blu-indore',
        name: 'Radisson Blu Hotel Indore',
        locationName: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        category: '5-star',
        starRating: 5,
        guestRating: 4.8,
        reviewsCount: 3800,
        pricePerNight: 7200,
        address: '12 Scheme No 54, Ring Road, Indore',
        coordinates: { lat: 22.7532, lng: 75.8954 },
        amenities: ['Outdoor Pool', 'Spa & Wellness', 'Ni Hao Pan-Asian Restaurant', 'Fitness Center'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'sayaji-hotel-indore',
        name: 'Sayaji Hotel Indore',
        locationName: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        category: '5-star',
        starRating: 5,
        guestRating: 4.7,
        reviewsCount: 4200,
        pricePerNight: 6400,
        address: 'H/1, Scheme No.54, Vijay Nagar, Indore',
        coordinates: { lat: 22.7511, lng: 75.8912 },
        amenities: ['Kebabsville Barbecue', 'Bowling Alley', 'Swimming Pool', 'Banquet'],
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'vijay-chaat-house',
        name: 'Vijay Chaat House - Chappan Dukan',
        locationName: 'Indore',
        district: 'Indore',
        state: 'Madhya Pradesh',
        cuisine: ['Street Food', 'Kachori', 'Poha'],
        rating: 4.9,
        reviewsCount: 8800,
        priceForTwo: 200,
        isPureVeg: true,
        address: '56 Dukan, New Palasia, Indore',
        coordinates: { lat: 22.7241, lng: 75.8821 },
        mustTryDishes: ['Khopra Patties', 'Katori Chaat', 'Poha'],
        timings: '9:00 AM - 10:30 PM',
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
      }
    ],
    nearby: [
      {
        id: 'ujjain',
        name: 'Ujjain (Mahakaleshwar)',
        district: 'Ujjain',
        state: 'Madhya Pradesh',
        distanceKm: 55,
        travelTime: '1 hr',
        connectivity: '4-lane Indore-Ujjain Expressway & frequent Vande Bharat / Intercity trains',
        famousAttractions: ['Mahakaleshwar Temple', 'Ram Ghat', 'Harsiddhi Mandir'],
        famousFood: ['Poha', 'Sev', 'Rabdi'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'mandu',
        name: 'Mandu (City of Joy)',
        district: 'Dhar',
        state: 'Madhya Pradesh',
        distanceKm: 95,
        travelTime: '2 hrs 15 mins',
        connectivity: 'State Highway via Dhar',
        famousAttractions: ['Jahaz Mahal', 'Rupmati Pavilion', 'Baz Bahadur Palace', 'Hoshang Shah Tomb'],
        famousFood: ['Baobab Fruit Shake (Khurasani Imli)', 'Dal Bafla'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      }
    ],
    verifiedLuxuryCount: 2
  },

  'varanasi': {
    location: {
      id: 'varanasi',
      name: 'Varanasi',
      hindiName: 'वाराणसी (काशी)',
      region: 'North',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      tier: 'tier-2',
      pinCodes: ['221001', '221002', '221005', '221010'],
      coordinates: { lat: 25.3176, lng: 82.9739 },
      tagline: 'The Eternal Spiritual City on the Sacred Ganga',
      overview: 'One of the world’s oldest living cities, Varanasi (Kashi/Banaras) is India’s spiritual beating heart. With 84 ancient ghats along the Ganges, evening Ganga Aartis, Kashi Vishwanath temple corridor, and an inimitable street food legacy of Tamatar Chaat and Malaiyyo.',
      bestTimeToVisit: 'October to March (Pleasant cool ghat mornings, 12°C - 24°C)',
      idealDuration: '3 - 4 Days',
      weatherSnippet: { temp: '21°C', condition: 'Misty & Spiritual', bestSeason: 'Winter (Oct - Mar)' },
      coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
      ],
      famousFor: ['Dashashwamedh Ghat Aarti', 'Kashi Vishwanath Temple', 'Tamatar Chaat', 'Banarasi Paan', 'Malaiyyo', 'Banarasi Silk Sarees', 'Sarnath']
    },
    foods: [
      {
        id: 'varanasi-tamatar-chaat',
        name: 'Banarasi Tamatar Chaat',
        category: 'street_food',
        description: 'Simmered spiced tomato mash with crushed potatoes, cashews, raisins, ginger, and hing, drizzled with sweet sugar-cumin syrup and topped with namakpare in an earthen clay kulhad.',
        originLocation: 'Dashashwamedh & Godowlia',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        isVegetarian: true,
        spiceLevel: 'Spicy',
        rating: 5.0,
        priceRange: '₹40 - ₹80 per kulhad',
        iconicPlacesToEat: ['Kashi Chaat Bhandar (Godowlia)', 'Deena Chaat Bhandar (Luxa Road)'],
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
        tags: ['Banaras Exclusive', 'Kulhad Chaat', 'Legendary']
      },
      {
        id: 'kachori-jalebi-banaras',
        name: 'Banarasi Kachori Sabzi & Jalebi',
        category: 'breakfast',
        description: 'Crispy lentil-stuffed kachoris served with piping hot spicy black-gram & pumpkin-potato curry, paired with hot saffron jalebis.',
        originLocation: 'Kachori Gali, Vishwanath Lane',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        isVegetarian: true,
        spiceLevel: 'Spicy',
        rating: 4.9,
        priceRange: '₹35 - ₹70',
        iconicPlacesToEat: ['Ram Bhandar (Thatheri Bazaar)', 'Chachi Ki Kachori (Lanka)'],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        tags: ['Ghat Breakfast', 'Heritage Street Food']
      },
      {
        id: 'malaiyyo-banaras',
        name: 'Winter Cloud Malaiyyo (Makhan Malai)',
        category: 'sweet',
        description: 'A delicate winter dessert created by churning raw milk left overnight in the winter dew, flavored with saffron, cardamom, and chopped pistachios in an earthen cup.',
        originLocation: 'Chaukhamba & Thatheri Bazaar',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 5.0,
        priceRange: '₹50 - ₹100',
        iconicPlacesToEat: ['Shreeji Sweets (Ghee Hatta)', 'Neelkanth Sweets (Chaukhamba)'],
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
        tags: ['Winter Dew Miracle', 'Ephemeral Dessert']
      },
      {
        id: 'banarasi-paan',
        name: 'Authentic Banarasi Maghai Paan',
        category: 'snack',
        description: 'Tender melt-in-mouth Maghai betel leaf coated with kattha, chuna, gulkand, saunf, cardamom, and fragrant meetha masala.',
        originLocation: 'Godowlia Chowk',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 4.9,
        priceRange: '₹25 - ₹60',
        iconicPlacesToEat: ['Keshav Tambul Bhandar (Lanka)', 'Gopal Paan Bhandar (Godowlia)'],
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        tags: ['GI Heritage', 'World Famous']
      }
    ],
    places: [
      {
        id: 'dashashwamedh-ghat',
        name: 'Dashashwamedh Ghat & Evening Maha Aarti',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'temple',
        description: 'The main and oldest ghat where priests perform the grand synchronized brass lamp Ganga Aarti every sunset with conch shells and incense chants.',
        address: 'Dashashwamedh Ghat Road, Bangali Tola, Varanasi',
        coordinates: { lat: 25.3069, lng: 83.0104 },
        rating: 5.0,
        reviewsCount: 38000,
        entryFee: 'Free (Boat vantage: ₹200 - ₹500)',
        timings: '6:30 PM - 7:30 PM (Evening Aarti)',
        bestTimeToVisit: 'Sunset / Evening',
        imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        tags: ['Ganga Aarti', 'Iconic', 'Spiritual']
      },
      {
        id: 'kashi-vishwanath-corridor',
        name: 'Shri Kashi Vishwanath Dham Corridor',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'temple',
        description: 'One of the 12 holy Jyotirlingas dedicated to Lord Shiva with golden spire, now connected directly to the sacred Ganga River via a magnificent marble corridor.',
        address: 'Lahori Tola, Varanasi, UP 221001',
        coordinates: { lat: 25.3109, lng: 83.0107 },
        rating: 4.9,
        reviewsCount: 31000,
        entryFee: 'Free (Sugam Darshan ticket available)',
        timings: '3:00 AM - 11:00 PM',
        bestTimeToVisit: 'Mangala Aarti (3:00 AM) or Afternoon',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tags: ['Jyotirlinga', 'Holy Temple']
      },
      {
        id: 'sarnath-buddhist-site',
        name: 'Sarnath & Dhamek Stupa',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'monument',
        description: 'The Deer Park where Gautam Buddha gave his first sermon (Dhammacakkappavattana Sutta). Contains the massive 5th-century Dhamek Stupa and Ashoka Lion Capital.',
        address: 'Sarnath, 10 km north of Varanasi',
        coordinates: { lat: 25.3811, lng: 83.0214 },
        rating: 4.8,
        reviewsCount: 14000,
        entryFee: '₹25 (Indians), ₹300 (Foreigners)',
        timings: '8:00 AM - 6:00 PM',
        bestTimeToVisit: 'Morning',
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        tags: ['Buddhism', 'Ashoka Pillar', 'UNESCO Tentative']
      }
    ],
    hotels: [
      {
        id: 'taj-nadesar-palace',
        name: 'Taj Nadesar Palace, Varanasi',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'luxury',
        starRating: 5,
        guestRating: 4.9,
        reviewsCount: 1800,
        pricePerNight: 28000,
        address: 'Nadesar Palace Grounds, Varanasi, UP 221002',
        coordinates: { lat: 25.3341, lng: 82.9812 },
        amenities: ['Historic Palace Rooms', 'Royal Horse Carriage Ride', 'Jiva Spa', 'Private Butler', 'Mango Orchards'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'brijrama-palace',
        name: 'BrijRama Palace - A Heritage Hotel on the Ghats',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'luxury',
        starRating: 5,
        guestRating: 4.8,
        reviewsCount: 2200,
        pricePerNight: 16500,
        address: 'Darbhanga Ghat, Dashashwamedh, Varanasi',
        coordinates: { lat: 25.3045, lng: 83.0112 },
        amenities: ['Direct Ghat Access', 'Live Sitar & Flute Performances', 'Pure Veg Royal Dining', 'River View Suites'],
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'radisson-hotel-varanasi',
        name: 'Radisson Hotel Varanasi',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        category: '4-star',
        starRating: 4,
        guestRating: 4.5,
        reviewsCount: 2600,
        pricePerNight: 5800,
        address: 'The Mall, Cantonment, Varanasi',
        coordinates: { lat: 25.3372, lng: 82.9782 },
        amenities: ['Pool', 'Spa', 'The Great Kabab Factory', 'Airport Shuttle'],
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'kashi-chaat-bhandar',
        name: 'Kashi Chaat Bhandar',
        locationName: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        cuisine: ['Banarasi Street Food', 'Chaat'],
        rating: 4.9,
        reviewsCount: 16200,
        priceForTwo: 180,
        isPureVeg: true,
        address: 'D.37/49, Luxa Road, Godowlia, Varanasi',
        coordinates: { lat: 25.3092, lng: 83.0071 },
        mustTryDishes: ['Tamatar Chaat', 'Palak Chaat', 'Dahi Puri', 'Gulab Jamun'],
        timings: '3:30 PM - 11:00 PM',
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80'
      }
    ],
    nearby: [
      {
        id: 'prayagraj',
        name: 'Prayagraj (Triveni Sangam)',
        district: 'Prayagraj',
        state: 'Uttar Pradesh',
        distanceKm: 122,
        travelTime: '2 hrs 20 mins',
        connectivity: 'NH 19 (Grand Trunk Road) & Vande Bharat Express',
        famousAttractions: ['Triveni Sangam', 'Allahabad Fort & Akshaya Vat', 'Anand Bhavan'],
        famousFood: ['Allahabadi Guava', 'Lassi', 'Kachori'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'ayodhya',
        name: 'Ayodhya (Ram Mandir)',
        district: 'Ayodhya',
        state: 'Uttar Pradesh',
        distanceKm: 215,
        travelTime: '4 hrs',
        connectivity: 'NH 330 & Vande Bharat Express direct line',
        famousAttractions: ['Shri Ram Janmabhoomi Mandir', 'Hanuman Garhi', 'Saryu River Ghats'],
        famousFood: ['Bedmi Puri Sabzi', 'Laddoo', 'Pedas'],
        hasLuxuryHotels: false,
        coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
      }
    ],
    verifiedLuxuryCount: 2
  },

  'amritsar': {
    location: {
      id: 'amritsar',
      name: 'Amritsar',
      hindiName: 'अमृतसर',
      region: 'North',
      state: 'Punjab',
      district: 'Amritsar',
      tier: 'tier-2',
      pinCodes: ['143001', '143002', '143006', '143105'],
      coordinates: { lat: 31.6340, lng: 74.8723 },
      tagline: 'The Golden City of Peace, Valour & Rich Punjabi Flavors',
      overview: 'Home to Sri Harmandir Sahib (The Golden Temple), Amritsar is the spiritual heart of Sikhism. Famous for serving free meals to over 100,000 pilgrims daily at the Guru Ka Langar, alongside Amritsari Kulchas, creamy sweet lassi, and the historic Wagah Border ceremony.',
      bestTimeToVisit: 'October to March (Crisp Punjabi winter, 10°C - 23°C)',
      idealDuration: '2 - 3 Days',
      weatherSnippet: { temp: '19°C', condition: 'Crisp & Sunny', bestSeason: 'Winter (Oct - Mar)' },
      coverImage: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80'
      ],
      famousFor: ['Golden Temple (Harmandir Sahib)', 'Amritsari Kulcha', 'Wagah Border Ceremony', 'Jallianwala Bagh', 'Gian Chand Lassi', 'Pinni']
    },
    foods: [
      {
        id: 'amritsari-kulcha',
        name: 'Amritsari Aloo-Pyaaz Chur-Chur Kulcha',
        category: 'traditional_main',
        description: 'Multi-layered tandoor-baked flatbread stuffed with spiced potatoes, onions, anardana, drenched in melting white butter and crushed by hand, served with tangy chole and spicy tamarind-onion chutney.',
        originLocation: 'Heritage Street, Amritsar',
        district: 'Amritsar',
        state: 'Punjab',
        isVegetarian: true,
        spiceLevel: 'Medium',
        rating: 5.0,
        priceRange: '₹70 - ₹120 per plate',
        iconicPlacesToEat: ['Bhai Kulwant Singh Kulchian Wale (Heritage Street)', 'Kesar Da Dhaba (Chowk Passian)', 'Ashok Kulcha (Ranjit Avenue)'],
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        tags: ['World Famous', 'Pure Desi Ghee', 'Heritage Breakfast']
      },
      {
        id: 'amritsar-lassi',
        name: 'Amritsari Malai Peda Lassi',
        category: 'beverage',
        description: 'Thick, creamy churned sweet yogurt drink topped with a thick slab of fresh malai (clotted cream) and a crumbled mawa peda.',
        originLocation: 'Chowk Regent Cinema',
        district: 'Amritsar',
        state: 'Punjab',
        isVegetarian: true,
        spiceLevel: 'Mild',
        rating: 4.9,
        priceRange: '₹40 - ₹80',
        iconicPlacesToEat: ['Giani Gurdas Ram Jalebian Wale', 'Ahuja Milk Center (Hindu College)', 'Gian Chand Lassi'],
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        tags: ['Creamy Delight', 'Iconic Beverage']
      }
    ],
    places: [
      {
        id: 'golden-temple',
        name: 'Sri Harmandir Sahib (Golden Temple)',
        locationName: 'Amritsar',
        district: 'Amritsar',
        state: 'Punjab',
        category: 'gurudwara',
        description: 'The holiest Sikh gurudwara gilded in 750 kg of pure gold, surrounded by the sacred Amrit Sarovar. Serves the world’s largest free community kitchen (Langar).',
        address: 'Golden Temple Road, Atta Mandi, Amritsar',
        coordinates: { lat: 31.6200, lng: 74.8765 },
        rating: 5.0,
        reviewsCount: 52000,
        entryFee: 'Free (Head covering mandatory)',
        timings: '24 Hours Open',
        bestTimeToVisit: 'Early Morning (4:00 AM Palki Sahib) or Night Light',
        imageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80',
        tags: ['Spiritual Sanctum', 'Gold Shrine', '24 Hours']
      },
      {
        id: 'wagah-border',
        name: 'Wagah-Attari Border Beating Retreat',
        locationName: 'Amritsar',
        district: 'Amritsar',
        state: 'Punjab',
        category: 'monument',
        description: 'Electrifying daily military parade and flag-lowering ceremony conducted by the Indian Border Security Force (BSF) and Pakistan Rangers.',
        address: 'Attari-Wagah Border, 30 km from Amritsar',
        coordinates: { lat: 31.6044, lng: 74.5732 },
        rating: 4.9,
        reviewsCount: 29000,
        entryFee: 'Free',
        timings: '4:30 PM - 6:00 PM',
        bestTimeToVisit: 'Reach by 3:00 PM for stadium seating',
        imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
        tags: ['Patriotism', 'BSF Ceremony']
      }
    ],
    hotels: [
      {
        id: 'taj-swarna-amritsar',
        name: 'Taj Swarna, Amritsar',
        locationName: 'Amritsar',
        district: 'Amritsar',
        state: 'Punjab',
        category: '5-star',
        starRating: 5,
        guestRating: 4.8,
        reviewsCount: 3100,
        pricePerNight: 8200,
        address: 'Plot No. C-3, Outer Circular Road, Opp. Basant Avenue, Amritsar',
        coordinates: { lat: 31.6512, lng: 74.8812 },
        amenities: ['Jiva Spa', 'Swimming Pool', 'The Grill Room', 'Grand Ballroom'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    restaurants: [
      {
        id: 'kesar-da-dhaba',
        name: 'Kesar Da Dhaba (Since 1916)',
        locationName: 'Amritsar',
        district: 'Amritsar',
        state: 'Punjab',
        cuisine: ['Punjabi Vegetarian', 'Desi Ghee Delicacies', 'Dal Makhani'],
        rating: 4.8,
        reviewsCount: 14000,
        priceForTwo: 550,
        isPureVeg: true,
        address: 'Chowk Passian, Near Telephone Exchange, Amritsar',
        coordinates: { lat: 31.6231, lng: 74.8732 },
        mustTryDishes: ['Slow-cooked Dal Makhani (12 hours)', 'Lachha Paratha', 'Phirni in Kulhad'],
        timings: '11:30 AM - 11:00 PM',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    nearby: [],
    verifiedLuxuryCount: 1
  }
};

// Generic / Dynamic Generator for ANY Indian city/town/village not in the immediate static catalog
export function generateDynamicLocationDetails(query: string, matchedState?: StateInfo): DestinationDetail {
  const cleanName = query.trim().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const state = matchedState || ALL_INDIAN_STATES[0];
  const isSmallTown = true;

  return {
    location: {
      id: cleanName.toLowerCase().replace(/\s+/g, '-'),
      name: cleanName,
      hindiName: cleanName,
      region: state.region,
      state: state.name,
      district: `${cleanName} District`,
      tier: 'town',
      pinCodes: [`${Math.floor(100000 + Math.random() * 800000)}`],
      coordinates: { lat: 23.2 + (Math.random() * 2 - 1), lng: 77.4 + (Math.random() * 2 - 1) },
      tagline: `Discover the Hidden Charm & Authentic Heritage of ${cleanName}`,
      overview: `${cleanName} is an authentic Indian destination nestled in ${state.name}. Blessed with regional cultural traditions, local cuisine, and close-knit community life, it offers travelers an offbeat glimpse into India’s diverse heartland.`,
      bestTimeToVisit: 'October to March (Pleasant seasonal climate)',
      idealDuration: '1 - 2 Days',
      weatherSnippet: { temp: '23°C', condition: 'Pleasant & Clear', bestSeason: 'Winter (Oct - Mar)' },
      coverImage: state.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gallery: [state.coverImage],
      famousFor: state.famousFoods.slice(0, 3)
    },
    foods: state.famousFoods.map((foodName, idx) => ({
      id: `dynamic-food-${idx}`,
      name: `${foodName}`,
      category: idx === 0 ? 'traditional_main' : idx === 1 ? 'breakfast' : 'street_food',
      description: `Authentic regional delicacy prepared according to traditional culinary practices of ${state.name}.`,
      originLocation: `${cleanName} & ${state.name}`,
      district: `${cleanName} Region`,
      state: state.name,
      isVegetarian: !foodName.toLowerCase().includes('chicken') && !foodName.toLowerCase().includes('meat') && !foodName.toLowerCase().includes('fish') && !foodName.toLowerCase().includes('korma'),
      spiceLevel: 'Medium',
      rating: 4.8,
      priceRange: '₹60 - ₹180',
      iconicPlacesToEat: [`Main Market ${cleanName}`, `Local Sweet Shops`],
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      tags: ['Regional Heritage', 'Verified Local Food']
    })),
    places: [
      {
        id: `place-1-${cleanName}`,
        name: `Heritage Centre & Historic Temple of ${cleanName}`,
        locationName: cleanName,
        district: `${cleanName} District`,
        state: state.name,
        category: 'temple',
        description: `Historic local landmark and revered spiritual spot representing the architecture and devotion of ${state.name}.`,
        address: `Main Town Area, ${cleanName}`,
        coordinates: { lat: 23.25, lng: 77.42 },
        rating: 4.7,
        reviewsCount: 1200,
        entryFee: 'Free',
        timings: '6:00 AM - 8:30 PM',
        bestTimeToVisit: 'Morning / Evening',
        imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tags: ['Cultural Spot', 'Local Heritage']
      },
      {
        id: `place-2-${cleanName}`,
        name: `${cleanName} Nature Viewpoint & Lake`,
        locationName: cleanName,
        district: `${cleanName} District`,
        state: state.name,
        category: 'nature',
        description: `Scenic outdoor nature destination with pleasant breezes, local trees, and serene sunset vistas.`,
        address: `Outskirts of ${cleanName}`,
        coordinates: { lat: 23.28, lng: 77.45 },
        rating: 4.6,
        reviewsCount: 840,
        entryFee: 'Free',
        timings: 'Sunrise to Sunset',
        bestTimeToVisit: 'Sunset',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tags: ['Nature', 'Sunset Point']
      }
    ],
    hotels: [
      {
        id: `hotel-budget-${cleanName}`,
        name: `${cleanName} Heritage Guest House & Stays`,
        locationName: cleanName,
        district: `${cleanName} District`,
        state: state.name,
        category: 'budget',
        starRating: 3,
        guestRating: 4.2,
        reviewsCount: 420,
        pricePerNight: 1400,
        address: `Station Road, ${cleanName}`,
        coordinates: { lat: 23.24, lng: 77.41 },
        amenities: ['Clean Rooms', 'Local Meals', 'Room Service', 'Wi-Fi'],
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: `hotel-3star-${cleanName}`,
        name: `Hotel Grand ${cleanName}`,
        locationName: cleanName,
        district: `${cleanName} District`,
        state: state.name,
        category: '3-star',
        starRating: 3,
        guestRating: 4.3,
        reviewsCount: 650,
        pricePerNight: 2200,
        address: `Main Highway Road, ${cleanName}`,
        coordinates: { lat: 23.23, lng: 77.43 },
        amenities: ['AC Deluxe Rooms', 'Restaurant', 'Parking', 'Free Wi-Fi'],
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
      },
      // Strict small-town rule fallback: Show nearby city luxury stay
      {
        id: `fallback-luxury-${cleanName}`,
        name: `Luxury Palace Hotel (Nearest Major City Hub)`,
        locationName: state.capital,
        district: `${state.capital} District`,
        state: state.name,
        category: '5-star',
        starRating: 5,
        guestRating: 4.9,
        reviewsCount: 3200,
        pricePerNight: 8500,
        address: `${state.capital}, ${state.name} (Nearby City)`,
        coordinates: { lat: 23.26, lng: 77.41 },
        amenities: ['5-Star Luxury', 'Spa', 'Swimming Pool', 'Fine Dining'],
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        isNearbyCityFallback: true,
        fallbackCityName: state.capital,
        distanceFromSearchedLocation: `approx. 45-65 km from ${cleanName}`
      }
    ],
    restaurants: [
      {
        id: `rest-1-${cleanName}`,
        name: `Annapurna Pure Veg Family Restaurant`,
        locationName: cleanName,
        district: `${cleanName} District`,
        state: state.name,
        cuisine: ['North Indian', 'Local Thali', 'Snacks'],
        rating: 4.6,
        reviewsCount: 890,
        priceForTwo: 350,
        isPureVeg: true,
        address: `Market Chowk, ${cleanName}`,
        coordinates: { lat: 23.25, lng: 77.42 },
        mustTryDishes: state.famousFoods.slice(0, 2),
        timings: '8:00 AM - 10:30 PM',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    nearby: [
      {
        id: `nearby-cap-${cleanName}`,
        name: `${state.capital} (State Capital)`,
        district: `${state.capital} District`,
        state: state.name,
        distanceKm: 48,
        travelTime: '1 hr 15 mins',
        connectivity: 'Direct State Highway & Express Buses',
        famousAttractions: state.topDestinations.slice(0, 3),
        famousFood: state.famousFoods.slice(0, 2),
        hasLuxuryHotels: true,
        coverImage: state.coverImage
      }
    ],
    verifiedLuxuryCount: 0 // Small town rule!
  };
}

export function getLocationDetails(queryOrId: string): DestinationDetail {
  const normalized = queryOrId.toLowerCase().trim();
  
  if (VERIFIED_LOCATIONS[normalized]) {
    return VERIFIED_LOCATIONS[normalized];
  }

  // Check state match
  const matchedState = ALL_INDIAN_STATES.find(s => 
    s.name.toLowerCase() === normalized || 
    s.topDestinations.some(d => d.toLowerCase().includes(normalized)) ||
    s.code.toLowerCase() === normalized
  );

  return generateDynamicLocationDetails(queryOrId, matchedState);
}

export function searchLocations(query: string): Array<{
  id: string;
  name: string;
  district: string;
  state: string;
  type: string;
  pinCodeSample?: string;
}> {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  const results: Array<{
    id: string;
    name: string;
    district: string;
    state: string;
    type: string;
    pinCodeSample?: string;
  }> = [];

  // Check verified locations
  Object.values(VERIFIED_LOCATIONS).forEach(detail => {
    const loc = detail.location;
    if (
      loc.name.toLowerCase().includes(q) ||
      loc.district.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      loc.pinCodes.some(pin => pin.startsWith(q)) ||
      loc.famousFor.some(f => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: loc.id,
        name: loc.name,
        district: loc.district,
        state: loc.state,
        type: loc.tier === 'metro' ? 'Metro City' : loc.tier === 'small_town' ? 'Town / Tehsil' : 'City',
        pinCodeSample: loc.pinCodes[0]
      });
    }
  });

  // Check state databases & top destinations
  ALL_INDIAN_STATES.forEach(st => {
    st.topDestinations.forEach(dest => {
      if (
        dest.toLowerCase().includes(q) &&
        !results.some(r => r.name.toLowerCase() === dest.toLowerCase())
      ) {
        results.push({
          id: dest.toLowerCase().replace(/\s+/g, '-'),
          name: dest,
          district: `${dest} District`,
          state: st.name,
          type: 'Tourist Destination / Town'
        });
      }
    });

    if (st.name.toLowerCase().includes(q)) {
      results.push({
        id: st.name.toLowerCase().replace(/\s+/g, '-'),
        name: st.name,
        district: `Capital: ${st.capital}`,
        state: `${st.region} India`,
        type: 'State'
      });
    }
  });

  // If query looks like a specific town name that is not yet indexed, allow instant search suggestion!
  if (results.length === 0 && q.length >= 2) {
    results.push({
      id: q,
      name: q.charAt(0).toUpperCase() + q.slice(1),
      district: 'Explore District & Tehsil',
      state: 'India',
      type: 'Location in India'
    });
  }

  return results.slice(0, 8);
}
