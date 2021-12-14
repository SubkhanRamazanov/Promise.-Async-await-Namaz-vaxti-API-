
var today = new Date();
var nowDate =  today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

async function getDateForPrayerTime(year,month,howDate,cls) {
    try {
        let api = await fetch(`https://api.aladhan.com/v1/calendar?latitude=40&longitude=49&method=2&month=${month}&year=${year}`);
        let infoapi = await api.json();
        let days = infoapi.data
        document.querySelector(cls).lastElementChild.innerHTML = "";
        days.forEach(day => {
            let dayDate=day.date.gregorian.date
            let imsak = day.timings.Imsak
            let zohr = day.timings.Dhuhr
            let esr = day.timings.Asr
            let megrib = day.timings.Maghrib
            let isha = day.timings.Isha

            if (howDate === dayDate) {
                dayInfoPrayerTime(dayDate, imsak,zohr,esr,megrib,isha,cls);
            }
        });
       
    }
    catch (error) {
        console.log(error);
    }

}

function dayInfoPrayerTime(day,Imsak,Zohr,Esr,Megrib,Isha,clss) {
    
    let tr = `<tr>              
                 <td> ${day} </td>
                 <td> ${Imsak}  </td>
                 <td> ${Zohr}  </td>
                 <td>${Esr}  </td>
                 <td> ${Megrib} </td>
                 <td> ${Isha}</td>
            </tr>`
    document.querySelector(clss).lastElementChild.innerHTML += tr;
}

getDateForPrayerTime((today.getMonth() + 1),today.getFullYear(),nowDate,".today");

let btn = document.querySelector("#select")


btn.addEventListener("click",function(){
   
    inputDate=document.querySelector("#futureDate").value;
    year=inputDate.slice(0,4)
    month=inputDate.slice(5,7)
    monthDay = inputDate.slice(8,10)
    futureDate=monthDay+ '-' + month+ '-' + year;
    document.querySelector("#lastTable").classList.remove("d-none");
    document.querySelector("#loading").classList.remove("d-none");
    setTimeout(() => {
        getDateForPrayerTime(year,month,futureDate,".future");
        document.querySelector("#loading").classList.add("d-none");
    }, 3000);
    
})
