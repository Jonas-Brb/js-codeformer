# JS CodeFormer #

JS CodeFormer is a JS refactoring and code automation extension for VS Code. Born from the ashes of JS Refactor, JS CodeFormer answers a new question. Instead of asking "can a JS refactoring tool be made for VS Code", this project aims to answer "how can better tools help to create better software?"

JS CodeFormer is a suite of tools purpose built to simplify the process of creating and editing software in a JavaScript environment.

## Core Principles ##

JS CodeFormer is not just a code refactoring and automation extension, it is an extension which is built upon these core principles:

- **Robustness** -- JS CodeFormer must work reliably in a broad range of code environments and styles
- **Communication** -- If JS CodeFormer fails, it should provide immediate feedback to the user; the feedback should be as clear as possible
- **Usability** -- It should be easy to find your way around the tool, even at the start
- **Accessibility** -- Clear, direct access to the tooling must be supported for all users regardless of disability 

None of these principles can be treated as "set it and forget it". Every new behavior, and every improvement receives serious thought as to how it will serve, and impact the developer using this tool.

## Language Support ##

The core languages in this list have been tested through active production use of the extension. Frameworks have been, at the least, smoke-tested on example production code.

Languages:

- JavaScript
- TypeScript

Frameworks:

- Angular
- React
- Vue

Framework-specific formats:

- JSX
- TSX
- Vue Single-file components

Experimental framework support:

- Svelte

## Refactoring ##

JS CodeFormer automated refactorings are built upon years of experience to be stable and reliable. Though the project is new, and issues will inevitably arise, the tools in this project are used to support the project itself. In essence, JS CodeFormer is a self-dogfooding project.

Current refactorings:

- Extract Method/Function
    - Windows: ctrl+shift+j, m
    - Mac: cmd+shift+j, m
- Extract to Parameter
    - no keybinding
- Extract Variable
    - Windows: ctrl+shift+j, v
    - Mac: cmd+shift+j, v
- Inline Variable
    - Windows: ctrl+shift+j, i
    - Mac: cmd+shift+j, i
- Rename (important for non js/ts files)
    - Windows: ctrl+shift+j, r
    - Mac: cmd+shift+j, r

## Conversions ##

Conversions may or may not introduce a different behavior. This means they are in a class of their own. The following conversions are currently available:

- Convert to Arrow Function
    - convert a function expression or declaration to an arrow function
    - no keybinding
- Convert to Function Expression
    - convert a function declaration or arrow function to a function expression
    - no keybinding
- Convert to Function Declaration
    - convert a function assigned to a variable declaration to a function declaration
    - no keybinding

- Select Conversion
    - Windows: ctrl+shift+j, c
    - Mac: cmd+shift+j, c

## Actions ##

Not everything we want to do with our code is a refactoring. That doesn't mean we can't automate it. Actions aim to pair with the supported refactorings in order to provide a smooth development experience.

Current Actions:

- Surround with
    - Keybindings (hot keys)
        - Windows: ctrl+shift+j, w
        - Mac: cmd+shift+j, w
    - Available templates
        - Arrow function
        - Function
        - Try/Catch
        - Variable
- Change variable type
    - Change variable declaration type from current type to const, let, or var
    - No keybinding

- Select Action (Action Palette)
    - Windows: ctrl+shift+j, p
    - Mac: cmd+shift+j, p

## What's Next ##

This project is still in active development, so new refactorings and actions are bound to be added regularly. With that in mind, not all code automation tools will make the cut. The goal is not to be an exhaustive tool, but a carefully designed tool, built to smooth and speed the software development experience.

Current outstanding behavior work:

- Refactorings
    - [ ] Rename (primarily to support JS/TS embedded in HTML)
        - [x] Rename Variable
        - [x] Rename Function
        - [ ] Rename Method
    - [x] Extract to parameter
- Conversions
    - [x] Convert to arrow function
    - [x] Convert to function expression
    - [x] Convert to function declaration
    - [ ] Convert string to template literal
- Actions
    - [x] Change variable type
    - [ ] Introduce variable
    - [ ] Introduce function
    - [ ] Lift and name anonymous function

## Known/Expected Issues ##

Rename:

- Rename refactoring does not currently support methods (class and object literal)
- Renaming variables do not propagate to template HTML in Vue and Svelte
- Renaming MAY not propagate into JSX nodes within reactjavascript and reacttypescript (not tested)