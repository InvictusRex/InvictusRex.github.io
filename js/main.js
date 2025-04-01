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
    f850: {
      title: "F850 Quadcopter",
      description:
        "The F850 Quadcopter is a high-performance UAV designed for industrial applications, capable of carrying up to 10 kg of payload with a 30–40 minute flight time. Built with a carbon fiber frame and high-thrust brushless motors, it ensures durability, stability, and efficiency. Equipped with GPS, LiDAR, and optical flow sensors, it offers precise autonomous navigation and obstacle avoidance. Its modular design allows for payload customization, supporting aerial mapping, industrial inspections, logistics, and search & rescue missions. With failsafe mechanisms like redundant power systems and emergency landing protocols, the F850 is engineered for reliability and adaptability in critical operations.",
      thumbnail: "images/17.jpg",
      gallery: [
        {
          src: "images/project/1.jpg",
          caption: "In-Flight Testing",
        },
        {
          src: "images/17.jpg",
          caption: "F850 Quadcopter Drone",
        },
        {
          src: "images/project/2.jpg",
          caption: "Custom FC Testing",
        },
      ],
    },
    home: {
      title: "Home-Made Quadcopter",
      description:
        "This home-made quadcopter was built using off-the-shelf components and a custom-designed frame. It features a flight controller with GPS and barometer sensors for autonomous flight, and a 2.4 GHz radio transmitter for manual control. The quadcopter is powered by a 3S LiPo battery and equipped with brushless motors and electronic speed controllers for efficient propulsion. The frame is constructed from lightweight materials like cardboard and plywood, ensuring durability and agility during flight. The quadcopter is suitable for recreational flying, and educational purposes.",
      thumbnail: "images/project/3.jpg",
      gallery: [
        {
          src: "images/18.jpg",
          caption: "Cardboard Drone Frame",
        },
        {
          src: "images/project/4.jpg",
          caption: "3D Printed Drone Frame",
        },
        {
          src: "images/project/5.jpg",
          caption: "Plywoord Drone Frame",
        },
        {
          src: "images/project/6.jpg",
          caption: "PVC Pipe Drone Frame",
        },
        { src: "images/project/7.jpg", caption: "Aluminium Drone Frame" },
      ],
    },
    esc: {
      title: "ESC Testing",
      description:
        "Electronic Speed Controllers (ESCs) are essential components in drone propulsion systems, regulating the speed of brushless motors. This project involved testing and calibrating ESCs for optimal performance and reliability. The ESCs were connected to a microcontroller and power supply, and their response to throttle inputs was analyzed. The project also included programming the ESCs for different flight modes, such as stabilization, acrobatics, and autonomous flight. The ESCs were tested for efficiency, heat dissipation, and compatibility with various motors and propellers.",
      thumbnail: "images/project/9.jpg",
      gallery: [
        {
          src: "images/22.jpg",
          caption: "SimonK 30A ESC Testing",
        },
        {
          src: "images/project/8.jpg",
          caption: "ESC Circuitry",
        },
        {
          src: "images/project/10.jpg",
          caption: "Advanced ESC Designing",
        },
      ],
    },
    coaxial: {
      title: "Co-Axial Drone Testing",
      description:
        "Co-Axial Drones are a type of multirotor UAV with two sets of counter-rotating propellers on the same axis. This configuration provides increased stability, lift, and payload capacity compared to conventional drones. The project involved designing and testing a co-axial drone prototype for industrial applications. The drone was equipped with a custom flight controller, GPS, and LiDAR sensors for autonomous navigation. It was tested for flight performance, stability, and obstacle avoidance in various environments. The co-axial drone demonstrated superior flight characteristics and payload capacity, making it suitable for aerial mapping, surveillance, and cargo delivery.",
      thumbnail: "images/20.jpg",
      gallery: [
        {
          src: "images/project/11.jpg",
          caption: "Co-Axial Octacopter Testing",
        },
        {
          src: "images/20.jpg",
          caption: "Single-Rotor Co-Axial Drone Testing",
        },
        {
          src: "images/project/12.jpg",
          caption: "Co-Axial Drone Schematics",
        },
      ],
    },
    swarm: {
      title: "Swarm FPV Drones",
      description:
        "Swarm FPV Drones are a group of small, agile quadcopters equipped with First-Person View (FPV) cameras for racing and acrobatics. The drones are controlled remotely using radio transmitters and FPV goggles, providing an immersive flying experience. The project involved building and racing a swarm of FPV drones in indoor and outdoor environments. The drones were customized with LED lights, propeller guards, and custom frames for durability and visibility. The swarm was tested for speed, agility, and coordination in racing circuits and obstacle courses. The FPV drones demonstrated high performance and maneuverability, making them ideal for competitive drone racing.",
      thumbnail: "images/project/14.jpg",
      gallery: [
        { src: "images/project/13.jpg", caption: "Homogeneous Drone Swarm" },
        {
          src: "images/42.jpg",
          caption: "Heterogeneous Drone Swarm",
        },
        { src: "images/project/15.jpg", caption: "Formation Flight" },
      ],
    },
    mobile: {
      title: "YOLO - Mobile Phone Detection",
      description:
        "YOLO (You Only Look Once) is a real-time object detection system that uses deep learning algorithms to identify objects in images and videos. The project involved training a YOLO model to detect mobile phones in live camera feeds. The model was trained on a dataset of mobile phone images and annotated with bounding boxes. The YOLO model was optimized for speed and accuracy, achieving real-time detection on mobile devices. The system was tested for mobile phone detection in various scenarios, such as indoor environments, crowds, and low-light conditions. The YOLO model demonstrated high detection rates and low latency, making it suitable for security, surveillance, and augmented reality applications.",
      thumbnail: "images/29.jpg",
      gallery: [
        { src: "images/project/16.jpg", caption: "Confidence Annotations" },
        {
          src: "images/29.jpg",
          caption: "Classes Annotations",
        },
        {
          src: "images/project/17.jpg",
          caption: "Evaluation Metrics & Graphs",
        },
      ],
    },
    fall: {
      title: "Real-Time Fall Detection",
      description:
        "Fall detection is a critical task in healthcare and security applications, aimed at identifying and alerting authorities about individuals who have fallen or collapsed. This project involved developing a real-time fall detection system using mediapose, openpose, and yolopose. The system used pose estimation algorithms to track human body keypoints and detect abnormal movements indicative of a fall. The system was trained on a dataset of fall and non-fall videos, annotated with keypoint coordinates and fall labels. The fall detection system was optimized for speed and accuracy, achieving real-time detection on live camera feeds. The system was tested for fall detection in various scenarios, such as indoor environments, crowds, and low-light conditions. The system demonstrated high detection rates and low latency, making it suitable for healthcare, security, and surveillance applications.",
      thumbnail: "images/project/18.jpg",
      gallery: [
        { src: "images/project/19.jpg", caption: "Bounding Box Approach" },
        {
          src: "images/project/20.jpg",
          caption: "MediaPipe Pose Estimation",
        },
        {
          src: "images/project/21.jpg",
          caption: "Confidence Metrics Approach",
        },
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
  (() => {
    // ... existing code ...

    // Add smooth scrolling for hire me buttons
    const hireMeButtons = document.querySelectorAll(".hire-me");

    hireMeButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the target section id from href attribute
        const target = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(target);

        if (targetSection) {
          // Remove active class from all sections
          sections.forEach((section) => section.classList.remove("active"));

          // Add active class to target section
          targetSection.classList.add("active");

          // Smooth scroll to the section
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update nav menu active state
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${target}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });

          // Close navigation on mobile
          if (window.innerWidth < 1200) {
            aside.classList.remove("open");
            navToggler.classList.remove("open");
            mainContent.classList.remove("open");
          }
        }
      });
    });

    // ... rest of your existing code ...
  })();
  // Download CV
  const downloadCV = document.getElementById("download-cv");
  if (downloadCV) {
    downloadCV.addEventListener("click", (e) => {
      e.preventDefault();

      const link = document.createElement("a");
      // Using relative path since CV is in the same folder
      link.href = "js/InvictusRex_CV.pdf";
      // Using your username for the download filename
      link.download = "InvictusRex_CV.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
