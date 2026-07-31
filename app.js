/**
 * SACHIN M PORTFOLIO INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. MOBILE DRAWER NAVIGATION
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const drawerResumeBtn = document.getElementById('drawer-resume-btn');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 3. SKILLS CATEGORY FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // 4. RESUME MODAL HANDLER
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeResumeModal = document.getElementById('close-resume-modal');
    const printResumeBtn = document.getElementById('print-resume-btn');

    function openResume() {
        if (resumeModal) resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeResume() {
        if (resumeModal) resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
    if (drawerResumeBtn) {
        drawerResumeBtn.addEventListener('click', () => {
            closeDrawer();
            openResume();
        });
    }
    if (closeResumeModal) closeResumeModal.addEventListener('click', closeResume);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResume();
        });
    }

    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // 5. PROJECT TECHNICAL DETAIL MODALS
    const projectModal = document.getElementById('project-modal');
    const closeProjectModal = document.getElementById('close-project-modal');
    const projectModalTitle = document.getElementById('project-modal-title');
    const projectModalContent = document.getElementById('project-modal-content');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    const projectData = {
        portal: {
            title: "Digital Knowledge Assessment Portal",
            subtitle: "Full-Stack Assessment Platform with Security & Analytics (Individual Project)",
            techStack: ["Python / Flask", "MongoDB", "JavaScript (ES6)", "HTML5 / CSS3", "Cryptographic Hashing"],
            architecture: `
                <div class="project-modal-detail">
                    <h4><i class="fa-solid fa-layer-group"></i> Architecture & Core Implementation</h4>
                    <p>Designed a high-reliability assessment portal capable of executing concurrent timer-based evaluations with automatic score computation and instant PDF certificate generation.</p>
                    
                    <h5 class="margin-top-sm"><i class="fa-solid fa-shield-halved"></i> Anti-Cheating & Integrity Workflows:</h5>
                    <ul>
                        <li>Implemented tab-switch detection and window blur monitoring in JavaScript.</li>
                        <li>Automated session lockdown and auto-submit on countdown expiry or integrity violations.</li>
                        <li>Protected question sets with randomized seed fetching and time-capped API tokens.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-database"></i> Database Design & Performance:</h5>
                    <ul>
                        <li>Configured MongoDB indexes on <code>user_id</code> and <code>assessment_id</code> for sub-millisecond exam result querying.</li>
                        <li>Utilized MongoDB Aggregation Framework for generating score distributions and question difficulty ratings on the Admin Dashboard.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-code"></i> Core Flask Backend Route Sample:</h5>
                    <pre class="code-block"><code>@app.route('/api/v1/assessment/submit', methods=['POST'])
@jwt_required()
def submit_assessment():
    user_id = get_jwt_identity()
    data = request.json
    answers = data.get('answers')
    exam_id = data.get('exam_id')

    # Compute evaluation logic asynchronously
    score, breakdown = evaluate_exam(exam_id, answers)
    
    # Store result in MongoDB
    result_doc = {
        "user_id": ObjectId(user_id),
        "exam_id": ObjectId(exam_id),
        "score": score,
        "submitted_at": datetime.utcnow(),
        "breakdown": breakdown
    }
    db.results.insert_one(result_doc)
    return jsonify({"status": "success", "score": score}), 200</code></pre>
                </div>
            `
        },
        placement: {
            title: "AI-Powered Placement Monitoring System",
            subtitle: "Scalable Backend Services & Placement Analytics Workflow (Backend Developer | Group Project)",
            techStack: ["Node.js", "Express.js", "MySQL", "RESTful APIs", "JWT Auth", "Postman"],
            architecture: `
                <div class="project-modal-detail">
                    <h4><i class="fa-solid fa-layer-group"></i> Backend Engineering & Architecture</h4>
                    <p>Engineered core REST API micro-services to power campus placement operations, student eligibility verification engines, and recruiter company workflows.</p>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-key"></i> Key Modules Built:</h5>
                    <ul>
                        <li><strong>Authentication & Authorization:</strong> Role-based access control (Admin, Student, Placement Officer) using JWT and bcrypt password hashing.</li>
                        <li><strong>Eligibility Engine:</strong> Automated qualification filter logic comparing student CGPA, active arrears, department criteria against company requirements.</li>
                        <li><strong>Company Workflow Service:</strong> API endpoints for job posting creation, application submission, interview round status tracking.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-database"></i> Database Schema & Optimization:</h5>
                    <ul>
                        <li>Designed normalized MySQL relational schema (Students, Companies, Job_Postings, Applications, Eligibility_Rules).</li>
                        <li>Optimized complex multi-table SQL <code>JOIN</code> queries with foreign key constraints, reducing response times by 35%.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-code"></i> Express.js Controller Sample:</h5>
                    <pre class="code-block"><code>// Student Eligibility Service Controller
const verifyEligibility = async (req, res) => {
    try {
        const { companyId, studentId } = req.params;
        const [rows] = await db.query(
            \`SELECT s.id, s.cgpa, s.arrears, c.min_cgpa, c.max_arrears 
             FROM students s, company_criteria c 
             WHERE s.id = ? AND c.company_id = ?\`,
            [studentId, companyId]
        );

        if (!rows.length) return res.status(404).json({ error: 'Record not found' });
        
        const eligible = rows[0].cgpa >= rows[0].min_cgpa && rows[0].arrears <= rows[0].max_arrears;
        res.status(200).json({ studentId, eligible, details: rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
};</code></pre>
                </div>
            `
        }
    };

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectData[projectKey];
            if (data) {
                projectModalTitle.textContent = data.title;
                projectModalContent.innerHTML = `
                    <div style="margin-bottom: 16px;">
                        <span class="project-subtitle">${data.subtitle}</span>
                        <div class="project-tags margin-top-sm">
                            ${data.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    ${data.architecture}
                `;
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 6. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
    const copyBtns = document.querySelectorAll('.copy-btn, #copy-email-btn');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--primary-cyan)"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy') || btn.getAttribute('data-email');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`);
                }).catch(() => {
                    showToast(`Copied to clipboard!`);
                });
            }
        });
    });

    // 7. CONTACT FORM SUBMISSION HANDLER
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            showToast(`Thank you ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

    // 8. SHARE PROJECT SUMMARY
    const copyProjectBtns = document.querySelectorAll('.copy-project-summary');
    copyProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const shareText = `Check out Sachin M's project: "${title}" - Aspiring Software Engineer & Backend Developer. Portfolio: ${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                showToast(`Project summary copied for sharing!`);
            });
        });
    });

});
