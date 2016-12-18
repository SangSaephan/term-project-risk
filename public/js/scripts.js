var socket = io();
/*game.players = {};
game.players[0] = "red";
game.players[1] = "blue";
game.players[2] = "yellow";
game.players[3] = "green";*/
socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
});

function territoryClicked(name) {
	console.log(name);
	//deploy(name);
	reinforce(name);
}


function deploy(name) {
	//Assigns the current value to the input, or zero if it isn't set
	document.getElementById('deployValue').value = document.getElementById(name + "Text").textContent == "" ? 
		0 : document.getElementById(name + "Text").textContent;
	var modal = document.getElementById('deployModal');
	modal.style.display = "block";
	///Hides when you click Deploy button
	document.getElementById('deploy').onclick = function() { 
		document.getElementById('deployModal').style.display = "none";
		console.log("Deployed "+document.getElementById('deployValue').value+" in " + name);
		document.getElementById(name + 'Text').textContent = document.getElementById('deployValue').value;
	}
	//Hides model when you click away or click the close button
	document.getElementsByClassName("close")[0].onclick = function() { 
		modal.style.display = "none";
	}
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}

function reinforce(name) {
	var troopsRemaining = 3;
	//Assigns the current value to the input, or zero if it isn't set
	document.getElementById('reinforceValue').value = troopsRemaining == 0 ? 
		0 : troopsRemaining;
	var modal = document.getElementById('reinforceModal');
	modal.style.display = "block";
	///Hides when you click Deploy button
	document.getElementById('reinforce').onclick = function() { 
		document.getElementById('reinforceModal').style.display = "none";
		console.log("Reinforced "+document.getElementById('reinforceValue').value+" in " + name);
		document.getElementById(name + 'Text').textContent = parseInt(document.getElementById(name + 'Text').textContent)+parseInt(document.getElementById('reinforceValue').value);
	}
	//Hides model when you click away or click the close button
	document.getElementsByClassName("close")[1].onclick = function() { 
		modal.style.display = "none";
	}
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}

function setColor(territoryID, playerID) {
    $('#' + document.getElementById(territoryID).alt + 'Text').css("color", game.players[playerID]);
}

function setTroops(territoryID, value) {
    var item = document.getElementById(document.getElementById(territoryID).alt + 'Text');
    item.textContent = value;
}

function configureGame(gameState) {
	for (i = 0; i < gameState.length; i++){
		
	}
}


jQuery(document).ready(function() {
    //Repositioning the texts according to the image size
    $(this).scrollTop(0);
    var height = (675 / $("#planetmap").height());
    var width = (1200 / $("#planetmap").width());
    console.log($("#planetmap").height() + " " + $("#planetmap").offset().top + " " + $("#indonesiaText").offset().top);
    var size = parseInt($(".text").css('font-size'));
    var text_array = $('.text');
    for (var i = 0; i < text_array.length; i++) {
        $(text_array[i]).css("position", "absolute");
        $(text_array[i]).css("color", "white");
        $(text_array[i]).css({
            top: ((($(text_array[i]).position().top) / height) + 5),
            left: ((($(text_array[i]).position().left) / width) + 20)
        });
        $(".text").css('font-size', size / height);
    }
    //Getting the game state
    $.get(
        "/game/" + $('#gameid').val() + "/state",
        function(data) {
            console.log(data);
            configureGame(data);
        }
    );
    
    /* This is test code to populate the game with fake data
    $.get(
	    "/game/"+game.id+"/territories",
	    function(data) {
	    	console.log(data);
	    	for (i = 0; i < data.territories.territories.length; i++) {
	    		setTroops(data.territories.territories[i].id, data.territories.territories[i].troops)
	    		setColor(data.territories.territories[i].id, data.territories.territories[i].player);
			}
	       game.territories = data.territories.territories;
	    }
	);*/
	
	// This button will increment the value
    $('.qtyplus').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    document.getElementById('sendButton').onclick = function() {
        socket.emit('chat message', $('#text').val());
        $('#text').val('');
        return false;
    };

});