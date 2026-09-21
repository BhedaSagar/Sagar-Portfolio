import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf(filename):
    # Top & bottom margins set to 24pt to ensure exact 1-page fit
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=28,
        rightMargin=28,
        topMargin=24,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()
    
    # Custom 1-page optimized styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=19,
        alignment=1, # Center
        textColor=colors.HexColor('#0f172a')
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=1,
        textColor=colors.HexColor('#334155')
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11.5,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=4,
        spaceAfter=1,
        keepWithNext=True
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=colors.HexColor('#0f172a')
    )

    body_text = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.2,
        textColor=colors.HexColor('#1e293b')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.0,
        leftIndent=10,
        firstLineIndent=-7,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=1
    )

    story = []

    # Header
    story.append(Paragraph("Sagar Bheda", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("sagarbheda2004@gmail.com | +91 9875000720 | Junagadh, Gujarat, India", contact_style))
    story.append(Paragraph('LinkedIn: <font color="#0284c7">Sagar Bheda</font> | GitHub: <font color="#0284c7">BhedaSagar</font>', contact_style))
    story.append(Spacer(1, 3))

    def add_section_header(title):
        story.append(Paragraph(title, section_heading))
        story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#334155'), spaceAfter=2, spaceBefore=1))

    # SKILLS
    add_section_header("SKILLS")
    skills = [
        ("Backend:", "Node.js, Sails.js, Express.js, JavaScript, RESTful APIs, Microservices, Socket.io / WebSockets, Server-Sent Events (SSE)"),
        ("Databases:", "PostgreSQL, MongoDB (Aggregation), Redis (Caching), MySQL, SQL, Waterline ORM, pgvector"),
        ("Integrations:", "AWS SQS, Firebase / FCM, Apple APNs, Huawei Push Kit, SMS Gateway, Mapbox APIs"),
        ("Auth & Security:", "JWT, Firebase Auth, Google OAuth, OTP Verification, Role-Based Access Control (RBAC)"),
        ("AI / GenAI:", "RAG, LangChain, Ollama, Google Gemini API, LLMs, Semantic Search, Vector Embeddings, Prompt Engineering"),
        ("Languages & Frontend:", "JavaScript, TypeScript, Python, C, C++, React.js, Redux, DSA"),
        ("Tools:", "Git, GitHub, Postman")
    ]
    for label, val in skills:
        story.append(Paragraph(f"<b>{label}</b> {val}", body_text))

    story.append(Spacer(1, 3))

    # EXPERIENCE
    add_section_header("EXPERIENCE")
    story.append(Paragraph("<b>Junior Backend Developer | Zignuts Technolab, Gandhinagar | March 2025 – Present</b>", body_bold))
    story.append(Paragraph("<i>Online queue, appointment, and e-service ticketing platform for high-traffic environments such as hospitals and restaurants; 650,000 registered user accounts and 60+ services running behind a load balancer with horizontal scaling.</i>", body_text))
    story.append(Spacer(1, 2))

    exp_bullets = [
        "Built ticket lifecycle APIs (assign, transfer, serve, hold, complete) and SLA tracking, by implementing role-based workflows and permissions for agents (e-service, queue, appointment), supervisors, managers, merchants, and admins.",
        "Optimized high-traffic queue and ticket endpoints to ~200 ms response time, measured in Postman, by adding Redis caching, replacing slow Waterline ORM calls with native PostgreSQL queries, and using MongoDB aggregation pipelines.",
        "Delivered live queue feeds, ticket counts, and agent updates in real time for a high-traffic production platform, by building Socket.io/WebSocket event handling.",
        "Built push and persistent notifications for every stage of the ticket lifecycle (booking, processing, hold, and more) across Android, iOS, and Huawei devices, by integrating FCM, Apple APNs (including Live Activities), and Huawei Push Kit from the ground up.",
        "Remediated penetration-test findings in the annual year-end security cycle, securing all APIs by hardening JWT and Firebase authentication, OTP verification, password reset, and role-based permissions.",
        "Reduced failed external calls by ~90%, by adding validation, timeouts, and fallback handling around Mapbox location/distance APIs and SMS gateway integrations.",
        "Offloaded heavy workflows from the request path, by building asynchronous processing with AWS SQS, internal service-to-service APIs, and 10–15 scheduled background cron jobs.",
        "Resolved production and staging defects efficiently, typically within 1–2 hours (up to ~4 hours for complex issues), by analyzing logs, reproducing issues, and tracing root causes across API, database, cache, and queue layers; supported releases via migrations and environment configuration."
    ]
    for b in exp_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    story.append(Spacer(1, 3))

    # PROJECTS
    add_section_header("PROJECTS")
    story.append(Paragraph("<b>KnowledgeBase AI – RAG Document Intelligence Platform</b> (Node.js, Sails.js, LangChain, Ollama, pgvector)", body_bold))
    story.append(Paragraph("&bull; Built a RAG document assistant with document ingestion, text extraction, chunking, embeddings, and semantic/vector similarity search, returning contextual AI responses with source citations.", bullet_style))
    story.append(Paragraph("&bull; Streamed AI responses in real time using Server-Sent Events (SSE), with conversation history and document-aware retrieval.", bullet_style))
    story.append(Paragraph("&bull; Implemented JWT authentication, role-based access, document management, user feedback, and admin analytics; used Ollama for local LLM and embedding workflows, with pgvector for vector storage and MongoDB for application data.", bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph("<b>Buddy – The AI Partner (Chrome Extension)</b> (TypeScript, Node.js, MongoDB, Google Gemini API)", body_bold))
    story.append(Paragraph("&bull; Developed a full-stack Chrome extension integrated with the Google Gemini API, delivering real-time coding hints, AI chat assistance, quiz generation, and an intelligent code reviewer.", bullet_style))
    story.append(Paragraph("&bull; Added Google OAuth and email authentication, with MongoDB as the primary database.", bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph("<b>College Projects</b>", body_bold))
    story.append(Paragraph("&bull; <b>Automobile Customization and Modification Platform:</b> backend data handling, API integration, and system logic.", bullet_style))
    story.append(Paragraph("&bull; <b>Real-Time Chat Application (React.js, Socket.io):</b> group/private messaging, user management, and real-time communication.", bullet_style))

    story.append(Spacer(1, 3))

    # EDUCATION
    add_section_header("EDUCATION")
    story.append(Paragraph("<b>B.Tech – Information Technology</b> | Ganpat University, Mehsana | <b>8.74/10 CGPA</b> | July 2021 – July 2025", body_text))
    story.append(Paragraph("<b>H.S.C.</b> | Sorath International School, Junagadh | <b>86%</b> | June 2020 – June 2021", body_text))

    story.append(Spacer(1, 3))

    # LEADERSHIP
    add_section_header("LEADERSHIP")
    story.append(Paragraph("<b>Team Lead – Hackathon:</b> Led a team that built “Rewear”, a platform connecting clothing sellers and buyers to give used clothes a new life.", body_text))

    doc.build(story)
    print(f"Successfully generated {filename}")

if __name__ == '__main__':
    build_pdf(r"e:\Personal Portfolio\assets\Sagar_Bheda_Resume.pdf")
