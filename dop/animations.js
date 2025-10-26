'use strict';

const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelector("[data-nav-toggler]");
$navToggler.addEventListener("click", () => $navbar.classList.toggle("active"));
const $header = document.querySelector("[data-header]");
window.addEventListener("scroll", e => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

const $toggleBtns = document.querySelectorAll("[data-toggle-btn]");
$toggleBtns.forEach($toggleBtn => {
    $toggleBtn.addEventListener("click", () => {
        $toggleBtn.classList.toggle("active");
    });
});
class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.createPreloader();
    this.createProgressBar();
    
    this.initScrollAnimations();
    this.initParallax();
    this.initCounters();
    this.initTypewriter();
    this.init3DCards();
    this.initRippleEffect();
    
    this.initModalAnimations();
    
    
    this.initSlider();
    this.initFormValidation();
  }

  

  
  initModalAnimations() {
    this.createModal();

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-trigger')) {
        this.openModal();
      }
      if (
        e.target.classList.contains('modal-close') ||
        e.target.classList.contains('modal')
      ) {
        this.closeModal();
      }
    });
  }

  createModal() {
    const modalHTML = `
      <div class="modal" id="demoModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Демо модального окна</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p>Это демонстрация анимации модального окна!</p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  openModal() {
    const modal = document.getElementById('demoModal');
    if (modal) modal.classList.add('active');
  }

  closeModal() {
    const modal = document.getElementById('demoModal');
    if (modal) modal.classList.remove('active');
  }

  
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elementsToAnimate = [
      '.hero-content',
      '.property-list .card',
      '.feature',
      '.story-card',
      '.footer',
    ];

    elementsToAnimate.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
      });
    });
  }



  initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-banner, .bg-pattern');
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      parallaxElements.forEach((element) => {
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }


  initCounters() {
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target')) || 1000;
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }


  initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach((element) => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid var(--primary-100)';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        } else {
          element.style.borderRight = 'none';
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    });
  }


  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }


  init3DCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.classList.add('card-3d');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }


  createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `<div class="spinner"></div>`;
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 1000);
    });
  }

 
  initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .icon-btn, .card');
    buttons.forEach((button) => {
      button.classList.add('ripple');
      button.addEventListener('click', () => {
        button.classList.add('active');
        setTimeout(() => {
          button.classList.remove('active');
        }, 600);
      });
    });
  }

 


  initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let hasErrors = false;
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            field.classList.add('shake');
            hasErrors = true;
            setTimeout(() => {
              field.classList.remove('shake');
            }, 500);
          }
        });
        if (hasErrors) e.preventDefault();
      });
    });
  }

  

initSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  };

  const nextSlide = () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  };

  const prevSlide = () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  };

  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);
  setInterval(nextSlide, 5000);
}

}


document.addEventListener('DOMContentLoaded', () => {
  new Animations();

  
 
  document.body.insertAdjacentHTML('beforeend', demoButtonsHTML);
});
