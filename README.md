# Repostera Pro — versión UX mejorada

Esta versión conserva la arquitectura del MVP original y refuerza la navegación, claridad de interacción y consistencia visual.

## Versión limpia

- Se eliminó la pantalla de configuración inicial de 3 pasos: la aplicación abre directamente en el panel.
- La primera ejecución comienza sin pedidos, clientes, productos, insumos, gastos ni notificaciones de ejemplo.
- El nombre y los datos del negocio quedan vacíos para que cada usuario los configure desde su perfil.
- Si se detecta el conjunto de datos de demostración de versiones anteriores (`demoData: true`), se reemplaza por una base vacía.
- El tutorial queda disponible manualmente desde Ayuda, pero ya no se inicia automáticamente.

## Mejoras principales

- Navegación mobile claramente separada: Inicio / Pedidos / Crear / Clientes / Más.
- `Crear` abre un menú dedicado para Nuevo pedido, Nuevo cliente y Nuevo insumo.
- Las acciones de creación desde `Crear` abren directamente el formulario correspondiente.
- `Más` concentra exclusivamente la navegación secundaria.
- Avatar separado de la navegación del negocio para Mi perfil / Mi negocio.
- Estado activo más claro en navegación mobile y desktop.
- Modales de navegación con cierre explícito y áreas táctiles más cómodas.
- Botón Volver funcional en Estadísticas.
- Estadísticas por período usando datos reales, sin barras ficticias.
- Restauración de datos demo realmente funcional.
- Eliminación de datos centralizada mediante la capa de storage.
- Focus visible y soporte para `prefers-reduced-motion`.
- Prevención de overflow horizontal.
- Respeto de safe-area en navegación inferior.

## Ejecutar

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm start
```

El proyecto sigue utilizando Next.js + React + TypeScript + Tailwind CSS + Lucide React y almacenamiento local.


## Login con Supabase

Esta versión incorpora registro, inicio de sesión, recuperación de contraseña y cierre de sesión mediante Supabase Auth. Antes de ejecutarla, seguí los pasos de `SUPABASE_SETUP.md` y completá `.env.local` a partir de `.env.example`.

**Importante:** la autenticación ya está integrada, pero los datos operativos continúan guardándose localmente y separados por usuario en este navegador. La sincronización en la nube requiere una segunda etapa con tablas y políticas RLS.
