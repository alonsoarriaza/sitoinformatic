import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// Importación de recursos visuales para el proyecto
import imgHardware from "../assets/images/hardware-tecnico.png";
import imgIA from "../assets/images/ai-red.png";
import imgRendimiento from "../assets/images/setup-streamer.png";

const Home = () => {
  const navigate = useNavigate();

  // Gestión del desplazamiento suave para facilitar la lectura de las secciones informativas
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <header style={styles.hero}>
        <div style={styles.branding}>
          <div style={styles.logoSquare}>SI</div>
          <h1 style={styles.mainTitle}>
            <span style={styles.whiteLetter}>S</span>ito<span style={styles.highlight}>Informatic</span>
          </h1>
        </div>
        
        <div style={styles.introWrapper}>
          <p style={styles.mainDescription}>
            Liderando la nueva era de la computación personalizada. En SitoInformatic, 
            combinamos la ingeniería de hardware más avanzada con algoritmos de inteligencia artificial 
            de última generación para diseñar ecosistemas digitales que desafían los límites.
          </p>
        </div>

        <div style={styles.cardContainer}>
          <div style={styles.navCard} onClick={() => scrollToSection("hardware")}>
            <span style={styles.icon}>⚙️</span>
            <h3>Hardware de Élite</h3>
            <p>Explora nuestra selección de componentes de grado entusiasta.</p>
            <button style={styles.anchorBtn}>SABER MÁS ↓</button>
          </div>

          <div style={styles.navCard} onClick={() => scrollToSection("ia")}>
            <span style={styles.icon}>🤖</span>
            <h3>Asistente Inteligente</h3>
            <p>Optimización predictiva para una inversión inteligente.</p>
            <button style={styles.anchorBtn}>SABER MÁS ↓</button>
          </div>

          <div style={styles.navCard} onClick={() => scrollToSection("rendimiento")}>
            <span style={styles.icon}>🚀</span>
            <h3>Rendimiento Total</h3>
            <p>Sistemas configurados para el gaming y renderizado profesional.</p>
            <button style={styles.anchorBtn}>SABER MÁS ↓</button>
          </div>
        </div>
      </header>

      {/* Sección 1: HARDWARE (Texto Ampliado) */}
      <section id="hardware" style={styles.detailSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.textContent}>
            <h2 style={styles.sectionTitle}>Una Selección de Hardware sin Precedentes</h2>
            <p style={styles.text}>
              En SitoInformatic no vemos el hardware como simples componentes electrónicos. 
              Para nosotros, cada pieza es el motor que impulsa tus proyectos, tus victorias en el juego y tu productividad diaria. 
              Realizamos una curación exhaustiva de cada componente para asegurar que cumplan con los estándares más altos de calidad.
            </p>
            <p style={styles.text}>
              Contamos con una base de datos de más de <strong>sesenta componentes</strong> actualizados en tiempo real. 
              Desde procesadores con las últimas arquitecturas hasta unidades de almacenamiento NVMe de alta velocidad, 
              verificamos no solo la potencia bruta, sino también la eficiencia energética y la fiabilidad de los fabricantes.
            </p>
            <p style={styles.text}>
              Nuestro catálogo se somete a pruebas periódicas de estrés para descartar cualquier pieza que presente tasas de fallo por encima de la media, 
              garantizando que tu inversión sea segura y duradera a lo largo de los años.
            </p>
            <button style={styles.navBtn} onClick={() => navigate("/catalogo")}>Explorar Catálogo →</button>
          </div>
          <div style={styles.imageWrapper}>
            <img src={imgHardware} alt="Técnico analizando hardware" style={styles.image} />
          </div>
        </div>
      </section>

      {/* Sección 2: IA (Texto Original Solicitado) */}
      <section id="ia" style={styles.detailSectionReverse}>
        <div style={styles.contentWrapper}>
          <div style={styles.imageWrapper}>
            <img src={imgIA} alt="Simulación de IA" style={styles.image} />
          </div>
          <div style={styles.textContent}>
            <h2 style={styles.sectionTitle}>Inteligencia al Servicio de tu Rendimiento</h2>
            <p style={styles.text}>
              Nuestro configurador avanzado utiliza algoritmos de optimización para equilibrar presupuesto y potencia, 
              asegurando que cada euro invertido se traduzca en fluidez de trabajo y una experiencia de usuario sin interrupciones.
            </p>
            <p style={styles.text}>
              El sistema analiza automáticamente la compatibilidad entre componentes y detecta posibles cuellos de botella técnicos antes de que realices tu compra, 
              evitando errores comunes en el ensamblaje y garantizando una armonía total entre el hardware seleccionado.
            </p>
            <button style={styles.navBtn} onClick={() => navigate("/configurador")}>Probar Configurador IA →</button>
          </div>
        </div>
      </section>

      {/* Sección 3: RENDIMIENTO (Texto Ampliado) */}
      <section id="rendimiento" style={styles.detailSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.textContent}>
            <h2 style={styles.sectionTitle}>Rendimiento Total y Estabilidad Extrema</h2>
            <p style={styles.text}>
              Entendemos que la potencia sin control no sirve de nada. Por ello, cada configuración de SitoInformatic 
              está optimizada para ofrecer una curva de ventilación silenciosa y eficiente, manteniendo las temperaturas bajas 
              incluso bajo las cargas de trabajo más exigentes, como el renderizado 3D o el gaming en 4K.
            </p>
            <p style={styles.text}>
              Nuestros setups están diseñados para profesionales que exigen el 100% de su hardware 24/7. 
              Implementamos perfiles de memoria optimizados y configuraciones de BIOS que maximizan la estabilidad del sistema, 
              reduciendo drásticamente los tiempos de latencia y eliminando cierres inesperados.
            </p>
            <p style={styles.text}>
              Cuidamos cada detalle, desde la gestión inteligente del cableado para favorecer el flujo de aire interno hasta 
              la selección de fuentes de alimentación con certificación de alta eficiencia, para que solo tengas que preocuparte 
              de crear y competir al más alto nivel.
            </p>
          </div>
          <div style={styles.imageWrapper}>
            <img src={imgRendimiento} alt="Setup de alto rendimiento" style={styles.image} />
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2026 SitoInformatic - Proyecto TFG enfocado a la Excelencia Tecnológica</p>
      </footer>
    </div>
  );
};

