(function (script, $, undefined) {
    //Private Property
    const btn = document.getElementById("btn"),
        lotnum = document.getElementById("lotnum");

    let intervalId;

    const event = new Event("lotteryWinner");

    //Public Property

    //Public Methods

    script.getRandom = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    //Private Methods

    btn.onclick = function btnClick() {
        if (!intervalId) {
            intervalId = setInterval(displayRandomNum, 100, 1, 100000);
            startTimer();
        }
    };

    lotnum.addEventListener(
        "lotteryWinner",
        function (e) {
            const finalNum = parseInt(lotnum.innerText);
            let content = "This site says...";

            const winnerContent = {
                true: "\n\nAwesome! You've won!",
                false: "\n\nToo bad! You've lost!"
            };

            content += winnerContent[finalNum >= 1 && finalNum <= 1000];
            alert(content);
            reset();
        },
        false
    );

    function displayRandomNum(min, max) {
        let randomNum = script.getRandom(min, max);
        lotnum.innerText = randomNum;
    }

    function startTimer() {
        setTimeout(() => {
            clearInterval(intervalId);
            lotnum.dispatchEvent(event);
        }, 3000);
    }

    function reset() {
        lotnum.innerText = 0;
        intervalId = 0;
    }

    //
})((window.script = window.script || {}), jQuery);
