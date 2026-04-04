# Everything Claude Code - Agents Guide

## Available Agents (29+)

Your Claude Code installation now has access to 29+ specialized subagents from the everything-claude-code repository. These are permanently configured and will auto-update.

### Architecture & Planning
- **planner** — Feature implementation planning and task breakdown
- **architect** — System design decisions and technical architecture

### Code Review (Language-Specific)
- **code-reviewer** — General code quality and standards review
- **python-reviewer** — Python-specific code review
- **typescript-reviewer** — TypeScript/JavaScript code review
- **rust-reviewer** — Rust code review
- **go-reviewer** — Go code review
- **java-reviewer** — Java code review
- **kotlin-reviewer** — Kotlin code review
- **cpp-reviewer** — C++ code review

### Specialized Reviews
- **security-reviewer** — Vulnerability analysis and security best practices
- **documentation-reviewer** — Documentation quality and completeness
- **test-reviewer** — Test coverage and quality

### Build & Dependency Resolution
- **java-build-resolver** — Maven/Gradle build errors
- **nodejs-build-resolver** — npm/yarn/pnpm build issues
- **python-build-resolver** — pip/poetry dependency issues
- **rust-build-resolver** — Cargo and Rust build errors
- **go-build-resolver** — Go module and build issues

### Domain Experts
- **django-expert** — Django framework guidance
- **spring-boot-expert** — Spring Boot configuration and issues
- **react-expert** — React development and patterns
- **vue-expert** — Vue.js framework guidance
- **database-expert** — Database design and optimization

### Utilities
- **documentation-coordinator** — Documentation workflows
- **testing-coordinator** — Test strategy and execution

---

## How to Use Agents in Your Sessions

### Method 1: Direct Delegation (Recommended)
```
"Use the go-reviewer to review this code"
"Have the security-reviewer analyze this function"
"Ask the django-expert about this pattern"
```

The agent will be automatically invoked with its specialized expertise.

### Method 2: Explicit Agent Call
```
/agent go-reviewer
// Your code review request here
```

### Method 3: Workflow Integration
Agents work automatically in workflows—when you describe a task:
- Code reviews trigger the appropriate language reviewer
- Build errors trigger the matching build-resolver
- Architecture discussions invoke the architect

---

## When to Use Each Agent

| Task | Agent | Example |
|------|-------|---------|
| Planning a feature | **planner** | "Plan the implementation of user authentication" |
| System design | **architect** | "Design the database schema for this feature" |
| Code quality | **{lang}-reviewer** | "Review this Python function for security" |
| Build failures | **{lang}-build-resolver** | "Fix this npm install error" |
| Security | **security-reviewer** | "Scan this API endpoint for vulnerabilities" |
| Framework help | **{framework}-expert** | "How do I configure Django middleware?" |
| Tests | **test-reviewer** | "Improve test coverage for this module" |

---

## Auto-Updates

✅ **Auto-updates are enabled**. Your agents will automatically update when:
- New agents are added to the repository
- Existing agents are improved
- Bug fixes are released

No action needed on your part—Claude Code handles it silently.

To check for updates manually:
```
/update-config
```

---

## Tips for Best Results

1. **Be specific** — "Use the typescript-reviewer to check for type safety issues"
2. **Provide context** — Paste the code or describe the problem clearly
3. **Chain agents** — Use multiple agents for complex tasks (e.g., architect → code-reviewer → security-reviewer)
4. **Reference frameworks** — Mention if you're using Django, Spring Boot, React, etc. to trigger experts

---

## Next Steps

Start your next Claude Code session and try:
```
"Review this code using the python-reviewer agent"
```

The agent will be instantly available with its specialized expertise!
