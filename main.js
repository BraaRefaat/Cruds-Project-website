let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let indexNum;
let mood = "create";

function getTotal() {
  if (price.value != "" && price.value >= 0) {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(153 27 27)";
  }
}

let dataPro;

if (localStorage.Product != null) {
  dataPro = JSON.parse(localStorage.Product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let ProductData = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    ProductData.count <= 200
  ) {
    if (mood === "create") {
      if (ProductData.count > 1) {
        for (let i = 0; i < ProductData.count; i++) {
          dataPro.push(ProductData);
        }
      } else {
        dataPro.push(ProductData);
      }
    } else {
      dataPro[indexNum] = ProductData;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "Create";
    }
    clearData();
  }
  localStorage.setItem("Product", JSON.stringify(dataPro));
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
              <td class="p-3">${i + 1}</td>
              <td class="p-3">${dataPro[i].title}</td>
              <td class="p-3">${dataPro[i].price}</td>
              <td class="p-3">${dataPro[i].taxes}</td>
              <td class="p-3">${dataPro[i].ads}</td>
              <td class="p-3">${dataPro[i].discount}</td>
              <td class="p-3">${dataPro[i].total}</td>
              <td class="p-3">${dataPro[i].category}</td>   
              <td class="p-3">
                <button
                  onclick = 'updateData(${i})'
                  class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-4/5 h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
                >
                  Update
                </button>
              </td>
              <td class="p-3">
                <button
                  onclick = 'deletePro(${i})'
                  class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-4/5 h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick = 'DeleteAll()'
    class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-full h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
  >
    Delete All (${dataPro.length})
  </button>
    `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();

function deletePro(i) {
  dataPro.splice(i, 1);
  localStorage.Product = JSON.stringify(dataPro);
  showData();
}

function DeleteAll() {
  dataPro.splice(0);
  localStorage.clear();
  showData();
}

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  indexNum = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "Title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "Title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
      <tr>
              <td class="p-3">${i + 1}</td>
              <td class="p-3">${dataPro[i].title}</td>
              <td class="p-3">${dataPro[i].price}</td>
              <td class="p-3">${dataPro[i].taxes}</td>
              <td class="p-3">${dataPro[i].ads}</td>
              <td class="p-3">${dataPro[i].discount}</td>
              <td class="p-3">${dataPro[i].total}</td>
              <td class="p-3">${dataPro[i].category}</td>   
              <td class="p-3">
                <button
                  onclick = 'updateData(${i})'
                  class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-4/5 h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
                >
                  Update
                </button>
              </td>
              <td class="p-3">
                <button
                  onclick = 'deletePro(${i})'
                  class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-4/5 h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
    `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
              <td class="p-3">${i + 1}</td>
              <td class="p-3">${dataPro[i].title}</td>
              <td class="p-3">${dataPro[i].price}</td>
              <td class="p-3">${dataPro[i].taxes}</td>
              <td class="p-3">${dataPro[i].ads}</td>
              <td class="p-3">${dataPro[i].discount}</td>
              <td class="p-3">${dataPro[i].total}</td>
              <td class="p-3">${dataPro[i].category}</td>   
              <td class="p-3">
                <button
                  onclick = 'updateData(${i})'
                  class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-4/5 h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
                >
                  Update
                </button>
              </td>
              <td class="p-3">
                <button
                  onclick = 'deletePro(${i})'
                  class="bg-blue-800 font-medium py-2 px-1 rounded-3xl border-none w-4/5 h-1/3 m-1 hover:bg-blue-700 hover:tracking-wider hover:font-bold hover transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

let train = document.getElementById("train");
window.onscroll = function () {
  if (scrollY >= 400) {
    train.style.display = "block";
  } else {
    train.style.display = "none";
  }
};

train.onclick = function () {
  scroll({
    top: 0,
    behavior: "smooth",
  });
};
