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
  alt: string;
  caption: string;
}

export const categories = [
  "All",
  "Drones & Aerial Vehicles",
  "Robotics & Automation",
  "Machine Learning",
  "Combat Robotics",
  "Solar Electric Vehicle",
] as const;

export const projects: Project[] = [
  {
    id: "atlas-vtol",
    title: "Atlas VTOL UAV",
    category: "Drones & Aerial Vehicles",
    description:
      "Hybrid VTOL fixed-wing UAV with 120-minute endurance for precision agriculture survey missions.",
    longDescription:
      "Designed and built a hybrid vertical take-off and landing (VTOL) fixed-wing UAV for precision agriculture applications. The aircraft features a quad-motor VTOL system that transitions to efficient fixed-wing flight, achieving over 120 minutes of endurance. Custom flight controller firmware handles the complex transition logic between hover and forward flight modes. Integrated multispectral camera payload for NDVI crop health analysis with real-time edge processing on an onboard Jetson Nano.",
    technologies: [
      "ArduPilot",
      "PX4",
      "ROS 2",
      "C++",
      "Jetson Nano",
      "Carbon Fiber Composites",
      "LiPo 6S",
      "NDVI Imaging",
    ],
    image: "/images/projects/fixed-wing.jpg",
    year: "2025",
    highlights: [
      "120+ minute flight endurance",
      "Seamless VTOL-to-fixed-wing transition",
      "Real-time NDVI crop analysis",
      "Sub-5cm survey accuracy",
    ],
  },
  {
    id: "phantom-quad",
    title: "Phantom X8 Octocopter",
    category: "Drones & Aerial Vehicles",
    description:
      "Heavy-lift octocopter designed for LiDAR mapping with redundant propulsion for safety-critical missions.",
    longDescription:
      "Engineered a coaxial X8 octocopter platform capable of carrying 4.5kg payloads including a Velodyne Puck LiDAR sensor for topographic mapping. The redundant coaxial motor configuration ensures continued flight even with single motor failure. Custom PDB design with current sensing on each motor for real-time health monitoring. Companion computer running ROS 2 processes point cloud data in-flight for real-time 3D reconstruction.",
    technologies: [
      "ROS 2",
      "Velodyne LiDAR",
      "Pixhawk 6X",
      "Python",
      "PCL",
      "KiCad",
      "3D Printing",
    ],
    image: "/images/projects/drone-1.jpg",
    year: "2024",
    highlights: [
      "4.5kg payload capacity",
      "Redundant coaxial propulsion",
      "Real-time 3D point cloud processing",
      "Custom power distribution board",
    ],
  },
  {
    id: "manipulator-6dof",
    title: "6-DOF Robotic Manipulator",
    category: "Robotics & Automation",
    description:
      "Custom 6-axis robotic arm with inverse kinematics solver and computer vision-guided pick-and-place.",
    longDescription:
      "Designed and fabricated a 6-degree-of-freedom robotic manipulator with a 500mm reach, powered by high-torque Dynamixel servos. Implemented a closed-form inverse kinematics solver in C++ for real-time trajectory planning. Integrated an Intel RealSense depth camera for object detection and pose estimation, enabling autonomous pick-and-place operations. The entire system runs on ROS 2 with MoveIt 2 for motion planning and collision avoidance.",
    technologies: [
      "ROS 2",
      "MoveIt 2",
      "C++",
      "Python",
      "Dynamixel",
      "Intel RealSense",
      "SolidWorks",
      "3D Printing",
    ],
    image: "/images/projects/robot-arm.jpg",
    year: "2024",
    highlights: [
      "500mm reach with sub-mm repeatability",
      "Real-time inverse kinematics",
      "Vision-guided autonomous operation",
      "ROS 2 + MoveIt 2 integration",
    ],
  },
  {
    id: "edge-detect",
    title: "EdgeDetect: Real-Time Object Detection",
    category: "Machine Learning",
    description:
      "Optimized YOLOv8 inference pipeline achieving 30+ FPS on Jetson Orin Nano for aerial surveillance.",
    longDescription:
      "Developed an optimized edge inference pipeline for real-time object detection from UAV camera feeds. Starting with a YOLOv8n model, applied TensorRT optimization with INT8 quantization to achieve 30+ FPS on NVIDIA Jetson Orin Nano. Custom training on a domain-specific aerial dataset of 15,000+ annotated images for vehicle, person, and infrastructure detection. Integrated with ROS 2 for seamless deployment on drone platforms with automated alert generation.",
    technologies: [
      "Python",
      "PyTorch",
      "TensorRT",
      "CUDA",
      "YOLOv8",
      "Jetson Orin Nano",
      "ROS 2",
      "OpenCV",
    ],
    image: "/images/projects/ml-edge.jpg",
    year: "2025",
    highlights: [
      "30+ FPS on edge hardware",
      "INT8 quantized TensorRT model",
      "15,000+ custom annotated images",
      "92.4% mAP@0.5 accuracy",
    ],
  },
  {
    id: "ironclad-15",
    title: "Ironclad 15lb Combat Robot",
    category: "Combat Robotics",
    description:
      "15lb combat robot with vertical spinner weapon and invertible wedge design for regional competitions.",
    longDescription:
      "Designed and built a 15lb combat robot featuring a 4,500 RPM vertical spinner weapon machined from S7 tool steel. The invertible wedge chassis is CNC-machined from 6061 aluminum with a hardened steel front wedge. Custom ESC firmware provides weapon speed ramping and current limiting for motor protection. The drive system uses brushless outrunners with a custom 2-speed gearbox for sprint and push configurations. Competed in 3 regional events with a 7-2 win record.",
    technologies: [
      "SolidWorks",
      "CNC Machining",
      "S7 Tool Steel",
      "6061 Aluminum",
      "Brushless Motors",
      "LiPo 4S",
      "Custom ESC",
    ],
    image: "/images/projects/combat-bot.jpg",
    year: "2023",
    highlights: [
      "4,500 RPM vertical spinner",
      "Invertible wedge design",
      "7-2 competition record",
      "Custom 2-speed gearbox",
    ],
  },
  {
    id: "solaris-ev",
    title: "Solaris Solar Electric Vehicle",
    category: "Solar Electric Vehicle",
    description:
      "Solar-powered electric vehicle achieving 1,200km range for the American Solar Challenge endurance race.",
    longDescription:
      "Led the electrical systems team for a university solar electric vehicle competing in the American Solar Challenge. Designed the maximum power point tracking (MPPT) solar charge controller with 97.5% efficiency. Integrated a 5kWh lithium battery pack with custom BMS featuring cell-level monitoring and thermal management. The vehicle's telemetry system streams real-time data to a chase car dashboard for race strategy optimization. Achieved 3rd place finish covering 1,200km on solar power alone.",
    technologies: [
      "MPPT Design",
      "LiFePO4 Batteries",
      "Custom BMS",
      "CAN Bus",
      "Altium Designer",
      "Embedded C",
      "Telemetry",
      "Carbon Fiber",
    ],
    image: "/images/projects/solar-car.jpg",
    year: "2023",
    highlights: [
      "97.5% MPPT efficiency",
      "1,200km solar-only range",
      "3rd place American Solar Challenge",
      "Real-time telemetry system",
    ],
  },
];

