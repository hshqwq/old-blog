// init canvas
const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

const gravity = 980;
var moveV = 0;
var moving;
var iskeydown = false;
var jump = 0;

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;


// main
window.addEventListener('load', (e) => {
	// init mouseXY
	const top = cvs.getBoundingClientRect().top;
	const left = cvs.getBoundingClientRect().left;
	const mouseX = e.pageX - left;
	const mouseY = e.pageY - top;
	
	//init time
	let startTime;
	
	//main
	class Vector {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	
	  /**
	   * 向量加法
	   * @param {Vector} v
	   */
	  add(v) {
	    return new Vector(this.x + v.x, this.y + v.y);
	  }
	
	  /**
	   * 向量减法
	   * @param {Vector} v
	   */
	  substract(v) {
	    return new Vector(this.x - v.x, this.y - v.y);
	  }
	
	  /**
	   * 向量与标量乘法
	   * @param {Vector} s
	   */
	  multiply(s) {
	    return new Vector(this.x * s, this.y * s);
	  }
	
	  /**
	   * 向量与向量点乘（投影）
	   * @param {Vector} v
	   */
	  dot(v) {
	    return this.x * v.x + this.y * v.y;
	  }
	
	  /**
	   * 向量标准化（除去长度）
	   * @param {number} distance
	   */
	  normalize() {
	    let distance = Math.sqrt(this.x * this.x + this.y * this.y);
	    return new Vector(this.x / distance, this.y / distance);
	  }
	}
	
	class Circle {
		constructor(context, x, y, r, vx, vy, fx, fillColor, strokeColor, mass, cor, test) {
		    this.context = context;
			this.x = x;
			this.y = y;
			this.r = r;
			this.vx = vx;
			this.vy = vy;
			this.fx = fx;
			this.fillColor = fillColor;
			this.strokeColor = strokeColor;
			this.mass = mass;
			this.test = test;
			this.cor = cor;
			//碰撞?
			this.colliding = false;
		}
		
		draw(){
			this.context.fillStyle = this.fillColor;
			this.context.strokeColor = this.strokeColor;
			this.context.beginPath();
			if (this.test) {
				this.context.lineTo(this.x, this.y);
			}
			this.context.arc(this.x, this.y, this.r, this.fx / 180 * Math.PI, (this.fx / 180 + 2) * Math.PI);
			if (this.fillColor != '') {
				this.context.fill();
			}
			if (this.strokeColor != '') {
				this.context.stroke();
			}
		}
		/**
		 * 如果距离小于两球半径之和，则发生了碰撞
		 * @param {Circle} other
		 * @returns
		 */
		isCircleCollided(other) {
		  let squareDistance = (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y);
		  let squareRadius = (this.r + other.r) * (this.r + other.r);
		  return squareDistance <= squareRadius;
		}
		/**
		 * 碰撞检测
		 * @param {Circle} other
		 */
		checkCollideWith(other) {
			if(this.isCircleCollided(other)) {
				this.colliding = true;
				other.colliding = true;
				this.changeVelocityAndDirection(other);
			}
		}
		// 向量
		changeVelocityAndDirection(other) {
			// 创建两小球的速度向量
			let cor = Math.min(this.cor, other.cor);
			let velocity1 = new Vector(this.vx, this.vy);
			let velocity2 = new Vector(other.vx, other.vy);
			let vNorm = new Vector(this.x - other.x, this.y - other.y);
			let unitVNorm = vNorm.normalize();
			let unitVTan = new Vector(-unitVNorm.y, unitVNorm.x);
			let v1n = velocity1.dot(unitVNorm);
			let v1t = velocity1.dot(unitVTan);
			let v2n = velocity2.dot(unitVNorm);
			let v2t = velocity2.dot(unitVTan);
			let v1nAfter = (this.mass * v1n + other.mass * v2n + cor * other.mass * (v2n - v1n)) / (this.mass + other.mass);
			let v2nAfter = (this.mass * v1n + other.mass * v2n + cor * this.mass * (v1n - v2n)) / (this.mass + other.mass);
			if (v1nAfter < v2nAfter) {
			  return;
			}
			let v1VectorNorm = unitVNorm.multiply(v1nAfter);
			let v1VectorTan = unitVTan.multiply(v1t);
			
			let v2VectorNorm = unitVNorm.multiply(v2nAfter);
			let v2VectorTan = unitVTan.multiply(v2t);
			let velocity1After = v1VectorNorm.add(v1VectorTan);
			let velocity2After = v2VectorNorm.add(v2VectorTan);
			this.vx = velocity1After.x;
			this.vy = velocity1After.y;
			
			other.vx = velocity2After.x;
			other.vy = velocity2After.y;
		}
		/**
		 * 更新画布
		 * @param {number} seconds
		 */
		update(seconds) {
			this.vy += gravity * seconds + moveV * jump;
			this.vx += moveV * (jump + 1);
			this.x += this.vx * seconds;
			this.y += this.vy * seconds;
		}
	}
	
	// 游戏运行主进程(canvas进程)
	class gameBoard {
		constructor() {
		    this.startTime;
			this.init();
		}
		init() {
			this.circles = [
				new Circle(ctx, 100, 100, 60, 30, 70, 0, '#fff', '#000', 12, 0.7,),
				new Circle(ctx, 1250, 200, 30, 80, 30, 0, '#fff', '#000', 54, 0.9,),
				new Circle(ctx, 1600, 380, 10, -175, -180, 0, '#fff', '#000', 36, 0.7,),
				new Circle(ctx, 180, 310, 10, 115, 440, 0, '#fff', '#000', 27, 0.6,),
				new Circle(ctx, 100, 310, 10, -195, -325, 0, '#fff', '#000', 68, 0.7,),
				new Circle(ctx, 1300, 150, 10, -138, 420, 0, '#fff', '#000', 45, 0.7,),
				new Circle(ctx, 70, 430, 45, 135, -230, 0, '#fff', '#000', 84, 0.5,),
				new Circle(ctx, 1020, 120, 80, -140, 335, 0, '#fff', '#000', 72, 0.7,),
				new Circle(ctx, 3050, 190, 20, -140, 335, 0, '#fff', '#000', 72, 0.7,),
				new Circle(ctx, 250, 210, 60, -140, 325, 0, '#fff', '#000', 72, 0.7,),
				new Circle(ctx, 120, 340, 50, -140, 335, 0, '#fff', '#000', 72, 0.7,),
				new Circle(ctx, 1800, 280, 120, -140, 335, 0, '#fff', '#000', 72, 0.7,),
				new Circle(ctx, 1350, 220, 90, -140, 335, 0, '#fff', '#000', 72, 0.7,),
			];
			window.requestAnimationFrame(this.process.bind(this));
			
		}
		// 碰撞检测
		checkCollision() {
			this.circles.forEach((circle) => (circle.colliding = false));
			
			for (var i = 0; i < this.circles.length; i++) {
				for (var j = i + 1; j < this.circles.length; j++) {
					this.circles[i].checkCollideWith(this.circles[j]);
				}
			}
		}
		checkEdgeCollision() {
			const cor = 0.9;
			this.circles.forEach((circle) => {
				// 左右墙壁碰撞
				if(circle.x < circle.r) {
					circle.vx = -circle.vx * cor;
					circle.x = circle.r;
				}else if(circle.x > cvs.width - circle.r) {
					circle.vx = -circle.vx * cor;
					circle.x = cvs.width - circle.r;
				}
				// 上下墙壁碰撞
				if(circle.y < circle.r) {
					circle.vy = -circle.vy * cor;
					circle.y = circle.r;
				}else if(circle.y > cvs.height - circle.r) {
					circle.vy = -circle.vy * cor;
					circle.y = cvs.height - circle.r;
				}
			});
		}
		// 动画循环（帧率）
		process(now){
			//init time
			if(!startTime){
				startTime = now;
			}
			let seconds = (now - startTime) / 1000;
			startTime = now;
			
			for(var i = 0; i < this.circles.length; i++) {
				this.circles[i].update(seconds);
			}
			// 碰撞检测
			this.checkCollision();
			this.checkEdgeCollision();
			
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, cvs.width, cvs.height);
			
			for(var i = 0; i < this.circles.length; i++) {
				this.circles[i].draw(ctx);
			}
			console.log(moveV + '\n' + moveV * seconds);
			// 动画循环（帧率）
			window.requestAnimationFrame(this.process.bind(this));
		}
	}
	
	
	new gameBoard();
});
window.addEventListener('load', () => {
	window.addEventListener('keydown', (event) => {
		iskeydown = true;
		if (event.keyCode == 68){
			moveV = 50;
		}
		if(event.keyCode == 65) {
			moveV = -50;
		}
		if(event.keyCode == 87) {
			moveV = 50;
			jump = -1;
		}
		if(moveV > 50) {
			moveV = 50;
		}
		if(moveV < -50) {
			moveV = -50;
		}
	});
	window.addEventListener('keyup', () => {
		iskeydown = false;
		clearTimeout(moving);
		moveV = 0;
		jump = 0;
	});
});