// ============================
// CONFIGURACIÓN
// ============================

const months = [
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const weekdays = [
    "L",
    "M",
    "M",
    "J",
    "V",
    "S",
    "D"
];

// Año del planner
const year = 2026;

// ============================
// ELEMENTOS
// ============================

const calendarContainer = document.getElementById("calendarContainer");

const modal = document.getElementById("noteModal");

const modalDate = document.getElementById("modalDate");

const noteText = document.getElementById("noteText");

const saveNote = document.getElementById("saveNote");

const closeModal = document.getElementById("closeModal");

const todayBox = document.getElementById("today");

let currentKey = "";

// ============================
// FECHA ACTUAL
// ============================

const today = new Date();

todayBox.innerHTML =
    today.toLocaleDateString("es-CO");

// ============================
// CARGAR NOTAS
// ============================

let notes =
JSON.parse(localStorage.getItem("plannerNotes")) || {};

// ============================
// CREAR CALENDARIOS
// ============================

months.forEach((monthName,index)=>{

    const monthNumber=index+5;

    const month=document.createElement("section");
    month.className="month";

    month.innerHTML=`

        <h2 class="month-title">${monthName}</h2>

        <div class="calendar">

            <div class="weekdays">

            ${weekdays.map(day=>`<div>${day}</div>`).join("")}

            </div>

            <div class="days"></div>

        </div>

    `;

    const daysContainer=month.querySelector(".days");

    const totalDays=
        new Date(year,monthNumber+1,0).getDate();

    const firstDay=
        new Date(year,monthNumber,1).getDay();

    const start=
        firstDay===0?6:firstDay-1;

    for(let i=0;i<start;i++){

        const empty=document.createElement("div");

        daysContainer.appendChild(empty);

    }

    for(let day=1;day<=totalDays;day++){

        const box=document.createElement("div");

        box.className="day";

        const date=new Date(year,monthNumber,day);

        const key=`${year}-${monthNumber+1}-${day}`;

        let html=`<strong>${day}</strong>`;

        // Snoopy días pasados

        if(date<today){

            box.classList.add("past");

            html+=`
            <img
            src="assets/snoopy.png"
            class="snoopy">
            `;

        }

        // Día actual

        if(
            date.getDate()==today.getDate() &&
            date.getMonth()==today.getMonth() &&
            date.getFullYear()==today.getFullYear()
        ){

            box.classList.add("today");

        }

        // Nota

        if(notes[key]){

            html+=`
            <div class="note">

            ${notes[key]}

            </div>
            `;

        }

        box.innerHTML=html;

        box.addEventListener("click",()=>{

            currentKey=key;

            modal.classList.remove("hidden");

            modalDate.innerHTML=
            `${day} ${monthName}`;

            noteText.value=
            notes[key] || "";

        });

        daysContainer.appendChild(box);

    }

    calendarContainer.appendChild(month);

});

// ============================
// GUARDAR NOTA
// ============================

saveNote.onclick=()=>{

    notes[currentKey]=noteText.value;

    localStorage.setItem(

        "plannerNotes",

        JSON.stringify(notes)

    );

    location.reload();

};

// ============================
// CERRAR MODAL
// ============================

closeModal.onclick=()=>{

    modal.classList.add("hidden");

};

window.onclick=(e)=>{

    if(e.target===modal){

        modal.classList.add("hidden");

    }

};

// ============================
// BOTÓN SUBIR
// ============================

document
.getElementById("goTop")
.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};