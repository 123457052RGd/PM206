import streamlit as st
import random

# ─────────────────────────────────────────────────────────────
#  CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Survival Guide: El Reto Móvil",
    page_icon="📱",
    layout="wide",
)


# ─────────────────────────────────────────────────────────────
#  BANCO DE PREGUNTAS  (8 por sección, se sortean 2 por intento)
# ─────────────────────────────────────────────────────────────
BANCO = {
    "camara": [
        {
            "p": "¿Qué porcentaje mínimo de asistencia necesitas para tener derecho a evaluación parcial?",
            "ops": ["70 %", "80 %", "90 %", "75 %"],
            "ok": "80 %",
            "exp": "El reglamento exige 80 % de asistencia para tener derecho a evaluación parcial y 80 % de trabajos en clase."
        },
        {
            "p": "¿Cuántos minutos de tolerancia se permiten al inicio de clase?",
            "ops": ["5 minutos", "15 minutos", "10 minutos", "20 minutos"],
            "ok": "10 minutos",
            "exp": "Se permiten 10 minutos de tolerancia; si llegas después puedes quedarte pero NO se registra asistencia."
        },
        {
            "p": "¿Qué ocurre si plagias o copias un examen?",
            "ops": ["Solo descuento de puntos", "Reprobar la materia y se reporta al área", "Repetir el examen", "Solo una advertencia verbal"],
            "ok": "Reprobar la materia y se reporta al área",
            "exp": "El plagio conduce a reprobar la asignatura completa y se reporta al área correspondiente."
        },
        {
            "p": "¿Cuál es el plazo máximo para justificar una falta por correo institucional?",
            "ops": ["48 horas", "72 horas", "24 horas", "Una semana"],
            "ok": "24 horas",
            "exp": "Máximo 24 horas posteriores a la falta. Justificantes fuera de fecha NO se aceptan."
        },
        {
            "p": "¿Qué documentos físicos se aceptan como justificante de falta?",
            "ops": ["Cualquier nota escrita", "Recetas médicas y citatorios jurídicos", "Comprobante bancario", "Justificante firmado por padres"],
            "ok": "Recetas médicas y citatorios jurídicos",
            "exp": "Solo se aceptan recetas médicas y citatorios jurídicos, presentados físicamente al tutor."
        },
        {
            "p": "¿Cuántas incidencias de indisciplina hacen que pierdas el derecho a examen?",
            "ops": ["1", "5", "2", "3"],
            "ok": "3",
            "exp": "Tres incidencias de indisciplina o falta de respeto te quitan el derecho a examen final o parcial."
        },
        {
            "p": "¿Dónde debes subir tus tareas y trabajos?",
            "ops": ["Por correo al profesor", "Google Drive personal", "Google Classroom", "USB en clase"],
            "ok": "Google Classroom",
            "exp": "Las tareas se suben a Google Classroom de forma individual usando tu correo institucional."
        },
        {
            "p": "¿Qué está PROHIBIDO usar durante la clase según el reglamento?",
            "ops": ["Hacer preguntas al profesor", "Audífonos", "Tomar notas en papel", "Abrir la laptop para la clase"],
            "ok": "Audífonos",
            "exp": "Están prohibidos: audífonos, comer/tomar líquidos y sentarse encima de las mesas."
        },
    ],
    "oraculo": [
        {
            "p": "¿Qué porcentaje vale la Evidencia de Conocimiento en el 1er y 2do parcial?",
            "ops": ["30 %", "20 %", "50 %", "40 %"],
            "ok": "40 %",
            "exp": "La Evidencia de Conocimiento (examen) vale 40 % en el 1er y 2do parcial."
        },
        {
            "p": "¿Cuánto vale el Proyecto Integrador en el 3er parcial?",
            "ops": ["30 %", "10 %", "20 %", "50 %"],
            "ok": "50 %",
            "exp": "En el 3er parcial, el Proyecto Integrador pesa 50 %. ¡Empiézalo desde el día 1!"
        },
        {
            "p": "¿Cuándo es el 1er parcial?",
            "ops": ["15-05-26", "10-06-26", "02-06-26", "07-07-26"],
            "ok": "02-06-26",
            "exp": "El 1er Parcial está programado para el 02 de junio de 2026."
        },
        {
            "p": "¿Qué porcentaje vale la Evidencia de Desempeño en el 1er parcial?",
            "ops": ["30 %", "10 %", "40 %", "20 %"],
            "ok": "20 %",
            "exp": "La Evidencia de Desempeño representa el 20 % en el 1er parcial."
        },
        {
            "p": "¿Cuándo es el examen Final?",
            "ops": ["10-08-26", "11-08-26", "20-08-26", "17-08-26"],
            "ok": "17-08-26",
            "exp": "El examen Final está programado para el 17 de agosto de 2026."
        },
        {
            "p": "¿Cuánto vale la Evidencia de Producto en el 1er y 2do parcial?",
            "ops": ["20 %", "40 %", "10 %", "30 %"],
            "ok": "30 %",
            "exp": "La Evidencia de Producto (práctica/proyecto) vale 30 % en el 1er y 2do parcial."
        },
        {
            "p": "¿Qué porcentaje vale la Evidencia de Conocimiento en el 3er parcial?",
            "ops": ["40 %", "30 %", "20 %", "10 %"],
            "ok": "10 %",
            "exp": "En el 3er parcial la Evidencia de Conocimiento baja a solo 10 % porque el proyecto toma protagonismo."
        },
        {
            "p": "¿Cuándo es el 2do parcial?",
            "ops": ["02-06-26", "11-08-26", "10-07-26", "07-07-26"],
            "ok": "07-07-26",
            "exp": "El 2do Parcial está programado para el 07 de julio de 2026."
        },
    ],
    "skills": [
        {
            "p": "¿Cuál es el objetivo general de Programación Móvil?",
            "ops": [
                "Aprender solo diseño web estático",
                "Desarrollar apps móviles con lenguajes, entornos y frameworks",
                "Programar videojuegos en Unity",
                "Administrar bases de datos en la nube"
            ],
            "ok": "Desarrollar apps móviles con lenguajes, entornos y frameworks",
            "exp": "El objetivo es desarrollar apps móviles usando lenguajes, entornos de desarrollo, diseño de UI, arquitecturas y herramientas de programación móvil."
        },
        {
            "p": "¿Cuántas unidades de aprendizaje tiene la materia?",
            "ops": ["2", "5", "3", "4"],
            "ok": "4",
            "exp": "La materia tiene 4 unidades: I. Introducción, II. Diseño, III. Programación, IV. Publicación."
        },
        {
            "p": "¿Cuál es la competencia específica que desarrollas?",
            "ops": [
                "Solo programar en Python",
                "Desarrollar apps innovadoras con técnicas y recursos de programación móvil",
                "Diseñar logos para apps",
                "Manejar servidores Linux"
            ],
            "ok": "Desarrollar apps innovadoras con técnicas y recursos de programación móvil",
            "exp": "Desarrollarás apps innovadoras empleando técnicas y recursos de programación móvil para provisión de soluciones y servicios tecnológicos."
        },
        {
            "p": "¿Qué temas se cubren en la Unidad I?",
            "ops": [
                "Gestión de sensores",
                "Publicación en tiendas de apps",
                "Fundamentos, tipos de datos y entornos de desarrollo móvil",
                "Servicios y notificaciones push"
            ],
            "ok": "Fundamentos, tipos de datos y entornos de desarrollo móvil",
            "exp": "Unidad I: Fundamentos de programación móvil, tipos de datos, entornos de desarrollo y estructura de proyectos móviles."
        },
        {
            "p": "¿Qué recurso bibliográfico oficial se recomienda para la materia?",
            "ops": [
                "stackoverflow.com",
                "reactnative.dev/docs/components-and-apis",
                "w3schools.com",
                "udemy.com"
            ],
            "ok": "reactnative.dev/docs/components-and-apis",
            "exp": "La bibliografía oficial es la documentación de React Native: reactnative.dev/docs/components-and-apis"
        },
        {
            "p": "¿Qué se estudia en la Unidad III?",
            "ops": [
                "Interfaz de usuario básica",
                "Publicar en App Store y Google Play",
                "Programación de apps móviles y gestión de sensores",
                "Fundamentos de programación"
            ],
            "ok": "Programación de apps móviles y gestión de sensores",
            "exp": "Unidad III: Programación de aplicaciones móviles, incluyendo la gestión de sensores del dispositivo."
        },
        {
            "p": "¿Cuántas horas totales tiene la materia en el cuatrimestre?",
            "ops": ["60", "72", "80", "90"],
            "ok": "90",
            "exp": "La materia tiene 90 horas totales: 36 horas teóricas + 54 horas prácticas."
        },
        {
            "p": "¿Cuántas horas prácticas presenciales hay por semana?",
            "ops": ["2", "6", "4", "3"],
            "ok": "4",
            "exp": "Son 4 horas prácticas presenciales por semana (más 2 horas teóricas = 6 horas semanales en total)."
        },
    ],
    "timeline": [
        {
            "p": "¿Cuándo es el Receso Académico?",
            "ops": ["Primera semana de julio", "Última semana de junio", "20 al 24 de julio", "Primera semana de agosto"],
            "ok": "20 al 24 de julio",
            "exp": "El Receso Académico está programado del 20 al 24 de julio de 2026 (semana 12)."
        },
        {
            "p": "¿Cuándo inicia el cuatrimestre Mayo-Agosto 2026?",
            "ops": ["1 de mayo", "4 de mayo", "10 de mayo", "15 de mayo"],
            "ok": "4 de mayo",
            "exp": "El cuatrimestre inicia la semana del 04 al 06 de Mayo de 2026 (semana 1)."
        },
        {
            "p": "¿En qué semana ocurren los Finales?",
            "ops": ["Semana 14", "Semana 15", "Semana 16", "Semana 13"],
            "ok": "Semana 16",
            "exp": "Los Finales corresponden a la semana 16 (17-20 de Agosto), marcando el fin del cuatrimestre."
        },
        {
            "p": "¿Qué evento ocurre en la semana del 10 al 14 de Agosto?",
            "ops": ["Receso Académico", "Evaluación 2do Parcial", "Finales", "Evaluación 3er Parcial"],
            "ok": "Evaluación 3er Parcial",
            "exp": "La semana del 10 al 14 de Agosto (semana 15) corresponde a la Evaluación del 3er Parcial."
        },
        {
            "p": "¿Cuántas semanas dura el cuatrimestre completo?",
            "ops": ["12", "14", "16", "18"],
            "ok": "16",
            "exp": "El cuatrimestre tiene 16 semanas, del 04 de Mayo al 20 de Agosto de 2026."
        },
        {
            "p": "¿Qué unidad se estudia en la semana 11 (13-17 Julio)?",
            "ops": ["Unidad I", "Unidad II", "Unidad IV", "Unidad III"],
            "ok": "Unidad III",
            "exp": "En la semana 11 se estudia la Unidad III: Programación de apps móviles - Gestión de sensores."
        },
        {
            "p": "¿Cuándo está programado el 3er Parcial?",
            "ops": ["07-07-26", "02-06-26", "17-08-26", "11-08-26"],
            "ok": "11-08-26",
            "exp": "El 3er Parcial está programado para el 11 de agosto de 2026."
        },
        {
            "p": "¿En qué semanas se estudia la Unidad II (Diseño de apps)?",
            "ops": ["Semanas 1-4", "Semanas 5-9", "Semanas 6-9", "Semanas 10-14"],
            "ok": "Semanas 6-9",
            "exp": "La Unidad II se estudia en las semanas 6 a 9 (del 8 de Junio al 3 de Julio)."
        },
    ],
}

