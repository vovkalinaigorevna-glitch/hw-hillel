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
