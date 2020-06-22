$(document).ready(function() {
	console.log('Ready');

	var pool1 = [];
	var pool2 = [];
	var list = [];
	var field = [];
	var waiting = [];
	var dead = [];
	var victor = "";

	// update the herald
	function shout(update) {
		var node = document.createElement('p');
		var textnode = document.createTextNode(update);
		node.appendChild(textnode);
		document.getElementById('progress').appendChild(node);
	}

	// proclaim the victor
	function announce(winner) {
		if (victor != "") {
			var proclaim = document.getElementById('status');

			proclaim.style.color = 'black';
			proclaim.innerText = winner + " is the champion!";

			shout("...");
			shout(winner + " is the champion!");
		};
		
	};

	// populate pool1
	function assemble() {
		console.log('Registering combatants');
		shout("Registering combatants...")
		list = document.getElementById('combatants').value;
		list = list.split(', ');
		console.log('Combatants listed: ' + list.length);

		// check there are combatants then add them to the pool
		console.log(list.length);
		if (list != "") {
			for (i = 0; i < list.length; i++) {
				pool1.push ([list[i],0]);
			};

			if (pool1.length > 1) {
				shout(pool1.length + " combatants registered, beginning tournament...");
			} else {
				shout("only " + pool1.length + " combatant registered, default win");
			};
		} else {
			shout(pool1.length + " combatants registered...");
		};
		
		console.log('Combatants registered: ' + pool1.length);
	};

	// run tournament
	function tournament() {
		console.log('Beginning tournament');
		var stage = 0;
		var round = 1;
		var seed = 0;
		var remaining = pool1.length;

		// check to make sure there are enough combatants
		if (pool1.length == 2) {
			pool2.push(pool1[1]);
			pool1.splice(1, 1);
			stage = 3;
		} else if (pool1.length == 1) {
			console.log("Default win!!!");
			stage = 0;
			victor = pool1[0][0];
		} else if (pool1.length == 0) {
			console.log("It's raining, go home.");
		} else {
			stage = 1;
		};

		while (stage == 1) {
			// select two combatants for the current round
			shout("Round: " + round);
			console.log(pool1);
			seed = Math.floor(Math.random() * pool1.length);
			field.push(pool1[seed]);
			pool1.splice(seed, 1);
			seed = Math.floor(Math.random() * pool1.length);
			field.push(pool1[seed]);
			pool1.splice(seed, 1);

			// decide the winner of the round
			switch (Math.floor(Math.random() * 2)) {
				case 0:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[0][0] + ' wins!');
					// increase looser's losses by 1
					field[1][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[0]);
					pool2.push(field[1]);
					break;
				case 1:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[1][0] + ' wins!');
					// increase looser's losses by 1
					field[0][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[1]);
					pool2.push(field[0]);
					break;
			};

			// reset the field for the next round
			field = [];

			// calculate remaining combatants for this stage
			remaining = pool1.length + waiting.length;
			console.log('combatants remaining: ' + remaining);

			// proceed according to remaining combatants
			if (remaining >= 2 && pool1.length <= 1) {
				for (a = 0; a < waiting.length; a++) {
					console.log('waiting combatants rejoin pool1')
					pool1.push(waiting[a]);
				};
				waiting = [];
			} else if (remaining == 1) {
				console.log(waiting[0][0] + ' wins stage 1');
				pool1.push(waiting[0]);
				waiting = [];
				stage++;
			};

			round++;
		};

		while (stage == 2) {
			// double check there are enough combatants
			if (pool2.length == 1) {
				console.log("Straight to the final");
				stage = 3;
			};

			// select two combatants for the current round
			shout("Round: " + round);
			console.log(pool2);
			seed = Math.floor(Math.random() * pool2.length);
			field.push(pool2[seed]);
			pool2.splice(seed, 1);
			seed = Math.floor(Math.random() * pool2.length);
			field.push(pool2[seed]);
			pool2.splice(seed, 1);

			// decide the winner of the round
			switch (Math.floor(Math.random() * 2)) {
				case 0:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[0][0] + ' wins!');
					// increase looser's losses by 1
					field[1][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[0]);
					dead.push(field[1]);
					break;
				case 1:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[1][0] + ' wins!');
					// increase looser's losses by 1
					field[0][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[1]);
					dead.push(field[0]);
					break;
			};

			// reset the field for the next round
			field = [];

			// calculate remaining combatants for this stage
			remaining = pool2.length + waiting.length;
			console.log('combatants remaining: ' + remaining);

			// proceed according to remaining combatants
			if (remaining >= 2 && pool2.length <= 1) {
				for (b = 0; b < waiting.length; b++) {
					console.log('waiting combatants rejoin pool2')
					pool2.push(waiting[b]);
				};
				waiting = [];
			} else if (remaining == 1) {
				console.log(waiting[0][0] + ' wins stage 2');
				pool2.push(waiting[0]);
				waiting = [];
				stage++;
			};

			round++;
		};

		while (stage == 3) {
			var finalist1 = 0;
			var finalist2 = 0;
			// set field for the final
			shout("Round: Final, best of 3");
			field.push(pool1[0][0]);
			field.push(pool2[0][0]);

			// decide the winner of the round
			for (f = 1; f <=3; f++) {
				switch (Math.floor(Math.random() * 2)) {
					case 0:
						shout(field[0] + ' vs. ' + field[1] + ', ' + field[0] + ' wins!');
						// increase winner's score by 1
						finalist1++;
						break;
					case 1:
						shout(field[0] + ' vs. ' + field[1] + ', ' + field[1] + ' wins!');
						// increase winner's score by 1
						finalist2++;
						break;
				};
			};

			if (finalist1 > finalist2) {
				victor = field[0];
			} else if (finalist1 < finalist2) {
				victor = field[1];
			} else {
				console.log('something has gone wrong, lol');
			};

			stage = 0;
			
		};

	};

	// begin the slaughter
	$('#layOn').on('click touch', function() {
		// reset variables
		pool1 = [];
		pool2 = [];
		list = [];
		field = [];
		waiting = [];
		dead = [];
		victor = "";

		// reset status and progress
		document.getElementById('status').style.color = 'white';
		//document.getElementById('status').innerText = "Status:";
		document.getElementById('progress').innerHTML = '';

		// run functions
		assemble();
		tournament();
		announce(victor);
	});
});