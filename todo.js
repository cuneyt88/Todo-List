//selecting all elements
const form = document.getElementById("todo-form");
const todoInput= document.querySelector("#todo");
const todoList = document.querySelector(".list-group");

const firstCardBody= document.querySelectorAll(".card-body")[0];
const secondCardBody= document.querySelectorAll(".card-body")[1];
const filter= document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI)
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Are you sure to clear all todos?")){
        // todoList.innerHTML=""; //yavaş yöntem
        while(todoList.firstElementChild !=null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            //bulamadı
            listItem.setAttribute("style","display:none !important");
        }else{
            listItem.setAttribute("style","display:block");
        }
    })
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo deleted successfully")
    }
}

function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo)
    })
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
        }
    }),localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo===""){
        showAlert("danger", "Please enter a Todo");
    }else{
        addTodoUI(newTodo);
        addTodoStorage(newTodo)
        showAlert("success","Todo entered successfully")
    }
    


    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo)

    localStorage.setItem("todos",JSON.stringify(todos))
}

function showAlert(type,message){
    const alert =document.createElement("div");

    alert.className= `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert)

    setTimeout(function(){
        alert.remove();
    },2000)
}

function addTodoUI(newTodo){

    // <li class="list-group-item d-flex justify-content-between">
    //          Todo 1
    //         <a href = "#" class ="delete-item">
    //                 <i class = "fa fa-remove"></i>
    //         </a>

    //  </li>

    const listItem=document.createElement("li");
    const link=document.createElement("a");
    link.href = "#";
    link.className="delete-item";
    link.innerHTML="<i class= 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";

    //text node ekleme

    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link);

    //todo liste list item ekleme

    todoList.appendChild(listItem);
    todoInput.value="";

}


