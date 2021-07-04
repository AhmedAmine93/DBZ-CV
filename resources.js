function traitement() {
    var cnv = document.getElementById('main');
    var ctn = cnv.getContext('2d');
    var audio = new Audio()
    if (audio.canPlayType('audio/mp3')) {
        var audioType = ".mp3"
    } else {
        var audioType = ".wav"
    }
    var gameAudio = new Audio("game"+audioType)
    gameAudio.loop = true
    gameAudio.play()
    charactere_principal.src = "PikPng.com_tapion-png_4367769.png";
    charactere_principal.onload = function () { 
        ctn.drawImage(charactere_principal, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height); }
    character_adversaire.src = "adversaire.png"
    character_adversaire.onload = function () {
        
         ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width, adv_source_height, adv_x, adv_y, car_width, car_height);
         window.setInterval(animateAdv,10000)
         }
   
    bird.src = "nice.png"
    bird.onload = function () {
        ctn.drawImage(bird, bird_source_x, bird_source_y , bird_source_width, bird_source_height, bird_x, bird_y, 60, 60);
        setInterval(animateBird,50)
    }
    cloud.src = "cloud.png"
    cloud.onload = function(){

        ctn.drawImage(cloud, cloud_source_x,cloud_source_y,cloud_source_width,cloud_source_height, cloud_x,cloud_y, 100, 70)
         setInterval(animateCloud,70)
    }
    drawHp()
    document.addEventListener('keydown', animate)
    function animate(event) {
        code = event.keyCode
        switch (code) {
            case 39:
                moveRight(ctn, charactere_principal)
                break
            case 38:
                jump(ctn, charactere_principal)
                break
            case 37:
                moveLeft(ctn, charactere_principal)
                break
            case 65:
                melee_attack(ctn, charactere_principal)
                break
            case 90:
                kick_attack(ctn, charactere_principal)
                break
            case 69:
                energy_attack(ctn, charactere_principal)
                break
        }
        if(car_x+car_width>adv_x){
            adv_hp-=10
            drawHp()
            redrawChar()
            showInfo()
        }
    }
    function moveRight(ctn, char) {
        var rightMove =  setInterval(right_movement_animation,50)
        function right_movement_animation(){
            if( car_source_x<200){
            ctn.clearRect(car_x, car_y,car_width ,car_height );
             car_source_x += 40
             car_x +=5
             ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
            }else{
                car_source_x  = 0
                ctn.clearRect(car_x, car_y,car_width ,car_height );
                ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
                clearInterval(rightMove)
            }
       }
    }
    function moveLeft(ctn, char) {
        var left_move = setInterval(left_movement_animation,50)
        function left_movement_animation(){
            if( car_source_x<200){
           
            ctn.clearRect(car_x, car_y,car_width ,car_height );
             car_source_x += 40
             car_x -=5
             ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
            }else{
                car_source_x  = 0
                ctn.clearRect(car_x, car_y,car_width ,car_height );
                ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
                clearInterval(left_move)
            }
       }
    }
    function jump(ctn, char) {
        
        car_y-=15
        ctn.clearRect(car_x, car_y,car_width ,car_height );

        ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
        setTimeout(function(){
            car_y+=15
            ctn.clearRect(car_x, car_y,car_width ,car_height );
             ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
        },100)
       }
    function melee_attack(ctn, char) {
        car_source_y = 160
        car_source_x = 0
        var meleeAudio = new Audio('punch'+audioType)
        meleeAudio.play()
        if(isNaN(punch_interval) == false){
            clearInterval(punch_interval)
        }
        punch_interval = setInterval(punch_animation,50)
        function punch_animation() {
            if (car_source_x<160) {
                ctn.clearRect(car_x, car_y,car_width ,car_height );
             car_source_x += 40
             car_x +=1
             ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
            } else {
                car_source_x = 0
                car_source_y = 100
                ctn.clearRect(car_x, car_y,car_width ,car_height );
                ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
                clearInterval(punch_interval);
                punch_interval= null
            }
        }
    }
    function kick_attack(ctn, char) {
        car_source_y = 160
        car_source_x = 210
        var meleeAudio = new Audio('punch'+audioType)
        meleeAudio.play()
        if(isNaN(kick_interval)==false){
            clearInterval(kick_interval)
        }
        kick_interval = setInterval(kick_animation, 50)
        function kick_animation(){
            if (car_source_x<420) {
                ctn.clearRect(car_x, car_y,car_width ,car_height );
             car_source_x += 45
             car_x +=1
             ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
            } else {
                car_source_x = 0
                car_source_y = 100
                ctn.clearRect(car_x, car_y,car_width ,car_height );
                ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
                clearInterval(kick_interval)
                kick_interval =null
            }
        }
    }
    function energy_attack(ctn, char) {
        car_source_x = 0
        car_source_y = 270
        car_source_width = 60
        var energyAudio = new Audio('energy'+audioType)
        energyAudio.play()
        ctn.clearRect(car_x, car_y,car_width ,car_height );
        ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
        car_x +=60
        if(isNaN(energyInterval)==false){
            clearInterval(energyInterval)
        }
        energyInterval = setInterval(energy_animation, 50)
        function energy_animation() {
          
            car_source_height = 40
            car_sour_width = 50
            car_source_x = 60
            car_y=430
            ctn.clearRect(car_x+20, car_y,car_width ,car_height );
            car_x +=20
            ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
            if(car_x+car_width>=adv_x){
                adv_hp -=10
                drawHp()
                showInfo()
                ctn.clearRect(0, 450,car_x+car_width ,150);
                car_x = 0
                car_y = 450
                car_source_x = 0
                car_source_y = 100
                car_source_width = 40
                car_source_height =55
                ctn.drawImage(char, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
                clearInterval(energyInterval);
                energyInterval=null;
            }

        }
        
    }
    function animateBird() {
        ctn.clearRect(bird_x, bird_y,60 ,60);
        bird_source_x+=200
        if(bird_source_x>=1700){
            bird_source_x=0
        }
        bird_x +=5
        if(bird_x>1000){
            bird_x = 0
        }
        ctn.drawImage(bird, bird_source_x, bird_source_y , bird_source_width, bird_source_height, bird_x, bird_y, 60, 60);
    }
    function animateCloud() {
        ctn.clearRect(cloud_x, cloud_y,100 ,70);
       
        cloud_x -=5
        if(cloud_x<0){
            cloud_x = 1000
        }
        ctn.drawImage(cloud, cloud_source_x,cloud_source_y,cloud_source_width,cloud_source_height, cloud_x,cloud_y, 100, 70)
    }
  
    function animateAdv() {
        adv_source_x = 910
        adv_source_y = 540
        var advAattackAudio = new Audio("adv"+audioType)
        advAattackAudio.play()
        var advHand = setInterval(advHandAnimation,40)
        function advHandAnimation() {
            if(adv_hp<=0){
                ctn.clearRect(adv_x, adv_y,car_width ,car_height);
                adv_source_x = 560
                adv_source_y =360
                ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width+20, adv_source_height, adv_x, adv_y, car_width, car_height);
                clearInterval(advHand)
                advAattackAudio.pause()
            }else if(adv_source_x>230 ){
                ctn.clearRect(adv_x, adv_y,car_width ,car_height);
                                  
                if(adv_source_x>520)
                adv_source_x-=50
                else
                adv_source_x-=55
                ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width, adv_source_height, adv_x, adv_y, car_width, car_height);
                if(adv_x<=car_x+car_width){
                    car_hp-=10
                    drawHp()
                    showInfo()
                    redrawChar()
                }

            }else{
                ctn.clearRect(adv_x, adv_y,car_width ,car_height);
                adv_source_x = 870
                adv_source_y= 140
                ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width, adv_source_height, adv_x, adv_y, car_width, car_height);
                clearInterval(advHand)
            }
            
        }
    }
    function advDefeat() {
        console.log("dead animation")
        adv_source_x = 910
        adv_source_y = 360
        defeatInterval = setInterval(defeatAnimation,100)
        function defeatAnimation() {
            if(adv_source_x>570){
            ctn.clearRect(adv_x, adv_y,car_width ,car_height);
            adv_source_x-=50
            ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width+20, adv_source_height, adv_x, adv_y, car_width, car_height);
        }else{
            // ctn.clearRect(adv_x, adv_y,car_width ,car_height);
            // adv_source_x = 870
            // adv_source_y = 140
            // ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width, adv_source_height, adv_x, adv_y, car_width, car_height);
            clearInterval(defeatInterval)
            ctn.font = "100px Arial";
            ctn.strokeText("YOU WIN",300, 500); 
            window.removeEventListener("keydown",animate,false)

        }
        }
    }
    function carDefeat() {
        
        car_source_x = 490
        car_source_y = 210
        cardefeatInterval = setInterval(carDefeatAnimation,100)
        function carDefeatAnimation() {
            if(car_source_x>380){
                ctn.clearRect(car_x, car_y,car_width ,car_height);
                ctn.drawImage(charactere_principal, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
                                   
            }else{
                
                clearInterval(cardefeatInterval)
                ctn.font = "50px Arial";
            ctx.strokeText("YOU LOSE",150, 500);
                window.removeEventListener("keydown",animate,false)

            }
        }
    }
  function drawHp() {
      ctn.clearRect(0,0,1100,10)
      ctn.fillStyle = "green"
      ctn.fillRect(0,0,car_hp,20)
      ctn.fillRect(980,0,adv_hp,20)
      ctn.fillStyle= "red"
      ctn.fillRect(car_hp,0,100-car_hp,20)
      ctn.fillRect(980+adv_hp,0,100-adv_hp,20)

  }
  function showInfo() {
    if(adv_hp==0){
        var d = document.getElementById('download')
        d.style="display:block"
        advDefeat()
    }else if(adv_hp==20){
        
        var p = document.getElementById('p3')
        p.style = "display:block"
      
    }else if(adv_hp==40){
        var p = document.getElementById('p2')
        p.style = "display:block"
    }else if(adv_hp==60){
        var p = document.getElementById('p1')
        p.style = "display:block"
    }else if(adv_hp==70){
        var p = document.getElementById('p4')
        p.style = "display:block"
    }else if(adv_hp==90){
        var p = document.getElementById('p5')
        p.style = "display:block"
    }
    if(car_hp==0){
        carDefeat()
    }
  }
  function redrawChar() {
    ctn.clearRect(car_x, car_y,car_width ,car_height );
    ctn.clearRect(adv_x, adv_y,car_width ,car_height );
    car_x-=5
    adv_x+=5
    ctn.drawImage(character_adversaire, adv_source_x, adv_source_y, adv_source_width, adv_source_height, adv_x, adv_y, car_width, car_height);
    ctn.drawImage(charactere_principal, car_source_x, car_source_y, car_source_width, car_source_height, car_x, car_y, car_width, car_height);
  }
}