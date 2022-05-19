let i = 0;

$(document).ready(function () {
   
     $("#sidebarCollapse").on('click', function () {
      $("#sidebar").toggleClass('active');
     
   });
   
});


document.getElementById("plus").addEventListener("click", function () 
{
      
   
   $("#naming_port").modal();
  
   // console.log("ddd"+i);
   
});

$("#save_ch").on("click",function()
{
   i++;
   let li = document.createElement("li");
   li.setAttribute("id", "para" + i);
   li.setAttribute("class","port");
   document.getElementById("homeSubmenu").appendChild(li);
   li=document.getElementById("para"+i);
   li.innerHTML= document.getElementById("nic_port").value;
   $('#naming_port').modal('hide');
   // console.log(document.getElementById("para"+i).value);
   let el=document.getElementById("para"+i)

if(el)
{
   el.addEventListener("click",function()
{
      $("#exampleModalCenter").modal();
})
}

})

async function transac(event)
{
   const add_token = event.target.id;
   console.log(add_token);
   const rawResponse = await fetch('/transactions/read/'+add_token, {

      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({add_token})
  });
//  window.location.href = "/transactions/"+add_token;
  const response = await rawResponse.json();
  if(response.redirect){
      location.assign(response.redirect);
  }
}
// $("#transactions").on("click",function()
// {
// location.href="/transactions";
// })

async function Searchpls(event){

    event.preventDefault();
    console.log("WOrk MF")
    let uname = event.target.id;
   
    const search = document.getElementById("findme").value;
   // console.log(req.params);
    const result = await fetch('/profile/'+uname,{
            method : 'POST',
            headers: {
               'Content-Type':'application/json',
            },
   
            body: JSON.stringify({search,uname}),
         });

         const response = await result.json();
         if(response.redirect){
             location.assign(response.redirect);
         }

}


// document.getElementById("transactions").addEventListener("click",async function(e)
// {
//    e.preventDefault();
   // let list = document.getElementsByClassName("port");
   // console.log(list.length)
  
   // for(let i=1; i<=list.length; i++)
   // {
   //    const para = document.getElementById("para"+i).innerHTML;
   //    console.log(para);
      
   //    const result = await fetch('/profile/Sanju064',{
   //       method : 'POST',
   //       headers: {
   //          'Content-Type':'application/json',
   //       },

   //       body: JSON.stringify({para}),
   //    });
   // }
   // }
   // if(i===list.length-1)
   // {
   //      let resp = await result.json();
   //     console.log(resp); 
   //     if(resp.redirect)
   //     {
   //         location.assign(resp.redirect);
   //     }
   // }
//    location.href="/transactions";
// })



// document.getElementById("delete").addEventListener("click", function () {


//    $("#delet").modal();
//    console.log("hello" + i);
//    $("#delete_ch").on("click",function()
//    {
//    for(let k=i;k>=1;k--)
//    {
//       console.log("see me "+document.getElementById("para"+k).innerHTML)
//       console.log("input "+ document.getElementById("dele_port").innerHTML)
//    if(document.getElementById("dele_port").innerHTML===document.getElementById("para"+k).innerHTML);
//    {
//       document.getElementById("para" + k).remove();
//    }
   
//    }

//    })
// })

let table = document.getElementById("example");
let tblData = [];

for (r = 0; r < table.rows.length; r++) 
{   
      let row = table.rows[r];
      let rowData = {};
      for (c = 0; c < row.cells.length; c++) 
      {
         rowData[c] = row.cells[c].innerHTML;
      }
      tblData.push(rowData);
}
console.log(tblData);
console.log(tblData.length);
let c1=0;
let c2=0;
let c3=0;
let c4=0;
let c5=0;
let len = parseInt(tblData.length/5);
for(i=1;i<=len;i++){
   if(tblData[i][2] === "Buy"){
      c1++;
   }
   else if(tblData[i][2] === "Sell"){
      c1--;
   }
}
console.log(c1);
for(i=len+1;i<=2*len;i++){
   if(tblData[i][2] === "Buy"){
      c2++;
   }
   else if(tblData[i][2] === "Sell"){
      c2--;
   }
}
for(i=2*len+1;i<=3*len;i++){
   if(tblData[i][2] === "Buy"){
      c3++;
   }
   else if(tblData[i][2] === "Sell"){
      c3--;
   }
}
for(i=3*len+1;i<=4*len;i++){
   if(tblData[i][2] === "Buy"){
      c4++;
   }
   else if(tblData[i][2] === "Sell"){
      c4--;
   }
}
for(i=4*len+1;i<5*len;i++){
   if(tblData[i][2] === "Buy"){
      c5++;
   }
   else if(tblData[i][2] === "Sell"){
      c5--;
   }
}
console.log(c1,c2,c3,c4,c5);

