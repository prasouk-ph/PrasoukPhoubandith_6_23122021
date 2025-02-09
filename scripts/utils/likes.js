/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function addLike(event) {
    const totalLikes = document.querySelector(".total-likes");
    let currentLikesCount = event.target.getAttribute("count");
    let newCount = parseInt(currentLikesCount) + 1; // parseInt convert string to number

    totalLikesCount ++;

    event.target.setAttribute("count", newCount);
    event.target.textContent = newCount;
    
    totalLikes.setAttribute("count", totalLikesCount);
    totalLikes.textContent = totalLikesCount;
}

function addLikeWithKeyboard(event) {
    if (event.key == "Enter") {
        addLike(event);
    }
}