let liftClass = document.querySelector(".liftClass");
let floorClass = document.querySelector(".floorClass");

let liftObj = [];

let liftNum = prompt("How many lifts do you want to add");
let floorNum = prompt("How many floors do you want to add");

for(let i=0; i<liftNum; i++){
    let liftData = `<div class="lift" id="lift-${i}"><div class="lift-box" id="lift-box-${i}">0</div></div>`
    liftClass.insertAdjacentHTML("afterbegin", liftData);

    liftObj.push({liftId: `lift-${i}`, liftNumber: `${i}`, liftBoxNumber: `${i}`, liftPosition: 0});

    // let randomColor = Math.floor(Math.random()*16777215).toString(16);
    // document.querySelector(`#lift-box-${i}`).style.background = `#${randomColor}`;
}
for(let i=0; i<floorNum; i++){
    let floorData = `<div class="maintence" id="floor-${i}" onclick="liftTransition(id)"><button class="maintence-button">Floor-${i}</button></div>`
    floorClass.insertAdjacentHTML("afterbegin", floorData);
}
let lifts = document.querySelectorAll(".lift");
for(let lif of lifts){
    lif.style.height = `${3*floorNum}em`;
}

function liftTransition(id){
    let rlif = [];
    let index = id.split("-");
    console.log(index[1]);
    let distance = liftObj.map( lif => Math.abs(index[1] - lif.liftPosition));
    console.log(distance);
    let minDistance = Math.min(...distance);
    console.log(minDistance);
    distance.forEach((ds, i, arr)=> {
        if(minDistance == ds){
            rlif.push(i);
        }
    });
    console.log(rlif);
    let item = rlif[Math.floor(Math.random()*rlif.length)];
    console.log(item);
    document.querySelector(`#lift-box-${item}`).style.bottom = `${index[1]*3}em`;
    document.querySelector(`#lift-box-${item}`).textContent = `${index[1]}`;
    liftObj[item].liftPosition = `${index[1]}`;
}