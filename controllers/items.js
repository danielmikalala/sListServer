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

    const newItem = Object.assign(
      {
        id: nextId(),
        name: req.body.name,
        checked: false,
      },
      req.body
    );

    const list = lists.find((l) => l.id === req.params.listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    newItem.id = newItem.id;
    items.push(newItem);
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
    const item = items.find((i) => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.checked = req.body.isChecked;
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};
