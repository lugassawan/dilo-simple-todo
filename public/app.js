const generateTodo = function(todo) {
	const p = document.createElement("p");
	p.textContent = todo.text;
	return p;
};
const renderTodos = function(todos) {
	document.querySelector("#todos").innerHTML = "";
	todos.forEach(function(todo) {
		document.querySelector("#todos").appendChild(generateTodo(todo));
	});
};

//save todo
const saveTodo = function(todo) {
	axios
		.post("/api/todos", todo)
		.then(result => console.log(result.data))
		.catch(error => console.log(error));
};

document.querySelector("#new-todos").addEventListener("submit", function(e) {
	e.preventDefault();
	const todo = {
		title: e.target.elements.title.value,
		description: e.target.elements.description.value,
		completed: false
	};

	//renderTodos(todos);
	saveTodo(todo);
	e.target.elements.title.value = "";
	e.target.elements.description.value = "";
});
// renderTodos(todos);
