import { sendMessage } from "./telegram";

// the share button
const shareButton = `
<div class="feed-shared-social-action-bar__action-button">
    <span tabindex="-1" id="ember634" class="artdeco-hoverable-trigger artdeco-hoverable-trigger--content-placed-top artdeco-hoverable-trigger--is-hoverable ember-view">
        <button data-finite-scroll-hotkey="s" class="social-actions-button send-privately-button artdeco-button artdeco-button--4 artdeco-button--tertiary flex-wrap artdeco-button--muted send-privately-button" aria-label="Send in a private message" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#FFFFFF" d="M 15.990234 1.9902344 A 1.0001 1.0001 0 0 0 15.292969 3.7070312 L 17.585938 6 L 17 6 C 10.936593 6 6 10.936593 6 17 A 1.0001 1.0001 0 1 0 8 17 C 8 12.017407 12.017407 8 17 8 L 17.585938 8 L 15.292969 10.292969 A 1.0001 1.0001 0 1 0 16.707031 11.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 20.707031 6.2929688 L 16.707031 2.2929688 A 1.0001 1.0001 0 0 0 15.990234 1.9902344 z M 2.984375 7.9863281 A 1.0001 1.0001 0 0 0 2 9 L 2 19 C 2 20.64497 3.3550302 22 5 22 L 19 22 C 20.64497 22 22 20.64497 22 19 L 22 18 A 1.0001 1.0001 0 1 0 20 18 L 20 19 C 20 19.56503 19.56503 20 19 20 L 5 20 C 4.4349698 20 4 19.56503 4 19 L 4 9 A 1.0001 1.0001 0 0 0 2.984375 7.9863281 z"></path>
            </svg>

        <span class="artdeco-button__text social-action-button__text"> Share</span>
        </button>
        <div id="artdeco-gen-75" class="ember-view"><div id="ember636" class="ember-view"></div></div>
    </span>
</div> 
`;

function handleShareButtonClick(_: Event, section: HTMLElement) {
    // get the closest url by finding the closest div with data-urn attribute
    const urn = section.closest("div[data-urn]")?.getAttribute("data-urn");

    const url = `https://www.linkedin.com/embed/feed/update/${urn}`;

    // send the url to the telegram channel
    sendMessage(url);
}

// Function to add event listener to questions
function addEventListenerToPosts(section: HTMLElement) {
    // check if the button is already added or not
    if (!section.hasAttribute("button-added")) {
        section.insertAdjacentHTML("beforeend", shareButton);

        section.addEventListener("click", (event) =>
            handleShareButtonClick(event, section),
        );

        // Add a flag to indicate that the button is added
        section.setAttribute("button-added", "true");
    }
}

// Function to observe mutations and add event listeners
function observeMutations(mutationsList: MutationRecord[]) {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedNodes = Array.from(mutation.addedNodes);
            addedNodes.forEach((node) => {
                if (
                    node instanceof HTMLElement &&
                    node.classList.contains("feed-shared-social-action-bar")
                ) {
                    addEventListenerToPosts(node);
                }
            });
        }
    }
}

// Initialize MutationObserver
const observer = new MutationObserver(observeMutations);

// Start observing mutations on the entire document
observer.observe(document.body, { childList: true, subtree: true });

// Initialize event listeners on existing elements
const existingSections = document.querySelectorAll(
    ".feed-shared-social-action-bar",
);
existingSections.forEach((section) => {
    addEventListenerToPosts(section as HTMLElement);
});
