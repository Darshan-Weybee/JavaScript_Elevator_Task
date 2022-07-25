let liftClass = document.querySelector(".liftClass-inside");
let floorClass = document.querySelector(".floorClass");
let maintenceButton = document.querySelector(".maintence-box-inside");
let liftStatus = document.querySelector(".lift-status");
let changeButton = document.querySelector(".change-button");
let liftObj = [];
let workingLift = [];
let historyLiftNumber;
let historyFrom;
let historyTo;
let historyIndex = 0;

// let liftNum = prompt("How many lifts do you want to add");
// let floorNum = prompt("How many floors do you want to add");

//==============================================================
//========================== Lift data set ========================================
setLift(3, 3);
function setLift(liftNum = 3, floorNum = 5) {
    liftClass.innerHTML = "";
    floorClass.innerHTML = "";
    liftObj = [];
    for (let i = 0; i < liftNum; i++) {
        let liftData = `<div class="total"><div class="upper-name">Lift-${i}</div><div class="lift" id="lift-${i}"><div class="lift-box" id="lift-box-${i}">0</div></div><div class="lower-name">Lift-${i}</div></div>`
        liftClass.insertAdjacentHTML("afterbegin", liftData);

        liftObj.push({ liftId: `lift-${i}`, liftNumber: `${i}`, liftBoxNumber: `${i}`, liftPosition: 0, maintence: false, isChecked: false, isAvailable: "Available" });

        // let randomColor = Math.floor(Math.random()*16777215).toString(16);
        // document.querySelector(`#lift-box-${i}`).style.background = `#${randomColor}`;
    }
    for (let i = 0; i < floorNum; i++) {
        let floorData = `<div class="maintence" id="floor-${i}" onclick="liftTransition(id)"><button class="maintence-button">Floor-${i}</button></div>`
        floorClass.insertAdjacentHTML("afterbegin", floorData);
    }
    let lifts = document.querySelectorAll(".lift");
    for (let lif of lifts) {
        lif.style.height = `${3 * floorNum}rem`;
    }
}


//==============================================================
//========================== Lift Transition ========================================
function liftTransition(id) {
    workingLift = liftObj.filter((lif, index, arr) => lif.isAvailable === "Available");
    let rlif = [];
    let index = id.split("-");
    console.log(index[1]);
    let distance = Math.min(...workingLift.map(lif => Math.abs(index[1] - lif.liftPosition)));
    console.log(distance);
    workingLift.forEach((ds, i, arr) => {
        if (Math.abs(index[1] - ds.liftPosition) == distance) {
            rlif.push(ds);
        }
    });
    console.log(rlif);
    let item = rlif[Math.floor(Math.random() * rlif.length)];
    console.log(item);
    let liftNum = item.liftNumber;
    historyLiftNumber = liftNum;
    let liftPos = item.liftPosition;
    historyFrom = liftPos;
    historyTo = index[1];
    document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos - index[1]) * 0.5}s`;
    document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${index[1] * 3}rem`;
    document.querySelector(`#lift-box-${liftNum}`).textContent = `${index[1]}`;
    liftObj[liftNum].liftPosition = `${index[1]}`;
    setHistory();
}


//==============================================================
//========================== Lift Maintence  ========================================
function setMaintenceButton() {
    document.querySelector(".maintence-box-inside-lifts").innerHTML = "";
    for (let lif of liftObj) {
        let html = `<div class="maintence-box-inside-lifts-item"><span>Lift-${lif.liftNumber}</span>
            <label class="switch">
            <input type="checkbox" class="check-${lif.liftNumber}" id="check-${lif.liftNumber}" onchange="changeMaintence(id)">
            <span class="slider round"></span>
        </label></div>`;
        document.querySelector(".maintence-box-inside-lifts").insertAdjacentHTML("afterbegin", html);
        if (lif.isChecked)
            document.querySelector(`#check-${lif.liftNumber}`).checked = true;
    }
}
// id="check-${lif.liftNumber}" onchange="changeMaintence(id)"
// class="check-${lif.liftNumber}"
maintenceButton.addEventListener("click", function (e) {
    document.querySelector(".maintence-box-inside-lifts").classList.toggle("hidden");
    setMaintenceButton();
});

function changeMaintence(id) {
    console.log(id);
    let checkBox = document.querySelector(`#${id}`);
    let num = id.split("-");
    console.log(num[1]);
    if (checkBox.checked) {
        liftObj.forEach((lif, index, arr) => {
            console.log(index)
            if (lif.liftNumber == num[1]) {
                console.log(true);
                lif.maintence = true;
                lif.isChecked = true;
                lif.isAvailable = "Maintence";
                setLiftStatus();
                // document.querySelector(`#lift-box-${lif.liftNumber}`).style.border = "4px solid red";
            }
        });
        // workingLift = liftObj.filter((lif, index, arr) => lif.maintence == false);
    }
    else {
        liftObj.forEach((lif, index, arr) => {
            console.log(index)
            if (lif.liftNumber == num[1]) {
                console.log(true);
                lif.maintence = false;
                lif.isChecked = false;
                lif.isAvailable = "Available";
                setLiftStatus();
                // document.querySelector(`#lift-box-${lif.liftNumber}`).style.border = "none";
            }
        });
        // workingLift = liftObj.filter((lif, index, arr) => lif.maintence == false);
    }
}


