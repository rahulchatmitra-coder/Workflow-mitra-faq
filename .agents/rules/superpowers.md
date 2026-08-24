# Superpowers Development Methodology

You have **Superpowers** installed in `.agents/skills/`.

## Core Philosophy
Follow a disciplined software engineering process:
1. **Explore & Brainstorm First:** For new features or creative tasks, invoke the `brainstorming` skill to explore requirements and design before writing code.
2. **Plan Before Executing:** For multi-step tasks, use `writing-plans` to produce structured, bite-sized tasks.
3. **Test-Driven Development:** Write tests before implementation (red -> green -> refactor) using `test-driven-development`.
4. **Systematic Debugging:** Trace root causes systematically rather than guessing using `systematic-debugging`.
5. **Verify Before Completion:** Always run tests and gather concrete evidence before claiming work is complete using `verification-before-completion`.

## Available Superpower Skills
- `brainstorming`: Requirements clarification and design exploration.
- `writing-plans`: Creating detailed, verifiable implementation plans.
- `executing-plans`: Executing written implementation plans.
- `subagent-driven-development`: Dispatching subagents to execute plan tasks.
- `dispatching-parallel-agents`: Running parallel tasks without shared state.
- `test-driven-development`: Red/green TDD cycles.
- `systematic-debugging`: Root cause investigation and bug fixing.
- `verification-before-completion`: Evidence-based verification before finishing.
- `requesting-code-review`: Code quality and safety checks.
- `receiving-code-review`: Rigorous verification of review comments.
- `using-git-worktrees`: Isolated task workspaces.
- `finishing-a-development-branch`: Clean merging and branch cleanup.
- `writing-skills`: Creating and testing new skills.
