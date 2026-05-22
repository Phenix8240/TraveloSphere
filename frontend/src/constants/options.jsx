// travelOptions.js

export const travelOptions = [
    {
      id: 1,
      title: "Just Me",
      description: "A solo travel in exploration.",
      icon: "😀",
      people: "1"
    },
    {
      id: 2,
      title: "Couple",
      description: "A romantic getaway for two.",
      icon: "❤️",
      people: "2"
    },
    {
      id: 3,
      title: "Family",
      description: "A fun-filled trip with the entire family.",
      icon: "👨‍👩‍👧‍👦",
      people: "3+"
    },
    {
      id: 4,
      title: "Friends",
      description: "An adventurous trip with friends.",
      icon: "👯",
      people: "3+"
    },
    {
      id: 5,
      title: "Adventure",
      description: "For those seeking thrilling adventures.",
      icon: "🧗‍♂️",
      people: "1+"
    },
    {
      id: 6,
      title: "Business",
      description: "Travel for work or business purposes.",
      icon: "💼",
      people: "1"
    },
    {
      id: 7,
      title: "Relaxation",
      description: "A relaxing retreat to unwind and rejuvenate.",
      icon: "🌴",
      people: "1+"
    },
    {
      id: 8,
      title: "Group",
      description: "Organized trips for large groups or tours.",
      icon: "🧳",
      people: "5+"
    }
  ];
  
  export const budgetOptions = [
    {
      id: 1,
      title: "Budget",
      description: "Affordable travel options that are easy on the wallet.",
      icon: "💵",
      budgetRange: "$0 - $500"
    },
    {
      id: 2,
      title: "Mid-Range",
      description: "Comfortable travel with a moderate budget.",
      icon: "💳",
      budgetRange: "$500 - $1500"
    },
    {
      id: 3,
      title: "Luxury",
      description: "High-end travel experiences with premium amenities.",
      icon: "💎",
      budgetRange: "$1500 - $5000"
    },
    {
      id: 4,
      title: "Ultra-Luxury",
      description: "Exclusive and extravagant travel options for the elite.",
      icon: "🌟",
      budgetRange: "$5000+"
    },
    {
      id: 5,
      title: "Student",
      description: "Travel options tailored for students with a limited budget.",
      icon: "🎓",
      budgetRange: "$0 - $300"
    },
    {
      id: 6,
      title: "Family-Friendly",
      description: "Travel options that offer great value for families.",
      icon: "👨‍👩‍👧‍👦",
      budgetRange: "$500 - $2000"
    },
    {
      id: 7,
      title: "Business",
      description: "Premium travel options for business professionals.",
      icon: "💼",
      budgetRange: "$1000 - $3000"
    }
  ];
  
  export const AI_PROMPT="Generate Travel Plan for Location: {location}, for{totalDays} Dyas for {traveller} with a {budget} budget, give me {location} address,description, best season to visit, famous food, local and culutral events, natural features of that area(including Moutain,lake, forest, river, waterfall etc. ) and Hotels list including  each Hotel's name, hoteladdress, hotel image URL, geo coordinates, rating, descriptions, price and suggest itinerary with placename, place details, Place image url, Geo Coordinates ticket pricing, rating, time travel to each location for {totalDays} with each day plan with the best time to visit in JSON format." 