# Agent Instructions

For frontend work, always use installed MCP/docs tools before coding:

- Use Figma MCP when design files are available.
- Use Context7 for up-to-date library docs.
- Use Playwright MCP to test key user flows.
- Use Chrome DevTools MCP for performance, layout, console, and network debugging.
- Use Firecrawl or Tavily for live research, competitor analysis, and content gathering.
- Use Codex Security before production.

Prioritize:
- Beautiful design
- Fast load time
- Accessibility
- Responsive layouts
- Strong copy
- Clean component architecture

My personal “monster website” combo:
Codex + Sites + Figma MCP + Context7 + Playwright + Chrome DevTools + Firecrawl + Blender/Spline + GSAP + Three.js/React Three Fiber.

Goal:
Create the full pipeline from idea → research → design → 3D → code → test → deploy.
git status
git add AGENTS.md
## 3D Product Workflow

For product-focused websites:

- Create or source accurate 3D product models using Blender or Spline when appropriate.
- Export optimized `.glb` or `.gltf` assets for the web.
- Render 3D scenes using React Three Fiber, Drei, and Three.js.
- Use GSAP for premium scroll, hover, and entrance animations.
- Optimize models with compression, lazy loading, and mobile fallbacks.
- Prefer realistic lighting, shadows, reflections, and premium product presentation.
- If a client only provides photos, recreate a visually accurate product model before integrating it into the website.
- Always prioritize performance while maintaining a premium experience.