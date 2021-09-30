import jobsData from "./data.js";

const container = document.querySelector(".container")

jobsData.forEach(element => {
    const cardElement = createCard(element)
    container.appendChild(cardElement)
});

function createCard(job) {
    const cardElement = document.createElement("div");
    const badges = createBadge(job.new, job.featured);
    badges.forEach(badge => {
        cardElement.appendChild(badge)
    })
    return cardElement
}

function createBadge(isNew, isFeatured) {
    if (!isNew && !isFeatured) {
        return [];
    }
    
    const badges = [];
    if (isNew) {
        const newBadge = document.createElement("p");
        newBadge.innerText = "New!"
        newBadge.classList.add(["badge", "badge--new"]);
        badges.push(newBadge)
    }

    if (isFeatured) {
        const featuredBadge = document.createElement("p");
        featuredBadge.innerText = "Featured"
        featuredBadge.classList.add(["badge", "badge--featured"]);
        badges.push(featuredBadge)
    }

    return badges
}

console.log(createBadge(true, true))
console.log(createBadge(true, false))
console.log(createBadge(false, false))
console.log(createBadge(false, true))