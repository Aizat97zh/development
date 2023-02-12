const postListContainer = document.getElementById("post-list");
const commentListContainer = document.getElementById("comment-list");

const getData = async (url = "", params = {}) => {
  const response = await fetch(url + new URLSearchParams(params), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

async function getPostById(postId) {
  await getData("https://jsonplaceholder.typicode.com/posts?", {
    id: postId,
  }).then((list) => {
    const post = list[0];
    const postTitleElement = document.getElementById("post-title");
    const postBodyElement = document.getElementById("post-body");

    postTitleElement.innerText = post.title;
    postBodyElement.innerText = post.body;

    getCommentByPostId(post.id);
  });
}

async function getPostList() {
  await getData("https://jsonplaceholder.typicode.com/posts").then((list) => {
    if (list == null || list.length == 0) {
      postListContainer.innerHTML = `<p>Пусто</p>`;
      return;
    }
    postListContainer.innerHTML = ``;

    for (let i = 0; i < list.length; i++) {
      const postCard = createPostCard(list[i]);
      postListContainer.appendChild(postCard);
    }
  });
}

async function getCommentByPostId(postId) {
  await getData("https://jsonplaceholder.typicode.com/comments?", {
    postId,
  }).then((list) => {
    if (list == null || list.length == 0) {
      commentListContainer.innerHTML = `<p>Нет комментарии</p>`;
      return;
    }
    commentListContainer.innerHTML = `<h3>Комментарии</h3>`;

    for (let i = 0; i < list.length; i++) {
      const postCard = createCommentCard(list[i]);
      commentListContainer.appendChild(postCard);
    }
  });
}

function createPostCard(post) {
  const divElement = document.createElement("div");
  divElement.className = "column";
  divElement.innerHTML = `<div class="card">
                            <div class="card-content">
                                <h2>${post?.title}</h2>
                                <p>${post?.body.slice(0, 97).concat("...")}</p>
                                <a class="button" href="./post-detail.html?postId=${
                                  post.id
                                }">Читать дальше</a>
                            </div>
                          </div>`;

  return divElement;
}

function createCommentCard(comment) {
  const divElement = document.createElement("div");
  divElement.className = "comment";
  divElement.innerHTML = `<h3>${comment.name}</h3>
                          <h4>${comment.email}</h4>
                          <p>${comment.body}</p>`;

  return divElement;
}

function getPostDetails() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  getPostById(params["postId"]);
}
