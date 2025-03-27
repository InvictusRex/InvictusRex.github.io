/*==================== Gallery Database and Dynamic Loading ====================*/
;(() => {
  // Simulating a database with a JSON object
  // In a real application, this would be fetched from a server
  const galleryDatabase = {
    images: [
      {
        id: 1,
        src: "images/gallery/robotics1.jpg",
        caption: "4-Bit Arithmatic Logical Unit",
        category: "robotics",
      },
      {
        id: 2,
        src: "images/gallery/robotics2.jpg",
        caption: "Obstacle Avoiding Bot",
        category: "robotics",
      },
      {
        id: 3,
        src: "images/gallery/robotics3.jpg",
        caption: "F1 Car",
        category: "robotics",
      },
      {
        id: 4,
        src: "images/gallery/robotics4.jpg",
        caption: "Weather Station",
        category: "robotics",
      },
      {
        id: 5,
        src: "images/gallery/robotics5.jpg",
        caption: "Advanced Home Automation System",
        category: "robotics",
      },
      {
        id: 6,
        src: "images/gallery/robotics6.jpg",
        caption: "Object Detection & Display",
        category: "robotics",
      },
      {
        id: 7,
        src: "images/gallery/drone1.jpg",
        caption: "F850 Quadcopter Drone",
        category: "drone",
      },
      {
        id: 8,
        src: "images/gallery/drone2.jpg",
        caption: "Home-Made Quadcopter",
        category: "drone",
      },
      {
        id: 9,
        src: "images/gallery/drone3.jpg",
        caption: "Bi-Copter Drone Testing",
        category: "drone",
      },
      {
        id: 10,
        src: "images/gallery/drone4.jpg",
        caption: "Mono-Copter Drone Testing",
        category: "drone",
      },
      {
        id: 11,
        src: "images/gallery/drone5.jpg",
        caption: "Drone Repair",
        category: "drone",
      },
      {
        id: 12,
        src: "images/gallery/drone6.jpg",
        caption: "Electronic Speed Controller Testing",
        category: "drone",
      },
      {
        id: 13,
        src: "images/gallery/solar1.jpg",
        caption: "REVA - Special Team Expo 01",
        category: "solar",
      },
      {
        id: 14,
        src: "images/gallery/solar2.jpg",
        caption: "REVA - Special Team Expo 02",
        category: "solar",
      },
      {
        id: 15,
        src: "images/gallery/solar3.jpg",
        caption: "REVA - Solar Electric Vehicle",
        category: "solar",
      },
      {
        id: 16,
        src: "images/gallery/solar4.jpg",
        caption: "REVA - Special Team Expo 03",
        category: "solar",
      },
      {
        id: 17,
        src: "images/gallery/solar5.jpg",
        caption: "REVA - Robotica'25",
        category: "solar",
      },
      {
        id: 18,
        src: "images/gallery/solar6.jpg",
        caption: "REVA - Gravitas'24",
        category: "solar",
      },
      {
        id: 19,
        src: "images/gallery/combat1.jpg",
        caption: "Gravitas'24",
        category: "combat",
      },
      {
        id: 20,
        src: "images/gallery/combat2.jpg",
        caption: "RoboWars'24 - Wedge Bot",
        category: "combat",
      },
      {
        id: 21,
        src: "images/gallery/combat3.jpg",
        caption: "RoboWars'24",
        category: "combat",
      },
      {
        id: 22,
        src: "images/gallery/combat4.jpg",
        caption: "Shaastra'25 - RoboSoccer",
        category: "combat",
      },
      {
        id: 23,
        src: "images/gallery/combat5.jpg",
        caption: "REVA - Robotica'25",
        category: "combat",
      },
      {
        id: 24,
        src: "images/gallery/combat6.jpg",
        caption: "Team Cupcake - VIT Vellore",
        category: "combat",
      },
      {
        id: 25,
        src: "images/gallery/events1.jpg",
        caption: "IEEE Conference 2024",
        category: "events",
      },
      {
        id: 26,
        src: "images/gallery/events2.jpg",
        caption: "Robotics Workshop",
        category: "events",
      },
      {
        id: 27,
        src: "images/gallery/events3.jpg",
        caption: "Tech Expo 2024",
        category: "events",
      },
      {
        id: 28,
        src: "images/gallery/events4.jpg",
        caption: "Hackathon Winners",
        category: "events",
      },
      {
        id: 29,
        src: "images/gallery/events5.jpg",
        caption: "Team Building Event",
        category: "events",
      },
      {
        id: 30,
        src: "images/gallery/events6.jpg",
        caption: "Innovation Summit",
        category: "events",
      },
    ],
  }

  const galleryContainer = document.getElementById("gallery-container")
  const filterButtons = document.querySelectorAll(".gallery-filters .filter-btn")
  let currentFilter = "all"
  let galleryItems = []

  // Function to load images from the database
  function loadGalleryImages(filter = "all") {
    // Clear gallery container except for loading spinner
    const loadingSpinner = document.querySelector(".loading-spinner")
    if (loadingSpinner) {
      galleryContainer.innerHTML = ""
      galleryContainer.appendChild(loadingSpinner)
    }

    // Simulate loading delay (would be a real API call in production)
    setTimeout(() => {
      // Filter images based on category
      const filteredImages =
        filter === "all" ? galleryDatabase.images : galleryDatabase.images.filter((img) => img.category === filter)

      // Remove loading spinner
      if (loadingSpinner) {
        galleryContainer.removeChild(loadingSpinner)
      }

      // Add filtered images to gallery
      filteredImages.forEach((img) => {
        const galleryItem = document.createElement("div")
        galleryItem.className = "gallery-item"
        galleryItem.innerHTML = `
                    <img src="${img.src}" alt="${img.caption}" data-id="${img.id}">
                    <h4 class="image-caption">${img.caption}</h4>
                `
        galleryContainer.appendChild(galleryItem)
      })

      // Store gallery items for lightbox
      galleryItems = document.querySelectorAll(".gallery-container .gallery-item")

      // Add click event to gallery items
      galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
          const img = this.querySelector("img")
          const caption = this.querySelector(".image-caption").textContent
          openLightbox(img.src, caption, galleryItems)
        })
      })
    }, 1000) // Simulate 1 second loading time
  }

  // Load all images on page load
  document.addEventListener("DOMContentLoaded", () => {
    loadGalleryImages()
  })

  // Filter gallery items
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")
      currentFilter = filter

      // Load filtered images
      loadGalleryImages(filter)
    })
  })

  // Lightbox functionality for gallery
  const lightbox = document.querySelector(".lightbox")
  const lightboxImg = document.querySelector(".lightbox-img")
  const lightboxCaption = document.querySelector(".caption-text")
  const lightboxCounter = document.querySelector(".caption-counter")
  const prevItem = document.querySelector(".prev-item")
  const nextItem = document.querySelector(".next-item")
  let currentIndex = 0

  function openLightbox(src, caption, items) {
    lightboxImg.src = src
    lightboxCaption.textContent = caption

    // Find current index
    for (let i = 0; i < items.length; i++) {
      if (items[i].querySelector("img").src === src) {
        currentIndex = i
        break
      }
    }

    // Update counter
    lightboxCounter.textContent = `${currentIndex + 1}/${items.length}`

    // Show lightbox
    lightbox.classList.add("open")
    document.body.classList.add("no-scroll")
  }

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", function (e) {
    if (e.target === this) {
      lightbox.classList.remove("open")
      document.body.classList.remove("no-scroll")
    }
  })
})()