// Estilos visuales para mantener la estructura profesional y simétrica
const styles = {
  container: { backgroundColor: "#020617", color: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" },
  hero: { padding: "180px 20px", textAlign: "center", background: "radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)" },
  branding: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" },
  logoSquare: { width: "80px", height: "80px", border: "4px solid #3b82f6", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", fontWeight: "900", marginBottom: "20px", boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)" },
  mainTitle: { fontSize: "5.5rem", fontWeight: "900", margin: 0, letterSpacing: "-3px" },
  whiteLetter: { color: "#ffffff" },
  highlight: { color: "#3b82f6", textShadow: "0 0 30px rgba(59, 130, 246, 0.5)" },
  introWrapper: { maxWidth: "1000px", margin: "0 auto 80px" },
  mainDescription: { fontSize: "1.5rem", color: "#cbd5e1", lineHeight: "1.6", fontWeight: "300" },
  cardContainer: { display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", maxWidth: "1300px", margin: "0 auto" },
  navCard: { backgroundColor: "rgba(15, 23, 42, 0.8)", padding: "40px", borderRadius: "24px", width: "320px", border: "1px solid #1e293b", textAlign: "center", cursor: "pointer" },
  icon: { fontSize: "3rem", display: "block", marginBottom: "20px" },
  anchorBtn: { backgroundColor: "transparent", border: "none", color: "#3b82f6", fontWeight: "bold", marginTop: "20px" },
  detailSection: { padding: "180px 20px", maxWidth: "1400px", margin: "0 auto" },
  detailSectionReverse: { padding: "180px 20px", backgroundColor: "#0f172a" },
  contentWrapper: { display: "flex", alignItems: "center", gap: "100px", flexWrap: "wrap" },
  textContent: { flex: "1.2", minWidth: "450px" },
  sectionTitle: { fontSize: "3rem", fontWeight: "800", marginBottom: "35px" },
  text: { fontSize: "1.25rem", lineHeight: "1.9", color: "#94a3b8", marginBottom: "25px" },
  navBtn: { padding: "12px 24px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" },
  imageWrapper: { flex: "1", minWidth: "450px", display: "flex", justifyContent: "center" },
  image: { width: "100%", maxWidth: "600px", borderRadius: "30px", border: "1px solid #1e293b", boxShadow: "0 30px 60px rgba(0,0,0,0.6)" },
  footer: { padding: "100px", textAlign: "center", borderTop: "1px solid #1e293b", color: "#475569" }
};

export default Home;