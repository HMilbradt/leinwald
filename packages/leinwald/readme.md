# Leinwald

A simple canvas based drawing app, built sans-framework.

# Motivation

Current canvas apps are framework-specific, or not well maintained or built.  This project aims to fill that gap, by providing a 100% TypeScript, no-framework canvas application. This system can be added to any existing project, or used as a standalone application.

# Application Design

At it's core, LeinWald is built around function programming paradigms.  This ensures a very clean and testable core, while also avoiding the typical bloat that comes with OOP.  Additionally, the entire application is built for extensiblity.  The core is built as a set of modules, which may be extended or replaced as needed.  This allows for a very flexible application, which can be easily adapted to any project.

# Core Concepts

- Renderer: Responsible for taking a scene and rendering it down to a canvas.  This is where the translation from objects into graphics happens.
- Canvas: This is a wrapper around the HTML5 Canvas element.  It is a target for the renderer to draw to.
- Scene: A scene is a data object that contains everything required to render.  This includes elements, the camera, background, etc.

The Canvas is responsible for drawing graphics.  It is a wrapper around the HTML5 Canvas element, and provides a simple API for drawing shapes, lines, and text.  The Canvas also provides a simple API for loading images, and drawing them to the canvas.

On top of the Canvas, we have the SceneManager.  It's duty is to manage "scenes", which are data objects that contain all information needed to render a Scene.
