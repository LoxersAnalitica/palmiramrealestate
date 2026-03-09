import { useState, useEffect } from 'react'
import './index.css'

/* ─── Icons (Inline SVGs) ─────────────────────────────────── */

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const DiamondIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

/* ─── Header ─────────────────────────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          Palmiram Real Estate
        </div>
        <div className="contact-nav">
          <a href="https://wa.me/34919934639?text=Hola,%20deseo%20solicitar%20acceso%20al%20portfolio%20Off-Market." target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>WhatsApp:</span> +34 919 934 639
          </a>
        </div>
      </div>
    </header>
  )
}

/* ─── Hero Section ───────────────────────────────────────── */

const KommoStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    /* Forzar estilos oscuros en el contenedor nativo y sus inner-divs */
    .amoforms-code-container,
    .amoforms_code_container {
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
      margin-top: 10px !important;
    }

    /* Ocultar el título/encabezado por defecto que trae Kommo */
    .amoforms-header,
    .amoforms_header,
    .amoforms-title,
    .amoforms-form-subtitle {
       display: none !important;
    }

    /* Campos de entrada */
    .amoforms-input-inner,
    .amoforms-code-container input[type="text"],
    .amoforms-code-container input[type="tel"],
    .amoforms-code-container input[type="email"],
    .amoforms-code-container textarea,
    input.js-amoforms-input,
    .js-amoforms-input {
      background-color: rgba(255, 255, 255, 0.05) !important;
      border: none !important;
      border-bottom: 1px solid rgba(189, 165, 136, 0.4) !important;
      color: #ffffff !important;
      border-radius: 0px !important;
      padding: 14px 10px !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
      box-shadow: none !important;
      transition: all 0.3s ease !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }

    .amoforms-input-inner:focus,
    .js-amoforms-input:focus {
      border-bottom: 1px solid #bda588 !important;
      background-color: rgba(255, 255, 255, 0.08) !important;
      outline: none !important;
      box-shadow: none !important;
    }

    /* Etiquetas / Labels */
    .amoforms-label,
    .amoforms_label,
    .js-amoforms-label {
      color: #999999 !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 11px !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      font-weight: 300 !important;
      margin-bottom: 6px !important;
      display: block !important;
    }

    /* Botón Cancel/Enviar */
    .amoforms-action-btn,
    .amoforms_action_btn,
    button[type="submit"].amoforms-action-btn,
    .js-amoforms-submit {
      background-color: #111111 !important;
      border: 1px solid #bda588 !important;
      color: #bda588 !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      font-weight: 400 !important;
      border-radius: 2px !important;
      padding: 18px 30px !important;
      transition: all 0.3s ease !important;
      width: 100% !important;
      margin-top: 20px !important;
      box-shadow: none !important;
      cursor: pointer !important;
      box-sizing: border-box !important;
    }

    .amoforms-action-btn:hover,
    button[type="submit"].amoforms-action-btn:hover,
    .js-amoforms-submit:hover {
      background-color: #bda588 !important;
      color: #000000 !important;
      box-shadow: 0 0 15px rgba(189, 165, 136, 0.2) !important;
    }

    /* Ocultar enlace Energizado por Kommo si lo permite */
    .amoforms-powered-by,
    .amoforms_powered_by,
    .js-powered-by {
      opacity: 0.3 !important;
      filter: grayscale(100%) !important;
    }
    
    /* Si el input agrupa label, quitar fondos */
    .amoforms-form-field {
      background: transparent !important;
      border: none !important;
    }
  `}} />
)

function Hero() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Por favor, rellene todos los campos para solicitar acceso.")
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/kommo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        })
      })

      if (response.ok) {
        setStatus('success')
        // No borramos formData inmediatamente para que el fade-out no se vea brusco si quisieramos re-usarlo, pero en este UX desaparece.
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error enviando formulario:', error)
      setStatus('error')
    }
  }

  return (
    <section className="hero">
      <img src="/hero-bg.png" alt="Luxury Madrid Living Room" className="hero-bg" />
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="hero-text-area">
          <h1 className="hero-h1">
            El <span className="text-gold font-serif">70%</span> de las mejores propiedades del Barrio de Salamanca nunca se publican en internet.
          </h1>
          <p className="hero-subtitle">
            Accede a nuestra cartera privada de propiedades Off-Market. Discreción absoluta y acceso exclusivo antes de que salgan al mercado público.
          </p>
        </div>

        <div className="glass-box">
          <KommoStyles />
          <h2 className="glass-box-title">Solicitar Acceso al Portfolio Privado</h2>
          <p className="glass-box-desc">Formulario de acceso</p>

          <div style={{ position: 'relative', minHeight: '300px' }}>
            {/* Success Message */}
            <div
              className={`success-message-container ${status === 'success' ? 'visible' : ''}`}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: status === 'success' ? 1 : 0,
                visibility: status === 'success' ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease, visibility 0.8s ease',
                zIndex: status === 'success' ? 10 : -1
              }}
            >
              <h3 style={{
                color: 'var(--accent-gold)',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                textAlign: 'center',
                lineHeight: '1.6',
                fontStyle: 'italic',
                fontWeight: '400'
              }}>
                Acceso solicitado con éxito.<br />Nos pondremos en contacto con usted desde nuestra línea privada.
              </h3>
            </div>

            {/* Form */}
            <form
              className="amoforms-code-container"
              style={{
                marginTop: '10px',
                opacity: status === 'success' ? 0 : 1,
                visibility: status === 'success' ? 'hidden' : 'visible',
                transition: 'opacity 0.5s ease, visibility 0.5s ease',
                position: 'relative',
                zIndex: status === 'success' ? -1 : 10
              }}
              onSubmit={handleSubmit}
            >
              <div style={{ marginBottom: '15px' }}>
                <label className="amoforms-label">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="amoforms-input-inner"
                  disabled={status === 'submitting'}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label className="amoforms-label">Teléfono Móvil</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="amoforms-input-inner"
                  disabled={status === 'submitting'}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label className="amoforms-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="amoforms-input-inner"
                  disabled={status === 'submitting'}
                  required
                />
              </div>

              {status === 'error' && (
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', marginBottom: '15px', opacity: 0.8 }}>
                  No se pudo procesar la solicitud en este momento. Por favor, inténtelo de nuevo.
                </p>
              )}

              <button type="submit" className="amoforms-action-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Verificando acceso...' : 'Solicitar Acceso Privado'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits Section ───────────────────────────────────── */

function Benefits() {
  return (
    <section className="benefits">
      <div className="container benefits-grid">
        <div className="benefit-card">
          <div className="benefit-icon">
            <KeyIcon />
          </div>
          <h3 className="benefit-title">Acceso Anticipado</h3>
          <p className="benefit-desc">
            Descubre joyas arquitectónicas antes de que lleguen a las agencias tradicionales.
          </p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">
            <ShieldIcon />
          </div>
          <h3 className="benefit-title">Máxima Discreción</h3>
          <p className="benefit-desc">
            Transacciones confidenciales para vendedores y compradores de alto perfil.
          </p>
        </div>

        <div className="benefit-card">
          <div className="benefit-icon">
            <DiamondIcon />
          </div>
          <h3 className="benefit-title">Filtro de Calidad</h3>
          <p className="benefit-desc">
            Solo propiedades premium en Recoletos, Castellana y Jerónimos.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Value Add Section ──────────────────────────────────── */

function ValueAdd() {
  return (
    <section className="value-add">
      <div className="container value-add-content">
        <div>
          <p className="value-add-subtitle">El Valor de Palmiram</p>
          <h2 className="value-add-title">Inversiones Inmobiliarias con Sentido y Discreción</h2>
          <p className="value-add-text">
            En Palmiram Real Estate no solo encontramos propiedades; creamos oportunidades únicas en el barrio de Salamanca y zonas prime de Madrid. Nuestro conocimiento del mercado "off-market" nos permite acceder a activos antes de que sean públicos, ofreciendo una ventaja competitiva inigualable a nuestros inversores.
          </p>
          <ul className="value-add-list">
            <li className="value-add-item">
              <div className="value-add-item-icon"><CheckCircleIcon /></div>
              <div>
                <h4 className="value-add-item-title">Operaciones sin intermediarios</h4>
                <p className="value-add-item-text">Trato directo con los propietarios de los mejores activos de la capital, garantizando rentabilidad y confidencialidad.</p>
              </div>
            </li>
            <li className="value-add-item">
              <div className="value-add-item-icon"><CheckCircleIcon /></div>
              <div>
                <h4 className="value-add-item-title">Estructura Legal y Fiscal</h4>
                <p className="value-add-item-text">Acompañamiento integral en todo el proceso de adquisición, due diligence y estructuración de la inversión.</p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div style={{ padding: '60px', border: '1px solid rgba(189, 165, 136, 0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '30px', height: '30px', borderTop: '2px solid #bda588', borderLeft: '2px solid #bda588' }}></div>
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '30px', height: '30px', borderBottom: '2px solid #bda588', borderRight: '2px solid #bda588' }}></div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', textAlign: 'center', fontWeight: '400', fontStyle: 'italic', marginBottom: '1rem' }}>
              "La discreción es nuestra mayor virtud, y la rentabilidad, nuestro principal objetivo."
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--accent-gold)', textAlign: 'center', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>— Palmiram Private Wealth</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ Section ────────────────────────────────────────── */

const faqs = [
  {
    category: "Inversión",
    question: "¿Qué significa exactamente una propiedad 'Off-Market'?",
    answer: "Una propiedad 'Off-Market' es aquel activo inmobiliario que se encuentra a la venta pero no se anuncia en portales públicos ni agencias tradicionales. Suelen ser propiedades de alto standing cuyos dueños exigen máxima discreción. Al no ser públicas, evitan la especulación y ofrecen mejores márgenes de negociación."
  },
  {
    category: "Proceso",
    question: "¿Cómo funciona el proceso de acceso al portfolio privado?",
    answer: "Una vez complete nuestro formulario de acceso, nuestro equipo analizará su perfil de inversor. Si este se ajusta a nuestro portfolio, organizaremos una reunión o llamada confidencial para presentarle opciones que coincidan exactamente con sus criterios y capacidad de inversión."
  },
  {
    category: "Garantía",
    question: "¿Realizan Due Diligence de los edificios ofrecidos?",
    answer: "Sí. Cada activo en nuestra cartera privada ha pasado por un riguroso proceso de 'Due Diligence' técnica, urbanística, y legal. Presentamos el activo junto con un estudio de rentabilidad esperada, posibles reformas requeridas y cargas existentes, para que la decisión de inversión sea totalmente transparente y segura."
  },
  {
    category: "Localización",
    question: "¿Se limitan únicamente al Barrio de Salamanca?",
    answer: "Aunque nuestro principal enfoque y red de contactos más fuerte se encuentra en el Barrio de Salamanca (Recoletos, Castellana, Jerónimos), también gestionamos e intermediamos activos premium en otras zonas prime como Chamberí o el centro histórico, siempre que cumplan con nuestros estrictos estándares de calidad y rentabilidad."
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-header">
          <p className="value-add-subtitle">Preguntas Frecuentes</p>
          <h2 className="faq-title">Resolviendo sus Dudas</h2>
          <p className="faq-subtitle">Entendemos la complejidad del mercado prime. Aquí aclaramos las consultas más habituales de nuestros inversores.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <span className="faq-icon"><ChevronDownIcon /></span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" style={{ paddingBottom: '3rem' }}>
      <div className="container">
        <p className="footer-text" style={{ marginBottom: '1rem' }}>
          Atención exclusiva para inversores y compradores verificados.
          <span className="footer-phone">WhatsApp directo: +34 919 934 639</span>
        </p>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a
            href="/politica-de-privacidad"
            style={{
              color: 'var(--accent-gold)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              opacity: 0.8,
              transition: 'opacity 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.opacity = '1'}
            onMouseOut={(e) => e.target.style.opacity = '0.8'}
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ─── WhatsApp Floating Button ───────────────────────────── */

function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show button after a short delay for better entry animation
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/34919934639?text=Hola,%20deseo%20solicitar%20acceso%20al%20portfolio%20Off-Market."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`whatsapp-float ${visible ? 'visible' : ''}`}
    >
      <WhatsAppIcon />
    </a>
  )
}

/* ─── Privacy Policy Page ────────────────────────────────── */

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontSize: '2.5rem', marginBottom: '2rem' }}>
          Política de Privacidad
        </h1>

        <div style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8', fontSize: '0.95rem', opacity: 0.9 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            En <strong>Palmiram Real Estate</strong>, la discreción y la protección de los datos de nuestros clientes son fundamentales. La presente Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que obtenemos a través de nuestra plataforma.
          </p>

          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            1. Información que recopilamos
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Al solicitar acceso a nuestro portfolio Off-Market, recopilamos los datos estrictamente necesarios para verificar su idoneidad y poder ponernos en contacto con usted: Nombre completo, Teléfono y Correo electrónico.
          </p>

          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            2. Uso de la información
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Los datos proporcionados se utilizan exclusivamente para los siguientes fines:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '0.5rem' }}>
              <li>Evaluación inicial de su perfil de inversor.</li>
              <li>Comunicación directa para la presentación de activos Off-Market.</li>
              <li>Gestión de la relación comercial estrictamente confidencial.</li>
            </ul>
          </p>

          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            3. Tecnologías de Tracking y Terceros
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Utilizamos tecnologías estándar de análisis y marketing (como integraciones CRM y píxeles de medición cifrada) para optimizar nuestras campañas y entender la interacción con nuestro sitio. Los datos compartidos con estas plataformas (por ejemplo, Meta) se envían mediante procesos criptográficos seguros (Hashes SHA-256) para garantizar que la información en texto plano nunca sea expuesta o malversada.
          </p>

          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            4. Confidencialidad y Retención
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Nos comprometemos a no vender, alquilar ni compartir su información personal con terceros ajenos al proceso de intermediación inmobiliaria sin su consentimiento previo. Conservaremos sus datos durante el tiempo necesario para cumplir con las finalidades descritas o según lo requiera la legalidad vigente en España.
          </p>

          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 500 }}>
            5. Sus Derechos
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Usted tiene derecho a acceder, rectificar, limitar o solicitar la eliminación de sus datos personales en cualquier momento. Para ejercer estos derechos, puede ponerse en contacto con nosotros directamente a través de nuestro número de teléfono de atención o correo electrónico corporativo.
          </p>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(189, 165, 136, 0.2)' }}>
            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
              Fecha de última actualización: 9 de marzo de 2026.
            </p>
            <a href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--accent-gold)', textDecoration: 'none', borderBottom: '1px solid var(--accent-gold)', paddingBottom: '2px' }}>
              &larr; Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── App ─────────────────────────────────────────────────── */

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  if (currentPath === '/politica-de-privacidad') {
    return (
      <>
        <Header />
        <main>
          <PrivacyPolicy />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ValueAdd />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
