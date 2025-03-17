document.addEventListener("DOMContentLoaded", function () {
    const songList = document.getElementById("song-list");

    if (songList) {
        new Sortable(songList, {
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd: function (evt) {
                console.log(`Moved song from ${evt.oldIndex} to ${evt.newIndex}`);
            },
        });
    }
});
