import jobsData from "./data.js";

const container = document.querySelector(".container")
const filters = []
const clearFilters = document.querySelector(".clear__button");
clearFilters.addEventListener("click", clearFilterBox);

jobsData.forEach(element => {
    const cardElement = createCard(element);
    container.appendChild(cardElement);
});

function createCard(job) {
    const cardElement = document.createElement("article");
    cardElement.setAttribute("id", "card")
    cardElement.classList.add("card")
    cardElement.classList.add(job.featured ? "card--featured" : "card");
    cardElement.setAttribute("data-labels", [job.role, job.level, ...job.languages, ...job.tools]);

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
        const newBadge = document.createElement("span");
        newBadge.innerText = "New"
        newBadge.classList.add("badge");
        newBadge.classList.add("badge--new");
        badges.push(newBadge);
    }

    if (isFeatured) {
        const featuredBadge = document.createElement("span");
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
        labelElement.addEventListener("click", addFilters);
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
        attributes: { class: "post__details"},
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
        properties: { innerText: "•" },
        attributes: { class: "post__details"},
    });

    createCardElement({
        elementType: "p",
        container: jobDetailsContainer,
        attributes: { class: "post__details"},
        properties: { innerText: location }
    });

    return jobDetailsContainer;
}

function updateFilterBox(filtersApplied) {
    const filterBox = document.querySelector(".filter__box")
    const filterLabels = document.querySelector("#filters")
    filterLabels.innerHTML = ""

    if (filtersApplied.length > 0) {
        filterBox.classList.add("filter__box--visible")
        filtersApplied.forEach((filter) => {
            const filterContainer = document.createElement("div");
            filterContainer.classList.add("filter__container");

            const filterLabel = document.createElement("span");
            filterLabel.innerText = filter;
            filterLabel.classList.add("filter__label");

            filterContainer.addEventListener("click", removeFilters);

            filterContainer.appendChild(filterLabel);
            filterContainer.insertAdjacentHTML("beforeend", "<i class='far fa-window-close remove__icon'></i>");
            
            filterLabels.appendChild(filterContainer);
        })
    } else {
        filterBox.classList.remove("filter__box--visible")
    }

    //updateCards(filters)
}

function addFilters(event) {
    const labelSelected = event.target.innerText;

    if (!filters.includes(labelSelected)) {
        filters.push(labelSelected)
        updateFilterBox(filters)
        updateCards(filters)
    }
}

function removeFilters(event) {
    const filterToRemove = event.target.innerText
    const indexFilterToRemove = filters.indexOf(filterToRemove)
    
    if (indexFilterToRemove > -1) {
       filters.splice(indexFilterToRemove, 1);
       updateFilterBox(filters);
       updateCards(filters);
    }  
}

function updateCards(filtersApplied) {
    const cards = [...document.querySelectorAll(`[data-labels]`)];

    cards.forEach((cardElement) => {
        const cardLabels = cardElement.getAttribute("data-labels");
        let isValidFilter = true;
        console.log("card labels", cardLabels)
        console.log("filters applied", filtersApplied)
        filtersApplied.forEach((filter) => {
            console.log("current filter", filter)
            if (!cardLabels.includes(filter)) {
                isValidFilter = false;
            }
        })

        if (isValidFilter) {
            cardElement.classList.add("card")
            cardElement.classList.remove("card--hidden")
        } else {
            cardElement.classList.remove("card")
            cardElement.classList.add("card--hidden")
        }
    })
}

function clearFilterBox(event) {
    const filterLabels = document.querySelector("#filters");

    filterLabels.innerHTML = "";
    filters.length = 0;

    updateFilterBox(filters);
    updateCards(filters);
}

