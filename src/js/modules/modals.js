import modalsDataStore from "./modalsDataStore"; 
import clearHelper from "./clearHelper";

const modals = () => {
    function bindModals(triggerClass, modalClass, closeClass, closeClickOverlay = true, inputFieldsForValidation = null) { 
        const engineerBtn = document.body.querySelectorAll(triggerClass),
            modalEngineer = document.body.querySelector(modalClass),
            modalCloseEngineer = document.body.querySelector(closeClass),
            allModalsOnPage = document.body.querySelectorAll(".popup_dialog");

        engineerBtn.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                if (inputFieldsForValidation) {
                    const isFilledData = inputFieldsForValidation.every(data => {
                        return modalsDataStore[data];
                    })
                    if (isFilledData) {
                        closeAllModals(allModalsOnPage);
                        modalStyle(modalEngineer, "block");
                    } 
                } else {
                    closeAllModals(allModalsOnPage);
                    modalStyle(modalEngineer, "block");
                }
            })
        })
        modalCloseEngineer.addEventListener("click", () => {
            modalStyle(modalEngineer, "none");
            clearHelper.clearModalsDataStore(modalsDataStore);
        })
        modalEngineer.addEventListener("click", (event) => {
            if (event.target === modalEngineer && closeClickOverlay) {
                modalStyle(modalEngineer, "none");
                clearHelper.clearModalsDataStore(modalsDataStore);
            }
        })
    }

    function closeAllModals(modalsChildren) {
        modalsChildren.forEach(modalChild => {
            const modal = modalChild.parentElement;
            modal.style.display = "none";
        });
        document.body.classList.remove("modal-open");
        clearHelper.clearDataOnModals();
    }

    function modalStyle(modal, display) {
        modal.style.display = display;
        document.body.classList.toggle("modal-open");
        if (display === "none") {
            document.body.style.marginRight = "0px";
        } else {
            document.body.style.marginRight = `${getScrollWidth()}px`;
        }
    }
        
    function showModalByTime(modalSelector, time) {
        const modal = document.body.querySelector(modalSelector);
        setTimeout(() => {
            if (document.body.classList.contains("modal-open")) return;
            modalStyle(modal, "block");
        }, time)
    }
    
    function initNumberInput(fieldSelectors = []) {
        fieldSelectors.forEach(fieldSelector => {
            const field = document.body.querySelector(fieldSelector);
            field.addEventListener("input", () => {
            field.value = field.value.replace( /[^0-9]/, "");
            })
            field.setAttribute("pattern", "[0-9]");
            field.setAttribute("title", "You can input only numbers");
        })
    }

    function getScrollWidth() {
        const div = document.createElement("div");
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";
        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    console.log(modalsDataStore);

    bindModals(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
    bindModals(".phone_link", ".popup", ".popup .popup_close");
    bindModals(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
    bindModals(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false, ["balconWidth", "balconHeight"]);
    bindModals(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false, ["glazingProfile"]);

    initNumberInput(["#height", "#width"]);
    showModalByTime(".popup", 3000);
}

export default modals;