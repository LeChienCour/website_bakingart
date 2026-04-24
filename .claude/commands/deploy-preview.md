Verifica el estado del deploy de preview para el slug actual y corre QA si hay una URL disponible.

## Pasos

1. Lee `docs/specs/` para identificar slugs en estado `READY_FOR_QA`.
2. Pide al usuario la preview URL de Vercel si no está ya documentada en el reporte de QA.
3. Invoca el agente `qa-tester` con esa URL y el slug.
4. Muestra el reporte completo de QA.
5. Si PASA: informa que el slug está listo para deploy y actualiza `.state` a `READY_FOR_DEPLOY`.
6. Si FALLA: lista los issues bloqueantes y pregunta al usuario si desea que `implementer` los corrija.
