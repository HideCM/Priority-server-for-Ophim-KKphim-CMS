    // Ý tưởng của bác Mát Xa Công Tử - Ass của vevocloud.com
    function clickElement(element) {
        if (element) {
            console.log("Clicking element:", element);
            // Delay added
            setTimeout(() => {
                const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
                element.dispatchEvent(event);
                console.log("Clicked element:", element);
            }, 100);
        } else {
            console.log("Element to click not found.");
        }
    }

    function choosePriorityServer() {
        console.log("Attempting to choose the priority server...");
        const priorityServerLink = "vevocloud.com"; // Chỉ phần liên kết cần kiểm tra
        const servers = Array.from(document.querySelectorAll('.streaming-server'));

        console.log("Servers found:", servers);

        const priorityServer = servers.find(server => {
            const link = server.getAttribute('data-link');
            return link && link.includes(priorityServerLink);
        });

        if (priorityServer) {
            console.log("Priority server found:", priorityServer);
            clickElement(priorityServer);
        } else if (servers.length > 0) {
            console.log("No priority server found. Clicking the first server:", servers[0]);
            clickElement(servers[0]);
        } else {
            console.log("No servers available.");
        }
    }

    function attemptToLoadServer() {
        console.log("Attempting to load servers...");
        const servers = document.querySelectorAll('.streaming-server');
        console.log("Servers currently in DOM:", servers);

        if (servers.length === 0) {
            console.log("Servers not found, retrying...");
            setTimeout(attemptToLoadServer, 500);
        } else {
            choosePriorityServer();
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded and parsed. Starting server selection...");
        attemptToLoadServer();
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            console.log("Mutation observed:", mutation);
            if (mutation.addedNodes.length > 0) {
                attemptToLoadServer();
            }
        });
    });

    const targetNode = document.getElementById('ploption');
    if (targetNode) {
        console.log("Observing changes in #ploption...");
        observer.observe(targetNode, { childList: true, subtree: true });
    } else {
        console.log("#ploption not found, cannot observe changes.");
    }