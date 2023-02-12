let postList;
let commentList;
const postListContainer = document.getElementById("post-list-container");

const getData = async (url = "", params = {}) => {
  const response = await fetch(url + new URLSearchParams(params), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

async function getPostList() {
  await getData("https://jsonplaceholder.typicode.com/posts").then((list) => {
    postList = list ?? [];
    for (let i = 0; i < postList.length; i++) {
      console.log("post: ", postList[i]);
      const postCard = createPostCard(postList[i]);
      postListContainer.appendChild(postCard);

      addClickListenerToPostCard(postList[i]);
    }
  });
}

async function getCommentByPostId(postId) {
  await getData("https://jsonplaceholder.typicode.com/comments", {
    postId,
  }).then((list) => {
    commentList = list ?? [];
  });
}

function createPostCard(post) {
  const divElement = document.createElement("div");
  divElement.className = "column";
  divElement.innerHTML = `<div class="card">
                            <div class="card-content">
                                <h2>${post?.title}</h2>
                                <p>${post?.body.slice(0, 97).concat("...")}</p>
                                <a id="post-${
                                  post.id
                                }" class="button" href="#">Читать дальше</a>
                            </div>
                          </div>`;

  return divElement;
}

function addClickListenerToPostCard(post) {
  const cardButton = document.getElementById("post-" + post.id);
  cardButton.addEventListener("click", () => {
    openPost(post);
  });
}

function openPost(post) {
  console.log(post);
}

getPostList();
