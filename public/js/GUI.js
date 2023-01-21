var model;

const label = {
  0: "Benign",
  1: "Malignent",
};

(async () => {
  model = await tf.loadLayersModel("/model/model.json");
})();

// Global

const uploadBtn = document.querySelector("#upload-btn");

uploadBtn.onclick = () => {
  document.getElementById("getFile").click();
};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("output").setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
function reset() {
  document.getElementById("prediction").src = "/images/download.png";
  document.getElementById("output").src = "/images/download.png";
}

// Patient GUI
document.querySelectorAll(".tab a").forEach((li) => {
  li.addEventListener("click", function (e) {
    e.preventDefault();

    e.target.parentElement.parentElement.children[0].classList.remove("active");
    e.target.parentElement.parentElement.children[1].classList.remove("active");

    e.target.parentElement.classList.add("active");

    var target = e.target.getAttribute("href").slice(1);

    let predect = document.querySelectorAll(".tab-content > div")[0];
    let result = document.querySelectorAll(".tab-content > div")[1];

    if (target === "result") {
      result.style = "display:block";
      predect.style = "display:none";
    } else {
      predect.style = "display:block";
      result.style = "display:none";
    }
  });
});

document
  .querySelector("input[name=result]")
  .addEventListener("keydown", function (e) {
    e.preventDefault();
  });
// Prediction

// Patient prediction
function PGUI() {
  predict().then(
    (value) => (document.querySelector("input[name=result]").value = value)
  );

  document.querySelector(".result").click();
}

// Doctor prediction
function GUI() {
  const td2 = document.createElement("td");
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");

  td1.innerHTML = `<i class=" fa-solid fa-check"></i>`;
  predict().then((value) => (td2.innerHTML = value));
  tr.append(td1);
  tr.append(td2);

  document.querySelector("table tbody").append(tr);
}

async function predict() {
  // action for the submit button

  let image = document.getElementById("output");
  let tensorImg = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims(0);

  prediction = await model.predict(tensorImg).data();
  document.getElementById("prediction").src = image.src;

  return label[Math.round(prediction[1])];
}
