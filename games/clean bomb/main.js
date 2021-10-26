function gamestart(mapWidth, mapHeight, theNuberOfBombs) {
	// function
	function countCDN(x, y) {
		return x + y * width;
	}
	function gameOver() {
		let notOpen = 0;
		for(let i = 0;i < mask.length;i++) {
			if(mask[i] == 0 || mask[i] == 2) {
				notOpen += 1;
			}
			if((map[i] == 9) && mask[i] == 1){
				for(let j = 0;j < mask.length;j++) {
					mask[j] = 3;
				}
				print();
				document.querySelector('#gameText').innerHTML = 'Game Over';
				document.querySelector('#gameText').style.display = 'block';
				gameIsOver = true;
				return 'game over';
			}
		}
		if(notOpen == bomb) {
			marks += bomb;
			document.querySelector('#marks').innerHTML = marks;
			for(let i = 0;i < width * height;i++) {
				if(mask[i] != 2) {
					mask[i] = 1;
				}
			}
			print();
			document.querySelector('#gameText').innerHTML = 'You Win';
			document.querySelector('#gameText').style.display = 'block';
			gameIsOver = true;
			return 'win';
		}
		return null;
	}
	function print(){
		let prints;
		for(let i = 0;i < height;i++) {
			for(let j = 0;j < width;j++) {
				if(mask[countCDN(j, i)] == 0) {
					document.querySelector(`#block_${countCDN(j, i)}`).style.backgroundColor = '#eee';
					document.querySelector(`#block_${countCDN(j, i)}`).style.color = '#fff0';
				} else if(mask[countCDN(j, i)] == 2) {
					document.querySelector(`#block_${countCDN(j, i)}`).style.backgroundColor = '#eee';
					document.querySelector(`#block_${countCDN(j, i)}`).style.color = 'black';
					document.querySelector(`#block_${countCDN(j, i)}`).innerHTML = '🚩';
				} else if(map[countCDN(j, i)] == 9) {
					document.querySelector(`#block_${countCDN(j, i)}`).innerHTML = '💣';
					document.querySelector(`#block_${countCDN(j, i)}`).style.backgroundColor = 'white';
					document.querySelector(`#block_${countCDN(j, i)}`).style.color = 'black';
				} else {
					document.querySelector(`#block_${countCDN(j, i)}`).innerHTML = map[countCDN(j, i)];
					document.querySelector(`#block_${countCDN(j, i)}`).style.backgroundColor = 'white';
					document.querySelector(`#block_${countCDN(j, i)}`).style.color = 'black';
				}
			}
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
			document.querySelector(`#block_${countCDN(x, y)}`).style.color = 'black';
			document.querySelector(`#block_${countCDN(x, y)}`).style.backgroundColor = 'white';
			document.querySelector(`#block_${countCDN(x, y)}`).innerHTML = map[countCDN(x, y)];
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
		marks = 0;
		for(let i = 0;i < width * height; i++) {
			if(map[i] != 9 && mask[i] == 1) {
				marks += 1;
			}
		}
		document.querySelector('#marks').innerHTML = marks;
		gameOver();
	}
	
	// init
	let mouse = {'x': 0, 'y': 0}, width = Number(mapWidth), height = Number(mapHeight), bomb = Number(theNuberOfBombs), map = new Array, mask = new Array, marks = 0, flags = 0, gameIsOver = false;
	
	document.querySelector('#mainBox').innerHTML = `<div id="blockBox" style="width: ${width * 18}px;"><div id="messageBox"><div id="messageName"><span>分数</span><span>剩余雷数</span></div><div><span id="marks">0</span><span id="nuberOfBombs">0</span></div></div><div id="blocks" style="width: ${width * 18}px;height: ${height * 18}px;"></div></div><h1 id="gameText"></h1><button id="again">重新开始</button>`;
	for(let i = 0;i < width * height;i++) {
		map[i] = 0;
		mask[i] = 0;
		document.querySelector('#blocks').innerHTML += `<span id="block_${i}" class="block"></span>`
	}
	document.querySelector('#nuberOfBombs').innerHTML = bomb;
	document.querySelector('#blocks').oncontextmenu = (e) => {return false;}
	// set bomb
	for(let i = 0;i < bomb;i++) {
		let l = new Array(Math.round(Math.random() * (width - 1)), Math.round(Math.random() * (height - 1)));
		let j = countCDN(l[0], l[1]);
		if(map[j] == 9){
			i -= 1;
		} else {
			map[j] = 9;
			if(l[0] != 0) {
				if(map[countCDN(l[0] - 1, l[1])] != 9) {map[countCDN(l[0] - 1, l[1])] += 1;}
			}
			if(l[0] != width - 1) {
				if(map[countCDN(l[0] + 1, l[1])] != 9) {map[countCDN(l[0] + 1, l[1])] += 1;}
			}
			if(l[1] != 0) {
				if(map[countCDN(l[0], l[1] - 1)] != 9) {map[countCDN(l[0], l[1] - 1)] += 1;}
			}
			if(l[1] != height - 1) {
				if(map[countCDN(l[0], l[1] + 1)] != 9) {map[countCDN(l[0], l[1] + 1)] += 1;}
			}
			if(l[0] != 0 && l[1] != 0) {
				if(map[countCDN(l[0] - 1, l[1] - 1)] != 9) {map[countCDN(l[0] - 1, l[1] - 1)] += 1;}
			}
			if(l[0] != width - 1 && l[1] != height - 1) {
				if(map[countCDN(l[0] + 1, l[1] + 1)] != 9) {map[countCDN(l[0] + 1, l[1] + 1)] += 1;}
			}
			if(l[0] != width - 1 && l[1] != 0) {
				if(map[countCDN(l[0] + 1, l[1] - 1)] != 9) {map[countCDN(l[0] + 1, l[1] - 1)] += 1;}
			}
			if(l[0] != 0 && l[1] != height - 1) {
				if(map[countCDN(l[0] - 1, l[1] + 1)] != 9) {map[countCDN(l[0] - 1, l[1] + 1)] += 1;}
			}	
		}
	}
	print();
	for(let i = 0;i < width * height;i++) {
		document.querySelector(`#block_${i}`).onmouseover = () => {
			mouse.x = i % width;
			mouse.y = (i - (i % width)) / width;
		}
	}
	document.querySelector('#blocks').onmousedown = (event) => {
		if(!gameIsOver) {
			if(event.button == 0) {
				openDNS(mouse.x, mouse.y);
			} else if(event.button == 2) {
				if(mask[countCDN(mouse.x, mouse.y)] == 0) {
					mask[countCDN(mouse.x, mouse.y)] = 2;
				} else if([countCDN(mouse.x, mouse.y)] == 2) {
					mask[countCDN(mouse.x, mouse.y)] = 0;
				}
				print();
				flags = 0;
				for(let i = 0;i < width * height;i++) {
					if(mask[i] == 2) {
						flags += 1;
					}
				}
				document.querySelector('#nuberOfBombs').innerHTML = bomb - flags;
			}
		}
	}
	document.querySelector('#again').onclick = () => {
		window.history.go(0);
	}
}

window.onload = () => {
	document.querySelector('#bg').src = `img/${Math.round(Math.random() * 5 + 1)}.jpg`;
	document.querySelector('#start').addEventListener('click',() => { 
		if(document.querySelector('#bombs').value < document.querySelector('#width').value * document.querySelector('#height').value) {
			gamestart(document.querySelector('#width').value, document.querySelector('#height').value, document.querySelector('#bombs').value);
		} else {
			document.querySelector('#error').innerHTML = '炸弹太多了!';
		}
	});
}
