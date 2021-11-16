window.onload = () => {
	let mediaMusic = new Array;
	for(let i = 0;i < document.getElementsByClassName('mediaMusic').length;i++) {
		mediaMusic[i * 3] = `${document.getElementsByClassName('mediaMusic')[i].dataset.src}`;
		mediaMusic[i * 3 + 1] = `${document.getElementsByClassName('mediaMusic')[i].dataset.name}`;
		mediaMusic[i * 3 + 2] = `${document.getElementsByClassName('mediaMusic')[i].dataset.img}`;
		if(mediaMusic[i * 3 + 2] == 'none'){
			document.getElementsByClassName('mediaMusic')[i].innerHTML = `<img src="https://hshqwq.github.io/img/mediaMusicImg.jpge">`;
		} else {
			document.getElementsByClassName('mediaMusic')[i].innerHTML = `<img src="${mediaMusic[i * 3 +2]}">`;
		}
		document.getElementsByClassName('mediaMusic')[i].innerHTML = `${document.getElementsByClassName('mediaMusic')[i].innerHTML}<div><p>${mediaMusic[i * 3 + 1]}</p><audio controls><source src="${mediaMusic[i * 3]}" type="audio/mpeg">您的浏览器不支持播放音频。</audio></div>`
	}
	console.log(`${mediaMusic[0]}, ${mediaMusic[1]}, ${mediaMusic[2]}`);
	
};