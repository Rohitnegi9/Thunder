/* =========================================================== */
/*  THUNDER — Version 3 JavaScript                             */
/*  THIS is the file that brings everything to life.           */
/*  Read the comments top-to-bottom with your students.        */
/* =========================================================== */

/* ----------------------------------------------------------- */
/*  1. THE "CLICK ME" BUTTON                                   */
/*  In v1 and v2 this button did nothing. Now we LISTEN for    */
/*  a click and react to it.                                   */
/* ----------------------------------------------------------- */

// Find the button and the status text on the page (by their id).
const clickBtn = document.getElementById("clickBtn");
const clickStatus = document.getElementById("clickStatus");

let clickCount = 0; // a little memory to count clicks

// "When this button is clicked, run this function."
clickBtn.addEventListener("click", function () {
  clickCount++;
  clickStatus.textContent = `You clicked me ${clickCount} time(s)! See? I'm alive now.`;
});


/* ----------------------------------------------------------- */
/*  2. THE CALCULATOR                                          */
/*  Read both inputs, add them, and show the result.          */
/* ----------------------------------------------------------- */

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const sumBtn = document.getElementById("sumBtn");
const calcResult = document.getElementById("calcResult");

sumBtn.addEventListener("click", function () {
  // Inputs always give us TEXT, so we convert to numbers with Number().
  const a = Number(num1.value);
  const b = Number(num2.value);

  // Guard against empty boxes.
  if (num1.value === "" || num2.value === "") {
    calcResult.textContent = "Result: please type a number in both boxes.";
    return;
  }

  const total = a + b;
  calcResult.textContent = `Result: ${a} + ${b} = ${total}`;
});


/* ----------------------------------------------------------- */
/*  3. LOAD 10 GITHUB PROFILES (LIVE FROM THE INTERNET!)       */
/*  This is the big one. HTML and CSS can NEVER do this.       */
/*  JavaScript reaches out to GitHub's servers, gets real      */
/*  data back, and builds cards on the fly.                    */
/* ----------------------------------------------------------- */

const githubBtn = document.getElementById("githubBtn");
const githubStatus = document.getElementById("githubStatus");
const profileGrid = document.getElementById("profileGrid");

// "async" lets us wait for the internet to respond.
githubBtn.addEventListener("click", async function () {
  githubStatus.textContent = "Contacting GitHub... ⚡";
  profileGrid.innerHTML = ""; // clear anything from a previous click

  try {
    // Ask GitHub's public API for a list of users.
    const response = await fetch("https://api.github.com/users?per_page=10");

    // If something went wrong (e.g. rate limit), tell the user.
    if (!response.ok) {
      throw new Error("GitHub said no (status " + response.status + ")");
    }

    // Turn the response into usable data (an array of users).
    const users = await response.json();

    // For each user, build a little card and add it to the grid.
    users.forEach(function (user) {
      const card = document.createElement("a");
      card.className = "profile-card";
      card.href = user.html_url;     // link to their real GitHub page
      card.target = "_blank";        // open in a new tab
      card.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        <span class="username">${user.login}</span>
      `;
      profileGrid.appendChild(card);
    });

    githubStatus.textContent = `Loaded ${users.length} real GitHub users. Click any card to visit them.`;

  } catch (error) {
    // The internet can fail. Good code expects that.
    githubStatus.textContent = "Could not load profiles: " + error.message;
  }
});


/* ----------------------------------------------------------- */
/*  4. DARK / LIGHT THEME TOGGLE                               */
/*  Flip a class on the <body>; the CSS does the rest.         */
/* ----------------------------------------------------------- */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  // Swap the icon to match the current mood.
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});
