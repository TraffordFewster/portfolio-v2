var typingList = document.querySelectorAll(".animateTyping");

const TypeIt = element => {
    let endGoal = element.innerHTML;
    let length = endGoal.length;
    let speed = 50;
    let extraDeley = 0;
    element.innerHTML = "&zwnj;";

    if (element.classList.contains('typingDeley')) {extraDeley = 1300;}

    for (let currentCount = 0 ; currentCount<length ; currentCount++) {
        setTimeout(() => {
            element.innerHTML = endGoal.substr(0, ++currentCount)
        }, (currentCount * speed) + extraDeley)
    }
}

for (let i = 0; i < typingList.length; i++) {
  let item = typingList[i];
  TypeIt(item)
}