export const experiences: Experience[] = [
  {
    title: "Robotics Research Engineer",
    company: "Autonomous Systems Lab, Georgia Tech",
    period: "Jun 2024 — Present",
    description:
      "Developing autonomous navigation algorithms for UAV swarms. Implementing multi-agent SLAM and coordinated path planning using ROS 2. Published research on decentralized swarm consensus protocols.",
  },
  {
    title: "UAV Systems Intern",
    company: "Skydio, Inc.",
    period: "May 2023 — Aug 2023",
    description:
      "Contributed to obstacle avoidance pipeline for autonomous drones. Optimized depth estimation models for edge deployment on custom ASIC. Reduced inference latency by 35% through model pruning and quantization.",
  },
  {
    title: "Embedded Systems Engineer",
    company: "RoboJackets, Georgia Tech",
    period: "Aug 2022 — May 2024",
    description:
      "Led firmware development for the competition robotics team. Designed motor control algorithms and sensor fusion pipelines on STM32 microcontrollers. Mentored 12 junior members in embedded programming.",
  },
  {
    title: "Research Assistant",
    company: "IRIM Lab, Georgia Tech",
    period: "Jan 2022 — May 2023",
    description:
      "Assisted in developing dexterous manipulation algorithms for bi-manual robot arms. Implemented force-torque sensor calibration and data collection pipelines for imitation learning research.",
  },
];

export const educationItems: Education[] = [
  {
    degree: "M.S. Robotics",
    school: "Georgia Institute of Technology",
    period: "2024 — 2026 (Expected)",
    description:
      "Focus areas: Autonomous systems, perception, and aerial robotics. Research in multi-agent UAV coordination under Prof. Chen. GPA: 3.92/4.0",
  },
  {
    degree: "B.S. Mechanical Engineering",
    school: "Georgia Institute of Technology",
    period: "2020 — 2024",
    description:
      "Concentration in Robotics & Automation. Dean's List all semesters. Senior thesis on VTOL transition control systems. GPA: 3.88/4.0",
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
    src: "/images/gallery/competition-1.jpg",
    alt: "Robotics competition event",
    caption: "RoboJackets competition at Georgia Tech — 2024",
  },
  {
    src: "/images/gallery/workshop-1.jpg",
    alt: "Engineering workshop",
    caption: "Electronics lab workspace — Custom PCB assembly",
  },
  {
    src: "/images/gallery/drone-flight.jpg",
    alt: "UAV test flight at sunset",
    caption: "Atlas VTOL maiden flight test — Griffin, GA",
  },
  {
    src: "/images/gallery/team-photo.jpg",
    alt: "Engineering team photo",
    caption: "Autonomous Systems Lab team — Fall 2024",
  },
  {
    src: "/images/gallery/presentation.jpg",
    alt: "Technical presentation at conference",
    caption: "IEEE ICRA poster presentation — 2024",
  },
  {
    src: "/images/gallery/pcb-design.jpg",
    alt: "Custom PCB assembly close-up",
    caption: "Custom flight controller PCB — Soldering session",
  },
];

export const contactInfo = {
  email: "rupankarvitc@gmail.com",
  location: "Chennai, TN",
  github: "https://github.com/InvictusRex",
  linkedin: "https://linkedin.com/in/rupankar-majumdar",
};
