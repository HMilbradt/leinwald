# Leinwald

A simple canvas based drawing app, built sans-framework.

# Motivation

Current canvas apps are framework-specific, or not well maintained or built.  This project aims to fill that gap, by providing a 100% TypeScript, no-framework canvas application. This system can be added to any existing project, or used as a standalone application.

# Application Design

At it's core, LeinWald is built around function programming paradigms.  This ensures a very clean and testable core, while also avoiding the typical bloat that comes with OOP.  Additionally, the entire application is built for extensiblity.  The core is built as a set of modules, which may be extended or replaced as needed.  This allows for a very flexible application, which can be easily adapted to any project.

# Core Concepts

- Canvas
- Event Bus
- Scene Manager
