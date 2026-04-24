Ejecuta el pipeline agéntico completo para el siguiente slug en estado DRAFT.

## Pasos

1. **Identificar slug**: Lee `docs/specs/` y encuentra el primer `.state` con contenido `DRAFT`. Si no hay ninguno, lista los slugs del roadmap en `CLAUDE.md` y pregunta cuál iniciar.

2. **pm-spec**: Invoca el agente `pm-spec` con el slug encontrado. Produce `docs/specs/{slug}.md` y actualiza `.state` a `READY_FOR_ARCH`. **Muestra el spec completo y espera confirmación humana antes de continuar.**

3. **architect** (requiere OK del usuario): Invoca `architect`. Produce `docs/adr/NNNN-{slug}.md`. Actualiza `.state` a `READY_FOR_BUILD`. Muestra el ADR y espera confirmación.

4. **ui-designer + sanity-modeler** (paralelo, requiere OK): Si el feature necesita UI y modelo de datos, corre ambos en paralelo. Si solo necesita uno, corre solo ese.

5. **implementer** (requiere OK): Invoca `implementer`. Actualiza `.state` a `READY_FOR_QA`. Muestra diff de archivos creados/modificados.

6. **qa-tester** (requiere URL de preview): Pide al usuario la preview URL de Vercel. Invoca `qa-tester`. Si PASA, actualiza `.state` a `READY_FOR_DEPLOY`. Si FALLA, regresa a implementer con notas de bloqueo.

7. **devops-deployer** (solo si QA pasa, requiere OK): Invoca `devops-deployer`. Actualiza `.state` a `DONE`.

## Reglas
- Nunca saltar un paso.
- Nunca correr implementer sin ADR aprobado por el usuario.
- Mostrar diff en cada handoff para review.
- Si el usuario rechaza un artefacto, iterar en el mismo agente antes de continuar.
