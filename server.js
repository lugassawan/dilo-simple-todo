const express = require("express");
const bodyParser = require("body-parser");

const db  = require("./database/db");
const { todosDB } = require("./database/db");

const server = express();
const PORT = process.env.PORT || 5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

/**
 * GET /todos
 */
server.get("/api/todos", (req, res) => {
	res.status(200).send({ success: true, result: todosDB });
});

/**
 * POST /todos
 */
server.post("/api/todos", (req, res) => {
	const { title, description } = req.body;
	if (!title || !description) {
		res
			.status(400)
			.send({ success: false, result: "Field tidak boleh kosong" });
	}

	db.create({
		id: todosDB.length > 0 ? todosDB[todosDB.length - 1].id + 1 : 1,
		title: title,
		description: description,
		completed: false
	});

	res.status(201).send({ success: true, result: "Todo ditambahkan" });
});

/**
 * GET /todos/:todoId
 */
server.get("/api/todos/:todoId", (req, res) => {
	const id = parseInt(req.params.todoId);
	const todoData = todosDB.find(todo => todo.id === id);
	if (!todoData) {
		res.status(404).send({ success: false, result: "Todo tidak ditemukan" });
	}

	res.status(200).send({ success: true, result: todoData });
});

/**
 * PUT /todos/:todoId
 */
server.put("/api/todos/:todoId", (req, res) => {
	const id = parseInt(req.params.todoId);
	const todoIndex = todosDB.findIndex(todo => todo.id === id);
	if (!todoIndex) {
		res.status(404).send({ success: false, result: "Todo tidak ditemukan" });
	}

	const todoData = todosDB[todoIndex];

	todosDB[todoIndex].completed = !todoData.completed;

	res.status(200).send({ success: true, result: "Todo berhasil diperbarui" });
});

/**
 * DELETE /todos:todoId
 */
server.delete("/api/todos/:todoId", (req, res) => {
	const id = parseInt(req.params.todoId);
	const todoIndex = todosDB.findIndex(todo => todo.id === id);
	if (!todoIndex) {
		res.status(404).send({ success: false, result: "Todo tidak ditemukan" });
	}

	todosDB.splice(todoIndex, 1);
	res.status(200).send({ success: true, result: "Todo berhasil dihapus" });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
