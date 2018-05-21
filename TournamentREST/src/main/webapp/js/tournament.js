window.addEventListener('load', function(e){
    run();
});


function run(){
    var button = document.getElementById('index');
    button.addEventListener('click', function(e){
        displayAllTournaments();
    });
    var addButton = document.getElementById('add');
    addButton.addEventListener('click', function(e){
        e.preventDefault();
        displayAddModal();
    });
    document.addTournament.addTournamentButton.addEventListener('click', function(ev){
        addTournament(ev);
    });
    document.updateTournament.updateTournamentButton.addEventListener('click', function(e){
        e.preventDefault();
        addListenerToUpdate();
    });
    var searchButton = document.getElementById('search');
    searchButton.addEventListener('click', function(searchEvent){
        searchEvent.preventDefault();
        searchForTournaments();
    });
    var totalWinsButton = document.getElementById('totalWins');
    totalWinsButton.addEventListener('click', function(searchEvent){
        searchEvent.preventDefault();
        totalWins();
    });
    var totalLosesButton = document.getElementById('totalLoses');
    totalLosesButton.addEventListener('click', function(searchEvent){
        searchEvent.preventDefault();
        totalLoses();
    });
    var totalDrawsButton = document.getElementById('totalDraws');
    totalDrawsButton.addEventListener('click', function(searchEvent){
        searchEvent.preventDefault();
        totalDraws();
    });
    var averageWinsButton = document.getElementById('averageWins');
    averageWinsButton.addEventListener('click', function(searchEvent){
        searchEvent.preventDefault();
        averageWins();
    });
    var averageLossesButton = document.getElementById('averageLosses');
    averageLossesButton.addEventListener('click', function(searchEvent){
        searchEvent.preventDefault();
        averageLosses();
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
    var description = button.parentElement.description.value;
    var tournament = {
        name: title,
        type: type,
        startDate: date,
        roundsWon: roundsWon,
        roundsLost: roundsLost,
        roundsDrawn: roundsDrawn,
        place: place,
        totalPlayers: totalPlayers,
        description: description,
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/tournament/new', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 201){
                var dataBack = JSON.parse(xhr.responseText);
                console.log("SUCCESS! " + dataBack);
                displayAllTournaments();
                let modal = document.getElementById('addModal');
                modal.style.display = "none";
            }
            else{
                console.error("FAILED IDIOT");
                console.error("" + xhr.status + ": " + xhr.responseText);
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

function addListenerToUpdate(){
    var button = document.getElementById("updateTournamentButton");
        var id = button.parentElement.id.value;
        id = parseInt(id);
        console.log(id);
        var name = button.parentElement.title.value;    
        var type = button.parentElement.type.value;
        var date = button.parentElement.startDate.value;
        var roundsWon = button.parentElement.roundsWon.value;
        var roundsLost = button.parentElement.roundsLost.value;
        var roundsDrawn = button.parentElement.roundsDrawn.value;
        var place = button.parentElement.place.value;
        var totalPlayers = button.parentElement.totalPlayers.value;
        var description = button.parentElement.description.value;
        var updatedTournament = {
            name: name,
            type: type,
            startDate: date,
            roundsWon: roundsWon,
            roundsLost: roundsLost,
            roundsDrawn: roundsDrawn,
            place: place,
            totalPlayers: totalPlayers,
            description: description
        }
        var xhr = new XMLHttpRequest();
        xhr.open('PATCH', `api/tournament/update/${id}`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var updatedTournament = JSON.parse(this.responseText);
                    displayOneTournament(id);
                    let modal = document.getElementById('updateModal');
                    modal.style.display = "none";
                }
                else{
                    
                    console.error(xhr.status + ": " + xhr.responseText);
                    console.error("NUH UH DUMB DUMB");
                }
            }
        }
        updateJSON = JSON.stringify(updatedTournament);
        xhr.send(updateJSON);
    
}


function displayUpdateModal(id){
    if(Array.isArray(id)){
        id=(id[id.length - 1]);
    }
    var form = document.getElementsByName("updateTournament")[0];
    form.firstElementChild.value = id;


    var updateModal = document.getElementById('updateModal');
    updateModal.style.display = "block";

    var closeButton = document.getElementById('closeButton');    
    closeButton.onclick = function(){
        updateModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == updateModal) {
            updateModal.style.display = "none";
        }
    }
}

function displayAddModal(){
    var addModal = document.getElementById('addModal');
    addModal.style.display = "block";

    var closeButton = document.getElementById('closeButtonAdd');
    closeButton.onclick = function(){
        addModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == updateModal) {
            updateModal.style.display = "none";
        }
    }

}

