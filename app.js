// Global state
let portfolioData = {
    personal: {},
    skills: [],
    projects: [],
    experience: [],
    education: []
};

// DOM elements
const landingSection = document.getElementById('landing');
const mainFormSection = document.getElementById('mainForm');
const previewSection = document.getElementById('previewSection');
const startBtn = document.getElementById('startBtn');
const portfolioForm = document.getElementById('portfolioForm');
const generateBtn = document.getElementById('generateBtn');
const generateBtnText = document.getElementById('generateBtnText');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    populateSampleData();
});

function setupEventListeners() {
    // Landing page transition
    startBtn.addEventListener('click', showMainForm);
    
    // Form submission
    portfolioForm.addEventListener('submit', handleFormSubmit);
    
    // Skills functionality
    document.getElementById('addSkillBtn').addEventListener('click', addSkill);
    document.getElementById('skillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });
    
    // Dynamic sections
    document.getElementById('addProjectBtn').addEventListener('click', addProject);
    document.getElementById('addExperienceBtn').addEventListener('click', addExperience);
    document.getElementById('addEducationBtn').addEventListener('click', addEducation);
    
    // PDF download
    downloadPdfBtn.addEventListener('click', downloadPDF);
}

function showMainForm() {
    landingSection.classList.add('fade-out');
    setTimeout(() => {
        landingSection.classList.add('hidden');
        mainFormSection.classList.remove('hidden');
        setTimeout(() => {
            mainFormSection.classList.add('visible');
        }, 50);
    }, 300);
}

function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (skill && !portfolioData.skills.includes(skill)) {
        portfolioData.skills.push(skill);
        renderSkill(skill);
        skillInput.value = '';
    }
}

function renderSkill(skill) {
    const skillsContainer = document.getElementById('skillsContainer');
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag';
    skillTag.innerHTML = `
        <span>${skill}</span>
        <button type="button" class="remove-btn" onclick="removeSkill('${skill}')">×</button>
    `;
    skillsContainer.appendChild(skillTag);
}

function removeSkill(skill) {
    portfolioData.skills = portfolioData.skills.filter(s => s !== skill);
    renderSkills();
}

function renderSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';
    portfolioData.skills.forEach(skill => renderSkill(skill));
}

function addProject() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectDiv = document.createElement('div');
    projectDiv.className = 'dynamic-item';
    projectDiv.innerHTML = `
        <button type="button" class="remove-item-btn" onclick="removeProject(this)">×</button>
        <div class="input-grid">
            <div class="form-field">
                <label class="form-label">Project Title</label>
                <input type="text" name="projectTitle" class="form-control" placeholder="e.g., E-Commerce Platform">
            </div>
            <div class="form-field">
                <label class="form-label">Technologies Used</label>
                <input type="text" name="projectTechnologies" class="form-control" placeholder="e.g., React, Node.js, MongoDB">
            </div>
            <div class="form-field">
                <label class="form-label">Live Demo Link</label>
                <input type="url" name="projectLiveLink" class="form-control" placeholder="e.g., https://myproject.com">
            </div>
            <div class="form-field">
                <label class="form-label">GitHub Repository</label>
                <input type="url" name="projectGithubLink" class="form-control" placeholder="e.g., https://github.com/username/project">
            </div>
        </div>
        <div class="form-field">
            <label class="form-label">Description</label>
            <textarea name="projectDescription" class="form-control" rows="3" placeholder="Describe what you built and your role..."></textarea>
        </div>
    `;
    projectsContainer.appendChild(projectDiv);
}

function removeProject(button) {
    button.parentElement.remove();
}

function addExperience() {
    const experienceContainer = document.getElementById('experienceContainer');
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'dynamic-item';
    experienceDiv.innerHTML = `
        <button type="button" class="remove-item-btn" onclick="removeExperience(this)">×</button>
        <div class="input-grid">
            <div class="form-field">
                <label class="form-label">Job Title</label>
                <input type="text" name="jobTitle" class="form-control" placeholder="e.g., Frontend Developer">
            </div>
            <div class="form-field">
                <label class="form-label">Company</label>
                <input type="text" name="company" class="form-control" placeholder="e.g., Google Inc.">
            </div>
            <div class="form-field">
                <label class="form-label">Start Date</label>
                <input type="month" name="startDate" class="form-control">
            </div>
            <div class="form-field">
                <label class="form-label">End Date</label>
                <input type="month" name="endDate" class="form-control" placeholder="Leave empty if current">
            </div>
        </div>
        <div class="form-field">
            <label class="form-label">Description</label>
            <textarea name="experienceDescription" class="form-control" rows="3" placeholder="Describe responsibilities and achievements..."></textarea>
        </div>
    `;
    experienceContainer.appendChild(experienceDiv);
}

