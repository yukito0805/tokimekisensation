const galleryPhotos = [
  {
    src: "assets/gallery/vlcsnap-2026-05-16-19h14m31s844.png",
    alt: "ステージ写真 1",
    caption: "三人でキメポーズ☆"
  },
  {
    src: "assets/gallery/DSC07526.jpg",
    alt: "ステージ写真 2",
    caption: "最高の笑顔"
  },
  {
    src: "assets/gallery/DSC07484.jpg",
    alt: "ステージ写真 3",
    caption: "男は背中で語れ"
  },
  {
    src: "assets/gallery/DSC07514.jpg",
    alt: "ステージ写真 4",
    caption: "情熱は誰にも負けない"
  }
];

const youtubeVideos = [
{
  title: "HAMA-G 2026年4月5日 初披露",
  description: "ときめきセンセーション 初披露ライブ映像",
  videoId: "nPWhGBhfaH0"
},
  {
    title: "HAMA-G 2026年4月26日",
    description: "ときめきセンセーション ライブ映像",
    videoId: "W68EPnefPGQ"
  },
  {
    title: "FREEDOM名古屋 2026年5月16日",
    description: "ときめきセンセーション ライブ映像",
    videoId: "FY34Rj4GADM"
  }
];

const mainPhotoImage = document.querySelector("#mainPhotoImage");
const mainPhotoCaption = document.querySelector("#mainPhotoCaption");
const photoThumbs = document.querySelector("#photoThumbs");
const videoGrid = document.querySelector("#videoGrid");
const videoModal = document.querySelector("#videoModal");
const iframeBox = document.querySelector("#iframeBox");
const navButton = document.querySelector(".navButton");
const globalNav = document.querySelector("#globalNav");

function setMainPhoto(index) {
  const photo = galleryPhotos[index];
  mainPhotoImage.src = photo.src;
  mainPhotoImage.alt = photo.alt;
  mainPhotoCaption.textContent = photo.caption;

  document.querySelectorAll(".photoThumb").forEach((button, buttonIndex) => {
    button.setAttribute("aria-current", String(buttonIndex === index));
  });
}

function renderGallery() {
  photoThumbs.innerHTML = galleryPhotos.map((photo, index) => `
    <button class="photoThumb" type="button" aria-label="${photo.caption}を表示" aria-current="${index === 0}">
      <img src="${photo.src}" alt="${photo.alt}">
    </button>
  `).join("");

  document.querySelectorAll(".photoThumb").forEach((button, index) => {
    button.addEventListener("click", () => setMainPhoto(index));
  });
}

function openVideo(videoId) {
  iframeBox.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  `;
  videoModal.classList.add("isOpen");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  videoModal.classList.remove("isOpen");
  videoModal.setAttribute("aria-hidden", "true");
  iframeBox.innerHTML = "";
  document.body.style.overflow = "";
}

function renderVideos() {
  videoGrid.innerHTML = youtubeVideos.map(video => `
    <button class="videoCard" type="button" data-video-id="${video.videoId}">
      <span class="videoThumb">
        <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg" alt="${video.title}のサムネイル">
        <span class="playMark">▶</span>
      </span>
      <span class="videoBody">
        <h3>${video.title}</h3>
        <p>${video.description}</p>
      </span>
    </button>
  `).join("");

  document.querySelectorAll(".videoCard").forEach(card => {
    card.addEventListener("click", () => openVideo(card.dataset.videoId));
  });
}

navButton.addEventListener("click", () => {
  const isOpen = globalNav.classList.toggle("isOpen");
  navButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#globalNav a").forEach(link => {
  link.addEventListener("click", () => {
    globalNav.classList.remove("isOpen");
    navButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeVideo);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeVideo();
  }
});

renderGallery();
renderVideos();
