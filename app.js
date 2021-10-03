import jobsData from "./data.js";

const container = document.querySelector(".container")

jobsData.forEach(element => {
    const cardElement = createCard(element);
    container.appendChild(cardElement);
});

function createCard(job) {
    const cardElement = document.createElement("article");
    cardElement.classList.add("card")

    const companyLogo = createCardElement({
        elementType: "img",
        container: cardElement,
        attributes: { class: "company__logo", src: job.logo, 
        alt: `company logo from ${job.company}`},
        properties: { innerText: job.company }
    });

    const companyName = createCardElement({
        elementType: "p",
        container: cardElement,
        attributes: { class: "company__name"},
        properties: { innerText: job.company }
    });

    const badges = createBadge(job.new, job.featured);
    badges.forEach(badge => {
        cardElement.appendChild(badge)
    })

    const jobPosition = createCardElement({
        elementType: "p",
        container: cardElement,
        attributes: { class: "job__position"},
        properties: { innerText: job.position }
    });

    const postedAt = createCardElement({
        elementType: "p",
        container: cardElement,
        attributes: { class: "post__details"},
        properties: { innerText: job.postedAt }
    });

    const firstDot = createCardElement({
        elementType: "p",
        container: cardElement,
        properties: { innerText: "•" }
    });

    const contract = createCardElement({
        elementType: "p",
        container: cardElement,
        attributes: { class: "post__details"},
        properties: { innerText: job.contract }
    });

    const secondDot = createCardElement({
        elementType: "p",
        container: cardElement,
        properties: { innerText: "•" }
    });

    const jobLocation = createCardElement({
        elementType: "p",
        container: cardElement,
        attributes: { class: "post__details"},
        properties: { innerText: job.location }
    });

    const labels = createLabel({
        role: job.role,
        level: job.level,
        languages: job.languages,
        tools: job.tools,   
    });

    cardElement.appendChild(labels);

    return cardElement;
}


function createBadge(isNew, isFeatured) {
    if (!isNew && !isFeatured) {
        return [];
    }
    
    const badges = [];
    if (isNew) {
        const newBadge = document.createElement("p");
        newBadge.innerText = "New!"
        newBadge.classList.add("badge");
        newBadge.classList.add("badge--new");
        badges.push(newBadge);
    }

    if (isFeatured) {
        const featuredBadge = document.createElement("p");
        featuredBadge.innerText = "Featured";
        featuredBadge.classList.add("badge");
        featuredBadge.classList.add("badge--featured")
        badges.push(featuredBadge)
    }

    return badges
}


function createCardElement({ elementType, container, properties, attributes }) {
    const newElement = document.createElement(elementType);
    
    if (attributes) { 
        for(let attribute in attributes) {
            newElement.setAttribute(attribute, attributes[attribute])
        }
    }

    if (properties) { 
        for(let property in properties) {
            newElement[property] = properties[property]
        }
    }

    container.appendChild(newElement);
    return newElement;
}

function createLabel({ role, level, languages, tools }) {
    const labelsArray = [role,level, ...languages, ...tools]

    const labelsContainer = document.createElement("div")
    labelsContainer.classList.add("labels__container")

    for(let label of labelsArray) {
        let labelElement = document.createElement("button");
        labelElement.classList.add("label");
        labelElement.innerText = label;
        labelsContainer.appendChild(labelElement);
    }

    return labelsContainer;
}
