# TODO - usuarioApi y miAPI

## App React Native (usuarioApi) ✅
- [x] 1. Cambiar IP `10.117.254.172` → `192.168.100.99` en `screens/ConsultaUsuariosScreen.js`
- [x] 2. Cambiar IP `localhost` → `192.168.100.99` en `app/detalle.js` y `app/actualizar.js`
- [x] 3. Usar `encode` de `base-64` en vez de `btoa` (para APK Android)
- [x] 4. Agregar header `Authorization` (admin:1234) en `app/detalle.js` y `app/actualizar.js`

## API miAPI (Docker) ✅
- [x] 5. Corregir `import usuarios` en `app/main.py` (se importa `misc` y `usuarios`)
- [x] 6. Arreglar `__tablename__` (guion) en `usuarioDB.py` → `tb_usuarios`
- [x] 7. Crear tablas automáticamente (`create_all`) en `main.py`
- [x] 7b. Crear archivos `__init__.py` en app, data, routers, models, security
- [x] 8. Levantar y probar contenedores Docker (GET/POST/DELETE OK)

## Verificación final
- [ ] 9. Verificar compilación de la app en Expo/Web
- [ ] 10. Preparar APK (eas build -p android --profile preview)

