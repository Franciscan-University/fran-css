// Franciscan University scripts for general functional elements


// === Dropdown Accordion ===================== //

const franQuestions = document.querySelectorAll('.fran-question-box');

var franDropDownAnim = function(num) {
    return function() {
        var franSection = franQuestions[num].closest('.fran-dd-set');
        var franBox = franQuestions[num].closest('.fran-dd');

        var franAnswers = franSection.querySelectorAll('.fran-answer');
        var franAnswer = franBox.querySelector('.fran-answer');
        var franIcon = franBox.querySelector('.fran-question i');

        var textHeight = 0;
        var textNode = franAnswer.children[0];
        var textHeight = textNode.offsetHeight;

        /* Collapse other boxes if another dropdown question is clicked,
        and if data set collapse auto is true */
        if (franSection.dataset.autoCollapse == "true") {
            for (let i=0; i<franAnswers.length; i++) {
                if (!franAnswer.classList.contains('fran-answer-open')) {
                    franAnswers[i].style.height = 0 + 'px';
                    franAnswers[i].classList.remove('fran-answer-open');
                    franSection.querySelectorAll('.fran-question-icon i')[i].style.transform = 'rotate(0deg)';
                }
            }
        }
        
        /* If box is open, collapse on click. Else if box is closed,
        open on click. */
        if (!franAnswer.classList.contains('fran-answer-open')) {
            franAnswer.style.height = textHeight + 'px';
            franAnswer.classList.add('fran-answer-open');
            if (franIcon != undefined) { franIcon.style.transform = 'rotate(90deg)'; }
        } else {
            franAnswer.style.height = 0 + 'px';
            franAnswer.classList.remove('fran-answer-open');
            if (franIcon != undefined) { franIcon.style.transform = 'rotate(0deg)'; }
        }
    }
}

for (let i=0; i<franQuestions.length; i++) {
    if (Array.prototype.indexOf.call(franQuestions, franQuestions[i]) == i) {
        franQuestions[i].onclick = franDropDownAnim(i);
    }
}




// ============================================ //
// ============================================ //






// === Schedule =========================== //

const franTabBtns = document.querySelectorAll('.fran-schedule .fran-tab');

const scheduleFullDate = new Date();
const scheduleYear = scheduleFullDate.getFullYear();
const scheduleMonth = scheduleFullDate.getMonth() + 1;
const scheduleDate = scheduleFullDate.getDate();

const scheduleDateString = String(scheduleYear + '-' + scheduleMonth + '-' + scheduleDate);


function updateSchedulePanel(num) {

    var currentSchedule = franTabBtns[num].closest('.fran-schedule');
    var localBtns = currentSchedule.querySelectorAll('.fran-tab');
    var localBtnIndex = Array.prototype.indexOf.call(localBtns, franTabBtns[num]);
    var localPanels = currentSchedule.querySelectorAll('.program-section-panel');

    // remove current fran button active class and apply it to clicked button
    for (let i=0; i<localBtns.length; i++) {
        localBtns[i].classList.remove('fran-tab-active');
    }
    localBtns[localBtnIndex].classList.add('fran-tab-active');


    // remove current panel active class and apply it to request panel
    for (let i=0; i<localPanels.length; i++) {
        localPanels[i].classList.remove('program-section-panel-active');
    }
    if (localPanels[localBtnIndex] != undefined) {
        localPanels[localBtnIndex].classList.add('program-section-panel-active');
    }
}


// set dated panel if data set day is today
for (let i=0; i<franTabBtns.length; i++) {
    var dataDate = franTabBtns[i].dataset.date;
    if (dataDate == scheduleDateString) {
        updateSchedulePanel(i);
        break;
    }
}

var updateSchedulePanelOnClick = function(i) {
    return function() {
        updateSchedulePanel(i);
    }
}


for (var i=0; i<franTabBtns.length; i++) {
    if (Array.prototype.indexOf.call(franTabBtns, franTabBtns[i] == i)) {
        franTabBtns[i].onclick = updateSchedulePanelOnClick(i);
    }
}







// === Carousel ===================== //

const allFranCarouselSections = document.querySelectorAll('.fran-carousel-section');

