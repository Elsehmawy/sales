// جلب العناصر من الصفحة
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// حساب صافي الراتب
function getTotal() {
  if (price.value !== "") {
    let priceValue = +price.value || 0;
    let taxesValue = +taxes.value || 0;
    let adsValue = +ads.value || 0;
    let descountValue = +descount.value || 0;
    let result = (priceValue / 30) * taxesValue - adsValue - (descountValue * (priceValue / 30));
    total.innerHTML = result.toFixed(2);
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00de";
  }
}
// تحميل البيانات من localStorage
let DataPro = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : [];
// إضافة منتج جديد
submit.onclick = function() {
  let NewPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    descount: descount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  };
  if (title.value && price.value && category.value) {
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
      submit.innerHTML = "إضافة";
      count.style.display = "block";
    }
    ClearData();
  }
  getTotal();
  localStorage.setItem("product", JSON.stringify(DataPro));
title.focus();
  showData();
};



// مسح الحقول
function ClearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  descount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  title.focus();
}
// عرض البيانات
function showData() {
  let table = "";
  for (let i = 0; i < DataPro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${DataPro[i].title}</td>
            <td>${DataPro[i].category}</td>
            <td>${DataPro[i].price}</td>
            <td>${DataPro[i].taxes}</td>
            <td>${DataPro[i].ads}</td>
            <td>${DataPro[i].descount}</td>
            <td>${DataPro[i].total}</td>
            <td><button onclick="UpdateData(${i})">تعديل</button></td>
            <td><button onclick="DeleteData(${i})">حذف</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  
let btnDelete = document.getElementById("DeleteAll")
if (DataPro.length > 0) {

  btnDelete.innerHTML = `
     <button onclick="DeletAll()">🗑(${DataPro.length}) </button>
    `
} else {
  btnDelete.innerHTML = ""
}
}
// حذف عنصر
function DeleteData(i) {
        if (!confirm("تنبيه! سيتم الحذف نهائيا. 🤔")) return;
        alert("تم الحذف 😜");

    DataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(DataPro));
  showData();
}
// حذف الكل
function DeletAll() {
  if (!confirm("تنبيه! سيتم حذف جميع العناصر نهائيا. 🤔")
                ) return;
        alert("تم الحذف 😜");
  localStorage.clear();
  DataPro = [];
  showData();
}
// تحديث البيانات
function UpdateData(i) {
  title.value = DataPro[i].title;
  price.value = DataPro[i].price;
  category.value = DataPro[i].category;
  getTotal();
  mood = "update";
  tmp = i;
  submit.innerHTML = "تحديث";
  showData();
}
showData();
// متغير لتحديد وضع البحث (بالاسم أو بالوظيفة)
let searchMood = "title";
// تغيير وضع البحث
function getsearchmood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  document.getElementById("search").focus(); // تركيز على خانة البحث
}
function SearchData(value) {
    let table = "";
    let searchValue = value.trim().toLowerCase(); // إزالة المسافات الزائدة وتحويل النص إلى حروف صغيرة
    for (let i = 0; i < DataPro.length; i++) {
        // التأكد من أن البيانات موجودة لتجنب الأخطاء
        let titleLower = DataPro[i].title ? DataPro[i].title.toLowerCase() : "";
        let categoryLower = DataPro[i].category ? DataPro[i].category.toLowerCase() : "";
        if (
            (searchMood === "title" && titleLower.includes(searchValue)) ||
            (searchMood === "category" && categoryLower.includes(searchValue))
        ) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${DataPro[i].title}</td>
                    <td>${DataPro[i].category}</td>
                    <td>${DataPro[i].price}</td>
                    <td>${DataPro[i].taxes}</td>
                    <td>${DataPro[i].ads}</td>
                    <td>${DataPro[i].descount}</td>
                    <td>${DataPro[i].total}</td>
                    <td><button onclick="UpdateData(${i})">تعديل</button></td>
                    <td><button onclick="DeleteData(${i})">حذف</button></td>
                </tr>`;
        }
    }
    // تحديث الجدول أو إظهاره فارغ إذا لم تكن هناك نتائج
    document.getElementById("tbody").innerHTML = table || "<tr><td colspan='10'>لا توجد نتائج</td></tr>";
}