"use client";

import { SectionWrapper } from "./section-wrapper";
import { SplitHeading } from "./split-heading";
import { Timeline, mapExperience, mapEducation } from "./timeline";
import { experiences, educationItems, contactInfo } from "@/lib/portfolio-data";
import { Mail, MapPin, Github, Linkedin, GraduationCap } from "lucide-react";

const techDomains = [
  {
    title: "Drones & Robotics",
    technologies: [
      "Fixed & Rotary Wing UAVs",
      "Coaxial UAVs",
      "FPV Drones",
      "TriCopters",
      "Flight Controllers",
      "ArduPilot",
      "PX4",
      "SpeedyBee",
      "Mavlink",
      "Mission Planner",
      "QGroundControl",
      "Betaflight",
      "Arduino Framework",
      "ESP-IDF",
      "Raspberry Pi",
      "Jetson",
      "STM32",
      "Embedded C",
      "ROS 2",
      "Gazebo",
      "SLAM",
      "Autonomous Navigation",
      "Path Planning",
      "LIDAR",
      "Control Systems",
      "Sensor Integration",
      "Data Acquisition",
      "KiCad",
      "MATLAB Simulink",
      "Combat Robotics",
      "Marine Robotics",
    ],
  },
  {
    title: "Computer Vision",
    technologies: [
      "Object Detection",
      "OpenCV",
      "Ultralytics",
      "CNN Architectures",
      "YOLO",
      "Detectron2",
      "Transformers",
      "RF-DETR",
      "Pose Estimation",
      "Mediapipe",
      "RTMPose",
      "OpenPose",
      "YOLOPose",
      "Image Classification",
      "Transfer Learning",
      "ResNet-18",
      "VGG-18",
      "MobileNetV2",
      "ImageNet",
      "Self Supervised Learning",
      "SimCLR",
      "ONNX",
      "Tensorflow",
      "PyTorch",
      "TensorRT",
      "CUDA & CuDNN",
      "Dataset Curation",
      "Data Augmentation",
      "Annotation & Labelling Tools",
    ],
  },
  {
    title: "Machine Learning",
    technologies: [
      "Classical ML Algorithms",
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forest",
      "Gradient Boosting",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "SVM",
      "KNN",
      "PCA",
      "Ensemble Methods",
      "Feature Engineering",
      "Feature Selection",
      "Dimensionality Reduction",
      "Scikit-learn",
      "Survey Analysis",
      "Probability & Statistical Modeling",
      "Bayesian & Hyperparameter Optimization",
      "Cross Validation Strategies",
      "Brier Score Calibration",
      "Exploratory Data Analysis",
    ],
  },
  {
    title: "Development",
    technologies: [
      "Python",
      "Java",
      "C",
      "C++",
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      "GitHub",
      "Linux",
      "Shell Script",
      "MySQL",
      "SQL Alchemy",
      "FastAPI",
    ],
  },
  {
    title: "Solar Electric Vehicle",
    technologies: [
      "MPPT Design",
      "Li-Ion & LiFePO4,  Batteries",
      "Custom BMS",
      "CAN Bus",
      "ECU Tuning",
      "PMSM & BLDC Motors",
      "Telemetry",
      "Power Electronics",
      "Tractive System Design",
      "Battery Cooling",
      "Insulation & Safety",
    ],
  },
] as const;

export function AboutSection() {
  const dronesDomain = techDomains.find(
    (domain) => domain.title === "Drones & Robotics",
  );
  const computerVisionDomain = techDomains.find(
    (domain) => domain.title === "Computer Vision",
  );
  const machineLearningDomain = techDomains.find(
    (domain) => domain.title === "Machine Learning",
  );
  const developmentDomain = techDomains.find(
    (domain) => domain.title === "Development",
  );
  const solarEvDomain = techDomains.find(
    (domain) => domain.title === "Solar Electric Vehicle",
  );

  return (
    <SectionWrapper id="about">
      <SplitHeading
        as="h2"
        className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        About Me
      </SplitHeading>

      <div className="mb-12 max-w-3xl">
        <p className="text-base leading-relaxed text-muted-foreground">
          I am a robotics engineer and researcher with a deep focus on
          autonomous aerial systems and edge-deployed machine intelligence. My
          work spans the full stack of robotics — from mechanical design and
          embedded firmware to computer vision and real-time inference on
          resource-constrained hardware. I believe the future of robotics lies
          at the intersection of capable hardware and intelligent software, and
          I build systems that bridge that gap.
        </p>
      </div>

      {/* Info grid */}
      <div className="mb-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          icon={<GraduationCap className="h-4 w-4" />}
          label="Education"
          value="B.Tech CSE AI & ML, VIT Chennai"
        />
        <InfoCard
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={contactInfo.email}
          href={`mailto:${contactInfo.email}`}
        />
        <InfoCard
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={contactInfo.location}
        />
        <InfoCard
          icon={<Github className="h-4 w-4" />}
          label="GitHub"
          value="InvictusRex"
          href={contactInfo.github}
        />
      </div>

      {/* Experience & Education side-by-side */}
      <div className="mb-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
            Experience
          </h3>
          <Timeline
            items={experiences.map(mapExperience)}
            label="Professional experience"
          />
        </div>
        <div>
          <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
            Education
          </h3>
          <Timeline
            items={educationItems.map(mapEducation)}
            label="Education history"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
          Tech Stack
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {dronesDomain && <TechDomainCard domain={dronesDomain} />}
          {computerVisionDomain && (
            <TechDomainCard domain={computerVisionDomain} />
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {machineLearningDomain && (
            <TechDomainCard domain={machineLearningDomain} className="h-full" />
          )}
          <div className="grid grid-cols-1 gap-4 sm:h-full sm:grid-rows-[auto_1fr]">
            {developmentDomain && <TechDomainCard domain={developmentDomain} />}
            {solarEvDomain && (
              <TechDomainCard domain={solarEvDomain} className="h-full" />
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TechDomainCard({
  domain,
  className,
}: {
  domain: (typeof techDomains)[number];
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${className ?? ""}`}
    >
      <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">
        {domain.title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {domain.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary/30">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
