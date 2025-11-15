module.exports = {
  users: [
    {
      id: "1763219513977",
      name: "Tester",
      email: "tester@gmail.com",
      password: "$2b$12$1WC/RBj190fkSjj9S9ccTOeAwAMHkpvcW1EBR3habjdJjOV7Cm9YW",
      lists: ["1763219619259","1763219619261"],
    },
    {
      id: "1763209819520",
      name: "Admin",
      email: "admin@gmail.com",
      password: "$2b$12$BhgOn1yIb5axI66bXs3V1unIkw2mkWtZI8ZSLij9pVKug57hJVLTu",
      lists: ["1763219619259","1763219619261"],
    },
    {
      id: "1763219881702",
      email: "adamnovak@gmail.com",
      password: "$2b$12$3q0sVhtow4VnqDRxsBlt0elY6eMzU/o3.qE2wClRvU8O/bkEX3vj2",
      lists: ["1763219619261","1763219619272"],
    },
    {
      id: "1763219904642",
      email: "pepakralicek@gmail.com",
      password: "$2b$12$GGO1Ya5PJ68Ehw2rtKu2keOqeDEi/jtcAtj2gaM2jfiMrBBss3HXO",
      lists: ["1763219619261","1763219619272"],
    },
    {
      id: "1763219943692",
      email: "tomaskratky@gmail.com",
      password: "$2b$12$T54RQAzsPyRkIHQCJknwheEdz7gIjrHtIvdS4NwnJWXJ/vy0pE77C",
      lists: ["1763219619272"],
    },
  ],
  lists: [
    {
      id: "1763219619259",
      name: "My Shopping List",
      ownerId: "1763209819520",
      members: ["1763219513977"],
      items: ["1763220281655","1763220233542","1763220289760"],
      isArchived: false,
    },
    {
      id: "1763219619261",
      name: "New Computer Components",
      ownerId: "1763219513977",
      members: ["1763209819520", "1763219881702", "1763219904642"],
      items: ["1763220289761"],
      isArchived: false,
    },
    {
      id: "1763219619272",
      name: "School Supplies",
      ownerId: "1763219943692",
      members: ["1763219881702", "1763219904642"],
      items: ["1763220289758", "1763220289759"],
      isArchived: false,
    },
  ],
  items: [
    {
      id: "1763220233542",
      name: "Milk",
      isChecked: false,
    },
    {
      id: "1763220281655",
      name: "Bread",
      isChecked: false,
    },
    {
      id: "1763220289758",
      name: "Monster Mango Loco",
      isChecked: false,
    },
    {
      id: "1763220289759",
      name: "Red Bull",
      isChecked: false,
    },
    {
      id: "1763220289760",
      name: "Salt Chips",
      isChecked: false,
    },
    {
      id: "1763220289761",
      name: "Graphics Card",
      isChecked: false,
    },
  ],
};