//==============================================================
//========================== Lift Status ========================================

function setLiftStatus() {
    document.querySelector(".lift-status-item").innerHTML = "";
    for (let lif of liftObj) {
        let html = `<div class="lift-status-box"><span>Lift-${lif.liftNumber}</span>
            <span class="availableColor">${lif.isAvailable}</span></div>`;
        document.querySelector(".lift-status-item").insertAdjacentHTML("afterbegin", html);
        let ac = document.querySelector(".availableColor").textContent;
        if (ac === "Available")
            document.querySelector(".availableColor").style.color = "lightgreen";
        else if (ac === "Not Available")
            document.querySelector(".availableColor").style.color = "red";
    }
}

liftStatus.addEventListener("click", function (e) {
    document.querySelector(".lift-status-item").classList.toggle("hidden");
    setLiftStatus();
});


//==============================================================
//========================== Change Button ========================================
changeButton.addEventListener("click", function (e) {
    document.querySelector(".pop-up-box").classList.toggle("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
});


function okButton() {
    let numberOfLift = document.querySelector("#lift-number").value;
    let numberOfFloor = document.querySelector("#floor-number").value;
    document.querySelector(".pop-up-box").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    setLift(numberOfLift, numberOfFloor);
    localStorage.clear();
}
function cancelButton() {
    document.querySelector(".pop-up-box").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    // setLift();
}


//==============================================================
//========================== Report ========================================
document.querySelector(".report").addEventListener("click", function (e) {

    if (document.querySelector(".history-table").classList.contains("hidden")) {
        document.querySelector(".history-table").classList.remove("hidden");
        displayHistory();
    }
    else
        document.querySelector(".history-table").classList.add("hidden");
});

function displayHistory() {
    document.querySelector(".table-upper").innerHTML = "";
    let keys = Object.keys(localStorage);
    let html;
    let first = `<tr class="table-header">
            <td> LiftNumber </td>
            <td> From </td>
            <td> To </td>
            <td> Time </td>
            <td> Date </td>
        </tr>`;
    document.querySelector(".table-upper").insertAdjacentHTML("afterbegin", first);
    for (let i = 0; i < keys.length; i++) {
        let j = 0;
        let array = `${JSON.parse(localStorage.getItem(keys[i]))}`.split(",");

        html = `
            <tr class="table-row">
                <td>${array[j]}</td>
                <td>${array[j + 1]}</td>
                <td>${array[j + 2]}</td>
                <td>${array[j + 3]}</td>
                <td>${array[j + 4]}</td>
            </tr>
        `;
        document.querySelector(".table-header").insertAdjacentHTML("afterend", html);
        // JSON.parse(localStorage.getItem(keys[i]));
    }
}

function setHistory() {

    let todayDate = new Date();
    let historyDate = todayDate.getDate() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getFullYear();

    let todayTime = new Date();
    let historyTime = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();

    let data = [`${historyLiftNumber}`, `${historyFrom}`, `${historyTo}`, `${historyTime}`, `${historyDate}`];
    localStorage.setItem(`${historyIndex}`, JSON.stringify(data));
    historyIndex++;
}



//==============================================================
//========================== Customized ========================================
document.querySelector(".customized-button").addEventListener("click", function (e) {
    document.querySelector(".customized-inside").classList.toggle("hidden");
    document.querySelector(".other-data").classList.add("hidden");
});

function customized(id) {
    let onRadio = document.querySelector("#radio-1").checked;
    let offRadio = document.querySelector("#radio-2").checked;

    console.log(offRadio);
    console.log(onRadio);
    if (offRadio) {
        if (id == "all") {
            liftObj.forEach((lif, index, arr) => {
                lif.isAvailable = "Not Available";
                console.log(lif.isAvailable);
                let liftPos = lif.liftPosition;
                let liftNum = lif.liftNumber;
                document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos - 0) * 0.5}s`;
                document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                document.querySelector(`#lift-box-${liftNum}`).style.background = `black`;
                document.querySelector(`#lift-${liftNum}`).style.background = `black`;
                liftObj[liftNum].liftPosition = `${0}`;
                setLiftStatus();
            });
            // workingLift = liftObj.filter((lif, index, arr) => lif.available == true);
        }
        if (id == "even") {
            liftObj.forEach((lif, index, arr) => {
                let liftNum = lif.liftNumber;
                if (liftNum % 2 == 0) {
                    lif.isAvailable = "Not Available";
                    let liftPos = lif.liftPosition;
                    document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos - 0) * 0.5}s`;
                    document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                    document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                    document.querySelector(`#lift-box-${liftNum}`).style.background = `black`;
                    document.querySelector(`#lift-${liftNum}`).style.background = `black`;
                    liftObj[liftNum].liftPosition = `${0}`;
                    setLiftStatus();
                }
            });
        }
        if (id == "odd") {
            liftObj.forEach((lif, index, arr) => {
                let liftNum = lif.liftNumber;
                if (liftNum % 2 != 0) {
                    lif.isAvailable = "Not Available";
                    let liftPos = lif.liftPosition;
                    document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos - 0) * 0.5}s`;
                    document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                    document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                    document.querySelector(`#lift-box-${liftNum}`).style.background = `black`;
                    document.querySelector(`#lift-${liftNum}`).style.background = `black`;
                    liftObj[liftNum].liftPosition = `${0}`;
                    setLiftStatus();
                }
            });
        }
        if (id == "other") {
            document.querySelector(".other-data").classList.remove("hidden");
            document.querySelector("#customized-other-text").addEventListener("keydown", function (e) {
                if (e.key == "Enter") {
                    let textValue = document.querySelector("#customized-other-text").value;
                    if (textValue != "" || textValue != " ") {
                        let liftsOff = textValue.split(",");
                        liftsOff.forEach(liftNum => {
                            liftObj[liftNum].isAvailable = "Not Available";
                            let liftPos = liftObj[liftNum].liftPosition;
                            document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos - 0) * 0.5}s`;
                            document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                            document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                            document.querySelector(`#lift-box-${liftNum}`).style.background = `black`;
                            document.querySelector(`#lift-${liftNum}`).style.background = `black`;
                            liftObj[liftNum].liftPosition = `${0}`;
                            setLiftStatus();
                        });
                    }
                }
            });
        }
    }
    else if (onRadio) {
        if (id == "all") {
            liftObj.forEach((lif, index, arr) => {
                lif.isAvailable = "Available";
                lif.maintence = false;
                lif.isChecked = false;
                let liftNum = lif.liftNumber;
                // let liftPos = lif.liftPosition;
                // document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos-0)*0.5}s`;
                // document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                // document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                document.querySelector(`#lift-box-${liftNum}`).style.background = `#F6C90E`;
                document.querySelector(`#lift-${liftNum}`).style.background = `#3A4750`;
                // liftObj[liftNum].liftPosition = `${0}`;
                setLiftStatus();
            });
            // workingLift = liftObj.filter((lif, index, arr) => lif.available == true);
        }
        if (id == "even") {
            liftObj.forEach((lif, index, arr) => {
                let liftNum = lif.liftNumber;
                if (liftNum % 2 == 0) {
                    lif.isAvailable = "Available";
                    let liftPos = lif.liftPosition;
                    // document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos-0)*0.5}s`;
                    // document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                    // document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                    document.querySelector(`#lift-box-${liftNum}`).style.background = `#F6C90E`;
                    document.querySelector(`#lift-${liftNum}`).style.background = `#3A4750`;
                    // liftObj[liftNum].liftPosition = `${0}`;
                    setLiftStatus();
                }
            });
        }
        if (id == "odd") {
            liftObj.forEach((lif, index, arr) => {
                let liftNum = lif.liftNumber;
                if (liftNum % 2 != 0) {
                    lif.isAvailable = "Available";
                    let liftPos = lif.liftPosition;
                    // document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos-0)*0.5}s`;
                    // document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                    // document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                    document.querySelector(`#lift-box-${liftNum}`).style.background = `#F6C90E`;
                    document.querySelector(`#lift-${liftNum}`).style.background = `#3A4750`;
                    // liftObj[liftNum].liftPosition = `${0}`;
                    setLiftStatus();
                }
            });
        }
        if (id == "other") {
            document.querySelector(".other-data").classList.remove("hidden");
            document.querySelector("#customized-other-text").addEventListener("keydown", function (e) {
                if (e.key == "Enter") {
                    let textValue = document.querySelector("#customized-other-text").value;
                    if (textValue != "" || textValue != " ") {
                        let liftsOff = textValue.split(",");
                        liftsOff.forEach(liftNum => {
                            liftObj[liftNum].isAvailable = "Available";
                            // let liftPos = document.querySelector(`#lift-box-${liftNum}`).textContent;
                            // document.querySelector(`#lift-box-${liftNum}`).style.transition = `bottom ${Math.abs(liftPos-0)*0.5}s`;
                            // document.querySelector(`#lift-box-${liftNum}`).style.bottom = `${0}rem`;
                            // document.querySelector(`#lift-box-${liftNum}`).textContent = `${0}`;
                            document.querySelector(`#lift-box-${liftNum}`).style.background = `#F6C90E`;
                            document.querySelector(`#lift-${liftNum}`).style.background = `#3A4750`;
                            // liftObj[liftNum].liftPosition = `${0}`;
                            setLiftStatus();
                        });
                    }
                }
            });
        }
    }
}