module.exports = {
  lists: [
    {
      id: "1",
      name: "Groceries",
      ownerId: "0",
      members: ["1", "2"],
      items: ["1"],
      isArchived: false,
    },
    {
      id: "2",
      name: "Hardware",
      ownerId: "1",
      members: ["0"],
      items: ["1", "2", "3"],
      isArchived: false,
    },
  ],

  users: [
    {
      id: "0",
      name: "Test User 0",
      email: "test@gmail.com",
      password: "password123",
      lists: [],
    },
    {
      id: "1",
      name: "Test User 1",
      email: "test@gmail.com",
      password: "password123",
      lists: [],
    },
    {
      id: "1763209819520",
      name: "Admin",
      email: "admin@gmail.com",
      password: "$2b$12$BhgOn1yIb5axI66bXs3V1unIkw2mkWtZI8ZSLij9pVKug57hJVLTu",
      lists: [],
    },
  ],
  items: [
    {
      id: "1",
      name: "Milk",
      checked: false,
    },
    {
      id: "2",
      name: "Bread",
      checked: false,
    },
    {
      id: "3",
      name: "Eggs",
      checked: true,
    },
  ],
};
