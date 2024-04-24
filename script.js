let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let tInput = document.getElementById("alarmTime");
let btn = document.getElementById("setAlarm");
let contan = document.getElementById("alarms");
let interVal;
let maxValue = 3;
let cnt = 0;
let almTimesArray = [];
var audio = new Audio('https://dl2.prokerala.com/downloads/ringtones/files/mp3/alarm-clock-23772.mp3');
function timeChangeFunction() {
  let curr = new Date();
  let hrs = curr.getHours();
  let min = String(curr.getMinutes()).padStart(2, "0");
  let sec = String(curr.getSeconds()).padStart(2, "0");
  let period = "AM";
  if (hrs >= 12) {
    period = "PM";
    if (hrs > 12) {
      hrs -= 12;
    }
  }
  hrs = String(hrs).padStart(2, "0");
  time.textContent = ` ${hrs}:${min}:${sec} ${period}`;
}

function alarmSetFunction() {
  let now = new Date();
  let selectedDate = new Date(dateInput.value + "T" + tInput.value);
  if (selectedDate <= now) {
    alert(`Invalid time. Please select a future date and time`)
    return;
  }
  if (almTimesArray.includes(selectedDate.toString())) {
    alert(`Alarm already set for this time. Please select a different time`);
    return;
  }

  if (cnt < maxValue) {
    let timeUntilAlarm = selectedDate - now;
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.innerHTML = `
    <span>
    ${selectedDate.toLocaleString()}
    </span>
    <button class="delete-alarm">Delete</button>
    `;
    alarmDiv
      .querySelector(".delete-alarm")
      .addEventListener("click", () => {
        alarmDiv.remove();
        cnt--;
        clearTimeout(interVal);
        const idx = almTimesArray.indexof(selectedDate.toString());
        if (idx !== -1) {
          almTimesArray.splice(idx, 1);
        }
      });
    interVal = setTimeout(() => {
      // alert("time to wake up");
      audio.play();
      alarmDiv.remove;
      cnt--;
      const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
      if (alarmIndex !== -1) {
        almTimesArray.splice(alarmIndex, 1);
      }
    }, timeUntilAlarm);
    contan.appendChild(alarmDiv);
    cnt++;
    almTimesArray.push(selectedDate.toString());
  } else {
    alert("you can only set a maximum of 3 alarms")
  }
}
function showAlarmFunction() {
  let alarms = contan.querySelectorAll(".alarm");
  alarms.forEach((alarm) => {
    let deleteButton = alarm.querySelector(".delete-alarm");
    deleteButton.addEventListner("click", () =>
      alarmDiv.remove());
    cnt--;
    clearTimeout(interVal);
    const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
    if (alarmIndex !== -1) {
      almTimesArray.splice(alarmIndex, 1);
    }
  });
}
showAlarmFunction();
setInterval(timeChangeFunction, 1000);
btn.addEventListener("click", alarmSetFunction);
timeChangeFunction();