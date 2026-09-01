const buttons = document.querySelectorAll(".card button");

const modal = document.getElementById("securityModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalHow = document.getElementById("modalHow");
const modalImpact = document.getElementById("modalImpact");
const modalPrevention = document.getElementById("modalPrevention");

const vulnerabilityInfo = {

    "SQL Injection": {
        description:
            "SQL Injection is a vulnerability that can occur when an application incorrectly handles user input used in database queries.",

        how:
            "It happens when an application combines untrusted input with database queries without using safe query mechanisms.",

        impact:
            "Depending on the application, attackers may be able to access or modify data they should not have access to.",

        prevention:
            "Use parameterized queries, prepared statements, input validation, and least-privilege database accounts."
    },

    "Cross-Site Scripting": {
        description:
            "Cross-Site Scripting (XSS) is a vulnerability where untrusted content can be interpreted as code by a user's browser.",

        how:
            "It can happen when applications place untrusted user input into web pages without properly handling or encoding it.",

        impact:
            "XSS can affect users who view the vulnerable page and may allow unwanted actions in their browser context.",

        prevention:
            "Validate input, encode output correctly, use secure frameworks, and consider Content Security Policy."
    },

    "IDOR": {
        description:
            "IDOR is an access-control vulnerability where an application exposes an object reference without properly checking authorization.",

        how:
            "It can happen when the server trusts an object identifier supplied by the client without verifying that the user is allowed to access that object.",

        impact:
            "An attacker may be able to access information or resources belonging to another user.",

        prevention:
            "Perform authorization checks on every request and verify that the current user owns or is permitted to access the requested resource."
    },

    "Authentication": {
        description:
            "Authentication vulnerabilities involve weaknesses in the way an application verifies user identities.",

        how:
            "Weak authentication controls, poor session handling, or missing protections can make account security weaker.",

        impact:
            "A weakness may allow unauthorized access to user accounts or protected functionality.",

        prevention:
            "Use secure authentication mechanisms, strong session management, rate limiting, and multi-factor authentication where appropriate."
    },

    "Business Logic": {
        description:
            "Business logic vulnerabilities occur when an application behaves in an unintended way because security rules are missing or incorrectly implemented.",

        how:
            "They often result from trusting the normal user workflow without validating important actions on the server.",

        impact:
            "Users may be able to perform actions that the application designer did not intend to allow.",

        prevention:
            "Validate important business rules on the server and test unusual workflows and edge cases."
    },

    "API Security": {
        description:
            "API security focuses on protecting application programming interfaces from unauthorized access and insecure data handling.",

        how:
            "Weak authentication, missing authorization checks, excessive data exposure, or poor input validation can create API security risks.",

        impact:
            "Insecure APIs can expose sensitive information or allow unauthorized actions.",

        prevention:
            "Use strong authentication and authorization, validate inputs, minimize returned data, and apply rate limiting."
    }
};


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");
        const title = card.querySelector("h3").textContent;

        const info = vulnerabilityInfo[title];

        if (!info) {
            return;
        }

        modalTitle.textContent = title;
        modalDescription.textContent = info.description;
        modalHow.textContent = info.how;
        modalImpact.textContent = info.impact;
        modalPrevention.textContent = info.prevention;

        modal.classList.add("active");
    });

});


closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("active");
    }

});
// SEARCH FUNCTION

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();

        if (
            title.includes(searchText) ||
            description.includes(searchText)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});
// FILTER FUNCTION

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        cards.forEach(card => {

            const severity = card
                .querySelector(".severity")
                .textContent
                .toLowerCase();

            if (filter === "all" || severity === filter) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});
// STATISTICS

const totalCount = document.getElementById("totalCount");
const highCount = document.getElementById("highCount");
const mediumCount = document.getElementById("mediumCount");

function updateStatistics() {

    let high = 0;
    let medium = 0;

    cards.forEach(card => {

        const severity = card
            .querySelector(".severity")
            .textContent
            .toLowerCase()
            .trim();

        if (severity === "high") {
            high++;
        }

        if (severity === "medium") {
            medium++;
        }

    });

    const total = high + medium;

    totalCount.textContent = total;
    highCount.textContent = high;
    mediumCount.textContent = medium;
}

updateStatistics();