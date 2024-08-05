![image](https://github.com/user-attachments/assets/c854b293-9398-4a8c-b286-0756d8eb2a17)

Code này ban đầu của bác Mát Xa Công Tử ass của vevocloud.com
Các bạn có thể liên hệ bác ấy qua telegram @dev_ngu

### Giải thích script

#### Các hàm và chức năng chính

1.  **`clickElement(element)`**:
    
    -   **Mô tả**: Hàm này sẽ nhấp vào một phần tử đã cho sau một khoảng delay nhỏ.
    -   **Cách hoạt động**:
        -   Kiểm tra xem phần tử có tồn tại không.
        -   Thêm một delay nhỏ (100ms) trước khi thực hiện nhấp vào phần tử.
        -   Tạo sự kiện `MouseEvent` để mô phỏng hành động nhấp chuột.
        -   Gửi sự kiện `click` đến phần tử.
2.  **`choosePriorityServer()`**:
    
    -   **Mô tả**: Hàm này sẽ tìm và nhấp vào server ưu tiên hoặc server đầu tiên nếu không tìm thấy server ưu tiên.
    -   **Cách hoạt động**:
        -   Tìm tất cả các phần tử server có lớp `streaming-server`.
        -   Tìm server có liên kết chứa `vevocloud.com`.
        -   Nếu tìm thấy server ưu tiên, sẽ nhấp vào nó bằng cách gọi `clickElement(priorityServer)`.
        -   Nếu không tìm thấy server ưu tiên nhưng có server khác, sẽ nhấp vào server đầu tiên.
        -   Nếu không có server nào, sẽ ghi log thông báo không có server nào có sẵn.
3.  **`attemptToLoadServer()`**:
    
    -   **Mô tả**: Hàm này kiểm tra sự hiện diện của các phần tử server trong DOM.
    -   **Cách hoạt động**:
        -   Tìm tất cả các phần tử server.
        -   Nếu không tìm thấy server nào, thử lại sau 500ms bằng cách gọi lại `attemptToLoadServer`.
        -   Nếu tìm thấy server, sẽ gọi `choosePriorityServer` để chọn server.
4.  **`DOMContentLoaded` event listener**:
    
    -   **Mô tả**: Khi DOM đã tải xong, hàm này sẽ bắt đầu quá trình tìm và chọn server.
    -   **Cách hoạt động**:
        -   Ghi log rằng DOM đã được tải xong.
        -   Gọi `attemptToLoadServer` để bắt đầu quá trình tìm server.
5.  **`MutationObserver`**:
    
    -   **Mô tả**: Quan sát sự thay đổi trong phần tử có id `ploption`.
    -   **Cách hoạt động**:
        -   Khi có thay đổi trong DOM (phần tử con được thêm hoặc thay đổi), sẽ gọi `attemptToLoadServer` để kiểm tra sự xuất hiện của các server.
        -   Nếu phần tử `ploption` tồn tại, sẽ bắt đầu quan sát nó.
#### Đoạn mã chính

  
    function clickElement(element) {
        if (element) {
            console.log("Clicking element:", element);
            // Thêm delay nhỏ trước khi nhấp
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



### Tổng kết

Đoạn mã trên sẽ thực hiện (bạn có thể thay đổi domain vevocloud thành một domain khác
-   Nhấp vào server ưu tiên có chứa liên kết `vevocloud.com`.
-   Nếu không tìm thấy server ưu tiên, sẽ nhấp vào server đầu tiên có trong danh sách.
-   Theo dõi sự thay đổi trong DOM để cập nhật danh sách server và chọn lại nếu cần.

### Lưu ý chỉ cần nhét trong tag `<body> </body>` là được