if (allFranCarouselSections.length != 0) {

    const allFranCarouselsSurrounds = document.querySelectorAll('.fran-carousel-surround');

    const allFranCarousels = document.querySelectorAll('.fran-carousel');
    const allFranCarouselCars = document.querySelectorAll('.fran-carousel-car');
    const allFranCarouselLeftArrows = document.querySelectorAll('.fran-carousel-arrow-row .arrow-left');
    const allFranCarouselRightArrows = document.querySelectorAll('.fran-carousel-arrow-row .arrow-right');
    var allFranCarouselBtns = document.querySelectorAll('.fran-carousel-btn-row button');

    var initCarouselLoad = false;
    var moveButtonsActive = true;

    var autoplayCarouselList = [];
    var carouselOffsets = [];

    const regMoveTimeout = 5;
    const btnMoveTimeout = 10;


    function setUpCarousels() {

        // resize carousels to proper height
        for (let i=0; i<allFranCarousels.length; i++) {
            
            var currentCars = allFranCarousels[i].querySelectorAll('.fran-carousel-car');
            var largestCarHeight = 0;
            
            for (let j=0; j<currentCars.length; j++) {
                if ( currentCars[j].clientHeight > largestCarHeight ) {
                    largestCarHeight = currentCars[j].clientHeight;
                }
            }
            allFranCarousels[i].style.height = largestCarHeight + 20 + 'px';

            carouselOffsets.push(currentCars[0]);

        }


        // only perform on first load

        if (!initCarouselLoad) {

            initCarouselLoad = true;

            for (let i=0; i<allFranCarouselSections.length; i++) {

                // set correct amount of buttons for each carousel 
                var carCount = (allFranCarouselSections[i].querySelectorAll('.fran-carousel-car').length - 1);
            
                var currentCarouselBtnRow = allFranCarouselSections[i].querySelector('.fran-carousel-btn-row');
                var currentCarouselBtn = allFranCarouselSections[i].querySelector('.active-button');

                for (let j=0; j<carCount; j++) {

                    var newNode = currentCarouselBtn.cloneNode(true);
                    newNode.classList.remove('active-button');
                    currentCarouselBtnRow.appendChild(newNode);

                }


                // Get all autoplaying carousels
                var currentCarousel = allFranCarouselSections[i].querySelector('.fran-carousel-surround');
                if ( currentCarousel.dataset.autoplay == "true" ) {
                    var singleCarouselProperties = [currentCarousel];

                    var singleCarouselTimer = (currentCarousel.dataset.autoplayTimer != undefined) ? currentCarousel.dataset.autoplayTimer : regMoveTimeout;
                    var singleCarouselBtnTimeout = (currentCarousel.dataset.autoplayBtnTimeout != undefined) ? currentCarousel.dataset.autoplayBtnTimeout : btnMoveTimeout;

                    // set initial countdown
                    currentCarousel.setAttribute("data-autoplay-countdown", singleCarouselTimer);

                    singleCarouselProperties.push(singleCarouselTimer);
                    singleCarouselProperties.push(singleCarouselBtnTimeout);

                    autoplayCarouselList.push(singleCarouselProperties);
                }

            }
        }
        // reset buttons variable
        allFranCarouselBtns = document.querySelectorAll('.fran-carousel-btn-row button')


    }
    setUpCarousels();


    function carouselMove(num, index, direction='') {

        if (moveButtonsActive) {

            moveButtonsActive = false;

            // carousel variables
            var currentSection = allFranCarouselSections[index];
            var currentSurround = allFranCarouselsSurrounds[index];
            var currentCarousel = currentSection.querySelector('.fran-carousel');
            var currentCarouselCars = currentCarousel.querySelectorAll('.fran-carousel-car');
            var activeCar = currentCarousel.querySelector('.fran-carousel-car.active-car');
            var nextCar = currentCarouselCars[num];

            var activeCarIndex = Array.prototype.indexOf.call(currentCarouselCars, activeCar);


            // reset countdown
            for (let i=0; i<autoplayCarouselList.length; i++) {
                if (autoplayCarouselList[i][0] == currentSurround) {
                    currentSurround.setAttribute("data-autoplay-countdown", autoplayCarouselList[i][2]);
                }
            }

            // Check that there is more than one car and that the requested index
            // to move to is not the same as what is currently active
            if ( currentCarouselCars.length > 1 && num != activeCarIndex ) {

                // move right
                if (direction == 'right') {

                    directionRight();
                    updateBtns(num, index);

                }

                else if (direction == 'left') {
                    
                    directionLeft();
                    updateBtns(num, index);

                }
                else {
                    
                    if (num < activeCarIndex) {

                        directionLeft();
                        updateBtns(num, index);

                    } else {

                        directionRight();
                        updateBtns(num, index);

                    }
                }

            }

            function directionRight() {
                activeCar.classList.remove('active-car');
                nextCar.classList.add('active-car');

                activeCar.classList.add('car-moving-right-to-inactive');
                nextCar.classList.add('car-moving-right-to-active');
                
            }
            function directionLeft() {
                activeCar.classList.remove('active-car');
                nextCar.classList.add('active-car');

                activeCar.classList.add('car-moving-left-to-inactive');
                nextCar.classList.add('car-moving-left-to-active');
            }


            setTimeout(function () {
                moveButtonsActive = true;

                for (let i=0; i<currentCarouselCars.length; i++) {
                    currentCarouselCars[i].classList.remove('car-moving-left-to-inactive');
                    currentCarouselCars[i].classList.remove('car-moving-left-to-active');
                    currentCarouselCars[i].classList.remove('car-moving-right-to-inactive');
                    currentCarouselCars[i].classList.remove('car-moving-right-to-active');
                }
            
            }, 500);

        }

    }


    // update active button
    function updateBtns(num, index) {

        var currentButtonRow = allFranCarouselSections[index].querySelector('.fran-carousel-btn-row');
        var activeBtn = currentButtonRow.querySelector('.active-button');
        var requestedBtnIndex = Array.prototype.indexOf.call( currentButtonRow.querySelectorAll('button'), currentButtonRow.querySelectorAll('button')[num] );

        if (requestedBtnIndex != -1) {
            activeBtn.classList.remove('active-button');
            currentButtonRow.querySelectorAll('button')[requestedBtnIndex].classList.add('active-button');
        }

    }




    // move carousel car left
    var moveCarouselLeft = function(index) {
        return function() {

            moveCarByOne(index, 'left');

        }
    }

    // move carousel car right
    var moveCarouselRight = function(index) {
        return function() {

            moveCarByOne(index, 'right');

        }
    }

    var moveCarouselOnBtn = function(num) {
        return function() {

            var currentCarouselSection = allFranCarouselBtns[num].closest('.fran-carousel-section');
            var carouselIndex = Array.prototype.indexOf.call(allFranCarouselSections, currentCarouselSection);

            var carouselNumIndex = Array.prototype.indexOf.call(currentCarouselSection.querySelectorAll('.fran-carousel-btn-row button'), allFranCarouselBtns[num]);

            if (carouselIndex != -1 && carouselNumIndex != -1) {
                carouselMove(carouselNumIndex, carouselIndex);
            }

        }
    }


    // move carousel car left on click
    for (var i=0; i<allFranCarouselLeftArrows.length; i++) {
        if (Array.prototype.indexOf.call(allFranCarouselLeftArrows, allFranCarouselLeftArrows[i] == i)) {
            allFranCarouselLeftArrows[i].onclick = moveCarouselLeft(i);
        }
    }

    // move carousel car right on click
    for (var i=0; i<allFranCarouselRightArrows.length; i++) {
        if (Array.prototype.indexOf.call(allFranCarouselRightArrows, allFranCarouselRightArrows[i] == i)) {
            allFranCarouselRightArrows[i].onclick = moveCarouselRight(i);
        }
    }

        // move carousel on button click
        for (var i=0; i<allFranCarouselBtns.length; i++) {
        if (Array.prototype.indexOf.call(allFranCarouselBtns, allFranCarouselBtns[i] == i)) {
            allFranCarouselBtns[i].onclick = moveCarouselOnBtn(i);
        }
    }

    window.addEventListener("resize", setUpCarousels);


    // move by one car, either left or right
    function moveCarByOne(index, direction) {

        var currentCarousel = document.querySelectorAll('.fran-carousel')[index];
        var currentCarouselCarLen = currentCarousel.querySelectorAll('.fran-carousel-car').length;
        var activeCarIndex = Array.prototype.indexOf.call( currentCarousel.querySelectorAll('.fran-carousel-car'), currentCarousel.querySelector('.fran-carousel-car.active-car') );
        var moveToNum = 0;

        if ( direction == 'right' ) {
            if ( activeCarIndex + 1 >= currentCarouselCarLen ) {
                moveToNum = 0;
            } else {
                moveToNum = activeCarIndex + 1;
            }
            
            carouselMove(moveToNum, index, direction='right');
        } else if ( direction == 'left' ) {
            if ( activeCarIndex - 1 < 0 ) {
                moveToNum = currentCarouselCarLen - 1;
            } else {
                moveToNum = activeCarIndex - 1;
            }
            
            carouselMove(moveToNum, index, direction='left');
        }

    }


    // autoplay carousels
    function autoplayAllCarousels() {

        for (let i=0; i<autoplayCarouselList.length; i++) {
            
            var currentList = autoplayCarouselList[i];
            var currentCarousel = currentList[0];
            var regTime = currentList[1];
            var autoplayCountdown = currentCarousel.dataset.autoplayCountdown;

            if (autoplayCountdown != undefined) {

                autoplayCountdown -= 1;
                if (autoplayCountdown <= 0) {

                    var carouselIndex = Array.prototype.indexOf.call(allFranCarouselsSurrounds, currentCarousel);

                    moveCarByOne(carouselIndex, 'right');
                    currentCarousel.setAttribute("data-autoplay-countdown", regTime);

                } else {

                    currentCarousel.setAttribute("data-autoplay-countdown", autoplayCountdown);

                }

            }

        }

    }
    setInterval(autoplayAllCarousels, 1000);

}