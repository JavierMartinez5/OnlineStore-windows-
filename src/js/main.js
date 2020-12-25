import "./slider";
import modals from "./modules/modals";
import tabsInit from "./modules/tabs";
import formsInit from "./modules/forms";
import changeModalsDataListener from "./modules/modalsDataListener";
import initSaleTimer from "./modules/saleTimer";
import galleryInit from "./modules/imgGallery";
// const modalsData = {};

window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    modals();
    changeModalsDataListener()
    tabsInit(".no_click", ".decoration_content > .row > div", "after_click");
    tabsInit(".glazing_block", ".glazing_content");
    tabsInit(".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");
    formsInit();
    initSaleTimer("December 30, 2020 02:52:00" ,".timer1");
    galleryInit();
})