import jobsData from "./data.js";

const container = document.querySelector(".container")

jobsData.forEach(element => {
    const cardElement = createCard(element);
    container.appendChild(cardElement);
});

function createCard(job) {
    const cardElement = document.createElement("article");
    cardElement.classList.add("card");
    
    const companyLogoSection = createCompanyLogoSection(job.logo, job.company);

    const jobDetailsSection = createJobDetailsSection({ 
        companyName: job.company, 
        newBadge: job.new, 
        featuredBadge: job.featured, 
        position: job.position,
        postedAt: job.postedAt,
        contract: job.contract,
        location: job.location
     });

    const labels = createLabel({
        role: job.role,
        level: job.level,
        languages: job.languages,
        tools: job.tools,   
    });

    cardElement.appendChild(companyLogoSection);
    cardElement.appendChild(jobDetailsSection);
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

function createCompanyLogoSection(logo, companyName) {
    const companyLogoContainer = document.createElement("div");
    companyLogoContainer.classList.add("logo__container")

    createCardElement({
        elementType: "img",
        container: companyLogoContainer,
        attributes: { class: "company__logo", src: logo, 
        alt: `company logo from ${companyName}`},
        properties: { innerText: companyName }
    });

    return companyLogoContainer;
}

function createJobDetailsSection({ 
    companyName, 
    newBadge, 
    featuredBadge, 
    position, 
    postedAt, 
    contract, 
    location 
    }) {
    const jobDetailsContainer = document.createElement("div");
    jobDetailsContainer.classList.add("details__container") 

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        attributes: { class: "company__name"},
        properties: { innerText: companyName }
    });

    const badges = createBadge(newBadge, featuredBadge);
    badges.forEach(badge => {
        jobDetailsContainer.appendChild(badge)
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        attributes: { class: "job__position"},
        properties: { innerText: position }
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        attributes: { class: "post__details"},
        properties: { innerText: postedAt }
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        properties: { innerText: "•" }
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        attributes: { class: "post__details"},
        properties: { innerText: contract }
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        properties: { innerText: "•" }
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        attributes: { class: "post__details"},
        properties: { innerText: location }
    });




    // const secondDot = createCardElement({
    //     elementType: "p",
    //     container: cardElement,
    //     properties: { innerText: "•" }
    // });

    return jobDetailsContainer;
}