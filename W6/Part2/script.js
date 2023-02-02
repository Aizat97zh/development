const fileInput = document.getElementById("file");

const uploadFile = async (file, index) => {
  const fileList = document.getElementById("files-list");
  const fileItem = document.createElement("h3");
  fileItem.innerText = file.name + ' -  downloading';
  fileList.appendChild(fileItem);
  await wait(file.size).then(() => {
    fileItem.innerText = file.name + ' -  OK';
  });
};

const uploadFiles = async () => {
  const fileUploads = [];
  let index = 0;
  for (let file of fileInput.files) {
    fileUploads.push(uploadFile(file, index++));
  }

  try {
    await Promise.all(fileUploads);
    console.log("all files uploaded");
  } catch (e) {
    console.log("some files failed to upload");
  }
};

const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay / 10);
  });
};

fileInput.addEventListener("change", uploadFiles);

function openInput() {
  fileInput.click();
}
