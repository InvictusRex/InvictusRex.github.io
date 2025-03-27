/*==================== Navigation Menu ====================*/
(() => {
  const navToggler = document.querySelector(".nav-toggler");
  const aside = document.querySelector(".aside");
  const mainContent = document.querySelector(".main-content");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll(".section");
  const totalSections = sections.length;

  // Toggle Navigation
  navToggler.addEventListener("click", () => {
    aside.classList.toggle("open");
    navToggler.classList.toggle("open");
    mainContent.classList.toggle("open");
  });

  // Add click event to nav links
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all nav links
      for (let j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove("active");
      }

      // Add active class to clicked nav link
      this.classList.add("active");

      // Get the target section id
      const target = this.getAttribute("href").substring(1);

      // Remove active class from all sections
      for (let k = 0; k < sections.length; k++) {
        sections[k].classList.remove("active");
      }

      // Add active class to target section
      document.getElementById(target).classList.add("active");

      // Close navigation on mobile
      if (window.innerWidth < 1200) {
        aside.classList.remove("open");
        navToggler.classList.remove("open");
        mainContent.classList.remove("open");
      }
    });
  }

  // Typing Animation
  const typed = document.querySelector(".typing");
  if (typed) {
    const strings = [
      "Robotics Enthusiast",
      "UAV Specialist",
      "Combat Robotics Engineer",
      "Machine Learning Developer",
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;

    function type() {
      const currentString = strings[stringIndex];

      if (isDeleting) {
        // Remove a character
        typed.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
      } else {
        // Add a character
        typed.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
      }

      // If word is complete
      if (!isDeleting && charIndex === currentString.length) {
        // Pause at end
        typingDelay = newTextDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        stringIndex = (stringIndex + 1) % strings.length;
      }

      setTimeout(type, typingDelay);
    }

    // Start typing animation
    setTimeout(type, newTextDelay);
  }

  // Portfolio Item Details Popup
  const portfolioItems = document.querySelectorAll(".view-details");
  const portfolioPopup = document.querySelector(".portfolio-popup");
  const portfolioClose = document.querySelector(".pp-close");
  const portfolioTitle = document.querySelector(".pp-header h3");
  const portfolioDescription = document.querySelector(
    ".pp-body .description p"
  );
  const portfolioThumbnail = document.querySelector(".pp-thumbnail img");
  const portfolioGallery = document.querySelector(".pp-gallery");

  // Portfolio data
  const portfolioData = {
    robotics: {
      title: "F850 Quadcopter",
      description:
        "The F850 Quadcopter is a high-performance UAV designed for industrial applications, capable of carrying up to 10 kg of payload with a 30–40 minute flight time. Built with a carbon fiber frame and high-thrust brushless motors, it ensures durability, stability, and efficiency. Equipped with GPS, LiDAR, and optical flow sensors, it offers precise autonomous navigation and obstacle avoidance. Its modular design allows for payload customization, supporting aerial mapping, industrial inspections, logistics, and search & rescue missions. With failsafe mechanisms like redundant power systems and emergency landing protocols, the F850 is engineered for reliability and adaptability in critical operations.",
      thumbnail: "images/17.jpg",
      gallery: [
        {
          src: "images/11.jpg",
          caption: "F850 Quadcopter Drone",
        },
        {
          src: "images/17.jpg",
        },
      ],
    },
    drone: {
      title: "Drone Technology",
      description:
        "I specialize in UAV (Unmanned Aerial Vehicle) technology, focusing on the design, construction, and testing of various drone configurations. My work includes quadcopters, bi-copters, and mono-copters, with a strong emphasis on flight control systems, electronic speed controllers, and power management for optimal performance.",
      thumbnail: "images/portfolio/drone.jpg",
      gallery: [
        {
          src: "images/portfolio/drone/1.jpg",
          caption: "F850 Quadcopter Drone",
        },
        {
          src: "images/portfolio/drone/2.jpg",
          caption: "Home-Made Quadcopter",
        },
        {
          src: "images/portfolio/drone/3.jpg",
          caption: "Bi-Copter Drone Testing",
        },
        {
          src: "images/portfolio/drone/4.jpg",
          caption: "Mono-Copter Drone Testing",
        },
        { src: "images/portfolio/drone/5.jpg", caption: "Drone Repair" },
        {
          src: "images/portfolio/drone/6.jpg",
          caption: "Electronic Speed Controller Testing",
        },
      ],
    },
    ml: {
      title: "Machine Learning",
      description:
        "My work in machine learning focuses on computer vision and data analysis applications. I've implemented various neural network architectures for tasks such as object detection, image classification, and pattern recognition. My projects include YOLO-based mobile phone detection and CNN models for medical image analysis.",
      thumbnail: "images/portfolio/ml.jpg",
      gallery: [
        {
          src: "images/portfolio/ml/1.jpg",
          caption: "YOLO - Mobile Phone Detection",
        },
        {
          src: "images/portfolio/ml/2.jpg",
          caption: "CNN - Breast Cancer Detection",
        },
        {
          src: "images/portfolio/ml/3.jpg",
          caption: "CNN - Fine Tuning ResNet50",
        },
        {
          src: "images/portfolio/ml/4.jpg",
          caption: "Data Visualization Project",
        },
        {
          src: "images/portfolio/ml/5.jpg",
          caption: "Natural Language Processing",
        },
        {
          src: "images/portfolio/ml/6.jpg",
          caption: "Reinforcement Learning Demo",
        },
      ],
    },
    solar: {
      title: "Solar Electric Vehicle",
      description:
        "As the Co-Founder and Electrical Lead of Team REVA, I've been instrumental in developing solar-powered electric vehicles. My responsibilities include designing the electrical systems, battery management, and solar panel integration. Our team has participated in various exhibitions and competitions, showcasing our sustainable transportation solutions.",
      thumbnail: "images/portfolio/solar.jpg",
      gallery: [
        {
          src: "images/portfolio/solar/1.jpg",
          caption: "REVA - Special Team Expo 01",
        },
        {
          src: "images/portfolio/solar/2.jpg",
          caption: "REVA - Special Team Expo 02",
        },
        {
          src: "images/portfolio/solar/3.jpg",
          caption: "REVA - Solar Electric Vehicle",
        },
        {
          src: "images/portfolio/solar/4.jpg",
          caption: "REVA - Special Team Expo 03",
        },
        { src: "images/portfolio/solar/5.jpg", caption: "REVA - Robotica'25" },
        { src: "images/portfolio/solar/6.jpg", caption: "REVA - Gravitas'24" },
      ],
    },
    combat: {
      title: "Combat Robotics",
      description:
        "My passion for combat robotics has led me to design and build competitive robots for various tournaments. I specialize in wedge bots and other combat robot configurations, focusing on robust mechanical design, powerful drive systems, and effective weapon mechanisms. I've participated in events like RoboWars'24 and Shaastra'25.",
      thumbnail: "images/portfolio/combat.jpg",
      gallery: [
        { src: "images/portfolio/combat/1.jpg", caption: "Gravitas'24" },
        {
          src: "images/portfolio/combat/2.jpg",
          caption: "RoboWars'24 - Wedge Bot",
        },
        { src: "images/portfolio/combat/3.jpg", caption: "RoboWars'24" },
        {
          src: "images/portfolio/combat/4.jpg",
          caption: "Shaastra'25 - RoboSoccer",
        },
        { src: "images/portfolio/combat/5.jpg", caption: "REVA - Robotica'25" },
        {
          src: "images/portfolio/combat/6.jpg",
          caption: "Team Cupcake - VIT Vellore",
        },
      ],
    },
    web: {
      title: "Web Development",
      description:
        "I create responsive and dynamic websites using modern web technologies. My web development projects include portfolio websites, habit tracking applications, and organizational websites. I'm proficient in HTML, CSS, JavaScript, and various frameworks, with a focus on creating intuitive user interfaces and seamless user experiences.",
      thumbnail: "images/portfolio/web.jpg",
      gallery: [
        { src: "images/portfolio/web/1.jpg", caption: "Portfolio Website" },
        {
          src: "images/portfolio/web/2.jpg",
          caption: "Habitua: Journey Tracker",
        },
        { src: "images/portfolio/web/3.jpg", caption: "Robotics Club Website" },
        { src: "images/portfolio/web/4.jpg", caption: "Login Page for Portal" },
        { src: "images/portfolio/web/5.jpg", caption: "Resume Website" },
        { src: "images/portfolio/web/6.jpg", caption: "Arch Linux Rice" },
      ],
    },
  };

  // Open portfolio popup
  portfolioItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.getAttribute("data-id");
      const data = portfolioData[id];

      // Set popup content
      portfolioTitle.textContent = data.title;
      portfolioDescription.textContent = data.description;
      portfolioThumbnail.src = data.thumbnail;

      // Clear previous gallery
      portfolioGallery.innerHTML = "";

      // Add gallery items
      data.gallery.forEach((img) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        galleryItem.innerHTML = `<img src="${img.src}" alt="${img.caption}" data-caption="${img.caption}">`;
        portfolioGallery.appendChild(galleryItem);
      });

      // Add click event to gallery items
      const galleryItems = portfolioGallery.querySelectorAll(".gallery-item");
      galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
          const img = this.querySelector("img");
          openLightbox(img.src, img.getAttribute("data-caption"), galleryItems);
        });
      });

      // Open popup
      portfolioPopup.classList.add("open");
      document.body.classList.add("no-scroll");
    });
  });

  // Close portfolio popup
  portfolioClose.addEventListener("click", () => {
    portfolioPopup.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });

  // Lightbox functionality
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxCaption = document.querySelector(".caption-text");
  const lightboxCounter = document.querySelector(".caption-counter");
  const prevItem = document.querySelector(".prev-item");
  const nextItem = document.querySelector(".next-item");
  let currentIndex = 0;
  let galleryImages = [];

  function openLightbox(src, caption, items) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;

    // Store all gallery items for navigation
    galleryImages = items;

    // Find current index
    for (let i = 0; i < galleryImages.length; i++) {
      if (galleryImages[i].querySelector("img").src === src) {
        currentIndex = i;
        break;
      }
    }

    // Update counter
    lightboxCounter.textContent = `${currentIndex + 1}/${galleryImages.length}`;

    // Show lightbox
    lightbox.classList.add("open");
  }

  // Close lightbox
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("open");
  });

  // Navigate to previous image
  prevItem.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.getAttribute("data-caption");
    lightboxCounter.textContent = `${currentIndex + 1}/${galleryImages.length}`;
  });

  // Navigate to next image
  nextItem.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    const img = galleryImages[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.getAttribute("data-caption");
    lightboxCounter.textContent = `${currentIndex + 1}/${galleryImages.length}`;
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  const toastNotification = document.querySelector(".toast-notification");
  const toastProgress = document.querySelector(".toast-notification .progress");
  const toastClose = document.querySelector(".toast-notification .close");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      try {
        // Send data to backend
        const response = await fetch("http://localhost:15000/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const result = await response.json();

        if (response.ok) {
          // Reset form
          contactForm.reset();

          // Show success notification
          toastNotification.classList.add("active");
          toastProgress.classList.add("active");

          // Hide notification after 5 seconds
          setTimeout(() => {
            toastNotification.classList.remove("active");
            toastProgress.classList.remove("active");
          }, 5000);
        } else {
          console.error("Server error:", result);
          alert("Failed to send message.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to send message.");
      }
    });
  }

  // Close toast notification
  if (toastClose) {
    toastClose.addEventListener("click", () => {
      toastNotification.classList.remove("active");
      setTimeout(() => {
        toastProgress.classList.remove("active");
      }, 300);
    });
  }

  // Download CV
  const downloadCV = document.getElementById("download-cv");
  if (downloadCV) {
    downloadCV.addEventListener("click", (e) => {
      e.preventDefault();
      // In a real application, this would download the CV file
      alert("CV download functionality would be implemented here.");
    });
  }

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });
})();
