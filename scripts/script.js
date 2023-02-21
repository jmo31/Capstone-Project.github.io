

window.onload = function () {
document.getElementById("sub").addEventListener("click", displayDate);

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}
}
