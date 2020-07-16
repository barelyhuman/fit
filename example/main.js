(function () {
  const container = document.getElementById("test-container");

  // Working Case
  fit("https://jsonplaceholder.typicode.com/todos/1")
    .get()
    .then((data) => {
      container.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
    })
    .catch((err) => {
      console.log(err);
    });

  fit("https://jsonplaceholder.typicode.com/posts")
    .post("hello")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // Error Case
  fit("https://jsonplaceholder.typicode.com/posts")
    .delete()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log({ Error: err });
    });
})();
