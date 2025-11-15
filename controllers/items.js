const dummy = require("../data/dummydata");

function nextId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

function ensureItems() {
  return dummy.items || [];
}

function ensureLists() {
  return dummy.lists || [];
}

function userCanAccessList(userId, list) {
  if (!list) return false;
  return list.ownerId === userId || (list.members && list.members.includes(userId));
}

exports.handlerGetItems = (req, res) => {
  try {
    res.json(ensureItems());
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerGetItem = (req, res) => {
  try {
    const items = ensureItems();
    const id = req.params.id;
    const item = items.find((i) => i.id === id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerAddItem = (req, res) => {
  try {
    const items = ensureItems();
    const lists = ensureLists();

    const list = lists.find((l) => l.id === req.params.listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    if (!userCanAccessList(req.userId, list)) {
      return res.status(403).json({ error: "Forbidden: you are not a member or owner of this list" });
    }

    const newItem = Object.assign(
      {
        id: nextId(),
        name: req.body.name,
        isChecked: false,
      },
      req.body
    );

    newItem.id = newItem.id;
    items.push(newItem);
    list.items = list.items || [];
    list.items.push(newItem.id);
    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerRemoveItem = (req, res) => {
  try {
    const items = ensureItems();
    const lists = ensureLists();

    const list = lists.find((l) => l.id === req.params.listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    if (list.ownerId !== req.userId) {
      return res.status(403).json({ error: "Forbidden: only owner can remove items" });
    }

    const itemIdx = list.items.findIndex((i) => i === req.body.itemId);
    if (itemIdx === -1)
      return res.status(404).json({ error: "Item not found" });
    const globalItemIdx = items.findIndex((i) => i.id === req.body.itemId);
    if (globalItemIdx === -1)
      return res.status(404).json({ error: "Item not found" });

    list.items.splice(itemIdx, 1);
    items.splice(globalItemIdx, 1);

    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerUpdateItem = (req, res) => {
  try {
    const items = ensureItems();
    const id = req.params.id;
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return res.status(404).json({ error: "Item not found" });

    const existing = items[idx];
    const updated = Object.assign({}, existing, req.body);
    updated.id = existing.id;
    items[idx] = updated;
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerCheckItem = (req, res) => {
  try {
    const items = ensureItems();
    const lists = ensureLists();
    const id = req.params.id;
    const item = items.find((i) => i.id === id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const list = lists.find((l) => (l.items || []).includes(id));
    if (!list) return res.status(404).json({ error: "List not found" });

    if (!userCanAccessList(req.userId, list)) {
      return res.status(403).json({ error: "Forbidden: you are not a member or owner of this list" });
    }

    item.isChecked = req.body.isChecked;
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};
