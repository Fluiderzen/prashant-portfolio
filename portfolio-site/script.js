const projects = {
  dustbin: {
    type: "Product Development",
    title: "Smart Compressible Waste Management System",
    image: "assets/portfolio-page-02.png",
    challenge: "Public bins overflow before scheduled collection cycles, causing odour, unhygienic surroundings, disease risk, and no real-time visibility for authorities.",
    approach: "A scissor-lift compression mechanism was paired with Arduino-based sensing, GSM alerts, GPS location, solar power, and fire detection for a compact, locally manufacturable solution.",
    outcome: "The prototype concept increased effective capacity, sent fill-level and location data to a mobile dashboard, and showed strong commercial viability for Indian manufacturing costs.",
    tools: "SolidWorks, Arduino, Proteus, GSM, GPS, Blynk IoT"
  },
  gearbox: {
    type: "Mechanical Assembly",
    title: "Compact Multi-Stage Helical Gearbox",
    image: "assets/portfolio-page-03.png",
    challenge: "Industrial applications needed higher torque output and smooth transmission inside a limited installation space.",
    approach: "Designed staged helical gears, shafts, bearings, and housing as a complete integrated assembly with compact layout and manufacturability in mind.",
    outcome: "Improved torque multiplication, reduced vibration and noise through helical gearing, and delivered a production-ready transmission concept.",
    tools: "SolidWorks, Gear Design, Mechanical Design, DFM"
  },
  cad: {
    type: "CAD Modeling",
    title: "3D CAD Models & Product Concepts",
    image: "assets/portfolio-page-06.png",
    challenge: "Clients and teams need clean 3D models that communicate form, structure, and intent without messy geometry.",
    approach: "Built parametric CAD models, product forms, assemblies, and surface modeling outputs with attention to feature structure and presentation.",
    outcome: "Created portfolio-ready mechanical and product concepts suitable for review, modification, rendering, and documentation.",
    tools: "SolidWorks, Creo, Inventor, Fusion 360, KeyShot"
  },
  drawings: {
    type: "Documentation",
    title: "2D Drafting & Technical Drawings",
    image: "assets/portfolio-page-05.png",
    challenge: "Manufacturing and vendor communication breaks down when drawings lack clarity, dimensions, or clean conversion from rough references.",
    approach: "Prepared 2D drafting work, drawing conversions, manufacturing-ready sheets, detailing, and structured technical documentation.",
    outcome: "Delivered clearer production communication for CAD handoff, vendor review, and engineering documentation workflows.",
    tools: "AutoCAD, SolidWorks, Creo, Inventor, Excel"
  }
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const progress = document.getElementById("progress");
const navLinks = [...document.querySelectorAll(".nav a")];

function updateScrollState() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${docHeight ? (scrollTop / docHeight) * 100 : 0}%`;

  const current = [...document.querySelectorAll("section[id]")].reverse().find((section) => {
    return section.offsetTop <= scrollTop + 160;
  });
  navLinks.forEach((link) => link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`));
}

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      value = Math.min(target, value + step);
      el.textContent = `${value}+`;
      if (value >= target) clearInterval(timer);
    }, 24);
    counterObserver.unobserve(el);
  });
}, { threshold: 1 });

counters.forEach((counter) => counterObserver.observe(counter));

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalChallenge = document.getElementById("modalChallenge");
const modalApproach = document.getElementById("modalApproach");
const modalOutcome = document.getElementById("modalOutcome");
const modalTools = document.getElementById("modalTools");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const project = projects[card.dataset.project];
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalType.textContent = project.type;
    modalTitle.textContent = project.title;
    modalChallenge.textContent = project.challenge;
    modalApproach.textContent = project.approach;
    modalOutcome.textContent = project.outcome;
    modalTools.textContent = project.tools;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});