# Narrativa de aventura de texto por sección
NARRATIVA = {
    "camara": (
        "📜 *Empujas una pesada puerta de madera. Entras a una sala iluminada por antorchas. "
        "En las paredes hay pergaminos con normas escritas en rojo. Una voz retumba:*\n\n"
        "**\"Bienvenido a LA CÁMARA DE LAS REGLAS. Aquí están los códigos que rigen esta materia. "
        "Léelos con cuidado... o sufrirás las consecuencias.\"**"
    ),
    "oraculo": (
        "🔮 *Una niebla violeta llena el cuarto. Al centro, una esfera brillante flota sobre un pedestal. "
        "El Oráculo habla:*\n\n"
        "**\"Tus calificaciones no son un misterio si conoces los porcentajes. "
        "Escucha bien... cada evidencia tiene su peso en tu destino académico.\"**"
    ),
    "skills": (
        "⚡ *Atraviesas un portal de luz. Frente a ti aparece un árbol de habilidades brillando. "
        "Cada rama representa algo que aprenderás. Una figura dice:*\n\n"
        "**\"Estos son los poderes que dominarás al completar la materia. "
        "Estúdialos. Son tu armadura para el mundo laboral.\"**"
    ),
    "timeline": (
        "⏳ *Entras a una sala circular. El techo es un cielo estrellado con fechas flotando. "
        "El guardián del tiempo habla:*\n\n"
        "**\"El semestre tiene un mapa. Quienes ignoran las fechas... las fechas los devoran. "
        "Aprende cuándo ocurre cada evento o tu aventura terminará antes de tiempo.\"**"
    ),
}

