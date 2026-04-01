export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  year: string;
  highlights: string[];
  githubUrl?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface GalleryImage {
  src: string;
}

export const categories = [
  "All",
  "Drones & Robotics",
  "Computer Vision",
  "Machine Learning",
  "Development",
] as const;

export const defaultDisplayProjects = [0, 1, 5, 6, 10, 7]; // Indices for projects 1, 2, 6, 7, 11, 8
export const hiddenDisplayProjects = [3, 2, 4, 8, 9, 11]; // Indices for projects 4, 3, 5, 9, 10, 12

export const projects: Project[] = [
  {
    id: "sentinel",
    title: "Sentinel Blue",
    category: "Computer Vision",
    description:
      "Edge-deployed deep learning system for autonomous maritime search and rescue with real-time RGB and thermal fusion.",
    longDescription:
      "Sentinel Blue is an edge-deployed computer vision pipeline for autonomous maritime search and rescue. It fuses RGB and thermal feeds onboard a UAV to improve detection reliability in glare, low-light, and high-reflection sea conditions. The system is optimized for low-latency inference to identify distressed individuals and watercraft during live missions.",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "TensorRT",
      "CUDA",
      "Jetson",
      "ROS 2",
      "YOLO",
    ],
    image: "/images/projects/SentinelBlue.jpg",
    year: "2026",
    highlights: [
      "Real-time RGB and thermal fusion onboard UAV",
      "Robust maritime detection in challenging visibility",
      "Edge-optimized inference for low-latency SAR response",
      "Autonomous search-and-rescue mission support",
    ],
    githubUrl: "https://github.com/InvictusRex/sentinel-blue",
  },
  {
    id: "recon",
    title: "Drone Based Reconnaissance of Military Assets",
    category: "Computer Vision",
    description:
      "UAV edge-deployable vision model for real-time detection and surveillance of military and civilian targets.",
    longDescription:
      "A UAV-based edge AI reconnaissance system for detecting military assets such as tanks, armored vehicles, and personnel, while also identifying civilian vehicles and people. Models are trained on curated and augmented aerial datasets to improve robustness and real-time performance in dynamic field conditions.",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "TensorRT",
      "Jetson",
      "YOLO",
      "CUDA",
      "ROS 2",
    ],
    image: "/images/projects/Recon2.jpg",
    year: "2025",
    highlights: [
      "Detection of tanks, armored vehicles, and personnel",
      "Supports military and civilian class monitoring",
      "Trained on augmented aerial datasets",
      "Edge-ready deployment for live reconnaissance",
    ],
    githubUrl: "https://github.com/InvictusRex/drone-recon",
  },
  {
    id: "msar",
    title: "Autonomous Drone MSAR",
    category: "Computer Vision",
    description:
      "Autonomous UAV maritime SAR with real-time swimmer detection and precision life buoy deployment.",
    longDescription:
      "Autonomous Drone MSAR combines onboard YOLOv8/YOLOv11 detection, temporal tracking, and precision drop logic for maritime rescue. It integrates GPS/IMU navigation with edge-optimized models on Jetson/Raspberry Pi-class hardware. Training on augmented SeaDronesSee data emphasizes high recall and low-latency inference in open-sea conditions.",
    technologies: [
      "Python",
      "YOLO",
      "OpenCV",
      "Jetson",
      "ROS 2",
      "TensorRT",
      "ArduPilot",
      "PX4",
    ],
    image: "/images/projects/MSAR.jpg",
    year: "2026",
    highlights: [
      "Real-time swimmer detection on UAV edge hardware",
      "Precision life buoy deployment workflow",
      "GPS/IMU navigation with temporal tracking",
      "High-recall maritime detection with low-latency inference",
    ],
    githubUrl: "https://github.com/InvictusRex/autonomous-msar",
  },
  {
    id: "fall-watch",
    title: "Industry Safety through Fall Detection using Pose Estimation",
    category: "Computer Vision",
    description:
      "Hybrid edge AI system for fall detection, phone-usage monitoring, and unsafe behavior analysis in industrial floors.",
    longDescription:
      "A hybrid AI safety pipeline that combines YOLOv8 object understanding with pose-based behavior analysis to detect falls, phone usage, and other unsafe worker actions in real time. The system is designed for practical edge deployment, including Raspberry Pi-class devices, for continuous on-site safety monitoring.",
    technologies: [
      "Python",
      "YOLO",
      "OpenCV",
      "PyTorch",
      "TensorRT",
      "Linux",
      "Docker",
      "Git",
    ],
    image: "/images/projects/Pose.jpg",
    year: "2025",
    highlights: [
      "Real-time fall and unsafe behavior detection",
      "Hybrid YOLOv8 + pose-estimation architecture",
      "Phone usage monitoring in active work zones",
      "Edge deployment on Raspberry Pi-class hardware",
    ],
    githubUrl: "https://github.com/InvictusRex/fall-watch",
  },
  {
    id: "defect-scan",
    title: "Multimodal Crack and Fatigue Detection in Concrete",
    category: "Machine Learning",
    description:
      "Multimodal deep learning framework combining visual and acoustic sensing for structural anomaly detection.",
    longDescription:
      "This project implements a multimodal structural anomaly detection pipeline that fuses visual inspection signals with acoustic analysis. It demonstrates how heterogeneous sensing can be integrated into a unified model to improve reliability beyond single-modality approaches for crack and fatigue identification in concrete structures.",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "CUDA",
      "TensorRT",
      "MATLAB",
      "Simulink",
      "Git",
    ],
    image: "/images/projects/Defect.jpg",
    year: "2025",
    highlights: [
      "Visual + acoustic multimodal fusion pipeline",
      "Higher reliability than single-modality models",
      "Concrete crack and fatigue-focused anomaly detection",
      "Unified end-to-end structural health framework",
    ],
    githubUrl: "https://github.com/InvictusRex/defect-scan",
  },
  {
    id: "medscan",
    title: "Breast Cancer Detection",
    category: "Machine Learning",
    description:
      "Comparative study of supervised and self-supervised deep learning methods on histopathology images.",
    longDescription:
      "Comparative study of supervised (CNN and transfer learning) and self-supervised (SimCLR + ResNet18) methods for histopathological breast cancer diagnosis. The project evaluates representation quality, downstream performance, and generalization under different training regimes for medical imaging workflows.",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "CUDA",
      "TensorRT",
      "Docker",
      "Linux",
      "Git",
    ],
    image: "/images/projects/Breast.jpg",
    year: "2024",
    highlights: [
      "Supervised vs self-supervised performance comparison",
      "SimCLR + ResNet18 representation-learning workflow",
      "Histopathology-focused deep learning evaluation",
      "Transfer-learning benchmarks for diagnosis",
    ],
    githubUrl: "https://github.com/InvictusRex/medscan",
  },
  {
    id: "smart-home",
    title: "Advanced home automation",
    category: "Drones & Robotics",
    description:
      "Advanced home automation system combining gesture control, speech recognition, and mobile app interface for seamless touchless smart home experience.",
    longDescription:
      "Smart Home is an advanced automation system that combines real-time Gesture Control, Speech Recognition, and a Mobile App Interface to provide a seamless, touchless smart home experience. Users can control home appliances like lights and fans using hand gestures, voice commands, or a remote mobile app developed using MIT App Inventor. The system is designed for convenience, accessibility, and hygiene.",
    technologies: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Speech Recognition",
      "MIT App Inventor",
      "Arduino",
      "IoT",
      "Java",
    ],
    image: "/images/projects/Home.jpg",
    year: "2025",
    highlights: [
      "Real-time gesture control with MediaPipe",
      "Voice command recognition and processing",
      "Mobile app interface via MIT App Inventor",
      "Touchless appliance control system",
    ],
    githubUrl: "https://github.com/InvictusRex/smart-home-control",
  },
  {
    id: "crop-guard",
    title: "UAV-Assisted-Agricultural-Pest-Surveillance",
    category: "Computer Vision",
    description:
      "Deep learning-powered system for detecting and monitoring crop pests using aerial imagery captured by drones with YOLO-based object detection.",
    longDescription:
      "UAV-Assisted Agricultural Pest Surveillance is a deep learning–powered system for detecting and monitoring crop pests using aerial imagery captured by drones. Leveraging YOLO-based object detection, it enables day and night pest surveillance to support precision agriculture and reduce crop losses.",
    technologies: [
      "Python",
      "YOLO",
      "PyTorch",
      "OpenCV",
      "TensorRT",
      "CUDA",
      "ROS 2",
      "Jetson",
    ],
    image: "/images/projects/Insects.jpg",
    year: "2026",
    highlights: [
      "YOLO-based real-time pest detection from UAV",
      "Day and night surveillance capability",
      "Precision agriculture crop monitoring",
      "Automated pest tracking and alerts",
    ],
    githubUrl: "https://github.com/InvictusRex/crop-guard",
  },
  {
    id: "flight-control",
    title: "Arduino Flight Controller for Drones",
    category: "Drones & Robotics",
    description:
      "Arduino-based flight controller for quadcopter drones with PID tuning, vibration analysis, and WiFi-based user interface.",
    longDescription:
      "This repository provides the source code and instructions for building an Arduino-based flight controller for quadcopter drones. The system utilizes the Arduino Uno to manage flight dynamics, Electronic Speed Controllers (ESCs), gyro calibration, and real-time flight control. It supports PID tuning, vibration analysis, and a WiFi-based user interface. With this setup, hobbyists and developers can create a robust quadcopter platform for experimentation and learning.",
    technologies: [
      "C++",
      "Arduino",
      "ESC Control",
      "PID Tuning",
      "WiFi Module",
      "IMU",
      "Embedded Systems",
      "Git",
    ],
    image: "/images/projects/FC.jpg",
    year: "2025",
    highlights: [
      "Complete Arduino Uno flight controller implementation",
      "Real-time ESC and gyro management",
      "Advanced PID tuning and vibration analysis",
      "WiFi-based flight interface and monitoring",
    ],
    githubUrl: "https://github.com/InvictusRex/flight-controller",
  },
  {
    id: "curanet",
    title: "Curanet",
    category: "Development",
    description:
      "Full-stack healthcare management system for streamlined hospital operations with real-time resource monitoring and seamless service coordination.",
    longDescription:
      "CuraNet HMS is a modern, full-stack healthcare management system designed to streamline hospital operations and enhance patient care coordination. The system provides real-time monitoring of hospital resources and seamless management of healthcare services. Built with pure HTML, CSS, and JavaScript, it provides an intuitive interface for managing healthcare services without external dependencies.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Frontend",
      "Database",
      "Healthcare",
      "Management System",
      "Git",
    ],
    image: "/images/projects/Curanet.jpg",
    year: "2024",
    highlights: [
      "Pure HTML/CSS/JavaScript implementation",
      "Real-time hospital resource monitoring",
      "Seamless healthcare service management",
      "No external dependencies required",
    ],
    githubUrl: "https://github.com/InvictusRex/curanet-hms",
  },
  {
    id: "spinner",
    title: "8Kg Verticle Spinner Battlebot",
    category: "Drones & Robotics",
    description:
      "Competitive 8kg vertical spinner battlebot with high-speed rotating disc weapon and advanced stabilization controls.",
    longDescription:
      "A competitive vertical spinner battlebot weighing 8kg, featuring a high-speed rotating disc weapon. Built with custom-designed brushless motor systems, reinforced frame, and advanced stabilization controls. This battlebot competed in various combat robotics competitions, demonstrating robust engineering and strategic combat tactics.",
    technologies: [
      "C++",
      "ROS 2",
      "Python",
      "Arduino",
      "Brushless Motors",
      "Custom Electronics",
      "Mechanical Design",
      "Embedded Systems",
    ],
    image: "/images/projects/Spinner.jpg",
    year: "2024",
    highlights: [
      "High-speed rotating disc weapon system",
      "Custom brushless motor integration",
      "Reinforced combat-rated frame",
      "Advanced stabilization and control systems",
    ],
    githubUrl: "https://github.com/InvictusRex/spinner-battlebot",
  },
  {
    id: "wedge",
    title: "8kg Wedge Battlebot",
    category: "Drones & Robotics",
    description:
      "Competitive 8kg wedge-style battlebot with low-profile sloped frame designed for aggressive pushing and flipping tactics.",
    longDescription:
      "An 8kg competitive wedge-style battlebot with a low-profile sloped frame designed for aggressive pushing and flipping tactics. Features reinforced wedge geometry, dual-motor drive system, and composite armor. Built for combat robotics competitions with a focus on leverage-based attack strategies.",
    technologies: [
      "C++",
      "Arduino",
      "Python",
      "Composite Materials",
      "Dual Motor Drive",
      "Mechanical Design",
      "Combat Strategy",
      "Embedded Systems",
    ],
    image: "/images/projects/Wedge.jpg",
    year: "2024",
    highlights: [
      "Low-profile wedge geometry optimization",
      "Dual-motor aggressive drive system",
      "Composite armor plating",
      "Leverage-based combat tactics",
    ],
  },
];

