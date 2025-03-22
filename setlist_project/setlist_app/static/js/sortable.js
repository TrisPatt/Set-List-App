document.addEventListener("DOMContentLoaded", function () {
    let songList = document.getElementById("setlist");

    if (songList) {
        new Sortable(songList, {
            animation: 150,
            onEnd: function (evt) {
                updateSetOrder();
            }
        });
    }

    function setupSortable(list, setId) {
        new Sortable(list, {
            group: "songs",
            animation: 150,
            ghostClass: "sortable-ghost",
            handle: ".drag-handle",
            onEnd: function () {
                setTimeout(() => {
                    updateListNumbers();
                    saveOrder(setId, list);  // Ensure order is saved after sorting
                }, 100);
            },
        });
    }

    function updateSetOrder(setId, listElement) {
        const songIds = Array.from(listElement.children).map(li => li.dataset.id);
    
        fetch(`/save-set-order/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                set_id: setId,  // Include set ID
                song_ids: songIds
            }),
        })
        .then(response => response.json())
        .then(() => updateTotalDuration())  // Ensure duration updates
        .catch(error => console.error("Error:", error));
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            document.cookie.split(";").forEach(cookie => {
                let trimmedCookie = cookie.trim();
                if (trimmedCookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(trimmedCookie.substring(name.length + 1));
                }
            });
        }
        return cookieValue;
    }

    function updateSetDuration() {
        fetch("/get-set-duration/")
            .then(response => response.json())
            .then(data => {
                document.getElementById("total-duration").innerText = `Total Duration: ${formatTime(data.total_duration)}`;
            })
            .catch(error => console.error("Error fetching duration:", error));
    }
    
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    
    function updateTotalDuration() {
        function calculateDuration(setList) {
            return Array.from(setList.children).reduce((total, li) => {
                const match = li.querySelector(".song-title").textContent.match(/(\d+)\s*mins?\s*(\d*)\s*secs?/);
                if (match) {
                    const minutes = parseInt(match[1]) || 0;
                    const seconds = parseInt(match[2]) || 0;
                    return total + minutes * 60 + seconds;
                }
                return total;
            }, 0);
        }
    
        function formatDuration(totalSeconds) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }
    
        document.querySelector("#set1-list + p strong").textContent = `Total Duration: ${formatDuration(calculateDuration(set1List))}`;
        document.querySelector("#set2-list + p strong").textContent = `Total Duration: ${formatDuration(calculateDuration(set2List))}`;
    }
});