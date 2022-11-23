let addToTable = document.querySelector("#to-table");
let arr = [];
addToTable.addEventListener("click", (e) =>{
          e.preventDefault();
          let getFN = document.querySelector("#fn")
          let getLN = document.querySelector("#ln")
          let getSalary = document.querySelector("#salary")
          let obj = {
                    fn : getFN.value,
                    ln: getLN.value,
                    salary: getSalary.value
          }
          arr.push(obj);
          let tBody = document.querySelector("#table-body");
          getFN.value = "";
          getLN.value = "";
          getSalary.value = "";
          tBody.innerHTML = "";
          let count = 0;
          arr.forEach(x => {
                    count++;
                    tBody.innerHTML += `
                    <tr>
                    <td>${count}</td>
                    <td>${x.fn}</td>
                    <td>${x.ln} Income</td>
                    <td>${x.salary}</td>
                  </tr>
                    `
          })
})
let submit = document.querySelector("#submit");
let c = 0;

let pay = document.querySelector("#payment");
submit.addEventListener("click", (e) =>{
          console.log("wobe")
          e.preventDefault();
          arr.forEach(x => {
                    fetchtax(x.salary, `${x.fn} ${x.ln}`);
          })
})
let fetchtax = (income, name) => {
          console.log(name);
          fetch(`https://localhost:7233/api/TaxCalculator/CalculateTax/${income}`, {
                    method: "GET"
          }).then(x => {
                    return x.json();
          }).then(response => {
                    console.log(response);
                    c++;
                    pay.innerHTML += `
                    <tr>
                    <td>${c}</td>
                    <td>${name}</td>
                    <td>${response.taxable}</td>
                    <td>${response.pension}</td>
                    <td>${response.tax}</td>
                    <td>${response.cra}</td>
                  </tr>
                    `
          })
}