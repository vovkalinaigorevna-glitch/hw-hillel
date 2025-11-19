window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  
  // Минимальное время отображения прелоадера
  const minTime = 500; // например 0.5 сек
  const start = Date.now();

  const hidePreloader = () => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(minTime - elapsed, 0);

    setTimeout(() => {
      preloader.style.opacity = '0'; // плавное скрытие
      setTimeout(() => preloader.remove(), 500); // удаляем из DOM
    }, remaining);
  };

  hidePreloader();
});



const minPriceSpan = document.getElementById("minPrice");
const maxPriceSpan = document.getElementById("maxPrice");
const track = document.querySelector(".rc-slider-track");
const handle1 = document.querySelector(".rc-slider-handle-1");
const handle2 = document.querySelector(".rc-slider-handle-2");

let minPrice = 10;
let maxPrice = 1500;
let minValue = minPrice;
let maxValue = maxPrice;
let rangeMin = minPrice;
let rangeMax = maxPrice;

const updateTrack = () => {
    let leftPercent = ((minValue - rangeMin) / (rangeMax - rangeMin)) * 100;
    let rightPercent = ((maxValue - rangeMin) / (rangeMax - rangeMin)) * 100;
    track.style.left = leftPercent + "%";
    track.style.width = (rightPercent - leftPercent) + "%";
    handle1.style.left = leftPercent + "%";
    handle2.style.left = rightPercent + "%";
    minPriceSpan.textContent = minValue;
    maxPriceSpan.textContent = maxValue;
};

const dragHandler = (handle, isMin) => {
    let startX, startValue;
    
    const onMouseMove = (e) => {
        let deltaX = e.clientX - startX;
        let percentMoved = deltaX / document.querySelector(".rc-slider").offsetWidth;
        let valueMoved = percentMoved * (rangeMax - rangeMin);
        let newValue = Math.round(startValue + valueMoved);

        if (isMin) {
            if (newValue >= rangeMin && newValue <= maxValue - 10) {
                minValue = newValue;
            }
        } else {
            if (newValue <= rangeMax && newValue >= minValue + 10) {
                maxValue = newValue;
            }
        }

        updateTrack();
    };

    const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    handle.addEventListener("mousedown", (e) => {
        e.preventDefault(); // Prevents unwanted selection or dragging
        startX = e.clientX;
        startValue = isMin ? minValue : maxValue;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
};

dragHandler(handle1, true);
dragHandler(handle2, false);
updateTrack();


// Прелоадер при загрузке главной страницы
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const minTime = 500; // минимальное время отображения прелоадера
  const start = Date.now();

  const hidePreloader = () => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(minTime - elapsed, 0);

    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 500);
    }, remaining);
  };

  hidePreloader();
});

// Прелоадер при переходе на страницу регистрации
document.querySelector(".btn-login").addEventListener("click", (e) => {
  e.preventDefault(); // отменяем мгновенный переход

  // Берём ссылку из <a> внутри кнопки
  const link = e.currentTarget.querySelector(".btn-login-text").href;

  // создаём прелоадер
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `
    <div class="load">
      <hr /><hr /><hr /><hr />
    </div>
  `;
  document.body.appendChild(preloader);

  preloader.style.position = "fixed";
  preloader.style.top = "0";
  preloader.style.left = "0";
  preloader.style.width = "100%";
  preloader.style.height = "100%";
  preloader.style.background = "#fff";
  preloader.style.display = "flex";
  preloader.style.justifyContent = "center";
  preloader.style.alignItems = "center";
  preloader.style.zIndex = "9999";

  // Ждём 0.8 секунды и переходим
  setTimeout(() => {
    window.location.href = link;
  }, 800);
});
