const clearHelper = {

    clearDataOnModals() {
        const allInputsInModal = document.body.querySelectorAll(".popup_dialog input");
        allInputsInModal.forEach(input => {
            if (input.classList.contains("checkbox")) {
                input.checked = false;
            } else {
                input.value = "";
            }
        })
        const balconIcons = document.body.querySelectorAll(".balcon_icons_img");
        balconIcons.forEach(icon => {
            icon.classList.remove("do_image_more");
        })
        balconIcons[0].classList.add("do_image_more");
    },

    clearModalsDataStore(DataStore) {
        Object.keys(DataStore).forEach(key => {
            if (key === "balconForm") {
                DataStore[key] = 0;
                console.log(1);
            } else if (key === "windowType") {
                DataStore[key] = "tree";
                console.log(2);
            } else {
                DataStore[key] = "";
                console.log(3);
            }
        })
        console.log(DataStore);
    }
}

export default clearHelper;