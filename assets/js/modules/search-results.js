// Issue with CORS on localhost, using proxy server and caching results to avoid continuous requests
const resultsElement = document.querySelector('[data-behaviour="populate-results"');
const key = 'results';
const cachedHits = localStorage.getItem(key);
const cachedTimeStamp = localStorage.getItem(`${key}_timestamp`);
const now = new Date().getTime() / 1000;
let resultsCount = 0;

// Set results for a week (just for testing)
if (cachedHits !== 'undefined' && (hoursBetween(Math.floor(now), parseInt(cachedTimeStamp)) <= 24 * 7)) {
    generateResults(JSON.parse(cachedHits));
} else {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://gc-interview.azurewebsites.net/api/consultantlisting')}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            localStorage.setItem(key, data.contents);
            localStorage.setItem(`${key}_timestamp`, Math.floor(now));

            generateResults(JSON.parse(data.contents));
        });
}

function generateResults(results) {
    results.map((item, index) => {
        resultsElement.innerHTML += `<article data-key="${index}">
            <h2>${item.Title}</h2>
            <img src="${item.ProfileImage}">
            <p>${item.Hospital}</p>
            <p>${item.PhoneNo}</p>
            <p>${item.Specialty}</p>
            <p>${item.ProfessionalBackground}</p>
        </article>`;
    });

    resultsCount = results.length;
}

function hoursBetween(d1, d2) {
    return Math.abs(d1 - d2) / (60 * 60);
};

const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.querySelector("[data-behaviour='populate-results']");
const listItems = paginatedList.querySelectorAll("article");
const firstButton = document.getElementById("first-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const lastButton = document.getElementById("last-button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

function disableButton(button) {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

function enableButton(button) {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

function handlePageButtonsStatus() {
    if (currentPage === 1) {
        disableButton(firstButton);
        disableButton(prevButton);
    } else {
        enableButton(firstButton);
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(lastButton);
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
        enableButton(lastButton);
    }
};

function handleActivePageNumber() {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};

function appendPageNumber(index) {
    paginationNumbers.innerHTML += `<button class="pagination-number" page-index="${index}">${index}</button>`;
};

function getPaginationNumbers() {
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};

function setCurrentPage(pageNum) {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();
    setShowingResultsCount();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};

function setShowingResultsCount() {
    let first = (((currentPage - 1) * paginationLimit) + 1);
    let last = first + paginationLimit - 1;
    last = last <= resultsCount ? last : resultsCount;
    document.querySelector("#showing-count").innerHTML = `<div class="pagination-label">Showing posts ${first} - ${last} of ${resultsCount}</div>`
}

window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    firstButton.addEventListener("click", () => {
        setCurrentPage(1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
    });

    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
    });

    lastButton.addEventListener("click", () => {
        setCurrentPage(pageCount);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", function () {
                setCurrentPage(pageIndex);
            });
        }
    });
});
