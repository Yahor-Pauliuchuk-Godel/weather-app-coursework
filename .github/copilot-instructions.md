# Code writing

- Always use arrow functions.
- Always use functional components and hooks instead of class components.
- Always use TypeScript types for type checking props.
- Avoid using any in TypeScript; use specific types or generics for better type safety.
- Do not use TypeScript interfaces.
- Avoid inline styles and use only bootstrap 5 classes.
- Follow the DRY (Don't Repeat Yourself) principle and extract common logic into custom hooks.
- Prefer spreading props over accessing each one individually.
- When setting default values for props, do it while destructuring them.
- Move data that doesn't rely on the component props/state outside of it for cleaner (and more efficient) code.
- Group all the state and context at the top of the component.
- Use strict equality checks (===) when comparing props or state values.
- Group imports logically (e.g., libraries, utilities, components) for easier navigation.
- Use useRef instead of state for non-rendering values to avoid unnecessary re-renders.
- Avoid mutating state directly; always use state setters like setState.
- Keep JSX clean and minimal; break it into smaller components if it gets too long.
- Prefer spreading props over manually passing each prop individually.
- Do not user React.FC<> and FC<> functions.
- Do not write any code comments.

# Code refactoring

- Be strict during code review and refactoring.
- Follow a consistent coding style and conventions throughout the codebase.
- Ensure that the code is easy to read and understand.
- Verify that the code follows best practices for security and does not introduce vulnerabilities.
- Refactor deeply nested code to flatten the structure and make it easier to understand.