let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categry = document.getElementById("categry");
let submit = document.getElementById("submit");
let body = document.getElementById("body");
let mood = "create";
let tmp;
title.focus();
// get total
function getTotal() {
  if (price.value != "") {
    let result =
      (+price.value / 30) * +taxes.value -
      +ads.value -
      +descount.value * (+price.value / 30);
    total.innerHTML = result.toFixed(2);
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00de";
  }
}
// create product
let DataPro;
if (localStorage.product != null) {
  DataPro = JSON.parse(localStorage.product);
} else {
  DataPro = [];
}

submit.onclick = function CRR() {
  let NewPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    descount: descount.value,
    total: total.innerHTML,
    count: count.value,
    categry: categry.value,
  };

  // count
  if (title.value != "" && price.value != "" && categry.value != "") {
    if (mood === "create") {
      if (NewPro.count > 1) {
        for (let i = 0; i < NewPro.count; i++) {
          DataPro.push(NewPro);
        }
      } else {
        DataPro.push(NewPro);
      }
    } else {
      DataPro[tmp] = NewPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    ClearData();
  }

  getTotal();
  // save localstorage

  localStorage.setItem("product", JSON.stringify(DataPro));

  ClearData();
  ShowData();
};

// clear inputs
function ClearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  descount.value = "";
  total.innerHTML = "";
  count.value = "";
  categry.value = "";
  title.focus();
}

// read
function ShowData() {
  let table = "";
  for (let i = 0; i < DataPro.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${DataPro[i].title}</td>
    <td>${DataPro[i].categry}</td>
    <td>${DataPro[i].price}</td>
    <td>${DataPro[i].taxes}</td>
    <td>${DataPro[i].ads}</td>
    <td>${DataPro[i].descount}</td>
    <td>${DataPro[i].total}</td>
    <td>
      <button onclick = "UpdateData( ${i} )" id="update">update</button>
    </td>
    <td>
      <button onclick ="DeleteData(  ${i}  ) " id="Delete">Delete</button>
    </td>
  </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("DeletAll");
  if (DataPro.length > 0) {
    btnDelete.innerHTML = `
      <button  onclick ="Deleteall()" > Delete All(${DataPro.length}) </button>

      `;
  } else {
    btnDelete.innerHTML = "";
  }
  getTotal();
}
ShowData();

// delete

function DeleteData(i) {
  DataPro.splice(i, 1);
  localStorage.product = JSON.stringify(DataPro);
  ShowData();
}
function Deleteall() {
  localStorage.clear;
  DataPro.splice(0);
  ShowData();
}

// update
function UpdateData(i) {
  title.value = DataPro[i].title;
  price.value = DataPro[i].price;
  taxes.value = DataPro[i].taxes;
  ads.value = DataPro[i].ads;
  descount.value = DataPro[i].descount;
  getTotal();
  count.style.display = "none";
  categry.value = DataPro[i].categry;
  submit.innerHTML = " Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let SearchMood = "title";
function getsearchmood(id) {
  let search = document.getElementById("search");

  if (id === "searchTitle") {
    SearchMood = "title";
    // search.placeholder = "search by title";
  } else {
    SearchMood = "category";
    // search.placeholder = "search by category";
  }
  search.placeholder = "search by " + SearchMood;

  search.focus();
  search.value = "";
  ShowData();
}
function SearchData(value) {
  let table = "";
  if (SearchMood == "title") {
    for (let i = 0; i < DataPro.length; i++) {
      if (DataPro[i].title.includes(value)) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${DataPro[i].title}</td>
      <td>${DataPro[i].price}</td>
      <td>${DataPro[i].taxes}</td>
      <td>${DataPro[i].ads}</td>
      <td>${DataPro[i].descount}</td>
      <td>${DataPro[i].total}</td>
      <td>${DataPro[i].categry}</td>
      <td>
        <button onclick = "UpdateData( ${i} )" id="update">update</button>
      </td>
      <td>
        <button onclick ="DeleteData(  ${i}  ) " id="Delete">Delete</button>
      </td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < DataPro.length; i++) {
      if (DataPro[i].categry.includes(value)) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${DataPro[i].title}</td>
      <td>${DataPro[i].price}</td>
      <td>${DataPro[i].taxes}</td>
      <td>${DataPro[i].ads}</td>
      <td>${DataPro[i].descount}</td>
      <td>${DataPro[i].total}</td>
      <td>${DataPro[i].categry}</td>
      <td>
        <button onclick = "UpdateData( ${i} )" id="update">update</button>
      </td>
      <td>
        <button onclick ="DeleteData(  ${i}  ) " id="Delete">Delete</button>
      </td>
    </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
let ddd = document.getElementById("ddd");
// clean data
function prnt() {
  no();
  window.print();
  ddd.style.display = "block";
}
function no() {
  title.style.display = "none";
  price.style.display = "none";
  taxes.style.display = "none";
  ads.style.display = "none";
  descount.style.display = "none";
  total.style.display = "none";
  count.style.display = "none";
  categry.style.display = "none";
  submit.style.display = "none";
  searchTitle.style.display = "none";
  searchcategory.style.display = "none";
  search.style.display = "none";
  prent.style.display = "none";
  ddd.style.display = "none";
  body.style.color = "blue";
}