function searchForTournaments(){
    var searchTerm = prompt("Enter a name or description:");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `api/tournament/search/${searchTerm}`, true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var results = JSON.parse(xhr.responseText);
                var allTournaments = document.getElementById('allTournaments');
                allTournaments.textContent = "";
                if(Array.isArray(results) && results != null &&results.length > 0 ){
                    var table = document.createElement('table');
                    var tableHead = document.createElement('thead');
                    var tableHeadRow = document.createElement('tr');
                    var tableHeadData = document.createElement('th');
                    var tableHeadData2 = document.createElement('th');
                    tableHeadData.textContent = "Name";
                    tableHeadData2.textContent = "Description";
                    tableHeadRow.appendChild(tableHeadData);
                    tableHeadRow.appendChild(tableHeadData2);
                    table.appendChild(tableHeadRow);

                    results.forEach(function(tourResult, number){                        
                        var resultRow = document.createElement('tr');
                        var idCol = document.createElement('td');
                        var nameCol = document.createElement('td');
                        var descCol = document.createElement('td');
                        idCol.textContent = tourResult.id;
                        nameCol.textContent = tourResult.name;
                        if(tourResult.description != null){
                            descCol.textContent = tourResult.description;
                        }
                        else{
                            descCol.textContent = "N/A";
                        }
                        idCol.setAttribute("style", "display: none");
                        resultRow.appendChild(idCol);
                        resultRow.appendChild(nameCol);
                        resultRow.appendChild(descCol);
                        resultRow.addEventListener('click', function(e){
                            let id = e.target.parentElement.firstElementChild.textContent;
                            id = parseInt(id);
                            displayOneTournament(id);
                        });
                        table.appendChild(resultRow);
                    });
                    allTournaments.appendChild(table);
                }
                else{
                    var noResults = document.createElement('h3');
                    noResults.textContent = "No Tournaments Found, Try Again!"
                    allTournaments.appendChild(noResults);
                }
            }
            else{
                console.error("" + xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send();
}

function totalWins(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/tournament/all/wins', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var display = document.getElementById('allTournaments');
                display.textContent = "";
                var result = JSON.parse(this.responseText);
                result = parseInt(result);
                var resultDisplay = document.createElement('h3');
                resultDisplay.textContent = `Number of Wins: ${result}` 
                display.appendChild(resultDisplay); 
            }
            else{
                console.error("" + xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send();
}

function totalLoses(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/tournament/all/losses', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var display = document.getElementById('allTournaments');
                display.textContent = "";
                var result = JSON.parse(this.responseText);
                result = parseInt(result);
                var resultDisplay = document.createElement('h3');
                resultDisplay.textContent = `Number of Losses: ${result}`;
                display.appendChild(resultDisplay); 
            }
            else{
                console.error("" + xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send();
}

function totalDraws(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/tournament/all/draws', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var display = document.getElementById('allTournaments');
                display.textContent = "";
                var result = JSON.parse(this.responseText);
                result = parseInt(result);
                var resultDisplay = document.createElement('h3');
                resultDisplay.textContent = `Number of Draws: ${result}`;
                display.appendChild(resultDisplay);  
            }
            else{
                console.error("" + xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send();
}

function averageWins(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/tournament/average/wins', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var display = document.getElementById('allTournaments');
                display.textContent = "";
                var result = JSON.parse(this.responseText);
                result = parseFloat(result);
                var resultDisplay = document.createElement('h3');
                resultDisplay.textContent = `Average Number of Wins Per Tournament: ${result}`;
                display.appendChild(resultDisplay);  
            }
            else{
                console.error("" + xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send();
}

function averageLosses(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/tournament/average/losses', true)
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var display = document.getElementById('allTournaments');
                display.textContent = "";
                var result = JSON.parse(this.responseText);
                result = parseFloat(result);
                var resultDisplay = document.createElement('h3');
                resultDisplay.textContent = `Average Number of Losses Per Tournament: ${result}`;
                display.appendChild(resultDisplay);  
            }
            else{
                console.error("" + xhr.status + ": " + xhr.responseText);
            }
        }
    }
    xhr.send();
}
