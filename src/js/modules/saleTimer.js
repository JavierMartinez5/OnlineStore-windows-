export default function initSaleTimer(saleDeadLine, timeContainerClassSelector) {
    function startTimer(timeContainerClass) {
        const timeContainer = document.body.querySelector(timeContainerClass),
            daysContainer = timeContainer.querySelector("#days"),
            hoursContainer = timeContainer.querySelector("#hours"),
            minutesContainer = timeContainer.querySelector("#minutes"),
            secondsContainer = timeContainer.querySelector("#seconds");
        
        const intervalId = setInterval(timeDataManager, 1000);
        timeDataManager();
        
        function timeDataManager() {
            const actualTimeData = getRestTimeData(saleDeadLine);
            if (!actualTimeData) {
                const saleContainer = document.body.querySelector(".sale");
                saleContainer.style.display = "none";
                clearInterval(intervalId);
                return;
            }

            secondsContainer.textContent = actualTimeData.seconds;
            minutesContainer.textContent = actualTimeData.minutes;
            hoursContainer.textContent = actualTimeData.hours;
            daysContainer.textContent = actualTimeData.days;
        }
    }

    function getRestTimeData(deadLine) {
        const timeDifference = Date.parse(deadLine) - Date.parse(new Date());
        if (timeDifference < 0) return null;

        const seconds = Math.floor((timeDifference / 1000) % 60),
            minutes = Math.floor((timeDifference / 1000 / 60) % 60),
            hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
            days = Math.floor(timeDifference / (60000 * 60 * 24));
        
        const timeData = {
            seconds,
            minutes,
            hours,
            days
        }
        correctTimeData(timeData);
        return timeData;

        function correctTimeData(timeDataObj) {
            Object.keys(timeDataObj).forEach(key => {
                if (timeDataObj[key] < 10) {
                    timeDataObj[key] = `0${timeDataObj[key]}`;
                }
            })
        }
    }

    startTimer(timeContainerClassSelector);
}