const projects = [
  {
    title: "WebbApp Dashboard",
    body: "Here I have build an interactive dashboard for a web application using advanced web techniques including SVG graphics and JavaScript programming.",
    image: "images/projects/project7.png",
    url: "projects/7",
  },
  {
    title: "Awesome Startup Employee",
    body: "I successfully designed and implemented a dynamic employee directory using HTML, CSS, and JavaScript, with data sourced from a RESTful API. This project showcases my proficiency in front-end technologies and data integration.",
    image: "images/projects/project8.png",
    url: "projects/8",
  },
  {
    title: "Game Show App",
    body: "I crafted an engaging 'Wheel of Success' word guessing game using HTML, CSS, and JavaScript. This project showcases my proficiency in front-end web technologies, illustrating my ability to create interactive and entertaining user experiences.",
    image: "images/projects/project6.png",
    url: "projects/6",
  },
  {
    title: "An Interactive Photo Gallery",
    body: "I implemented an engaging interactive photo gallery using HTML, CSS, and JavaScript, featuring robust search capabilities.",
    image: "images/projects/project5.png",
    url: "projects/5",
  },
  {
    title: "Web Style Guide",
    body: "I undertook a project to sharpen my Sass skills, a potent CSS preprocessor. Through this initiative, I mastered Sass features, creating modular and organized styles for enhanced code efficiency. Leveraging variables, mixins, and nested rules, I improved code readability and developed dynamic, responsive designs.",
    image: "images/projects/project4.png",
    url: "projects/4",
  },
  {
    title: "An Online Registration Form",
    body: "In an early project, I gained hands-on experience with web forms by creating an online registration form. This initiative allowed me to grasp the fundamentals of form design, user input validation, and submission handling. Through this practical application, I developed a foundational understanding of implementing web forms for user interaction.",
    image: "images/projects/project3.png",
    url: "projects/3",
  },
];

const gridContainer = document.querySelector("#projects");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

displayProjects(projects);

function displayProjects(projects) {
  // store the employee HTML as we create it
  let projectHTML = "";
  // loop through each employee and create HTML markup
  projects.forEach((project, index) => {
    // template literals make this so much cleaner!
    projectHTML += `
        <div class="card" data-index="${index}">
            <img class="Projects" src="${project.image}" />
            <h4>${project.title}</h4>
            <p>${project.body}</p>
        </div>
    `;
  });
  gridContainer.innerHTML = projectHTML;
}

function displayModal(index) {
  // use object destructuring make our template literal cleaner
  let { title, body, image, url } = projects[index];
  const modalHTML = `
        <img class="screenshot" src="${image}" />
        <div class="text-container">
          <h2 class="name">${title}</h2>
          <p class="email">${body}</p>
          <hr />
          <a href="${url}" target="_blank">Open</p>
        </div>
    `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;

  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const htmlBody = document.body;
  htmlBody.style.position = "fixed";
  htmlBody.style.top = `-${scrollY}`;
}

gridContainer.addEventListener("click", (e) => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = "";
  body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
});

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});
