import modalsDataStore from "./modalsDataStore";
/**
 * Set listeners on changing data in elements that indicated inside this function. Listeners will set 
 * changed data into dataStore (obect) that was given into function params.
 *
 */
export default function changeModalsDataListener() {
    const balconFormElements = document.body.querySelectorAll(".balcon_icons_img");
    const balconWidthElement = document.body.querySelectorAll(".popup_calc_content #width");
    const balconHeightElement = document.body.querySelectorAll(".popup_calc_content #height");
    const windowTypeElement = document.body.querySelectorAll("#view_type");
    const glazingProfileElements = document.body.querySelectorAll(".popup_calc_profile_content .checkbox");


    function elemDataChangesHandler(elements, event, prop) {
        elements.forEach((elem, index) => {
            elem.addEventListener(event, () => {
                switch(event) {
                    case "click" : 
                        modalsDataStore[prop] = index;
                        break;
                    case "input" :
                        modalsDataStore[prop] = elem.value;
                        break;
                    case "change" :
                        if (elem.tagName === "SELECT") {
                            modalsDataStore[prop] = elem.value;
                        } else if (elem.tagName === "INPUT") {
                            console.log(elem);
                            elements.forEach((checkbox, j) => {
                                if (index != j) checkbox.checked = false;
                            })
                            if (!elem.checked) {
                                delete modalsDataStore[prop];
                            } else {
                                modalsDataStore[prop] = elem.nextElementSibling.getAttribute("id");
                            }
                        }
                        break;
                }
                console.log(modalsDataStore);
            })
        });
    }

    elemDataChangesHandler(balconFormElements, "click", "balconForm");
    elemDataChangesHandler(balconWidthElement, "input", "balconWidth");
    elemDataChangesHandler(balconHeightElement, "input", "balconHeight");
    elemDataChangesHandler(windowTypeElement, "change", "windowType");
    elemDataChangesHandler(glazingProfileElements, "change", "glazingProfile");
}