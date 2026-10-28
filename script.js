// Configure Tailwind theme colors dynamically via JS config script
if (window.tailwind) {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    brand: {
                        50: '#fdf8f6',
                        100: '#f2e8e5',
                        200: '#e4d4cf',
                        300: '#d0b4ab',
                        400: '#b88c7d',
                        500: '#a26b5b',
                        600: '#8c5344',
                        700: '#734035',
                        800: '#5f362d',
                        900: '#4e2f28',
                        dark: '#1c1615',
                        gold: '#d4af37'
                    }
                },
                fontFamily: {
                    sans: ['Plus Jakarta Sans', 'sans-serif'],
                    serif: ['Playfair Display', 'serif'],
                }
            }
        }
    };
}

// Menu Items Data
const menuData = [
    {
        id: 1,
        name: "Infraksi Smoked Gula Melaka",
        category: "signature",
        price: 15.00,
        desc: "Espresso double-shot disebat bersama gula melaka salai khas dan susu segar berkrim.",
        img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
        badge: "Terlaris"
    },
    {
        id: 2,
        name: "Pandan Coconut Cloud Latte",
        category: "signature",
        price: 16.00,
        desc: "Espresso sejuk dengan pati pandan semula jadi dan lapisan buih kelapa lembut.",
        img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
        badge: "Istimewa"
    },
    {
        id: 3,
        name: "Spanish Latte Artisan",
        category: "espresso",
        price: 13.00,
        desc: "Imbangan sempurna antara espresso pahit manis dan susu pekat manis khas.",
        img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Flat White Velvet",
        category: "espresso",
        price: 12.00,
        desc: "Micro-foam susu halus menyelimuti double shot espresso berkualiti tinggi.",
        img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "V60 Single Origin Sumatra",
        category: "manual",
        price: 17.00,
        desc: "Seduhan V60 teliti dengan rasa dominan coklat gelap, herba, dan keasidan rendah.",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Aeropress Ethiopian Yirgacheffe",
        category: "manual",
        price: 18.00,
        desc: "Teknologi picitan Aeropress menghasil nota buah sitrus, bunga, dan ketajaman rasa unik.",
        img: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Matcha Coklat Biru",
        category: "non-coffee",
        price: 14.00,
        desc: "Matcha gred premium Uji Jepun dibancuh bersama susu segar dan sirap bunga telang.",
        img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Croissant Mentega Salai",
        category: "non-coffee",
        price: 9.00,
        desc: "Pastri rapuh bertingkat dipanggang segar setiap pagi dengan mentega Perancis.",
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
    }
];

// State Management
let cart = [];
let customBrew = {
    base: { name: 'Single Shot Espresso', price: 6.00 },
    milk: { name: 'Susu Segar (Fresh Milk)', price: 2.00 },
    flavor: { name: 'Gula Melaka Salai', price: 2.50 }
};

// DOM Initializer
window.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    setupEventListeners();
    updateCustomBrewSummary();
});

