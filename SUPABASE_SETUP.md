# Configuración de Supabase Auth — Repostera Pro

## 1. Crear el proyecto
1. Entrá a https://supabase.com/dashboard y creá un proyecto.
2. En **Project Settings → API** copiá la Project URL y la clave publicable (o anon legacy).
3. En la raíz del proyecto, copiá `.env.example` como `.env.local` y completá:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICABLE
```

No uses nunca `service_role` ni una clave secreta en variables `NEXT_PUBLIC_*`.

## 2. Configurar autenticación
En **Authentication → Providers → Email**, habilitá Email.
- Para pruebas podés desactivar temporalmente la confirmación de correo.
- Para producción se recomienda mantenerla activada y configurar SMTP propio.

En **Authentication → URL Configuration** agregá como Site URL la URL de tu aplicación. En Redirect URLs agregá también `http://localhost:3000/**` y el dominio de producción, por ejemplo `https://tu-dominio.com/**`.

## 3. Ejecutar
```bash
npm install
npm run dev
```

La pantalla permite crear cuenta, iniciar sesión y solicitar recuperación de contraseña. El botón de cerrar sesión está en la barra superior.

## Alcance de esta integración
- Supabase Auth administra identidad, contraseña, sesión y recuperación.
- El almacenamiento actual de pedidos, clientes, productos e inventario sigue siendo local (`localStorage`), pero ahora se separa por ID de usuario en el mismo navegador.
- Esta versión todavía no sincroniza esos datos con la nube ni permite compartirlos entre dispositivos. Para eso hay que crear tablas en Supabase y aplicar Row Level Security (RLS) por `auth.uid()` antes de migrar los datos.
- La pantalla de autenticación controla el acceso a la interfaz. La protección de datos remotos deberá implementarse con RLS y, si se agregan rutas/API privadas, validación de sesión del lado del servidor.

## Verificación de correo y recuperación
El registro con confirmación activada muestra un aviso para revisar el correo. La recuperación envía el enlace al correo ingresado; configurá las plantillas y el SMTP desde Supabase para producción.
