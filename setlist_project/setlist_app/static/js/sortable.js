document.addEventListener("DOMContentLoaded", function () {
    const set1List = document.getElementById("set1-list");
    const set2List = document.getElementById("set2-list");

    function updateListNumbers() {
        // Update Set 1 numbering
        document.querySelectorAll("#set1-list li").forEach((item, index) => {
            const numberSpan = item.querySelector(".song-number");
            if (numberSpan) {
                numberSpan.textContent = `${index + 1}.`;
            }
        });

        // Update Set 2 numbering
        document.querySelectorAll("#set2-list li").forEach((item, index) => {
            const numberSpan = item.querySelector(".song-number");
            if (numberSpan) {
                numberSpan.textContent = `${index + 1}.`;
            }
        });
    }

    function setupSortable(list, setId) {
        new Sortable(list, {
            group: "shared",
            animation: 150,
            ghostClass: "sortable-ghost",
            handle: ".drag-handle",
            onEnd: function () {
                setTimeout(() => {
                    updateListNumbers(); // Ensure numbers update after drag
                    if (setId) {
                        saveOrder(setId, list);
                    }
                }, 50);
            },
        });
    }

    function saveOrder(setId, listElement) {
        const songIds = Array.from(listElement.children).map(li => li.dataset.id);
        
        fetch(`/save-set-order/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                set_id: setId,
                song_ids: songIds
            }),
        })
        .then(response => response.json())
        .then(data => console.log("Saved:", data))
        .catch(error => console.error("Error:", error));
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            document.cookie.split(";").forEach(cookie => {
                cookie = cookie.trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                }
            });
        }
        return cookieValue;
    }

    // Setup sortable lists
    setupSortable(set1List, 1);
    setupSortable(set2List, 2);

    // Ensure numbering updates when page loads
    updateListNumbers();

    // Handle item removal
    [set1List, set2List].forEach(list => {
        list.addEventListener("click", function (event) {
            if (event.target.classList.contains("btn-danger")) {
                setTimeout(updateListNumbers, 50); // Delay ensures removal is processed first
            }
        });
    });

    // Update numbers after dragging between sets
    document.addEventListener("mouseup", () => setTimeout(updateListNumbers, 50));
});





