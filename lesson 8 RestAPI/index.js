const baseURL = "https://jsonplaceholder.typicode.com/todos";
function getTodos() {
    fetch(baseURL)
        .then(function (response) {
            console.log(response); //just to check
            return response.json();
        })
        .then(function (data) {
            const todosContainer = document.getElementById("todosContainer");
            for (let i = 0; i < data.length; i++) {
                todosContainer.innerHTML += `
            <div> 
                <p> ${data[i].title} </p>
            </div>
            `;
            }
        })
}

// getTodos();
