export default function(tabsSelector, tabsContentSelector, activeClass = null, displayContent = "block") {
    const tabs = document.body.querySelectorAll(tabsSelector);
    const tabsContent = document.body.querySelectorAll(tabsContentSelector);

    initializeTabs(tabs);

    function initializeTabs(tabs) {
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabManager(index);
            })
        });

        function tabManager(index) {
            hideContent();
            showContent(index);
        }

        function hideContent() {
            tabsContent.forEach(contentOfOneTab => {
                contentOfOneTab.style.display = "none";
            })
            if (!activeClass) return;
            tabs.forEach(tab => {
                tab.classList.remove(activeClass); 
            })
        }

        function showContent(index) {
            tabsContent[index].style.display = displayContent;
            if (!activeClass) return;
            tabs[index].classList.add(activeClass); 
        }
    }
}