# ─────────────────────────────────────────────────────────────
#  ESTADO DE SESIÓN
# ─────────────────────────────────────────────────────────────
SECCIONES = ["camara", "oraculo", "skills", "timeline"]

def init():
    if "desbloqueado" not in st.session_state:
        # Solo la primera sección empieza abierta
        st.session_state.desbloqueado = {
            "camara": True, "oraculo": False, "skills": False, "timeline": False
        }
    if "completado" not in st.session_state:
        st.session_state.completado = {s: False for s in SECCIONES}
    if "quiz_preguntas" not in st.session_state:
        st.session_state.quiz_preguntas = {}
    if "quiz_respuestas" not in st.session_state:
        st.session_state.quiz_respuestas = {}
    if "quiz_verificado" not in st.session_state:
        st.session_state.quiz_verificado = {}
    if "quiz_paso" not in st.session_state:
        st.session_state.quiz_paso = {}

init()

# ─────────────────────────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────────────────────────
def cargar_quiz(sec, nuevas=False):
    """Carga 2 preguntas aleatorias para la sección (evita repetir si nuevas=True)."""
    usadas = set()
    if nuevas and sec in st.session_state.quiz_preguntas:
        usadas = {q["p"] for q in st.session_state.quiz_preguntas[sec]}
    pool = [q for q in BANCO[sec] if q["p"] not in usadas]
    if len(pool) < 2:
        pool = BANCO[sec]
    elegidas = random.sample(pool, 2)
    st.session_state.quiz_preguntas[sec] = elegidas
    st.session_state.quiz_respuestas[sec] = {0: None, 1: None}
    st.session_state.quiz_verificado[sec] = False
    st.session_state.quiz_paso[sec] = False

