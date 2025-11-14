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
      id: "2",
      name: "Test User 2",
      email: "test@gmail.com",
      password: "password123",
      lists: [],
    },
  ],
  items: [
    {
      id: "1",
      name: "Milk"
    },
    {
      id: "2",
      name: "Bread"
    },
    {
      id: "3",
      name: "Eggs"
    },
  ],
};