export const experiences: Experience[] = [
  {
    title: "UAV Research & Development Intern",
    company: "Garuda Aerospace Limited, Chennai",
    period: "May 2025 - July 2025",
    description:
      "Worked on UAV systems for defense and SAR applications, integrating computer vision modules for real-time object detection and mission-specific automation on aerial edge platforms.",
  },
  {
    title: "UAV Systems Intern",
    company: "Centur-Ion Mobility, Chennai",
    period: "Jul 2024 - Dec 2024",
    description:
      "Developed electrical integration for coaxial and tricopter drones, built sensor data acquisition pipelines, and designed a BLDC motor test bench for performance evaluation.",
  },
  {
    title: "Co-Founder & Electrical Lead",
    company: "REVA Solar Racing, VIT Chennai",
    period: "Feb 2024 - Present",
    description:
      "Led electrical architecture for a student solar vehicle, overseeing power systems, battery management, motor control, and cross-team integration for vehicle development.",
  },
];

export const educationItems: Education[] = [
  {
    degree: "B.Tech Computer Science & Engineering (AI & ML)",
    school: "Vellore Institute of Technology, Chennai",
    period: "2023 - 2027 (Expected)",
    description:
      "Pursuing a degree focused on AI, machine learning, and computer vision, applying core computer science principles to robotics, UAV systems, and real-world intelligent system development. GPA: 8.77/10.0",
  },
  {
    degree: "Chairperson",
    school: "Robotics Club, VIT Chennai",
    period: "Sep 2023 - Present",
    description:
      "Led ML and robotics initiatives, conducted workshops on TensorFlow, YOLO, and MediaPipe, mentored projects, and organized hackathons across robotics, drones, and automation.",
  },
  {
    degree: "Projects Department Lead",
    school: "IEEE Robotics & Automation Society, VIT Chennai",
    period: "Feb 2024 - Present",
    description:
      "Directed robotics and automation projects, represented the chapter at competitions and expos, and led teams building innovative systems across multiple robotics domains.",
  },
  {
    degree: "Technical Member",
    school: "Linux Users' Group, VIT Chennai",
    period: "Dec 2024 - Present",
    description:
      "Organized workshops on Linux, cybersecurity, and open-source tools, led CTF initiatives, and collaborated with FOSS communities to run large technical events.",
  },
];

