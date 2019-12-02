const todosDB = [];

const create = todo => todosDB.push(todo);

module.exports = { todosDB, create };
