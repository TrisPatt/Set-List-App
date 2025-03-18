document.addEventListener("DOMContentLoaded", function () {
    const availableSongs = document.getElementById("available-songs");
    const set1List = document.getElementById("set1-list");
    const set2List = document.getElementById("set2-list");

    function setupSortable(list) {
        new Sortable(list, {
            group: "shared", // Allows dragging between lists
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd: function (evt) {
                console.log(`Moved song from ${evt.from.id} to ${evt.to.id}, new index: ${evt.newIndex}`);
            },
        });
    }

    setupSortable(availableSongs);
    setupSortable(set1List);
    setupSortable(set2List);

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

    document.getElementById("save-set1-order").addEventListener("click", function () {
        saveOrder(1, set1List);
    });

    document.getElementById("save-set2-order").addEventListener("click", function () {
        saveOrder(2, set2List);
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

function setupSortable(list, setId) {
    new Sortable(list, {
        group: "shared",
        animation: 150,
        ghostClass: "sortable-ghost",
        handle: ".drag-handle", // Only allow dragging using the ☰ icon
        onEnd: function () {
            saveOrder(setId, list);
        },
    });
}