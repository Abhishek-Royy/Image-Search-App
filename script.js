const input = document.querySelector("input");
const searchBtn = document.querySelector(".material-icons");
const imageContainer = document.querySelector(".image-show");
const result = document.querySelector(".result");
const loadMore = document.querySelector("button");

const accessKey = "HjMALSUVDcpjqZb99oC5FZqqUmtg6uwY1uL00_ln014";

let page = 1;

const fetchImages = async (query, pageNumber) => {
  try {
    result.innerHTML = "";
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNumber}&client_id=${accessKey}`
    );
    const data = await response.json();
    // console.log(data);

    data.results.forEach((photo) => {
      // const imageElement = document.createElement("div");
      // imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="suspect image" />`;

      // const download = `<a href="${photo.urls.regular}" download="">Download</a>`;

      // imageContainer.appendChild(imageElement);
      // imageContainer.appendChild(download);

      const imageElement = document.createElement("div");
      imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="suspect image" />`;

      const downloadLink = document.createElement("a");
      downloadLink.href = photo.urls.regular;
      downloadLink.setAttribute("download", ""); 

      downloadLink.textContent = "Download"; 

      imageContainer.appendChild(imageElement);
      imageContainer.appendChild(downloadLink);
    });
  } catch (error) {
    console.error("Error fetching images:", error);

    result.innerHTML = `<h2>Error fetching images. Please try again.</h2>`;
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") {
    result.innerHTML = `<h2>Please Enter a search Query.</h2>`;
  } else {
    page = 1;
    fetchImages(input.value.trim(), page);
  }
});

//fetch more image
loadMore.addEventListener("click", (e) => {
  fetchImages(input.value.trim(), ++page);
});
