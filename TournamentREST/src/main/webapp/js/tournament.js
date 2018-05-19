window.addEventListener('load', function(e){
    run();
});


function run(){
    console.log("Ran it!");
    // displayAllTournaments();
    var button = document.getElementById('index');
    button.addEventListener('click', function(e){
        displayAllTournaments();
    });
    document.addTournament.addTournamentButton.addEventListener('click', function(ev){
        console.log(ev);
        
        addTournament(ev);
    });
}

function displayAllTournaments(){
    var xhr = new XMLHttpRequest();
    var allTournamentDiv = document.getElementById("allTournaments");
    allTournamentDiv.textContent = "";
    var header = document.createElement('h3');
    header.textContent = 'All Tournaments';
    allTournamentDiv.appendChild(header);
    xhr.open('GET', 'api/tournament/all', true)
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status == 200){
            var table = document.createElement('table');
            var allTournaments = JSON.parse(this.responseText);
            var tableHeadRow = document.createElement('tr');
            var tableHead = document.createElement('th');
            tableHead.textContent = "Tournament Name";
            tableHeadRow.appendChild(tableHead);
            table.appendChild(tableHeadRow);
            
            for(var element in allTournaments){
                var tableRow = document.createElement('tr');
                var tableData = document.createElement('td');
                var hiddenTableData = document.createElement('td');
                hiddenTableData.setAttribute("style", "display:none");
                hiddenTableData.textContent = allTournaments[element].id;
                tableData.textContent = allTournaments[element].name;
                tableRow.appendChild(tableData);
                tableRow.appendChild(hiddenTableData);
                    tableRow.addEventListener('click', function(e){
                        var idInText = e.target.parentElement.lastElementChild.textContent;
                        idInInt = parseInt(idInText);
                        displayOneTournament(idInInt);
                    });
                table.appendChild(tableRow);
            };
            table.setAttribute("align", 'center');
            allTournamentDiv.appendChild(table);
        }
    }
    xhr.send();
}

function addTournament(ev){
    ev.preventDefault();
    var button = document.getElementById("addTournamentButton");            
    var title = button.parentElement[0].value;    
    var type = button.parentElement.type.value;
    var date = button.parentElement.startDate.value;
    var roundsWon = button.parentElement.roundsWon.value;
    var roundsLost = button.parentElement.roundsLost.value;
    var roundsDrawn = button.parentElement.roundsDrawn.value;
    var place = button.parentElement.place.value;
    var totalPlayers = button.parentElement.totalPlayers.value;
    var tournament = {
        name: title,
        type: type,
        startDate: date,
        roundsWon: roundsWon,
        roundsLost: roundsLost,
        roundsDrawn: roundsDrawn,
        place: place,
        totalPlayers: totalPlayers
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/tournament/new', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 201){
                var dataBack = JSON.parse(xhr.responseText);
                console.log("SUCCESS! " + dataBack);
                displayAllTournaments();
            }
            else{
                console.error("FAILED IDIOT");
                console.error(xhr.status + ": " + xhr.responseText);
              }
        }
    }
    xhr.setRequestHeader("Content-type", "application/json");
    var tournamentJSON = JSON.stringify(tournament);
    xhr.send(tournamentJSON);
}

function displayOneTournament(tournamentId){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `api/tournament/${tournamentId}`, true);
    var dataBack;
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                dataBack = JSON.parse(this.responseText);
                var table = document.createElement('table');
                
                for (let key in dataBack) {
                    if(key !== 'id'){                        
                        var tableRow = document.createElement('tr');
                        var labelSquare = document.createElement('td');
                        var infoSquare = document.createElement('td');
                        labelSquare.textContent = key;
                        infoSquare.textContent = dataBack[key];
                        tableRow.appendChild(labelSquare);
                        tableRow.appendChild(infoSquare);
                        table.appendChild(tableRow);
                    }    
                }
                var div = document.getElementById('allTournaments');
                div.textContent = "";
                var header = document.createElement('h3');
                header.textContent = 'Your Tournament';

                var updateButton = document.createElement('button');
                updateButton.textContent = "Update This Tournament";
                updateButton.addEventListener('click', function(updateEvent){
                    displayUpdateModal(`${tournamentId}`);
                });


                var deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete This Tournament";
                deleteButton.addEventListener('click', function(event){
                    if(confirm("Are you sure?")){
                        deleteTournament(tournamentId);
                    }
                });
                
                div.appendChild(header);
                div.appendChild(table);
                div.appendChild(updateButton);
                div.appendChild(deleteButton);
            }
            else{
                console.error("TRY AGAIN MORON");
                console.error(xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send()
    

}

function deleteTournament(tourneyId){
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `api/tournament/delete/${tourneyId}`, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 202){
                console.log('TEST');
                displayAllTournaments();
            }
        }

    }
    xhr.send()
}

function displayUpdateModal(id){
    var updateModal = document.getElementById('updateModal');
    updateModal.style.display = "block";

    var closeButton = document.getElementById('closeButton');    
    closeButton.onclick = function(){
        updateModal.style.display = "none";
    }


    window.onclick = function(event) {
        if (event.target == updateModal) {
            modal.style.display = "none";
        }
    }

    var button = document.getElementById("updateTournamentButton");

    button.addEventListener('click', function(e){
        e.preventDefault();
        var name = button.parentElement[0].value;    
        var type = button.parentElement.type.value;
        var date = button.parentElement.startDate.value;
        var roundsWon = button.parentElement.roundsWon.value;
        var roundsLost = button.parentElement.roundsLost.value;
        var roundsDrawn = button.parentElement.roundsDrawn.value;
        var place = button.parentElement.place.value;
        var totalPlayers = button.parentElement.totalPlayers.value;
        var updatedTournament = {
            name: name,
            type: type,
            startDate: date,
            roundsWon: roundsWon,
            roundsLost: roundsLost,
            roundsDrawn: roundsDrawn,
            place: place,
            totalPlayers: totalPlayers
        }
        var xhr = new XMLHttpRequest();
        xhr.open('PATCH', `api/tournament/update/${id}`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var updatedTournament = JSON.parse(this.responseText);
                    displayOneTournament(`${id}`);
                }
                else{
                    console.log(updateJSON);
                    
                    console.error(xhr.status + ": " + xhr.responseText);
                    console.error("NUH UH DUMB DUMB");
                }
            }
        }
        updateJSON = JSON.stringify(updatedTournament);
        xhr.send(updateJSON);
    })

}










// var updateForm = document.createElement('form');
// for (let key in dataBack) {
//     if(key !== 'id'){                        
//         var tableRowUpdate = document.createElement('tr');
//         var labelSquareUpdate = document.createElement('td');
//         var infoSquareUpdate = document.createElement('td');
//         var inputField = document.createElement('input');
//             if(key == 'name' || key == 'type' || key == 'description'){
//                 inputField.setAttribute('type', 'text');
//             }
//             else if(key == 'startDate'){
//                 inputField.setAttribute('type', 'date');
//             }
//             else{
//                 inputField.setAttribute('type', 'number');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'startDate'){
//                 inputField.setAttribute('name', 'startDate');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
//             if(key === 'name'){
//                 inputField.setAttribute('name', 'name');
//             }
        
//         tableRow.appendChild(labelSquare);
//         tableRow.appendChild(infoSquare);
//         table.appendChild(tableRow);
//     }    
// }