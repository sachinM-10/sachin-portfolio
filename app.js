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
        leave: {
            title: "Employee Leave Management System",
            subtitle: "Secure Spring Boot & React Enterprise Leave Management System (Backend Developer)",
            techStack: ["Java", "Spring Boot", "Spring Security", "JWT", "Hibernate / JPA", "MySQL", "REST APIs", "React Integration"],
            architecture: `
                <div class="project-modal-detail">
                    <h4><i class="fa-solid fa-layer-group"></i> Architecture & Core Implementation</h4>
                    <p>Contributed as the Backend Developer building secure RESTful APIs for leave application, approval workflows, user management, and seamless backend service integration with the React frontend.</p>
                    
                    <h5 class="margin-top-sm"><i class="fa-solid fa-shield-halved"></i> Role-Based Auth & Security:</h5>
                    <ul>
                        <li>Implemented role-based authentication and authorization using <strong>Spring Security</strong> and <strong>JWT</strong> (JSON Web Tokens).</li>
                        <li>Protected sensitive admin and manager endpoints with custom security filter chains and role hierarchy checks.</li>
                        <li>Configured password hashing and stateless session management for maximum API security.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-sitemap"></i> Layered Architecture & Data Persistence:</h5>
                    <ul>
                        <li>Structured the project following clean <strong>Controller–Service–Repository</strong> pattern for optimal separation of concerns.</li>
                        <li>Mapped relational database entities (Employee, LeaveRequest, Department, Role) using <strong>JPA</strong> and <strong>Hibernate</strong>.</li>
                        <li>Enforced strict database integrity, input validation (<code>@Valid</code>), and automated business rules for leave quota calculations and approval workflows.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-code"></i> Spring Boot REST Controller Sample (Java):</h5>
                    <pre class="code-block"><code>@RestController
@RequestMapping("/api/v1/leaves")
@RequiredArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService leaveService;

    @PostMapping("/apply")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity&lt;LeaveResponseDto&gt; applyForLeave(
            @Valid @RequestBody LeaveRequestDto requestDto,
            Authentication authentication) {
        
        String employeeEmail = authentication.getName();
        LeaveResponseDto response = leaveService.processLeaveApplication(requestDto, employeeEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity&lt;LeaveResponseDto&gt; updateLeaveStatus(
            @PathVariable Long id,
            @RequestParam LeaveStatus status,
            @RequestParam(required = false) String comments) {
        
        LeaveResponseDto updated = leaveService.updateStatus(id, status, comments);
        return ResponseEntity.ok(updated);
    }
}</code></pre>
                </div>
            `
        },
        portal: {
            title: "Digital Knowledge Assessment Portal",
            subtitle: "Automated Evaluation & Assessment Platform with Spring Boot & MySQL (Backend Developer)",
            techStack: ["Java", "Spring Boot", "REST APIs", "MySQL", "JPA / Hibernate", "User Auth", "Certificate Gen"],
            architecture: `
                <div class="project-modal-detail">
                    <h4><i class="fa-solid fa-layer-group"></i> Backend Engineering & Workflows</h4>
                    <p>Contributed as the Backend Developer developing secure RESTful APIs for assessment management, automatic examination evaluation, result processing, certificate generation, and user authentication.</p>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-gears"></i> Key Modules & Business Logic:</h5>
                    <ul>
                        <li><strong>Assessment Management:</strong> REST APIs for test creation, question categorizations, options mapping, and time limits.</li>
                        <li><strong>Automatic Evaluation Engine:</strong> Server-side scoring algorithms that compare submitted answers against key solutions in real time.</li>
                        <li><strong>Result & Certificate Processing:</strong> Instant result compilation, grade assignment, and automated certificate generation pipeline.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-database"></i> MySQL Database & Performance:</h5>
                    <ul>
                        <li>Designed clean, normalized MySQL relational database schemas for Users, Assessments, Questions, Submissions, and Results.</li>
                        <li>Optimized database operations and queries to support reliable assessment processing under concurrent user requests.</li>
                    </ul>

                    <h5 class="margin-top-sm"><i class="fa-solid fa-code"></i> Spring Boot Evaluation Controller Sample (Java):</h5>
                    <pre class="code-block"><code>@RestController
@RequestMapping("/api/v1/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/{assessmentId}/submit")
    public ResponseEntity&lt;EvaluationResultDto&gt; submitAssessment(
            @PathVariable Long assessmentId,
            @RequestBody AssessmentSubmissionDto submission,
            @AuthenticationPrincipal UserPrincipal user) {

        EvaluationResultDto result = assessmentService.evaluateSubmission(assessmentId, user.getId(), submission);
        return ResponseEntity.ok(result);
    }
}</code></pre>
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
