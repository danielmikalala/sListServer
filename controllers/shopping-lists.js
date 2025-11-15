const dummy = require("../data/dummydata");

function nextId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

function ensureLists() {
  return dummy.lists || [];
}

function ensureUsers() {
  return dummy.users || [];
}

exports.handlerGetShoppingLists = (req, res) => {
  try {
    const lists = ensureLists();
    const userId = req.userId;

    const userLists = lists.filter(
      (l) => l.ownerId === userId || (l.members && l.members.includes(userId))
    );

    res.json(userLists);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerGetShoppingList = (req, res) => {
  try {
    const lists = ensureLists();
    const list = lists.find((l) => l.id === req.params.id);
    if (!list) return res.status(404).json({ error: "Not found" });

    if (list.ownerId !== req.userId && (!list.members || !list.members.includes(req.userId))) {
      return res.status(403).json({ error: "Forbidden: you are not a member or owner of this list" });
    }

    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerCreateList = (req, res) => {
  try {
    const lists = ensureLists();
    const users = ensureUsers();
    const userId = req.userId; 
    const newObject = Object.assign(
      {
        id: nextId(),
        name: req.body.name,
        ownerId: userId,
        members: [],
        items: [],
        isArchived: false,
      },
      req.body
    );

    const user = users.find((u) => u.id === userId);
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.lists.push(newObject.id);
    lists.push(newObject);
    res.status(201).json(newObject);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerUpdateList = (req, res) => {
  try {
    const lists = ensureLists();
    const id = req.params.id || req.body.listId;
    const idx = lists.findIndex((l) => l.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const list = lists[idx];
    if (list.ownerId !== req.userId) {
      return res.status(403).json({ error: "Forbidden: only owner can update the list" });
    }

    const updated = Object.assign({}, list, req.body);
    updated.id = list.id;
    updated.ownerId = list.ownerId;
    updated.members = Array.isArray(updated.members) ? updated.members : list.members || [];
    updated.items = Array.isArray(updated.items) ? updated.items : list.items || [];

    lists[idx] = updated;
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerDeleteList = (req, res) => {
  try {
    const lists = ensureLists();
    const users = ensureUsers();

    const id = req.params.id || req.body.listId;
    const listIdx = lists.findIndex((l) => l.id === id);
    if (listIdx === -1) return res.status(404).json({ error: "Not found" });

    const list = lists[listIdx];
    if (list.ownerId !== req.userId) {
      return res.status(403).json({ error: "Forbidden: only owner can delete the list" });
    }

    const userIdsToUpdate = [list.ownerId];
    if (list.members && Array.isArray(list.members)) {
      userIdsToUpdate.push(...list.members);
    }

    users.forEach((user) => {
      if (userIdsToUpdate.includes(user.id)) {
        if (user.lists && Array.isArray(user.lists)) {
          const userListIdx = user.lists.findIndex((listId) => listId === id);
          if (userListIdx !== -1) {
            user.lists.splice(userListIdx, 1);
          }
        }
      }
    });

    lists.splice(listIdx, 1);
    res.status(204).send(id);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerAddMember = (req, res) => {
  try {
    const users = ensureUsers();
    const lists = ensureLists();

    const listId = req.params.id;
    const list = lists.find((l) => l.id === listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    if (list.ownerId !== req.userId) {
      return res.status(403).json({ error: "Forbidden: only owner can add members" });
    }

    list.members = list.members || [];

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const userIdStr = String(userId);
    const user = users.find((u) => u.id === userIdStr);
    if (!user) return res.status(404).json({ error: "User does not exist" });

    if (list.members.includes(userIdStr)) {
      return res.status(400).json({ error: "User is already a member" });
    }

    list.members.push(userIdStr);

    user.lists = user.lists || [];
    if (!user.lists.includes(listId)) user.lists.push(listId);

    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerRemoveMember = (req, res) => {
  try {
    const users = ensureUsers();
    const lists = ensureLists();

    const listId = req.params.id;
    const list = lists.find((l) => l.id === listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    if (list.ownerId !== req.userId) {
      return res.status(403).json({ error: "Forbidden: only owner can remove members" });
    }

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const userIdStr = String(userId);
    list.members = list.members || [];

    const idx = list.members.indexOf(userIdStr);
    if (idx === -1) return res.status(404).json({ error: "Member not found" });

    list.members.splice(idx, 1);

    const user = users.find((u) => u.id === userIdStr);
    if (user && Array.isArray(user.lists)) {
      const userListIdx = user.lists.indexOf(listId);
      if (userListIdx !== -1) user.lists.splice(userListIdx, 1);
    }

    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};