function removeExperience(button) {
    button.parentElement.remove();
}

function addEducation() {
    const educationContainer = document.getElementById('educationContainer');
    const educationDiv = document.createElement('div');
    educationDiv.className = 'dynamic-item';
    educationDiv.innerHTML = `
        <button type="button" class="remove-item-btn" onclick="removeEducation(this)">×</button>
        <div class="input-grid">
            <div class="form-field">
                <label class="form-label">Degree/Certification</label>
                <input type="text" name="degree" class="form-control" placeholder="e.g., Bachelor of Science in Computer Science">
            </div>
            <div class="form-field">
                <label class="form-label">Institution</label>
                <input type="text" name="institution" class="form-control" placeholder="e.g., Stanford University">
            </div>
            <div class="form-field">
                <label class="form-label">Graduation Year</label>
                <input type="number" name="graduationYear" class="form-control" placeholder="e.g., 2023" min="1950" max="2030">
            </div>
            <div class="form-field">
                <label class="form-label">GPA/Grade</label>
                <input type="text" name="grade" class="form-control" placeholder="e.g., 3.8 GPA or First Class Honours">
            </div>
        </div>
    `;
    educationContainer.appendChild(educationDiv);
}

function removeEducation(button) {
    button.parentElement.remove();
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    generateBtn.disabled = true;
    generateBtnText.textContent = 'Generating...';
    
    setTimeout(() => {
        collectFormData();
        generatePortfolio();
        showPreview();
        generateBtn.disabled = false;
        generateBtnText.textContent = 'Generate Portfolio';
    }, 1500);
}

function validateForm() {
    const requiredFields = ['name', 'email', 'title', 'about'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            element.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
    }
    
    return isValid;
}

function collectFormData() {
    // Personal information
    portfolioData.personal = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        title: document.getElementById('title').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        about: document.getElementById('about').value
    };
    
    // Projects
    portfolioData.projects = [];
    document.querySelectorAll('#projectsContainer .dynamic-item').forEach(item => {
        const project = {
            title: item.querySelector('[name="projectTitle"]').value,
            description: item.querySelector('[name="projectDescription"]').value,
            technologies: item.querySelector('[name="projectTechnologies"]').value,
            liveLink: item.querySelector('[name="projectLiveLink"]').value,
            githubLink: item.querySelector('[name="projectGithubLink"]').value
        };
        if (project.title) {
            portfolioData.projects.push(project);
        }
    });
    
    // Experience
    portfolioData.experience = [];
    document.querySelectorAll('#experienceContainer .dynamic-item').forEach(item => {
        const experience = {
            jobTitle: item.querySelector('[name="jobTitle"]').value,
            company: item.querySelector('[name="company"]').value,
            startDate: item.querySelector('[name="startDate"]').value,
            endDate: item.querySelector('[name="endDate"]').value,
            description: item.querySelector('[name="experienceDescription"]').value
        };
        if (experience.jobTitle) {
            portfolioData.experience.push(experience);
        }
    });
    
    // Education
    portfolioData.education = [];
    document.querySelectorAll('#educationContainer .dynamic-item').forEach(item => {
        const education = {
            degree: item.querySelector('[name="degree"]').value,
            institution: item.querySelector('[name="institution"]').value,
            year: item.querySelector('[name="graduationYear"]').value,
            grade: item.querySelector('[name="grade"]').value
        };
        if (education.degree) {
            portfolioData.education.push(education);
        }
    });
}

