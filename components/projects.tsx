'use client';

import { useState, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, Github } from 'lucide-react';
import ProjectFilter from './project-filter';
import ProjectCard3DTilt from './project-card-3d-tilt';
import ProjectModal, { type Project } from './project-modal';

// Rotate through gradient colours by card index (no color field in data)
const CARD_COLORS = [
  'from-blue-500/30 to-blue-600/30',
  'from-purple-500/30 to-purple-600/30',
  'from-cyan-500/30 to-cyan-600/30',
  'from-green-500/30 to-green-600/30',
  'from-orange-500/30 to-orange-600/30',
  'from-pink-500/30 to-pink-600/30',
];

const CARD_ICONS = ['🤖', '🛠️', '🌾', '🔍', '🪖', '🚌'];

const projects: Project[] = [
  {
    id: 1,
    title: 'Conversational Infrastructure Provisioning Agent for AWS',
    shortDesc:
      'Conversational AI agent that lets you provision AWS cloud resources through plain English — no console, no CLI, just talk.',
    longDesc:
      'Built as a team project, this agent eliminates the complexity of AWS infrastructure setup by letting users describe what they need in natural language. AWS Lex handles the conversation flow, with Lambda functions acting as the bridge — forwarding requests from the backend to Lex and routing responses back. Terraform manages infrastructure-as-code under the hood, and Infracost CLI surfaces real-time cost estimates before anything is deployed — so users know the bill before they commit. The Gemini API drives intelligent query interpretation, turning ambiguous requests into precise infrastructure definitions. The result is a system where a non-technical user can say "spin up a load-balanced EC2 cluster in us-east-1" and get it done safely, with cost visibility at every step.',
    tags: ['Python', 'React', 'AWS Lex', 'AWS Lambda', 'Terraform', 'Gemini API'],
    github: 'https://github.com/MahadhevanS/Conversational-infra-provisioning-agent',
    live: '',
  },
  {
    id: 2,
    title: 'DevHub – Team API & Bug Management Platform',
    shortDesc:
      'All-in-one developer workspace combining API docs, live endpoint testing, Kanban bug tracking, and environment management for teams.',
    longDesc:
      'Developer teams constantly context-switch between Postman, Jira, Notion, and scattered env files. DevHub collapses all of that into one platform. The API module lets teams document endpoints and test them live — requests are forwarded through a backend proxy that logs a full audit trail of every call. The bug tracker uses a Kanban board with role-aware visibility. Three-tier RBAC (Admin, Developer, Viewer) built on JWT means the right people see the right things. Environment variables are stored and scoped per workspace, so no more sharing .env files over Slack. Built with React and Spring Boot on a PostgreSQL + Supabase backend.',
    tags: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/Vasanth-Loganathan/DevHub',
    live: '',
  },
  {
    id: 3,
    title: 'AgriGear ERP – Agricultural Fleet Management System',
    shortDesc:
      'Multi-tenant ERP for agricultural machinery booking and management — real-time GPS tracking, automated invoicing, and ROI dashboards across six user roles.',
    longDesc:
      'AgriGear solves a real operational problem: agricultural machinery booking and management businesses run on spreadsheets, phone calls, and paper invoices. This platform replaces all of it. Six distinct roles — Admin, Owner, Manager, Operator, Farmer, and Mechanic — each get isolated views and permissions within fully separated tenant environments. Machinery locations stream to Leaflet maps in real time. When a job closes, invoices and operator wages are generated automatically — no manual calculation. Maintenance requests flow through a structured workflow so nothing falls through the cracks. The KPI dashboard tracks ROI per machine by comparing revenue against maintenance and operational expenses, giving owners an actual business intelligence layer. Built on React 19, FastAPI, and MongoDB.',
    tags: ['React 19', 'FastAPI', 'MongoDB', 'JWT', 'Tailwind CSS', 'Leaflet'],
    github: 'https://github.com/Vasanth-Loganathan/AgriGear-ERP',
    live: 'https://agri-gear-frontend.vercel.app/login',
  },
  {
    id: 4,
    title: 'Credit Card Fraud Detector – End-to-End ML Pipeline',
    shortDesc:
      'ML fraud detection pipeline trained on 1.85M transactions achieving 93% precision — with SHAP explainability and a live Streamlit scoring dashboard.',
    longDesc:
      'Fraud detection fails when models can\'t handle class imbalance — this dataset had 191 legitimate transactions for every fraudulent one. The solution was a weighted ensemble of XGBoost and LightGBM, trained on engineered features that capture how fraud actually behaves: Haversine distance between consecutive transactions, transaction hour patterns, and customer age profiles. SMOTE handled the imbalance at the training level. The result: AUPRC of 0.9517 and 93% precision — meaning when the model flags fraud, it\'s right 93% of the time. SHAP values provide per-transaction explainability, showing exactly which features drove each decision. FP-Growth mines recurring behavioral patterns across flagged transactions. Everything is deployed as an interactive Streamlit dashboard where you can score a live transaction and see the full reasoning behind the verdict.',
    tags: ['Python', 'Machine Learning', 'XGBoost', 'LightGBM', 'SHAP', 'SMOTE', 'Streamlit', 'Plotly'],
    github: 'https://github.com/Vasanth-Loganathan/Credit-Card-Fraud-Detector',
    live: '',
  },
  {
    id: 5,
    title: 'Helmet Fall Detector – Emergency Alert System',
    shortDesc:
      'IoT safety device built into a helmet that detects falls using motion sensors and instantly sends a Telegram alert with GPS location to emergency contacts.',
    longDesc:
      'This is a hardware-software safety system designed for motorcyclists. A Raspberry Pi Pico W sits inside the helmet wired to three sensors: an MPU6050 accelerometer/gyroscope that detects sudden changes in motion, an electret microphone that picks up crash-level sound, and a NEO-6M GPS module that pinpoints location. When all three signals align — sudden deceleration, impact sound, abnormal orientation — the system treats it as a fall. It syncs time over Wi-Fi using Google HTTP headers, then fires a Telegram message to the rider\'s emergency contact containing the ride start time, exact fall time, a Google Maps link to the GPS coordinates, and the raw sensor readings for context. A local buzzer simultaneously alerts anyone nearby. Written in MicroPython, it runs entirely on the microcontroller with no cloud dependency beyond the Telegram API.',
    tags: ['MicroPython', 'Raspberry Pi Pico W', 'MPU6050', 'GPS', 'IoT', 'Telegram API'],
    github: 'https://github.com/Vasanth-Loganathan/Helmet-Fall-Detector',
    live: '',
  },
  {
    id: 6,
    title: 'BusEase – Bus Ticket Booking and Management System',
    shortDesc:
      'Full-stack bus booking platform with seat reservations, JWT authentication, user feedback, and a complete admin control panel.',
    longDesc:
      'BusEase is a practical, end-to-end transport booking system built to handle the full lifecycle of a bus ticket — from search to booking to admin management. Users can browse available routes, check seat availability, and book tickets through a clean interface protected by JWT-based authentication. A feedback module lets passengers report issues or leave reviews. On the admin side, the control panel covers the full CRUD lifecycle for bus data — adding new routes, editing schedules, deleting entries, and viewing all active bookings in one place. Custom auth middleware handles route protection throughout, keeping user and admin surfaces cleanly separated. The backend runs on Node.js with Express, with PostgreSQL managing all relational data.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'React'],
    github: 'https://github.com/Vasanth-Loganathan/BusEase',
    live: '',
  },
];

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Track which element was focused before opening — restored on close
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((project: Project) => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    // Restore focus after the close animation finishes without triggering browser scroll
    setTimeout(() => prevFocusRef.current?.focus({ preventScroll: true }), 250);
  }, []);

  return (
    <>
      <section id="projects" className="py-20 px-6 bg-background/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <div className="w-16 h-1 bg-accent mb-12" />

          <ProjectFilter projects={projects}>
            {(filtered) => (
              <>
                <div
                ref={ref}
                className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                {filtered.map((project, index) => {
                  const colorClass = CARD_COLORS[index % CARD_COLORS.length];
                  const icon = CARD_ICONS[index % CARD_ICONS.length];

                  return (
                    <ProjectCard3DTilt key={project.id}>
                      {/*
                        The entire card is the click target for the modal.
                        The buttons row stops propagation so Live Demo / GitHub
                        links keep their own behaviour and don't also open the modal.
                      */}
                      <div
                        className={`group h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                          }`}
                        style={{
                          transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                        }}
                        onClick={() => openModal(project)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${project.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openModal(project);
                          }
                        }}
                      >
                        {/* ── Thumbnail ── */}
                        <div
                          className={`h-40 bg-gradient-to-br ${colorClass} flex items-center justify-center relative overflow-hidden border-b border-border/50`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-accent/5" />
                          <div className="text-center px-4">
                            <div className="text-4xl font-bold text-accent/40 mb-2">
                              {icon}
                            </div>
                            <span className="text-muted-foreground font-semibold text-sm">
                              Project Preview
                            </span>
                          </div>
                        </div>

                        {/* ── Content ── */}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {project.shortDesc}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* "View Details" affordance */}
                          <p className="text-xs text-accent/60 group-hover:text-accent/90 transition-colors mb-5 mt-auto">
                            View Details →
                          </p>

                          {/* ── Buttons — stop propagation so they don't open modal ── */}
                          <div
                            className="flex gap-3"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-3 py-2 border border-accent/40 hover:border-accent hover:bg-accent/10 text-foreground text-sm font-medium rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </a>
                            )}
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-3 py-2 border border-accent/40 hover:border-accent hover:bg-accent/10 text-foreground text-sm font-medium rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                            </a>
                          </div>
                        </div>
                      </div>
                    </ProjectCard3DTilt>
                  );
                })}
              </div>
              
              {/* ── Explore More Banner ── */}
              <div
                className={`mt-12 max-w-3xl mx-auto transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <a
                  href="https://github.com/Vasanth-Loganathan?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row items-center justify-between bg-card/30 border border-dashed border-border hover:border-accent/50 transition-all duration-300 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/5 p-6 sm:p-8 rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left mb-6 sm:mb-0">
                    <div className="w-14 h-14 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                      <Github className="w-7 h-7 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-lg font-bold text-foreground mb-1 sm:mb-0">
                        Explore More Projects
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        If you want to explore more of my works, visit my GitHub repositories.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-accent/40 bg-background hover:bg-accent/10 text-foreground text-sm font-medium rounded transition-all group-hover:border-accent whitespace-nowrap">
                    View GitHub <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </div>
              </>
            )}
          </ProjectFilter>
        </div>
      </section>

      {/* ── Modal — rendered outside section so it can cover the full viewport ── */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </>
  );
}
