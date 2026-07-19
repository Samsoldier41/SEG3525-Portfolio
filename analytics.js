const {useState,useEffect,useRef}=React;

function App(){

const [language,setLanguage]=useState("fr");
const [season,setSeason]=useState("2025");
const [team,setTeam]=useState("Lions");

const barChart=useRef(null);
const lineChart=useRef(null);

const barCanvas=useRef(null);
const lineCanvas=useRef(null);

const text={

fr:{

title:"Football Performance Dashboard",

subtitle:"Tableau de bord interactif",

warning:"Toutes les données présentées sont synthétiques et ont été créées uniquement pour ce projet universitaire.",

season:"Saison",

team:"Équipe",

summary:"Résumé",

lang:"English",

goals:"Buts par joueur",

performance:"Performance mensuelle",

average:"Buts moyens",

best:"Meilleur joueur",

month:"Mois",

january:"Janvier",

february:"Février",

march:"Mars",

april:"Avril",

may:"Mai",

june:"Juin",

july:"Juillet",

august:"Août"

},

en:{

title:"Football Performance Dashboard",

subtitle:"Interactive Dashboard",

warning:"All displayed data are synthetic and were created only for this university assignment.",

season:"Season",

team:"Team",

summary:"Summary",

lang:"Français",

goals:"Goals per Player",

performance:"Monthly Performance",

average:"Average Goals",

best:"Best Player",

month:"Month",

january:"January",

february:"February",

march:"March",

april:"April",

may:"May",

june:"June",

july:"July",

august:"August"

}

};

const players=[

"Alex",

"Lucas",

"Thomas",

"Nathan",

"Samuel",

"Kevin"

];

const goals={

Lions:[

15,

10,

8,

12,

5,

11

],

Tigers:[

9,

13,

14,

7,

10,

8

],

Falcons:[

7,

16,

9,

11,

12,

10

]

};

const performance={

Lions:[

60,

70,

65,

80,

82,

91,

87,

93

],

Tigers:[

55,

62,

68,

71,

79,

82,

80,

88

],

Falcons:[

50,

58,

64,

73,

77,

81,

84,

89

]

};

const months=[

text[language].january,

text[language].february,

text[language].march,

text[language].april,

text[language].may,

text[language].june,

text[language].july,

text[language].august

];

const average=Math.round(

goals[team].reduce((a,b)=>a+b,0)/goals[team].length

);

const bestIndex=goals[team].indexOf(

Math.max(...goals[team])

);

const bestPlayer=players[bestIndex];

useEffect(()=>{

if(barChart.current){

barChart.current.destroy();

}

barChart.current=new Chart(

barCanvas.current,

{

type:"bar",

data:{

labels:players,

datasets:[{

label:text[language].goals,

data:goals[team],

backgroundColor:[

"#2563eb",

"#60a5fa",

"#1d4ed8",

"#3b82f6",

"#93c5fd",

"#2563eb"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

}

);

if(lineChart.current){

lineChart.current.destroy();

}

lineChart.current=new Chart(

lineCanvas.current,

{

type:"line",

data:{

labels:months,

datasets:[{

label:text[language].performance,

data:performance[team],

fill:false,

borderWidth:3,

borderColor:"#2563eb",

tension:0.3

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:true

}

}

}

}

);

},[language,team,season]);return(

<div>

<header>

<h1>{text[language].title}</h1>

<p>{text[language].subtitle}</p>

</header>

<main className="container">

<div className="top-bar">

<a href="index.html" className="language-btn">
Retour au portfolio
</a>

<button
className="language-btn"
onClick={()=>setLanguage(language==="fr"?"en":"fr")}
>

{text[language].lang}

</button>

</div>

<div className="notice">

{text[language].warning}

</div>

<section className="filters">

<div className="filter-card">

<h3>{text[language].season}</h3>

<select
value={season}
onChange={(event)=>setSeason(event.target.value)}
>

<option value="2025">2025</option>
<option value="2024">2024</option>
<option value="2023">2023</option>

</select>

</div>

<div className="filter-card">

<h3>{text[language].team}</h3>

<select
value={team}
onChange={(event)=>setTeam(event.target.value)}
>

<option value="Lions">Lions</option>
<option value="Tigers">Tigers</option>
<option value="Falcons">Falcons</option>

</select>

</div>

</section>

<section className="dashboard">

<div className="chart-card">

<h2>{text[language].goals}</h2>

<canvas ref={barCanvas}></canvas>

</div>

<div className="chart-card">

<h2>{text[language].performance}</h2>

<canvas ref={lineCanvas}></canvas>

</div>

</section>

<section className="summary">

<h2>{text[language].summary}</h2>

<ul>

<li>
<strong>{text[language].team} :</strong> {team}
</li>

<li>
<strong>{text[language].season} :</strong> {season}
</li>

<li>
<strong>{text[language].average} :</strong> {average}
</li>

<li>
<strong>{text[language].best} :</strong> {bestPlayer}
</li>

</ul>

</section>

</main>

<footer>

<p>Designed by Sami Diouf · SEG3525</p>

</footer>

</div>

);

}

ReactDOM
.createRoot(document.getElementById("root"))
.render(<App/>);
