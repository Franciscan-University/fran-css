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