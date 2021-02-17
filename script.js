const $gameBoard = document.getElementById('board'),
      $language = document.getElementById('language'),
      $audioTag = document.getElementById('audio'),
      disneyGirls = ['ariel', 'cinderella', 'elsa', 'jasmin', 'moana', 'mulan', 'pocahontas'],
      disneyBoys = ['aladin', 'baz', 'mickey', 'piterpen', 'simba', 'tarzan', 'bambi'];
    //   numbers = [0,1,2,3,4,5,6,7,8,9];

const photoUrls = {
    ariel: './photos/ariel.jpg',
    cinderella: './photos/cinderella.jpg',
    elsa: './photos/elsa.jpg',
    jasmin: './photos/jasmin.jpg',
    moana: './photos/moana.jpg',
    mulan: './photos/mulan.jpg',
    pocahontas: './photos/pocahontas.jpg',
    aladin: './photos/aladin.jpg',
    baz: './photos/baz.jpg',
    mickey: './photos/mickey.jpg',
    piterpen: './photos/piterpen.jpg',
    simba: './photos/simba.jpg',
    tarzan: './photos/tarzan.jpg',
    bambi: './photos/bambi.jpg'

}

//function to play sounds
const playSound = (sound) =>{
        $audioTag.src = soundsUrls[$language.value][sound];
        $audioTag.play();
    }
 
//function to play where is the number
const playSounds = (name) => {
        playSound('where');
    
        setTimeout(()=> {
            playSound(name);
           }, 1600);
    }
    
//map for the sounds
const soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    girls: {
        where: './sounds/where.mp3',
        ariel: './sounds/ariel.mp3',
        cinderella: './sounds/cinderella.mp3',
        elsa: './sounds/elsa.mp3',
        jasmin: './sounds/jasmin.mp3',
        moana: './sounds/moana.mp3',
        mulan: './sounds/mulan.mp3',
        pocahontas: './sounds/pocahontas.mp3'

    },
    boys: {
        where: './sounds/where.mp3',
        aladin: './sounds/aladin.mp3',
        baz: './sounds/baz.mp3',
        mickey: './sounds/mickey.mp3',
        piterpen: './sounds/piterpen.mp3',
        simba: './sounds/simba.mp3',
        tarzan: './sounds/tarzan.mp3',
        bambi: './sounds/bambi.mp3'

    }
    
}

//swapping the numbers inside the array
const shuffle = (disneyArray) => {
    let counter = disneyArray.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = disneyArray[counter];
        disneyArray[counter] = disneyArray[index];
        disneyArray[index] = temp;
    }

    return disneyArray;
}


//creaing the level
const createLevel = () => {
    $gameBoard.innerHTML = "";
    $gameBoard.classList.remove('correct')
    let nameHero="";
    const random = Math.floor(Math.random() * 7); //return 0 till 9
    
    if ($language.value === 'girls') {
        $gameBoard.dataset.answer = disneyGirls[random];

        const randomNumbers = shuffle(disneyGirls);
        randomNumbers.forEach((girl) => {
            const liElement = document.createElement("li");
            liElement.dataset.id = girl;
            liElement.style.backgroundImage = "url("+`${photoUrls[`${girl}`]}`+")";
            // liElement.style.backgroundImage = "url("+`${photoUrls.ariel}`+")";
            liElement.style.backgroundSize = "cover";
            liElement.style.backgroundPosition = "center";
            $gameBoard.appendChild(liElement);
    });


    
    } else {
        $gameBoard.dataset.answer = disneyBoys[random];

        const randomNumbers = shuffle(disneyBoys);
        randomNumbers.forEach((boy) => {
            const liElement = document.createElement("li");
            liElement.dataset.id = boy;
            liElement.style.backgroundImage = "url("+`${photoUrls[`${boy}`]}`+")";
            // liElement.style.backgroundImage = "url("+`${photoUrls.ariel}`+")";
            liElement.style.backgroundSize = "cover";
            liElement.style.backgroundPosition = "center";
            $gameBoard.appendChild(liElement);

            
    });
    
     }

    const playSButton = document.createElement("li");
    playSButton.classList.add('play-sound');
    playSButton.dataset.id ='play-sound';
    $gameBoard.appendChild(playSButton);

    playSounds($gameBoard.dataset.answer);


}

createLevel();





//check if user answer is correct
const selectedAnswer = ($event) => {
   isLiElement = $event.target.nodeName === 'LI'
   if (!isLiElement) {
       return false;
   }

   const selectedUserAnswer = $event.target.dataset.id;
   const correctAnswer = $gameBoard.dataset.answer


   if (selectedUserAnswer === 'play-sound') {
     return playSounds(correctAnswer);
   
   }
   

   if (selectedUserAnswer === correctAnswer) {
       $gameBoard.classList.add('correct');

       $audioTag.src = soundsUrls.correct;
       $audioTag.play();

       setTimeout(()=> {
        createLevel();
       }, 1700);

   } else {
       console.log("No");
       $gameBoard.classList.add('wrong');

       $audioTag.src = soundsUrls.wrong;
       $audioTag.play();

       setTimeout(()=> {
          playSound(selectedUserAnswer);
       }, 1700);

       setTimeout(()=> {
        $gameBoard.classList.remove('wrong')
       }, 2000)
   } 

   
    console.log($event.target.dataset.id);
} 

//listener on the father (deligation)
$language.addEventListener('change', createLevel);
$gameBoard.addEventListener('click', selectedAnswer);





