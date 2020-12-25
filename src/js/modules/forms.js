
import modalsDataStore from "./modalsDataStore";
import clearHelper from "./clearHelper";

export default function() {
    const forms = document.body.querySelectorAll("form");

    forms.forEach(form => {
        setPatternForPhoneInput(form);

        form.addEventListener("submit", e => {
            e.preventDefault();
            formHandler(form);
        })
    })

    const msgStatusDictionary = {
        processing: "Loading...",
        successEnding: "Thank you! in a couple minute we'll call you back!",
        errorEnding: "Sorry, somthing went wrong! Check your connection and try again."
    }

    function formHandler(form) {
        showRequestProcessMessage(msgStatusDictionary.processing, "yellow", form);
        
        const formData = new FormData(form);
        if (form.getAttribute("data-calc") === "formWithDataFromPreviousModals") {
            Object.entries(modalsDataStore).forEach(([key, value]) => {
                formData.append(key, value);
            })
        }
        
        postRequest(formData)
            .then(res => { 
                console.log(res);
                showRequestProcessMessage(msgStatusDictionary.successEnding, "green", form, 7000);
            })
            .catch(err => {
                console.log(err);
                showRequestProcessMessage(msgStatusDictionary.errorEnding, "red", form, 7000)
            })
            .finally(() => {
                form.reset();
                clearHelper.clearModalsDataStore(modalsDataStore);
            })
    }

    async function postRequest(data) {
        const response = await fetch("assets/server.php", {
            method: "POST",
            body: data
        })
        return await response.text()
    }

    function showRequestProcessMessage(msg, msgColor, container, timeOut = null) {
        let msgBlock = container.querySelector(".status");

        if (msgBlock) {
            msgBlock.textContent = msg;
            msgBlock.style.color = msgColor
        } else {
            msgBlock = document.createElement("div");
            msgBlock.classList.add("status");
            msgBlock.textContent = msg;
            msgBlock.style.color = msgColor
            container.appendChild(msgBlock);
        }

        if (timeOut) {
            setTimeout(() => {
                msgBlock.remove();
            }, timeOut)
        }
    }

    function setPatternForPhoneInput(form) {
        const phoneInput = form.elements["user_phone"];
        if (!phoneInput) return;

        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace( /[^0-9+]/, "");
        })
        
        phoneInput.setAttribute("pattern", "[+0-9|0-9]{10,13}");
        // phoneInput.setAttribute("type", "tel");
        phoneInput.setAttribute("title", "Please enter correct phone number. Expample: 0955027666 or +380955027666");
    }
}
