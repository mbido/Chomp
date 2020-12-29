
//jeu de chomp avec algorithme minmax//
// le joueur "1" est l'humain et le joueur "-1" est l'ai//






var w = 300;
var cC =3;
var h = w/cC * 5;
var wC;
var tab = [];
var joueur = -1;
var cases = [];
var move = [];

function setup() {
  createCanvas(w, h);
  wC = w/cC;
  for(i = 0; i < w/wC; i++){
    tab.push([]);
    for(j = 0; j < h/wC; j++){
      tab[i].push(1); 
    }
  }
}

function copyGrid(grid){
  let res = [];
  let l = grid.length;
  for(let i = 0; i < l; i++){
    let n = grid[i];
    res.push(n);
  }
  return res;
}

function prendCase(tabJeu, x, y){
  let liste = [];
  for(i = w/wC; i > x; i--){
    for(j = 0; j <= y; j++){
      if(tabJeu[i-1][j] == 1){
        liste.push([i-1, j]);
        tabJeu[i-1][j] = 0;
      }
    }
  }
  return liste
}


function replaceCases(tabJeu, liste){
  let l = copyGrid(liste);
  let len = l.length;
  l = l[len - 1]
  len = l.length;
  for(i = 0; i < len; i++){
    let x = l[i][0];
    let y = l[i][1];
    tabJeu[x][y] = 1;
  } 
  liste.pop();
}


function mousePressed(){
  if(mouseX <= w && mouseY <= h){
    var x = int(mouseX/wC);
    var y = int(mouseY/wC);
    if(tab[x][y] == 1){
      joueur = -joueur
      prendCase(tab, x, y);
    }
  }
}

function checkLoser(tab){
  let res = false;
  if(tab[0][h/wC-1] == 0){
    res =  joueur; 
  }
  return res
}

function ai(){
    //let tab2 = copyGrid(tab);
	let bestScore = -Infinity;
	let move;
    joueur = -1 
	for (let i = 0; i < w/wC; i++){      
	  for(let j = 0; j < h/wC; j++){     
		if (tab[i][j] == 1){      
		  cases.push(prendCase(tab, i, j));
		  let score = minimax(tab, 0, "min");
		  replaceCases(tab, cases);
		  if (score > bestScore){            
			bestScore = score
			move = [i, j];
		  }
		}
	  }
	}
  joueur = -1
  //liste = prendCase(tab2, move[0], move[1]);
  //tab = copyGrid(tab2);
  console.log(move);
  prendCase(tab, move[0], move[1]);
}

function minimax(tabJeu, profondeur, minMax){
  if(checkLoser(tabJeu)){
    if(minMax == "max"){
      return 10000000 - profondeur;
    }else{
      return -10000000 + profondeur ;
    }
  }
  if (minMax == "max"){
    joueur = -1;
	let bestScore = -Infinity;
	for (let i = 0; i < w/wC; i++){
	  for (let j = 0; j < h/wC; j++){
		if (tabJeu[i][j] == 1){
		  cases.push(prendCase(tabJeu, i, j));
		  let score = minimax(tabJeu, profondeur + 1, "min")
	      replaceCases(tab, cases);
		  bestScore = Math.max(score, bestScore);
		}
	  }
	}
	  return bestScore;
	}else{
      joueur = 1;
	  let bestScore = Infinity;
	  for (let i = 0; i < w/wC; i++){
		for (let j = 0; j < h/wC; j++){
		  if (tabJeu[i][j] == 1){
			cases.push(prendCase(tabJeu, i, j));
			let score = minimax(tabJeu, profondeur + 1, "max")
			replaceCases(tab, cases);
			bestScore = Math.min(score, bestScore);

		  }
		}
	  }
	  return bestScore;
	}
}

function draw() {
  background(220);
  
  result = checkLoser(tab);
  
  if(result){
    noLoop();
    background(220);
    stroke(100);
    fill(100);
    textSize(w/10);
    text("le perdant est : " + result, 0, h/2);
  }else{
    //mettre un "=" après le "<" pour que l'ai joue en premier et l'enlever pour que l'humain joue en premier
    if(joueur == 1 || frameCount < 1){
     ai(); 
    }
    for(i = 0; i < cC; i++){
      for(j = 0; j < h/wC; j++){
        if(tab[i][j] == 1){
          stroke(0);
          square(i * wC, j * wC, wC) 
        }else{
          //textSize(50);
          //text(tab[i][j], i * wC, j * wC); 
        }
      }
    }
  }
}