let array = [];

for(let i = 1; i<tblData.length;i++){
   array.push([tblData[i][1],parseInt(tblData[i][3])]);
}

let result = [];
array.reduce(function(res, value) {
   if (!res[value[0]]) {
     res[value[0]] = { 0: value[0], 1: 0 };
     result.push(res[value[0]]); 
   }
   res[value[0]][1] += value[1];
   return res;
 }, {});
 
console.log(result)

let result_label = [];
let result_data = [];
for(let i = 0; i<result.length;i++){
   result_label.push(result[i][0]);
   result_data.push(result[i][1]);
}
// console.log(result_label);
// console.log(result_data);

let array1 = [];
for(let i = 1; i<tblData.length;i++){
   if(tblData[i][2] === "Buy"){
      array1.push([tblData[i][1],parseInt(tblData[i][5])]);
   }
   else if(tblData[i][2] === "Sell"){
      array1.push([tblData[i][1],-1*(parseInt(tblData[i][5]))]);
   }
}

let result1 = [];
array1.reduce(function(res, value) {
   if (!res[value[0]]) {
     res[value[0]] = { 0: value[0], 1: 0 };
     result1.push(res[value[0]]); 
   }
   res[value[0]][1] += value[1];
   return res;
 }, {});
 
console.log(result1)


// console.log(result_label1);
// console.log(result_data1);

let result11 = [];
for(let i = 0; i<result.length;i++){
   if(result[i][1] === 0){
   result11.push([result1[i][0],result1[i][1]]);
   }
}
console.log(result11);

let result_label11 = [];
let result_data11 = [];
for(let i = 0; i<result11.length;i++){
   result_label11.push(result11[i][0]);
   result_data11.push(result11[i][1]);
}

let ctx = document.getElementById('pg').getContext('2d');
let chart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: result_label11,
    datasets: [{
			label: "Money in Rupees",
			backgroundColor: 'lightblue',
			borderColor: 'royalblue',
			data: result_data11,
		}]
	},

	options: {
    layout: {
      padding: 10,
    },
		legend: {
			position: 'bottom',
		},
		title: {
			display: true,
			text: 'Gain from buying and selling stocks'
		},
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Gain'
				}
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Stock'
				}
			}]
		}
	}
});

var oilCanvas = document.getElementById("pb");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

let colorarray = [];

for(let i = 0; i<result_label.length;i++){
   colorarray.push('#'+Math.floor(Math.random()*16777215).toString(16));
}

let oilData = {
    labels: result_label,
    datasets: [
        {
            data: result_data,
            backgroundColor: colorarray,
        }]
};

var pieChart = new Chart(oilCanvas, {
  type: 'pie',
  data: oilData,
  options: {
   legend: {
      display: false
   }
 }
});


// console.log(tgain);
// console.log(tinvestment);


function stats(){
   let tinvestment = 0;
let tgain = 0;

for(let i = 0; i<tblData.length;i++){
   if(tblData[i][2] === "Buy"){
      // tgain -= parseInt(tblData[i][5]);
      tinvestment += parseInt(tblData[i][5]);
   }
   else if(tblData[i][2] === "Sell"){
      // tgain += parseInt(tblData[i][5]);
   }
}
for(let i = 0; i<result11.length;i++){
   tgain += result11[i][1];
}
let networth = tinvestment + tgain;
   document.getElementById("networth").innerHTML = "₹" + networth;

   document.getElementById("tgain").innerHTML = "₹" + tgain;
   document.getElementById("tinvestment").innerHTML = "₹" + tinvestment;
}
stats();