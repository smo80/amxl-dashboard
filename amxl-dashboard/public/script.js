async function load(){

    let res=await fetch("/data");
    
    let data=await res.json();
    
    let html="<tr><th>Week</th><th>Name</th><th>Dept</th><th>Units</th><th>Errors</th></tr>";
    
    data.forEach(d=>{
    
    html+=`<tr>
    
    <td>${d.week}</td>
    
    <td>${d.name}</td>
    
    <td>${d.dept}</td>
    
    <td>${d.units}</td>
    
    <td>${d.errors}</td>
    
    </tr>`;
    
    });
    
    document.getElementById("table").innerHTML=html;
    
    }
    
    async function add(){
    
    await fetch("/add",{
    
    method:"POST",
    
    headers:{
    
    "Content-Type":"application/json"
    
    },
    
    body:JSON.stringify({
    
    week:week.value,
    
    name:name.value,
    
    dept:dept.value,
    
    units:units.value,
    
    errors:errors.value
    
    })
    
    });
    
    load();
    
    }
    
    load();
    