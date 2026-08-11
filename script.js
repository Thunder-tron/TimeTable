
const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const periods=[
"08:00","09:00","10:00","11:00","12:00",
"13:00","14:00","15:00","16:00","17:00","18:00"
];

function updateTimetable(){

    // Remove previous highlights
    document.querySelectorAll("tr").forEach(r=>r.classList.remove("today"));
    document.querySelectorAll("td").forEach(c=>c.classList.remove("current"));

    const now=new Date();

    const day=days[now.getDay()];

    if(day==="Sun"){
        document.getElementById("status").innerHTML="sunday 🎉";
        return;
        
    }
    

    const row=document.getElementById(day);

    row.classList.add("today");

    const current=now.getHours()*60+now.getMinutes();

    let period=-1;

    for(let i=0;i<periods.length-1;i++){

        let start=periods[i].split(":");
        let end=periods[i+1].split(":");

        let s=parseInt(start[0])*60+parseInt(start[1]);
        let e=parseInt(end[0])*60+parseInt(end[1]);

        if(current>=s && current<e){
            period=i+1;
            break;
        }

    }

    if (period== -1){
        if(current < 8*60){
            document.getElementById("status").innerHTML = "🌅 Classes haven't started yet.";

        }else{
            document.getElementById("status").innerHTML="🏠 No more classes today.";
        }
        document.getElementById("countdown").innerHTML="";

        return;
    }
    row.cells[period].classList.add("current");
    let subject =row.cells[period].innerText.trim();
    let next = "No More Classes";
    for(let i = period + 1; i < row.cells.length; i++){
        let nextSubject= row.cells[i].innerText.trim();
        if(nextSubject !== ""){
            next=nextSubject;
            break;
        }
    }

    if(subject == ""){
        document.getElementById("status").innerHTML = "📚 No class at this time." + " | ⏭ Next : <b>" + next + "</b>";

    }else{
        document.getElementById("status").innerHTML = "📖 Current Subject : <b>" + subject + "</b> | ⏭ Next : <b>" + next + "</b>";
    }


    let end = periods[period].split(":");
    
    let endTime = new Date(now);
    
    endTime.setHours(parseInt(end[0]),parseInt(end[1]),0,0);
    
    let remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
    
    let m = Math.floor(remainingSeconds / 60);
    
    let s = remainingSeconds % 60;
    
    document.getElementById("countdown").innerHTML = "⏳ " + m + " Minute(s) " + s.toString().padStart(2, "0") +" Second(s) Remaining";
}

updateTimetable();

setInterval(updateTimetable,1000);

// Clock
function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        "📅 " +
        now.toDateString() +
        " | ⏰ " +
        now.toLocaleTimeString();
}

function toggleMode(){

    document.body.classList.toggle("dark");

    const button = document.getElementById("modeButton");

    if(document.body.classList.contains("dark")){

        button.innerHTML = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");

    }else{

        button.innerHTML = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");

    }
}



//Notfication 
if(Notification.permission==="granted"){
    new Notification("Class Started!",{
        body:"Time for "+subject
    });
}
Notification.requestPermission();
// Run clock immediately
updateClock();

