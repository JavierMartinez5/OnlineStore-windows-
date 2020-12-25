import customIcons from "./icons";
export default function galleryInit() {
    const galleryContainer = document.body.querySelector(".works"),
        leftArrowContainer = document.createElement("div"),
        rightArrowContainer = document.createElement("div"),
        bigImgContainer = document.createElement("div"),
        bigImg = document.createElement("img");
    let imgSrc = null;

    bigImgContainer.classList.add("popup", "nonSelectable");
    bigImgContainer.style.display = "none";
    bigImgContainer.style.justifyContent = "space-between";
    bigImgContainer.style.alignItems = "center";
    bigImgContainer.appendChild(leftArrowContainer);
    bigImgContainer.appendChild(bigImg);
    bigImgContainer.appendChild(rightArrowContainer);
    galleryContainer.appendChild(bigImgContainer);
    bigImg.style.cssText = "max-width: 80%;max-height: 100%;";
    leftArrowContainer.classList.add("sideArrow");
    rightArrowContainer.classList.add("sideArrow");
    leftArrowContainer.setAttribute("id", "leftArrow");
    rightArrowContainer.setAttribute("id", "rightArrow");

    leftArrowContainer.insertAdjacentHTML("afterbegin", customIcons.arrowLeft);
    rightArrowContainer.insertAdjacentHTML("afterbegin", customIcons.arrowRigth);

    galleryContainer.addEventListener("click", e => {
        if (e.target.classList.contains("preview")) {
            e.preventDefault();
            bigImgContainer.style.display = "flex";
            bigImg.setAttribute("src", e.target.parentElement.getAttribute("href"));
            document.body.classList.add("modal-open");
            imgSrc = bigImg.getAttribute("src");
        } else if (e.target.classList.contains("popup") || e.target.tagName === "IMG") {
            bigImgContainer.style.display = "none";
            document.body.classList.remove("modal-open");
        }
    })
    leftArrowContainer.addEventListener("click", () => {
        changeImgOnScreen("left", imgSrc);
    })
    rightArrowContainer.addEventListener("click", () => {
        changeImgOnScreen("right", imgSrc);
    })

    function changeImgOnScreen(direction, currentImgSrc) {
        const imgContainer = document.querySelector(`[href="${currentImgSrc}"]`).parentElement;
        console.log(imgContainer);
        console.log(bigImg);
        switch (direction) {
            case "right" :
                console.log("rrr");
                const nextSiblingImgContainer = imgContainer.nextElementSibling;
                if (!nextSiblingImgContainer) {
                    const firstImgContainer = imgContainer.parentElement.firstChild.nextElementSibling;
                    const imgHref = firstImgContainer.querySelector("a").getAttribute("href");
                    bigImg.setAttribute("src", imgHref);
                    imgSrc = imgHref;
                    console.log(bigImg, "ttt");
                } else {
                    const imgHref = nextSiblingImgContainer.querySelector("a").getAttribute("href");
                    bigImg.setAttribute("src", imgHref);
                    imgSrc = imgHref;
                    console.log(bigImg, "vvv");
                }
                break;
            case "left" : 
                console.log("lll");
                const previousSiblingImgContainer = imgContainer.previousElementSibling;
                if (!previousSiblingImgContainer) {
                    console.log("KKK", imgContainer.parentElement);
                    console.log("AAA", imgContainer.parentElement.lastChild);
                    const lastImgContainer = imgContainer.parentElement.lastChild.previousElementSibling;
                    const imgHref = lastImgContainer.querySelector("a").getAttribute("href");
                    bigImg.setAttribute("src", imgHref);
                    imgSrc = imgHref;
                    console.log(bigImg, "ttt");
                } else {
                    const imgHref = previousSiblingImgContainer.querySelector("a").getAttribute("href");
                    bigImg.setAttribute("src", imgHref);
                    imgSrc = imgHref;
                    console.log(bigImg, "vvv");
                }
                break;
        }
    }

    
}