class PhotoGallery {
  constructor() {
    this.API_KEY = "563492ad6f9170000100000149fe7881c54e40e2911701b47446c8da";
    this.galleryDvl = document.querySelector(".gallery");
    this.searchForm = document.querySelector("header form");
    this.loadMore = document.querySelector(".load-more");
    this.eventHandle();
  }
  eventHandle() {
    document.addEventListener("DOMContentLoaded", () => {
      this.getImg();
    });
    this.searchForm.addEventListener("submit", (e) => {
      this.getSearchedImages(e);
    });
  }
  async getImg() {
    const baseURL = "https://api.pexels.com/v1/curated?per_page=12";
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
    console.log(data);
  }
  async fetchImages(baseURL) {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.API_KEY,
      },
    });
    const data = await response.json();
    return data;
  }
  GenerateHTML(photos) {
    photos.forEach((photo) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
        <a href="#">
          <img src="${photo.src.medium}">
          <h3>${photo.photographer}</h3>
        </a>
      `;
      this.galleryDvl.appendChild(item);
    });
  }
  async getSearchedImages(e) {
    e.preventDefault();
    this.galleryDvl.innerHTML = "";
    const searchValue = e.target.querySelector("input").value;
    const baseURL =
      await `https://api.pexels.com/v1/search?query=${searchValue}&per_page=12`;
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
  }
}
const gallery = new PhotoGallery();
