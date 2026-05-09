const door = new Audio('door.mp3');
door.volume = 0.2;
const scream = new Audio('scream.mp3');
const rocket = new Audio('rocket.mp3');
const glass = new Audio('glass.mp3');

function playSound(audio) {
    if (audio instanceof Audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Потрібен клік для звуку"));
    } else {
        console.error("Помилка: треба передавати змінну звуку, а не текст!");
    }
}
let rooms = [
{ 
    id: 'storage', 
    name: "Склад спорядження", 
    text: "Ти знайшов старий ЛІХТАР. Тепер темні кути станції не здаються такими страшними.",
    item: "Ліхтар"},
    { 
    id: 'lab', 
    name: "Лабораторія", 
    text: "На столі стоїть КОЛБА З КИСЛОТОЮ. Вона світиться яскраво-зеленим кольором і роз'їдає навіть метал.",
    item: "Колба з кислотою"},
{ 
    id: 'medbay', 
    name: "Медпункт", 
    text: "Ти знайшов АДРЕНАЛІН. Це допоможе діяти швидше у критичний момент.",
    item: "Адреналін"}
];

let visitedCount = 0;
let inventory = null;

//Коридор
window.nextStep = function() {
playSound(door);
const storyDiv = document.getElementById('story');
const controls = document.getElementById('controls');

if (visitedCount >= 3) {
showBossScene();
return;}
let invStatus = inventory ? `<br><br><span style='color:#00ff00'>У тебе в руках: ${inventory}</span>` : "";
    storyDiv.innerHTML = "Обери наступний сектор для перевірки." + invStatus;
    
    controls.innerHTML = '';
    rooms.forEach((room, index) => {
    const btn = document.createElement('button');
    btn.innerText = room.name;
    btn.onclick = function() { enterRoom(index); };
    controls.appendChild(btn);
});};

//кімнати
window.enterRoom = function(index) {
    playSound(door);
    const storyDiv = document.getElementById('story');
    const controls = document.getElementById('controls');

    if (visitedCount === 0) {
    inventory = rooms[index].item;
    storyDiv.innerHTML = `<b style='color:#ffd700'>ЗНАХІДКА: ${inventory}</b><br><br> + ${rooms[index].text}`;
    } else {
    storyDiv.innerText = rooms[index].text;
    }
    
    rooms.splice(index, 1);
    visitedCount++;
    controls.innerHTML = '<button onclick="nextStep()">Вийти в коридор</button>';
};

function showBossScene() {
    const storyDiv = document.getElementById('story');
    const controls = document.getElementById('controls');

storyDiv.innerHTML = `<b style='color:red'>ТРИВОГА!</b><br>Величезна тінь перекриває вихід.;`

let buttonsHTML = `
<button onclick="endGame('bad')">ВІДКРИТИ ВОГОНЬ!</button>
<button onclick="endGame('good')">ТІКАТИ ДО КОРАБЛЯ!</button>`; 

    if (inventory === "Колба з кислотою") {
    buttonsHTML += `<button onclick="endGame('acid')" style="background:#2ecc71; color:black; font-weight:bold;">ЖБУРНУТИ КОЛБУ!</button>`;
    }

    controls.innerHTML = buttonsHTML;
}

window.endGame = function(type) {
    const storyDiv = document.getElementById('story');
    const controls = document.getElementById('controls');

    if (type === 'bad') {
        playSound(scream);
        document.body.style.background = "black";
        storyDiv.innerHTML = "<b style='color:red'>Ти загинув...</b>";
    } else if (type === 'acid') {
        playSound(glass);
        setTimeout(() => {
        playSound(scream); 
        }, 300)
        document.body.style.background = "#1e3700";
        storyDiv.innerHTML = "<b style='color:#00ff00'>Колба розбилася! Монстр розплавився у кислоті!</b>";
        }
     else {
        playSound(rocket);
        document.body.style.background = "linear-gradient(to top, #001133, #000)";
        storyDiv.innerHTML = "<b style='color:green'>Ти врятувався!</b>";
        }
controls.innerHTML = '<button onclick="location.reload()">Почати заново</button>';};