// Render Menu Items Dynamically
function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'coffee-card rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-500/50 shadow-lg';
        
        card.innerHTML = `
            <div>
                <div class="relative overflow-hidden h-48">
                    <img src="${item.img}" alt="${item.name}" class="coffee-img w-full h-full object-cover transition-transform duration-500">
                    ${item.badge ? `<span class="absolute top-3 right-3 bg-brand-500 text-stone-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider">${item.badge}</span>` : ''}
                </div>
                <div class="p-5">
                    <h3 class="font-serif font-bold text-lg text-white">${item.name}</h3>
                    <p class="text-xs text-stone-400 mt-2 leading-relaxed">${item.desc}</p>
                </div>
            </div>
            <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-800/60 mt-2">
                <span class="font-serif font-bold text-brand-300 text-base">RM ${item.price.toFixed(2)}</span>
                <button onclick="addToCart('${item.name}', ${item.price}, '${item.desc}')" class="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-brand-500 hover:text-stone-950 text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
                    <i class="fa-solid fa-plus text-[10px]"></i> Tambah
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Buttons Interaction
function filterMenu(cat, evt) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-500', 'text-stone-950');
        btn.classList.add('bg-stone-900', 'text-stone-300', 'border', 'border-stone-800');
    });
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.remove('bg-stone-900', 'text-stone-300', 'border', 'border-stone-800');
        evt.currentTarget.classList.add('bg-brand-500', 'text-stone-950');
    }
    renderMenu(cat);
}

// Interactive Custom Brew Option Selector
function selectOption(type, name, price, evt) {
    customBrew[type] = { name, price };
    
    // Highlight active button UI
    const buttons = document.querySelectorAll(`.${type}-btn`);
    buttons.forEach(btn => {
        btn.classList.remove('border-brand-500', 'bg-brand-500/10', 'text-white');
        btn.classList.add('border-stone-800', 'bg-stone-900', 'text-stone-300');
    });
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.remove('border-stone-800', 'bg-stone-900', 'text-stone-300');
        evt.currentTarget.classList.add('border-brand-500', 'bg-brand-500/10', 'text-white');
    }

    updateCustomBrewSummary();
}

function updateCustomBrewSummary() {
    const baseElem = document.getElementById('summary-base');
    const milkElem = document.getElementById('summary-milk');
    const flavorElem = document.getElementById('summary-flavor');
    const totalElem = document.getElementById('summary-total');

    if (baseElem) baseElem.innerText = customBrew.base.name;
    if (milkElem) milkElem.innerText = customBrew.milk.name;
    if (flavorElem) flavorElem.innerText = customBrew.flavor.name;
    
    const total = customBrew.base.price + customBrew.milk.price + customBrew.flavor.price;
    if (totalElem) totalElem.innerText = `RM ${total.toFixed(2)}`;
}

function addCustomBrewToCart() {
    const name = `Kopi Ciptaan (${customBrew.base.name})`;
    const details = `${customBrew.milk.name}, ${customBrew.flavor.name}`;
    const totalPrice = customBrew.base.price + customBrew.milk.price + customBrew.flavor.price;
    
    addToCart(name, totalPrice, details);
}

// Cart Actions
function addToCart(name, price, details) {
    const existingIndex = cart.findIndex(item => item.name === name && item.details === details);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ name, price, details, quantity: 1 });
    }
    updateCartUI();
    showToast(`"${name}" telah ditambah!`);
}

function updateCartQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const countElem = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total-price');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (countElem) countElem.innerText = totalCount;
    if (totalElem) totalElem.innerText = `RM ${totalPrice.toFixed(2)}`;

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-stone-500">
                <i class="fa-solid fa-basket-shopping text-4xl mb-3 opacity-30"></i>
                <p class="text-sm">Troli pesanan anda masih kosong.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="p-4 rounded-xl bg-stone-950 border border-stone-800 flex justify-between items-center">
            <div class="pr-2">
                <h4 class="text-white text-sm font-semibold">${item.name}</h4>
                <p class="text-[11px] text-stone-400 mt-0.5">${item.details || ''}</p>
                <span class="text-xs text-brand-400 font-bold mt-1 block">RM ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1">
                <button onclick="updateCartQuantity(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white">-</button>
                <span class="text-xs font-bold text-white px-1">${item.quantity}</span>
                <button onclick="updateCartQuantity(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white">+</button>
            </div>
        </div>
    `).join('');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Event Listeners Setup
function setupEventListeners() {
    const drawer = document.getElementById('cart-drawer');
    const toggleBtn = document.getElementById('cart-toggle-btn');
    const closeBtn = document.getElementById('cart-close-btn');
    const backdrop = document.getElementById('cart-backdrop');
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleBtn && drawer) toggleBtn.addEventListener('click', () => drawer.classList.remove('hidden'));
    if (closeBtn && drawer) closeBtn.addEventListener('click', () => drawer.classList.add('hidden'));
    if (backdrop && drawer) backdrop.addEventListener('click', () => drawer.classList.add('hidden'));

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });
}

// WhatsApp Checkout
function checkout() {
    if (cart.length === 0) {
        showToast("Sila tambah item sebelum membuat pesanan!");
        return;
    }

    let text = "Hello Kedai Kopi Infraksi! Saya ingin membuat pesanan:\n\n";
    cart.forEach((item, i) => {
        text += `${i+1}. ${item.name} (${item.quantity}x) - RM ${(item.price * item.quantity).toFixed(2)}\n`;
        if (item.details) text += `   Nota: ${item.details}\n`;
    });
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    text += `\nJumlah Keseluruhan: RM ${totalPrice.toFixed(2)}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/60123456789?text=${encoded}`, '_blank');
}