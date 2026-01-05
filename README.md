# 3D Weather Visualization – ESCOM

Interactive 3D weather visualization prototype built for the **Computer Graphics** course at **ESCOM – Instituto Politécnico Nacional**.

📅 **Final Project Submission:** December 5, 2026

🌐 **Live Demo:**

> _(Add deployment link here)_

## 🎥 Demo Video

[![Demostration Video](https://raw.githubusercontent.com/samu31nd/weatherLandscape3D/main/path/media/demo.jpg)](https://raw.githubusercontent.com/samu31nd/weatherLandscape3D/main/media/demo.mp4)

## 📄 Documentation of the project

- 📖 [View the report online (PDF)](docs/ProyectoFinalDocumentacion.pdf)
- ⬇️ [Download the report](https://github.com/samu31nd/weatherLandscape3D/raw/main/docs/ProyectoFinalDocumentacion.pdf)

---

## 📌 Project Overview

This project explores how **3D computer graphics** can be used to represent meteorological data in a more engaging, intuitive, and visually appealing way than traditional 2D charts or tables.

Inspired by academic and institutional climate reports (such as those published by UNAM), the project proposes a **virtual environment** where weather conditions are represented through a dynamic 3D scene rendered directly in the browser.

The focus of this implementation is **visualization only**. Real meteorological data acquisition and processing are considered out of scope and are replaced with **simulated (mock) data** to demonstrate functionality.

---

## 🎯 Objective

To develop an interactive web prototype that visualizes meteorological conditions using a **dynamic and aesthetically appealing 3D scene**, leveraging modern web-based computer graphics technologies.

The prototype demonstrates at least two different weather conditions (e.g. sunny and rainy) within a virtual landscape.

---

## 🧠 Problem Statement

**How can a web interface be designed to visually represent meteorological data in a way that is both accessible to non-specialized users and technically robust, using 3D computer graphics?**

---

## 🧩 Scope

- ✔️ 3D visualization of weather conditions
- ✔️ Simulated (mock) meteorological data
- ✔️ Interactive scene rendered in the browser
- ❌ Real weather station data integration
- ❌ Backend data processing

---

## 🛠️ Technologies Used

### Software

- **Blender 2.92** – Creation and optimization of low-poly 3D assets for the web
- **Node.js & npm** – Development environment
- **Vite** – Fast build tool and development server
- **Three.js** – WebGL-based 3D rendering engine
- **Tailwind CSS** – Utility-first CSS framework for clean and responsive UI
- **Vitest** – Testing framework (when applicable)

### Hardware (Development Environment)

- 64-bit Operating System
- 8 GB RAM
- AMD Ryzen 5 5500U (or equivalent)
- Keyboard and mouse

---

## 🧱 Software Architecture

The project follows principles inspired by **Hexagonal Architecture (Ports and Adapters)** to ensure:

- **Decoupling** between visualization logic and data sources
- **Flexibility** to replace mock data with real APIs in the future
- **Reusability** of the 3D visualization core
- **Testability** through isolated adapters

Additionally, **Clean Code** principles are applied:

- Small, readable, and single-responsibility functions
- Descriptive naming conventions
- Maintainable and extensible structure

---

## 🌦️ Weather Visualization Concept

Rather than displaying data through traditional charts, weather conditions are expressed through:

- Environmental lighting
- Atmospheric effects (e.g. rain)
- Scene composition and terrain design

This approach aims to provide an **immersive and educational experience**, especially suitable for public outreach and academic demonstrations.

---

## 📚 Related Work & Inspiration

Existing platforms such as **Windy**, **Ventusky**, and **WeatherLink** offer powerful large-scale meteorological visualization. However, they focus primarily on macro-level data and technical audiences.

This project instead emphasizes:

- Local-scale visualization
- Immersive environments
- Educational and demonstrative purposes

---

## 👨‍🎓 Academic Context

This project was developed as the **final assignment** for the **Computer Graphics** course at:

**Escuela Superior de Cómputo (ESCOM)**  
**Instituto Politécnico Nacional (IPN)**

---

## 📄 License

This project is intended for **academic and educational purposes**.  
All rights reserved.

---

## ✍️ Author

**Eduardo Samuel Sánchez Leyva**  
ESCOM – IPN  
Computer Graphics Course
