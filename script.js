// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            
            // Update button icon
            if (isOpen) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Update aria label
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Set current date
    function setCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        
        // Update all date elements
        const dateElements = document.querySelectorAll('#currentDate, #fullDate');
        dateElements.forEach(el => {
            if (el) el.textContent = formattedDate;
        });
        
        // Set today's date as default for date picker
        const datePicker = document.getElementById('devotionalDate');
        if (datePicker) {
            const today = now.toISOString().split('T')[0];
            datePicker.value = today;
            datePicker.max = today;
        }
    }
    
    // Load today's devotional
    function loadTodayDevotional() {
        // Sample devotional data
        const devotional = {
            date: new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            topic: "Divine Guidance",
            title: "Walking in God's Perfect Sequence",
            verse: "Proverbs 3:5-6",
            excerpt: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
            reading: "Proverbs 3:1-12",
            message: `Today, God is calling us to walk in His perfect sequence. The sequence of God is the divine order that brings peace, purpose, and prosperity into our lives. When we trust in the Lord with all our hearts and lean not on our own understanding, He promises to direct our paths.

Many times we try to figure things out on our own, but God's ways are higher than our ways. His sequence may not always make sense to our natural minds, but when we submit to His will, He makes our paths straight. The sequence of God involves timing, placement, and divine connections that only He can orchestrate.

Are you struggling to understand why things are happening the way they are? Trust in God's sequence. He knows the end from the beginning, and His plans for you are good, to give you hope and a future.`,
            prayer: "Lord, help me to trust You completely today. Guide my steps and establish Your divine sequence in every area of my life. Give me the grace to submit to Your will and timing. In Jesus' name, Amen.",
            declaration: "Today, I walk in God's perfect sequence. My steps are ordered by the Lord. I trust His guidance in every decision, and I submit to His divine timing for my life."
        };
        
        // Update elements if they exist
        const elements = {
            'devotionalTitle': devotional.title,
            'devotionalVerse': devotional.verse,
            'devotionalExcerpt': devotional.excerpt,
            'devotionalFullTitle': devotional.title,
            'devotionalTopic': devotional.topic,
            'fullVerse': devotional.verse,
            'todayReading': devotional.reading,
            'devotionalMessage': devotional.message,
            'prayerFocus': devotional.prayer,
            'declaration': devotional.declaration
        };
        
        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'devotionalMessage') {
                    element.innerHTML = devotional.message.replace(/\n/g, '<br><br>');
                } else {
                    element.textContent = elements[id];
                }
            }
        });
    }
    
    // Initialize archive list
    function initializeArchive() {
        const archiveList = document.getElementById('archiveList');
        if (!archiveList) return;
        
        // Sample archive data
        const archiveData = [
            { date: '2024-01-01', title: 'New Beginnings in Christ', verse: 'Isaiah 43:19' },
            { date: '2024-01-02', title: 'The Power of Prayer', verse: 'Philippians 4:6-7' },
            { date: '2024-01-03', title: 'Walking by Faith', verse: '2 Corinthians 5:7' },
            { date: '2024-01-04', title: 'God\'s Unfailing Love', verse: 'Romans 8:38-39' },
            { date: '2024-01-05', title: 'The Peace of God', verse: 'John 14:27' }
        ];
        
        archiveData.forEach(item => {
            const archiveItem = document.createElement('div');
            archiveItem.className = 'archive-item';
            archiveItem.innerHTML = `
                <div>
                    <strong>${formatDate(item.date)}</strong>
                    <p>${item.title} - ${item.verse}</p>
                </div>
                <button onclick="loadDevotionalByDate('${item.date}')" class="btn btn-small">Read</button>
            `;
            archiveList.appendChild(archiveItem);
        });
    }
    
    // Format date function
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }
    
    // Form submission handling
    function handleForms() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    const formMessage = document.getElementById('formMessage');
                    if (formMessage) {
                        formMessage.textContent = 'Thank you for your message! We will respond as soon as possible.';
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                    }
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Scroll to message
                    if (formMessage) {
                        formMessage.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1500);
            });
        }
        
        // Subscribe form
        const subscribeForms = document.querySelectorAll('#subscribeForm');
        subscribeForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('input[type="email"]').value;
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                // Simulate subscription
                setTimeout(() => {
                    alert(`Thank you for subscribing with ${email}! You will receive daily devotionals starting tomorrow.`);
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        });
    }
    
    // Initialize functions
    setCurrentDate();
    loadTodayDevotional();
    initializeArchive();
    handleForms();
});

// Share devotional function
function shareDevotional() {
    const title = document.getElementById('devotionalFullTitle').textContent;
    const verse = document.getElementById('fullVerse').textContent;
    const text = `${title} - ${verse}\n\nRead the full devotional at ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: "Today's Devotional",
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Devotional link copied to clipboard!');
        });
    }
}

// Print devotional function
function printDevotional() {
    const printContent = document.querySelector('.devotional-full').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1>True Worshippers Evangelical Ministries</h1>
            <h2>Sequence of God Daily Devotional</h2>
            ${printContent}
            <div style="margin-top: 50px; text-align: center; font-style: italic;">
                Printed from True Worshippers Evangelical Ministries<br>
                Founded 2020 by Apostle Daniel and Reverend Mrs Debby A Solomon
            </div>
        </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
}

// Load devotional by date (sample function)
function loadDevotionalByDate(date) {
    alert(`Loading devotional for ${date}...\n\nIn a real implementation, this would fetch the devotional from a database or API.`);
    
    // Scroll to devotional section
    const devotionalSection = document.querySelector('.devotional-full');
    if (devotionalSection) {
        devotionalSection.scrollIntoView({ behavior: 'smooth' });
    }
}