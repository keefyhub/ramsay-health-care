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

            // Dirty reload on initial request due to pagination issue - look to change this
            location.reload();
        });
}

function generateResults(results) {
    results.map((item, index) => {
        resultsElement.innerHTML += `<article data-key="${index}" class="result-item will-animate fadeInUp" data-behaviour="animate-when-visible">
            <div class="result-item__wrapper">
                <div class="result-item__image">
                    <img src="${item.ProfileImage}">
                </div>
                <div class="result-item__information">
                    <h2>${item.Title} - ${item.Specialty}</h2>
                    <div class="result-item__contact">
                        <span class="result-item__element">
                            <i class="fa-solid fa-circle-h u-highlight"></i>
                            <span>Based at ${item.Hospital} - 9Miles</span>
                        </span>
                        <div class="result-item__links u-highlight">
                            <span class="result-item__element">
                                <a href="#">
                                    <i class="fa-solid fa-phone"></i>
                                    <span>${item.PhoneNo}</span>
                                </a>
                            </span>
                            <span class="result-item__element">
                                <a href="#">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    <span>Go to hospital website</span>
                                </a>
                            </span>
                            <span class="result-item__element">
                                <a href="#">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    <span>Get Directions</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="result-item__content">
                    <p>${item.ProfessionalBackground}</p>
                </div>
            </div>
            <div class="result-item__actions">
                <div class="button-grid button-grid--column">
                    <a class="button button--outline" href="#">View full profile</a>
                    <a class="button" href="#">Book an appointment</a>
                </div>
            </div>
        </article>`;
    });

    resultsCount = results.length;
}

function hoursBetween(d1, d2) {
    return Math.abs(d1 - d2) / (60 * 60);
};

// Mostly taken from here but adapted - https://codepen.io/tutsplus/pen/poaQEeq
const paginationNumbers = document.querySelector("[data-behaviour='pagination-numbers']");
const paginatedList = document.querySelector("[data-behaviour='populate-results']");
const listItems = paginatedList.querySelectorAll(".result-item");
const firstButton = document.querySelector("[data-pagination-button='first-button']");
const prevButton = document.querySelector("[data-pagination-button='prev-button']");
const nextButton = document.querySelector("[data-pagination-button='next-button']");
const lastButton = document.querySelector("[data-pagination-button='last-button']");

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
        item.classList.add("is-hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("is-hidden");
        }
    });
};

function setShowingResultsCount() {
    let first = (((currentPage - 1) * paginationLimit) + 1);
    let last = first + paginationLimit - 1;
    last = last <= resultsCount ? last : resultsCount;
    document.querySelector("[data-behaviour='showing-count']").innerHTML = `<div class="showing-count__content">Showing <span class="u-highlight">${first}</span> - <span class="u-highlight">${last}</span> of <span class="u-highlight">${resultsCount}</span> ${pluralize(resultsCount, 'result', 'results')}</div>`
}

function pluralize(value, single, plural,) {
    return `${value > 1 ? plural : single}`;
}

function scrollToTop() {
    // NOTE - Might remove this
    // Scroll to top of results when pagination changes
    resultsElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
}

window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    firstButton.addEventListener("click", () => {
        setCurrentPage(1);
        scrollToTop();
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
        scrollToTop();
    });

    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
        scrollToTop();
    });

    lastButton.addEventListener("click", () => {
        setCurrentPage(pageCount);
        scrollToTop();
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", function () {
                setCurrentPage(pageIndex);
                scrollToTop();
            });
        }
    });
});
