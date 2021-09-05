function gamestart(mapWidth, mapHeight, theNuberOfBombs) {
	// function
	function countCDN(x, y) {
		return x + y * Math.max(width, height);
	}
	function gameOver() {
		let notOpen = 0;
		for(let i = 0;i < mask.length;i++) {
			if(mask[i] == 0) {
				notOpen += 1;
			}
			if((map[i] == 9) && mask[i] == 1){
				for(let j = 0;j < mask.length;j++) {
					mask[j] = 3;
				}
				print();
				document.body.innerHTML += '<h1>Game Over</h1>';
				return 'game over';
			}
		}
		if(notOpen == bomb) {
			document.body.innerHTML = '<h1>You Win</h1>';
			return 'win';
		}
		return null;
	}
	function print(){
		document.body.innerHTML = '';
		let prints;
		for(let i = 0;i < width;i++) {
			for(let j = 0;j < height;j++) {
				if(mask[countCDN(j, i)] == 0) {
					prints = '■';
				} else if(map[countCDN(j, i)] == 9) {
					prints = '○';
				} else {
					prints = map[countCDN(j, i)];
				}
				
				document.body.innerHTML += `${countCDN(mouse.x, mouse.y) == countCDN(j, i) ? '&nbsp;>' : '&nbsp;&nbsp;&nbsp;'}${prints}`;
			}
			document.body.innerHTML += `<br>`;
		}
	}
	function setMouseDNS(x, y){
		mouse.x = x, mouse.y = y;
		if(mouse.x < 0){
			mouse.x += width;
		}
		if(mouse.y < 0){
			mouse.y += height;
		}
	}
	function addMouseDNS(x, y){
		mouse.x += x, mouse.y += y;
		if(mouse.x < 0){
			mouse.x += width;
		} else if(mouse.x > width -1) {
			mouse.x = 0;
		}
		if(mouse.y < 0){
			mouse.y += height;
		} else if(mouse.y > height -1) {
			mouse.y = 0;
		}
	}
	function openDNS(x, y){
		if(mask[countCDN(x, y)] != 1) {
			mask[countCDN(x, y)] = 1;
			if(map[countCDN(x, y)] == 0) {
				if(x != 0) {
					openDNS(x - 1, y);
				}
				if(x != width - 1) {
					openDNS(x + 1, y);
				}
				if(y != 0) {
					openDNS(x, y - 1);
				}
				if(y != height - 1) {
					openDNS(x, y + 1);
				}
				if(x != 0 && y != 0) {
					openDNS(x - 1, y - 1);
				}
				if(x != width - 1 && y != height - 1) {
					openDNS(x + 1, y + 1);
				}
				if(x != width - 1 && y != 0) {
					openDNS(x + 1, y - 1);
				}
				if(x != 0 && y != height - 1) {
					openDNS(x - 1, y + 1);
				}
			}
		}
	}
	
	// init
	let mouse = {'x': 0, 'y': 0}, width = mapWidth, height = mapHeight, bomb = theNuberOfBombs, map = new Array, mask = new Array;
	for(let i = 0;i < width * height;i++) {
		map[i] = 0;
		mask[i] = 0;
	}
	// set bomb
	for(let i = 0;i < bomb;i++) {
		let l = new Array(Math.round(Math.random() * width), Math.round(Math.random() * height));
		let j = countCDN(l[0], l[1]);
		console.log(l[0] + l[1]);
		if(map[j] == 9){
			i -= 1;
		} else {
			map[j] = 9;
			if(map[countCDN(l[0] - 1, l[1] - 1)] != 9) {map[countCDN(l[0] - 1, l[1] - 1)] += 1;}
			if(map[countCDN(l[0], l[1] - 1)] != 9) {map[countCDN(l[0], l[1] - 1)] += 1;}
			if(map[countCDN(l[0] + 1, l[1] - 1)] != 9) {map[countCDN(l[0] + 1, l[1] - 1)] += 1;}
			if(map[countCDN(l[0] - 1, l[1])] != 9) {map[countCDN(l[0] - 1, l[1])] += 1;}
			if(map[countCDN(l[0] + 1, l[1])] != 9) {map[countCDN(l[0] + 1, l[1])] += 1;}
			if(map[countCDN(l[0] - 1, l[1] + 1)] != 9) {map[countCDN(l[0] - 1, l[1] + 1)] += 1;}
			if(map[countCDN(l[0], l[1] + 1)] != 9) {map[countCDN(l[0], l[1] + 1)] += 1;}
			if(map[countCDN(l[0] + 1, l[1] + 1)] != 9) {map[countCDN(l[0] + 1, l[1] + 1)] += 1;}
		}
	}
	print();
	window.onkeyup = (event) => {
		console.clear();
		console.log(event.keyCode);
		if(mask[0] != 3) {
			if(event.keyCode == 87) {
				addMouseDNS(0, -1);
				console.log(mouse.y);
			} else if(event.keyCode == 65) {
				addMouseDNS(-1, 0);
				console.log(mouse.x);
			} else if(event.keyCode == 83) {
				addMouseDNS(0, 1);
				console.log(mouse.x);
			} else if(event.keyCode == 68) {
				addMouseDNS(1, 0);
				console.log(mouse.x);
			} else if(event.keyCode == 32) {
				openDNS(mouse.x, mouse.y);
			}
			print();
			gameOver();
		}
		
	}
}

window.onload = () => {
	document.querySelector('#start').addEventListener('click',() => { 
		if(document.querySelector('#bombs').value < document.querySelector('#width').value * document.querySelector('#height').value) {
			gamestart(document.querySelector('#width').value, document.querySelector('#height').value, document.querySelector('#bombs').value);
		} else {
			document.querySelector('#error').innerHTML = '炸弹太多了!';
		}
	});
}
