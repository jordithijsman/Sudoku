export class HighscoresController {
    static fetchHighscores() {
        return fetch("http://localhost:8080/highscores",
            {method: "GET"})
    };

    static postHighscores(name, time, moves, size) {
        return fetch("http://localhost:8080/highscores",
            {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({"name": name, "time": time, "moves": moves, "size": size})
            }
        )
    }

    static initHighscores() {
        HighscoresController.fetchHighscores().then(hs => hs.json()).then(json => {
            console.log(json);
            let kHard = 1;
            let tableHard = document.getElementById("highscores_table_hard");
            let kEasy = 1;
            let tableEasy = document.getElementById("highscores_table_easy");
            let kNormal = 1;
            let tableNormal = document.getElementById("highscores_table_normal");
            for (let i = 0; i < json.length; i++) {
                let tr = document.createElement("tr");
                let head = document.createElement("th");
                head.setAttribute("scope", "row");
                if (json[i].size === 2) {
                    head.innerText = (kEasy).toString();
                    kEasy++;
                } else if(json[i].size === 3){
                    head.innerText = (kNormal).toString();
                    kNormal++;
                }else{
                    head.innerText = (kHard).toString();
                    kHard++;
                }
                tr.appendChild(head);
                let names = document.createElement("td");
                names.innerText = json[i]["name"];
                tr.appendChild(names);
                let times = document.createElement("td");
                let min = Math.floor(json[i].time / 60000);
                let sec = Math.floor((json[i].time - min * 60000) / 1000);
                let msec = json[i].time - min * 60000 - sec * 1000;
                times.innerText = min.toString() + ":" + ("00" + sec.toString()).slice(-2) + ":" + ("000" + msec.toString()).slice(-3);
                tr.appendChild(times);
                let movess = document.createElement("td");
                movess.innerText = json[i].moves;
                tr.appendChild(movess);
                if (json[i].size === 2) {
                    tableEasy.appendChild(tr);
                } else if(json[i].size === 3){
                    tableNormal.appendChild(tr);
                }else tableHard.appendChild(tr);
            }
        })
    }
}