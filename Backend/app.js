// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// let items = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   { id: 3, name: "Item 3" },
// ];

// app.get("/api/items", (req, res) => {
//   res.json(items);
// });

// app.post("/api/items", (req, res) => {
//   const newItem = { id: items.length + 1, name: req.body.name };
//   items.push(newItem);
//   res.json(newItem);
// });

// app.delete("/api/items/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   items = items.filter((item) => item.id !== id);
//   res.json({ message: "Item deleted successfully" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