def desbloquear_siguiente(sec):
    idx = SECCIONES.index(sec)
    if idx + 1 < len(SECCIONES):
        siguiente = SECCIONES[idx + 1]
        st.session_state.desbloqueado[siguiente] = True

# ─────────────────────────────────────────────────────────────
#  COMPONENTE QUIZ
# ─────────────────────────────────────────────────────────────
def render_quiz(sec):
    """Muestra las 2 preguntas, verifica respuestas y maneja el check de compromiso."""

    if st.session_state.completado[sec]:
        st.success("✅ Sección completada. ¡Compromiso registrado!")
        return

    # Cargar preguntas si no existen
    if sec not in st.session_state.quiz_preguntas:
        cargar_quiz(sec)

    preguntas  = st.session_state.quiz_preguntas[sec]
    respuestas = st.session_state.quiz_respuestas[sec]
    verificado = st.session_state.quiz_verificado.get(sec, False)
    paso       = st.session_state.quiz_paso.get(sec, False)

    st.divider()
    st.markdown("### 🧠 Quiz de Desbloqueo")
    st.caption("Responde correctamente las **2 preguntas** para acceder al Check de Compromiso.")

    col1, col2 = st.columns(2)
    cols = [col1, col2]

    for i, q in enumerate(preguntas):
        with cols[i]:
            st.markdown(f"**Pregunta {i+1}:**")
            st.markdown(f"*{q['p']}*")

            if not verificado:
                sel = st.radio(
                    label=f"Elige una opción (P{i+1})",
                    options=q["ops"],
                    key=f"radio_{sec}_{i}_{q['p'][:20]}",
                    index=None,
                    label_visibility="collapsed",
                )
                if sel:
                    st.session_state.quiz_respuestas[sec][i] = sel
            else:
                # Mostrar resultado visual
                user_ans = respuestas.get(i)
                if user_ans == q["ok"]:
                    st.success(f"✓ {user_ans}")
                else:
                    st.error(f"✗ Tu respuesta: {user_ans}")
                    st.info(f"Respuesta correcta: **{q['ok']}**")
                st.caption(f"💡 {q['exp']}")

    # Botón verificar
    if not verificado:
        reps = st.session_state.quiz_respuestas[sec]
        todo_respondido = all(reps.get(i) is not None for i in range(2))

        if st.button(
            "✔ Verificar respuestas",
            key=f"verificar_{sec}",
            disabled=not todo_respondido,
        ):
            st.session_state.quiz_verificado[sec] = True
            correctas = sum(
                1 for i, q in enumerate(preguntas)
                if reps.get(i) == q["ok"]
            )
            st.session_state.quiz_paso[sec] = (correctas == 2)
            st.rerun()

    # Resultado tras verificar
    if verificado:
        if paso:
            st.success("🎉 ¡Quiz superado! Marca el Check de Compromiso para continuar.")
            st.divider()

            # CHECK DE COMPROMISO
            st.markdown("### ✍️ Check de Compromiso")
            st.markdown(
                "_Para desbloquear la siguiente zona debes comprometerte con el contenido de esta sección._"
            )
            check = st.checkbox(
                "☑ Me comprometo a conocer y respetar el contenido de esta sección durante el cuatrimestre.",
                key=f"check_{sec}",
            )
            if check:
                if st.button(
                    "🔓 Confirmar compromiso y desbloquear siguiente →",
                    key=f"commit_{sec}",
                ):
                    st.session_state.completado[sec] = True
                    desbloquear_siguiente(sec)
                    st.balloons()
                    st.rerun()
        else:
            st.error("✗ Necesitas las **2 respuestas correctas**. Lee las explicaciones e intenta de nuevo.")
            if st.button(
                "↺ Intentar con nuevas preguntas",
                key=f"retry_{sec}",
            ):
                cargar_quiz(sec, nuevas=True)
                st.rerun()