function generatePortfolio() {
    const preview = document.getElementById('portfolioPreview');
    
    preview.innerHTML = `
        <div class="portfolio-header">
            <h1 class="portfolio-name">${portfolioData.personal.name}</h1>
            <p class="portfolio-title">${portfolioData.personal.title}</p>
            <div class="portfolio-contact">
                ${portfolioData.personal.email ? `<span>📧 ${portfolioData.personal.email}</span>` : ''}
                ${portfolioData.personal.phone ? `<span>📱 ${portfolioData.personal.phone}</span>` : ''}
                ${portfolioData.personal.linkedin ? `<span>🔗 <a href="${portfolioData.personal.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
                ${portfolioData.personal.github ? `<span>🚀 <a href="${portfolioData.personal.github}" target="_blank">GitHub</a></span>` : ''}
            </div>
        </div>
        
        ${portfolioData.personal.about ? `
        <div class="portfolio-section">
            <h3>About Me</h3>
            <p class="portfolio-about">${portfolioData.personal.about}</p>
        </div>
        ` : ''}
        
        ${portfolioData.skills.length > 0 ? `
        <div class="portfolio-section">
            <h3>Skills</h3>
            <div class="skills-grid">
                ${portfolioData.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}
        
        ${portfolioData.projects.length > 0 ? `
        <div class="portfolio-section">
            <h3>Projects</h3>
            ${portfolioData.projects.map(project => `
                <div class="project-item">
                    <h4 class="project-title">${project.title}</h4>
                    ${project.technologies ? `<p class="project-tech">${project.technologies}</p>` : ''}
                    ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                    <div class="project-links">
                        ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-link">🌐 Live Demo</a>` : ''}
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link">📂 Source Code</a>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        ${portfolioData.experience.length > 0 ? `
        <div class="portfolio-section">
            <h3>Work Experience</h3>
            ${portfolioData.experience.map(exp => `
                <div class="experience-item">
                    <h4 class="experience-title">${exp.jobTitle}</h4>
                    <p class="experience-company">${exp.company}</p>
                    <p class="experience-duration">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
                    ${exp.description ? `<p class="experience-description">${exp.description}</p>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        ${portfolioData.education.length > 0 ? `
        <div class="portfolio-section">
            <h3>Education</h3>
            ${portfolioData.education.map(edu => `
                <div class="education-item">
                    <h4 class="education-title">${edu.degree}</h4>
                    <p class="education-institution">${edu.institution}</p>
                    <p class="education-year">${edu.year}${edu.grade ? ` • ${edu.grade}` : ''}</p>
                </div>
            `).join('')}
        </div>
        ` : ''}
    `;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function showPreview() {
    mainFormSection.classList.remove('visible');
    setTimeout(() => {
        mainFormSection.classList.add('hidden');
        previewSection.classList.remove('hidden');
        setTimeout(() => {
            previewSection.classList.add('visible');
        }, 50);
    }, 300);
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let yPos = 20;
    const lineHeight = 6;
    const marginLeft = 20;
    const pageWidth = doc.internal.pageSize.width;
    const maxWidth = pageWidth - 40;
    
    // Helper function to add text with word wrapping
    function addText(text, fontSize = 10, fontStyle = 'normal', color = 'black') {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        doc.setTextColor(color);
        
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
            if (yPos > 280) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(line, marginLeft, yPos);
            yPos += lineHeight;
        });
        yPos += 2;
    }
    
    function addSection(title) {
        yPos += 5;
        doc.setDrawColor(90, 108, 234);
        doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos);
        yPos += 5;
        addText(title, 14, 'bold', '#5A6CEA');
        yPos += 2;
    }
    
    // Header
    addText(portfolioData.personal.name, 20, 'bold', '#222222');
    addText(portfolioData.personal.title, 14, 'normal', '#5A6CEA');
    
    // Contact info
    let contactInfo = '';
    if (portfolioData.personal.email) contactInfo += `Email: ${portfolioData.personal.email} | `;
    if (portfolioData.personal.phone) contactInfo += `Phone: ${portfolioData.personal.phone} | `;
    if (portfolioData.personal.linkedin) contactInfo += `LinkedIn: ${portfolioData.personal.linkedin} | `;
    if (portfolioData.personal.github) contactInfo += `GitHub: ${portfolioData.personal.github}`;
    
    if (contactInfo) {
        contactInfo = contactInfo.replace(/\s\|\s$/, '');
        addText(contactInfo, 9, 'normal', '#666666');
    }
    
    // About Me
    if (portfolioData.personal.about) {
        addSection('ABOUT ME');
        addText(portfolioData.personal.about);
    }
    
    // Skills
    if (portfolioData.skills.length > 0) {
        addSection('SKILLS');
        addText(portfolioData.skills.join(' • '));
    }
    
    // Projects
    if (portfolioData.projects.length > 0) {
        addSection('PROJECTS');
        portfolioData.projects.forEach(project => {
            addText(project.title, 12, 'bold');
            if (project.technologies) addText(`Technologies: ${project.technologies}`, 9, 'italic');
            if (project.description) addText(project.description);
            if (project.liveLink) addText(`Live Demo: ${project.liveLink}`, 9);
            if (project.githubLink) addText(`Source: ${project.githubLink}`, 9);
            yPos += 3;
        });
    }
    
    // Experience
    if (portfolioData.experience.length > 0) {
        addSection('WORK EXPERIENCE');
        portfolioData.experience.forEach(exp => {
            addText(exp.jobTitle, 12, 'bold');
            addText(`${exp.company} | ${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`, 10, 'italic');
            if (exp.description) addText(exp.description);
            yPos += 3;
        });
    }
    
    // Education
    if (portfolioData.education.length > 0) {
        addSection('EDUCATION');
        portfolioData.education.forEach(edu => {
            addText(edu.degree, 12, 'bold');
            addText(`${edu.institution} | ${edu.year}${edu.grade ? ` | ${edu.grade}` : ''}`, 10, 'italic');
            yPos += 3;
        });
    }
    
    // Save the PDF
    doc.save(`${portfolioData.personal.name}_Portfolio.pdf`);
}