export const techStack = [
  "Python",
  "C++",
  "ROS 2",
  "PyTorch",
  "TensorRT",
  "CUDA",
  "OpenCV",
  "ArduPilot",
  "PX4",
  "Jetson",
  "STM32",
  "KiCad",
  "SolidWorks",
  "Altium Designer",
  "MATLAB",
  "Simulink",
  "Linux",
  "Docker",
  "Git",
  "Embedded C",
  "FreeRTOS",
  "CAN Bus",
  "ROS 2",
  "YOLO",
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/5.jpeg",
  },
  {
    src: "/images/gallery/1.jpeg",
  },
  {
    src: "/images/gallery/4.jpeg",
  },
  {
    src: "/images/gallery/9.jpeg",
  },
  {
    src: "/images/gallery/47.jpeg",
  },
  {
    src: "/images/gallery/15.jpeg",
  },
  {
    src: "/images/gallery/10.jpeg",
  },
  {
    src: "/images/gallery/8.jpeg",
  },
  {
    src: "/images/gallery/17.jpeg",
  },
  {
    src: "/images/gallery/12.jpeg",
  },
  {
    src: "/images/gallery/11.jpeg",
  },
  {
    src: "/images/gallery/20.jpeg",
  },
  {
    src: "/images/gallery/13.jpeg",
  },
  {
    src: "/images/gallery/21.jpeg",
  },
  {
    src: "/images/gallery/14.jpeg",
  },
];

export const contactInfo = {
  email: "rupankarvitc@gmail.com",
  location: "Chennai, TN",
  github: "https://github.com/InvictusRex",
  linkedin: "https://linkedin.com/in/rupankar-majumdar",
};