# ─────────────────────────────────────────────────────────────
#  SIDEBAR
# ─────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## 📱 El Reto Móvil")
    st.markdown("*Programación Móvil · Grupo 206*")
    st.divider()
    st.markdown("**Lugares a explorar:**")

    nombres_menu = {
        "inicio":    "🏠 Inicio",
        "camara":    "🏰 La Cámara de las Reglas",
        "oraculo":   "🔮 El Oráculo de las Notas",
        "skills":    "⚡ Skills a Desbloquear",
        "timeline":  "⏳ La Línea del Tiempo",
    }

    opciones_visibles = ["inicio"] + SECCIONES
    etiquetas = [nombres_menu[k] for k in opciones_visibles]

    sel_label = st.radio(
        "nav",
        etiquetas,
        label_visibility="collapsed",
        key="nav_radio",
    )
    seleccion = opciones_visibles[etiquetas.index(sel_label)]

    st.divider()
    st.markdown("**Estado de zonas:**")
    iconos_estado = {"camara": "🏰", "oraculo": "🔮", "skills": "⚡", "timeline": "⏳"}
    for sec in SECCIONES:
        if st.session_state.completado[sec]:
            st.markdown(f"{iconos_estado[sec]} ~~{nombres_menu[sec][2:]}~~ ✅")
        elif st.session_state.desbloqueado[sec]:
            st.markdown(f"{iconos_estado[sec]} **{nombres_menu[sec][2:]}** 🔓")
        else:
            st.markdown(f"🔒 ~~{nombres_menu[sec][2:]}~~")

    completadas = sum(1 for s in SECCIONES if st.session_state.completado[s])
    st.divider()
    st.progress(completadas / 4, text=f"Progreso: {completadas} / 4 zonas")
    st.divider()
    st.caption("👨‍🏫 Ivan Isay Guerra Lopez")
    st.caption("📧 ivan.guerra@upq.edu.mx")

# ─────────────────────────────────────────────────────────────
#  PÁGINAS
# ─────────────────────────────────────────────────────────────

