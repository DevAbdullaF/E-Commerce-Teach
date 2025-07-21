// Cart functionality
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage if it exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartIcon();
    }

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const product = {
        name: productCard.querySelector('h3').textContent,
        price: parseFloat(productCard.querySelector('.price').textContent),
        image: productCard.querySelector('img').src
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    showNotification('Product added to cart!');
    
    // Update cart icon
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        // Add a badge with the number of items if there are any
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cart.length;
        
        // Remove existing badge if any
        const existingBadge = cartIcon.parentElement.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        if (cart.length > 0) {
            cartIcon.parentElement.appendChild(badge);
        }
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification to the page
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add CSS for notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #3498db;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.5s ease-out;
        z-index: 1000;
    }

    .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #e74c3c;
        color: white;
        border-radius: 50%;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navIcons = document.querySelector('.nav-icons');
    let isMenuOpen = false;
    
    // Function to close menu
    const closeMenu = () => {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
        navIcons.classList.remove('active');
        isMenuOpen = false;
        document.body.style.overflow = '';
    };

    // Function to open menu
    const openMenu = () => {
        menuIcon.classList.add('active');
        navLinks.classList.add('active');
        navIcons.classList.add('active');
        isMenuOpen = true;
        document.body.style.overflow = 'hidden';
    };

    // Toggle menu
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (isMenuOpen && !navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
});

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);

    const diff = nextHour - now;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelectorAll('.time-block')[0].textContent = String(hours).padStart(2, '0');
    document.querySelectorAll('.time-block')[1].textContent = String(minutes).padStart(2, '0');
    document.querySelectorAll('.time-block')[2].textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);

// Random Deal Generator
const deals = [
    {
        name: "4K Smart TV",
        originalPrice: 999.99,
        discount: 40,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
    },
    {
        name: "Gaming Console Pro",
        originalPrice: 499.99,
        discount: 30,
        image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128"
    },
    {
        name: "Noise-Canceling Headphones",
        originalPrice: 299.99,
        discount: 50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }
];

document.querySelector('.generate-deal')?.addEventListener('click', function() {
    const randomDeal = deals[Math.floor(Math.random() * deals.length)];
    const discountedPrice = (randomDeal.originalPrice * (100 - randomDeal.discount) / 100).toFixed(2);
    
    const dealHtml = `
        <div class="random-deal-card">
            <img src="${randomDeal.image}" alt="${randomDeal.name}">
            <h4>${randomDeal.name}</h4>
            <div class="deal-price">
                <span class="original">$${randomDeal.originalPrice}</span>
                <span class="current">$${discountedPrice}</span>
            </div>
            <span class="discount-tag">-${randomDeal.discount}%</span>
            <button class="grab-deal">Grab Deal</button>
        </div>
    `;
    
    document.querySelector('.random-deal-result').innerHTML = dealHtml;
});

// Progress Bar Animation
document.querySelectorAll('.progress-bar').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
        bar.style.width = width;
    }, 100);
});