# ── INICIO ────────────────────────────────────────────────────
if seleccion == "inicio":

    # Mensaje de bienvenida tipo aventura de texto
    st.markdown("""
    <div style="
        background: linear-gradient(135deg, #1a0a0a 0%, #0c0c1e 100%);
        border: 1px solid #c0392b44;
        border-radius: 12px;
        padding: 42px 52px;
        margin-bottom: 28px;
    ">
        <p style="
            font-size: 11px;
            letter-spacing: 0.18em;
            color: #c0392b;
            text-transform: uppercase;
            margin-bottom: 14px;
        ">
            INGENIERÍA EN SISTEMAS COMPUTACIONALES · UPQ · GRUPO 206
        </p>
        <h1 style="
            font-family: 'Syne', sans-serif;
            font-size: 3rem;
            font-weight: 800;
            color: #e8eaf0;
            line-height: 1.1;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
        ">
            Survival Guide:<br>
            <span style="color: #c0392b;">El Reto Móvil.</span>
        </h1>
        <p style="
            font-size: 1.05rem;
            color: #8a8ca8;
            line-height: 1.8;
            max-width: 600px;
        ">
            Acabas de entrar a la carrera. Estás <strong style='color:#e8eaf0;'>completamente perdido</strong>.
            La materia de Programación Móvil te espera con reglas, fechas, evaluaciones y contenido
            que debes dominar para sobrevivir el semestre.<br><br>
            Este es tu mapa de supervivencia. Para avanzar en cada zona deberás
            <strong style='color:#e8eaf0;'>responder correctamente 2 preguntas</strong> y firmar un
            <strong style='color:#e8eaf0;'>Check de Compromiso</strong>. Solo entonces se desbloqueará la siguiente zona.
        </p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("#### Las 4 zonas que debes conquistar:")
    c1, c2, c3, c4 = st.columns(4)
    datos_zonas = [
        (c1, "🏰", "01", "La Cámara de las Reglas",  "Normas de convivencia y asistencia."),
        (c2, "🔮", "02", "El Oráculo de las Notas",   "Porcentajes de evaluación y parciales."),
        (c3, "⚡", "03", "Skills a Desbloquear",       "Objetivo general y contenido de la materia."),
        (c4, "⏳", "04", "La Línea del Tiempo",        "Fechas clave del semestre."),
    ]
    for col, icono, num, nombre, desc in datos_zonas:
        idx = int(num) - 1
        sec = SECCIONES[idx]
        if st.session_state.completado[sec]:
            borde = "#0d9488"
        elif st.session_state.desbloqueado[sec]:
            borde = "#c0392b"
        else:
            borde = "#1e2130"
        with col:
            st.markdown(f"""
            <div style="border:1px solid {borde}; border-radius:8px; padding:18px; min-height:150px;">
                <p style="font-family:monospace; font-size:10px; color:#4a4c62; margin:0 0 6px;">{num}</p>
                <p style="font-size:26px; margin:0 0 8px;">{icono}</p>
                <p style="font-size:13px; font-weight:700; color:#e8eaf0; margin:0 0 6px; line-height:1.3;">{nombre}</p>
                <p style="font-size:12px; color:#6a6c82; margin:0; line-height:1.4;">{desc}</p>
            </div>
            """, unsafe_allow_html=True)

    # Mensaje de victoria si todo está completo
    if all(st.session_state.completado[s] for s in SECCIONES):
        st.divider()
        st.balloons()
        st.markdown("""
        <div style="
            background: #0d948818;
            border: 1px solid #0d948855;
            border-radius: 12px;
            padding: 36px 44px;
            text-align: center;
            margin-top: 16px;
        ">
            <p style="font-size: 3.5rem; margin: 0 0 12px;">🏆</p>
            <h2 style="color: #0d9488; font-size: 2rem; margin-bottom: 12px; font-family: 'Syne', sans-serif;">
                ¡Misión Completada!
            </h2>
            <p style="color: #8a8ca8; font-size: 1rem; max-width: 480px; margin: 0 auto; line-height: 1.8;">
                Has conquistado las 4 zonas del Survival Guide. Conoces las reglas, las evaluaciones,
                los objetivos y el calendario de <strong style='color:#e8eaf0;'>Programación Móvil</strong>.
                ¡Estás listo para sobrevivir el semestre, Grupo 206!
            </p>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.info("👈 Usa el menú de la izquierda. Empieza por **🏰 La Cámara de las Reglas**.")

# ── CÁMARA DE LAS REGLAS ──────────────────────────────────────
elif seleccion == "camara":

    if not st.session_state.desbloqueado["camara"]:
        st.warning("🔒 Esta zona está bloqueada.")
        st.stop()

    # Narrativa
    st.markdown(NARRATIVA["camara"])
    st.divider()
    st.markdown("## 🏰 La Cámara de las Reglas")
    st.caption("REGLAMENTO — Normas de convivencia y asistencia.")

    col1, col2 = st.columns(2)
    with col1:
        st.markdown("**📋 Asistencia & Puntualidad**")
        st.markdown("""
- Mínimo **80 % de asistencia** para tener derecho a evaluación parcial.
- **10 minutos de tolerancia** al inicio (solo 7:00 am y 14:00 pm).
- Si llegas después de los 10 min: puedes quedarte pero **no se registra asistencia**.
- Faltas justificadas por correo institucional en **máximo 24 horas**.
- Solo se aceptan **recetas médicas y citatorios jurídicos** como justificante físico.
        """)
        st.markdown("**📚 Tareas & Trabajos**")
        st.markdown("""
- Subir tareas a **Google Classroom** de forma individual.
- **No se reciben trabajos extemporáneos** sin justificante validado.
- Usar el **correo institucional** en la plataforma.
- **Plagio o copia** = reprobar la asignatura + reporte al área.
- Deshonestidad académica = reprobar el parcial **sin derecho a examen final**.
        """)
    with col2:
        st.markdown("**🚫 Conducta en Clase**")
        st.markdown("""
- Prohibido el uso de **audífonos**.
- Prohibido **comer y/o tomar líquidos** en el salón.
- Prohibido **sentarse en las mesas** o columpiarse en las sillas.
- Laptops y móviles: solo para **actividades que lo requieran**.
        """)
        st.markdown("**⚠️ Disciplina**")
        st.markdown("""
- 1ª falta de respeto: **llamada de atención**.
- Si ignora la llamada: **abandonar el aula**.
- **3 incidencias** = sin derecho a examen final o parcial.
- Ruta de problemas: alumno → docente → tutor → coordinación → dirección.
- El reglamento entra en vigor tras ser aceptado por el **50 % + jefe de grupo**.
        """)

    render_quiz("camara")

# ── ORÁCULO DE LAS NOTAS ──────────────────────────────────────
elif seleccion == "oraculo":

    if not st.session_state.desbloqueado["oraculo"]:
        st.warning("🔒 Esta zona está bloqueada. Primero completa **La Cámara de las Reglas**.")
        st.stop()

    st.markdown(NARRATIVA["oraculo"])
    st.divider()
    st.markdown("## 🔮 El Oráculo de las Notas")
    st.caption("EVALUACIÓN — Porcentajes de evaluación y fechas clave.")

    st.markdown("**📊 Tabla de Evaluación por Parcial**")
    col_h, col1, col2, col3 = st.columns([2, 1, 1, 1])
    with col_h: st.markdown("**Evidencia**")
    with col1:  st.markdown("**1er Parcial**")
    with col2:  st.markdown("**2do Parcial**")
    with col3:  st.markdown("**3er Parcial**")

    filas = [
        ("Evidencia de Conocimiento", "40 %", "40 %", "10 %"),
        ("Evidencia de Desempeño",    "20 %", "20 %", "10 %"),
        ("Evidencia de Producto",     "30 %", "30 %", "30 %"),
        ("Proyecto Integrador",       "10 %", "10 %", "**50 % ⚠️**"),
    ]
    for nombre, p1, p2, p3 in filas:
        c0, c1, c2, c3 = st.columns([2, 1, 1, 1])
        with c0: st.markdown(nombre)
        with c1: st.markdown(p1)
        with c2: st.markdown(p2)
        with c3: st.markdown(p3)

    st.divider()
    col_a, col_b = st.columns(2)
    with col_a:
        st.markdown("**📅 Fechas de Evaluación**")
        st.markdown("""
| Evaluación    | Fecha      |
|---------------|------------|
| 1er Parcial   | 02-06-26   |
| 2do Parcial   | 07-07-26   |
| 3er Parcial   | 11-08-26   |
| Examen Final  | 17-08-26   |
        """)
    with col_b:
        st.markdown("**💡 Consejo del Oráculo**")
        st.info(
            "El Proyecto Integrador vale **50 %** en el 3er parcial. "
            "Si no lo empiezas desde el día 1, no podrás sobrevivir. "
            "Los exámenes pierden peso al final — enfoca tu energía en el proyecto."
        )
        st.markdown("📧 `ivan.guerra@upq.edu.mx`")

    render_quiz("oraculo")

# ── SKILLS A DESBLOQUEAR ──────────────────────────────────────
elif seleccion == "skills":

    if not st.session_state.desbloqueado["skills"]:
        st.warning("🔒 Esta zona está bloqueada. Primero completa **El Oráculo de las Notas**.")
        st.stop()

    st.markdown(NARRATIVA["skills"])
    st.divider()
    st.markdown("## ⚡ Skills a Desbloquear")
    st.caption("OBJETIVOS — Lo que aprenderás y las competencias que desarrollarás.")

    col1, col2 = st.columns(2)
    with col1:
        st.markdown("**🎯 Objetivo General**")
        st.markdown("""
Desarrollar aplicaciones móviles mediante:
- **Lenguajes de programación** y entornos de desarrollo.
- **Diseño de interfaces de usuario** para apps móviles.
- **Arquitecturas y patrones de diseño** en proyectos reales.
- Herramientas profesionales de **programación móvil**.
        """)
        st.markdown("**🏆 Competencias Específicas**")
        st.markdown("""
- Estructurar apps móviles en entornos de desarrollo para **visualizar infraestructura, recursos y tiempos**.
- Desarrollar apps en dispositivos móviles para la **integración de soluciones**.
- Desarrollar **apps innovadoras** empleando técnicas y recursos de programación móvil.
        """)
    with col2:
        st.markdown("**📚 Unidades de Aprendizaje**")
        st.markdown("""
| # | Unidad | Teoría | Práctica |
|---|--------|--------|----------|
| I | Introducción al desarrollo apps móviles | 10 h | 8 h |
| II | Diseño de aplicaciones móviles | 10 h | 14 h |
| III | Programación de aplicaciones móviles | 12 h | 24 h |
| IV | Publicación de aplicaciones móviles | 4 h | 8 h |
| **∑** | **Total cuatrimestre** | **36 h** | **54 h** |
        """)
        st.markdown("**🔧 Recursos**")
        st.markdown("""
- Framework: **React Native**
- Docs: `reactnative.dev/docs/components-and-apis`
- Plataforma: **Google Classroom**
        """)

    render_quiz("skills")

# ── LÍNEA DEL TIEMPO ──────────────────────────────────────────
elif seleccion == "timeline":

    if not st.session_state.desbloqueado["timeline"]:
        st.warning("🔒 Esta zona está bloqueada. Primero completa **Skills a Desbloquear**.")
        st.stop()

    st.markdown(NARRATIVA["timeline"])
    st.divider()
    st.markdown("## ⏳ La Línea del Tiempo")
    st.caption("CALENDARIO — Mapa temporal Mayo–Agosto 2026 · Grupo 206.")

    eventos = [
        ("04 May",  "🟢", "normal", "Inicio del Cuatrimestre",              "Semana 1 — Unidad I: Fundamentos y entornos de desarrollo móvil"),
        ("02 Jun",  "🔴", "exam",   "1er Parcial",                           "Conocimiento 40% · Desempeño 20% · Producto 30% · PI 10%"),
        ("08 Jun",  "🟢", "normal", "Unidad II: Diseño de Aplicaciones",     "Interfaz de usuario · Apps móviles · Servicios y notificaciones"),
        ("07 Jul",  "🔴", "exam",   "2do Parcial",                           "Conocimiento 40% · Desempeño 20% · Producto 30% · PI 10%"),
        ("13 Jul",  "🟢", "normal", "Unidad III: Programación de Apps",      "Gestión de sensores · Prácticas de proyecto"),
        ("20 Jul",  "🟡", "recess", "Receso Académico",                      "20 al 24 de julio — continúa trabajando en el Proyecto Integrador"),
        ("27 Jul",  "🟢", "normal", "Unidad IV: Publicación de Apps",        "Herramientas para empaquetado y despliegue"),
        ("11 Ago",  "🔴", "exam",   "3er Parcial",                           "⚠ Proyecto Integrador vale 50 % — aquí se define el semestre"),
        ("17 Ago",  "🏁", "final",  "FINALES",                               "Fin del cuatrimestre — ¡Has sobrevivido El Reto Móvil!"),
    ]

    for fecha, icono, tipo, titulo, desc in eventos:
        col_f, col_i, col_txt = st.columns([0.8, 0.3, 6])
        with col_f:
            st.markdown(
                f"<span style='font-family:monospace; font-size:12px; color:#5a5c72;'>{fecha}</span>",
                unsafe_allow_html=True,
            )
        with col_i:
            st.markdown(icono)
        with col_txt:
            if tipo == "exam":
                st.markdown(f"**{titulo}** 🔴")
            elif tipo == "recess":
                st.markdown(f"**{titulo}** ☀️")
            elif tipo == "final":
                st.markdown(f"**{titulo}** 🏁")
            else:
                st.markdown(f"**{titulo}**")
            st.caption(desc)
        st.markdown("<div style='height:2px'></div>", unsafe_allow_html=True)

    render_quiz("timeline")