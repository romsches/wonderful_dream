// script.js
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Random {
    nextInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    nextFloat() {
        return Math.random();
    }
}
const random = new Random();

const names = [
    "Mэдэлина", "Mэделина", "Madelina", "Madeline", "Madeleine", "Maddalena",
    "Magdalena", "Mădălina", "Madalena", "Μαγδαληνή", "マデリーナ"
];

const adjectives = [
    // 🌸 Русский
    "Прекрасная", "Волшебная", "Изящная", "Великолепная", "Чудесная",
    "Невероятная", "Очаровательная", "Восхитительная", "Бесподобная",
    "Нежная", "Загадочная", "Лучезарная", "Манящая", "Неповторимая",
    "Светлая", "Трепетная", "Любимая", "Родная", "Желанная",
    "Очей очарование", // поэтичное выражение

    // 🌹 English
    "Beautiful", "Magical", "Graceful", "Gorgeous", "Wonderful",
    "Incredible", "Fabulous", "Stunning", "Enchanting", "Radiant",
    "Tender", "Lovely", "Charming", "Dazzling", "Radiating",
    "Unforgettable", "Heartwarming", "Dreamlike", "Beloved", "Celestial",

    // 🇫🇷 Français
    "Belle", "Magique", "Gracieuse", "Magnifique", "Merveilleuse",
    "Incroyable", "Ravissante", "Éblouissante", "Envoûtante", "Rayonnante",
    "Tendre", "Charmante", "Élégante", "Resplendissante", "Unique",
    "Chérie", "Radieuse", "Câline", "Mystérieuse", "Céleste",

    // 🇮🇹 Italiano
    "Bella", "Magica", "Aggraziata", "Meravigliosa", "Splendida",
    "Incredibile", "Incantevole", "Affascinante", "Radiosa", "Elegante",
    "Amata", "Unica", "Delicata", "Sognante", "Dolce",
    "Preziosa", "Celestiale", "Adorata",

    // 🇪🇸 Español
    "Hermosa", "Mágica", "Elegante", "Maravillosa", "Magnífica",
    "Increíble", "Encantadora", "Deslumbrante", "Radiante",
    "Amada", "Tierna", "Única", "Delicada", "Celestial",
    "Soñadora", "Apasionada", "Resplandeciente", "Deseada", "Dulce",

    // 🇩🇪 Deutsch
    "Wunderschön", "Magisch", "Anmutig", "Großartig", "Wundervoll",
    "Unglaublich", "Bezaubernd", "Strahlend", "Elegante",
    "Geliebte", "Zärtlich", "Einzigartig", "Leuchtend", "Verträumt",
    "Anziehend", "Herzerwärmend", "Himmlisch", "Lieblich",

    // 🇷🇴 Română
    "Frumoasă", "Magică", "Grațioasă", "Minunată", "Splendidă",
    "Incredibilă", "Fermecătoare", "Răpitoare", "Strălucitoare",
    "Superbă", "Divină", "Elegantă", "Extraordinară", "Încântătoare",
    "Radiosă", "Magnifică", "Rafinată", "Visătoare",
    "Dragă", "Unică", "Gingașă", "Delicată", "Adorată", "Dulce",

    // 🇵🇹 Português
    "Linda", "Mágica", "Graciosa", "Maravilhosa", "Magnífica",
    "Incrível", "Encantadora", "Deslumbrante", "Radiante",
    "Amada", "Querida", "Delicada", "Apaixonante", "Sonhadora",
    "Celestial", "Ternurenta", "Doce",

    // 🇬🇷 Ελληνικά (Greek)
    "Όμορφη", "Μαγική", "Κομψή", "Υπέροχη", "Θαυμάσια",
    "Απίστευτη", "Μαγεμένη", "Εκθαμβωτική",
    "Αγαπημένη", "Τρυφερή", "Μοναδική", "Λαμπερή", "Ουράνια",
    "Γλυκιά", "Ονειρεμένη", "Αξιαγάπητη", "Ακαταμάχητη", "Μυστήρια",

    // 🇯🇵 日本語 (Japanese)
    "美しい", "魔法のような", "優雅な", "素晴らしい", "素敵な",
    "信じられない", "魅力的な", "輝く",
    "愛しい", "優しい", "特別な", "夢のような", "神秘的な",
    "甘い", "忘れられない", "心温まる", "輝かしい", "可憐な"
];



const beautifulTextColors = [
    [255, 105, 180],
    [221, 160, 221],
    [238, 130, 238],
    [255, 192, 203],
    [138, 43, 226],
    [255, 165, 0],
    [128, 0, 128],
    [0, 191, 255],
    [255, 20, 147],
    [218, 112, 214],
    [240, 128, 128]
];

let nextSpawnIsAdjective = false;

// Новый массив с эмодзи сердечками
const emojiHearts = ['❤️', '💕', '💖', '💘', '💗', '💓', '💞', '💝'];

class Heart {
    // Добавлен параметр 'emoji'
    constructor(x, y, size, random, emoji) {
        this.position = { x: x, y: y };
        this.alpha = 1.0;
        this.baseSize = size; // Теперь это будет базовая высота шрифта для эмодзи
        this.initialScale = 0.1;
        this.targetScale = 1.0;
        this.currentScale = this.initialScale;
        this.pulseScale = 1.0;
        this.pulseCounter = 0.0;
        this.rotationAngle = 0.0;
        this.rotationSpeed = (random.nextFloat() * 0.4 + 0.1) * (random.nextInt(2) === 0 ? 1 : -1);
        this.emoji = emoji; // Храним выбранное эмодзи
    }

    update() {
        if (this.currentScale < this.targetScale) {
            this.currentScale += 0.02;
            if (this.currentScale > this.targetScale) this.currentScale = this.targetScale;
        }

        this.pulseCounter += 0.05;
        this.pulseScale = 1.0 + Math.sin(this.pulseCounter) * 0.05;

        // Сердечки исчезают значительно быстрее
        this.alpha -= 0.008; // Было 0.005, до этого 0.002
        if (this.alpha < 0) this.alpha = 0;

        this.position.y -= 0.3;

        this.rotationAngle += this.rotationSpeed;
        if (this.rotationAngle >= 360) this.rotationAngle -= 360;
        if (this.rotationAngle < 0) this.rotationAngle += 360;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;

        const effectiveScale = this.currentScale * this.pulseScale;
        const actualSize = this.baseSize * effectiveScale; // Размер эмодзи будет зависеть от масштаба

        const centerX = this.position.x + this.baseSize / 2; // Центр для трансформаций
        const centerY = this.position.y + this.baseSize / 2;

        ctx.save();
        ctx.translate(centerX, centerY); // Перемещаем центр вращения в центр эмодзи
        ctx.rotate(this.rotationAngle * Math.PI / 180); // Вращение

        ctx.globalAlpha = this.alpha; // Применяем прозрачность

        // Устанавливаем шрифт для эмодзи
        ctx.font = `${actualSize}px Arial, sans-serif`;
        ctx.textAlign = 'center'; // Выравниваем текст по центру
        ctx.textBaseline = 'middle'; // Выравниваем текст по середине

        ctx.fillText(this.emoji, 0, 0); // Рисуем эмодзи в центре (0,0) после трансформации

        ctx.restore();
    }
}

class AnimatedText {
    constructor(x, y, text, fontSize, random) {
        this.position = { x: x, y: y };
        this.alpha = 1.0;
        this.text = text;
        this.fontSize = fontSize;
        this.initialScale = 0.5;
        this.targetScale = 1.0;
        this.currentScale = this.initialScale;
        this.movementSpeedY = (random.nextFloat() * 0.15 + 0.1);
        this.movementSpeedX = (random.nextFloat() * 0.2 - 0.1);
        this.rotationSpeed = (random.nextFloat() * 0.2 - 0.1);
        this.currentRotation = 0.0;

        const textColorRgb = beautifulTextColors[random.nextInt(beautifulTextColors.length)];
        this.baseTextColor = `rgba(${textColorRgb[0]}, ${textColorRgb[1]}, ${textColorRgb[2]}, 1)`;
        this.shadowColor = `rgba(0, 0, 0, 0.4)`;
    }

    update() {
        if (this.currentScale < this.targetScale) {
            this.currentScale += 0.015;
            if (this.currentScale > this.targetScale) this.currentScale = this.targetScale;
        }

        // Скорость исчезновения текста возвращена к прежнему значению
        this.alpha -= (1.0 / 400.0); // Было 1.0 / 300.0
        if (this.alpha < 0) this.alpha = 0;

        this.position.x += this.movementSpeedX;
        this.position.y -= this.movementSpeedY;

        this.currentRotation += this.rotationSpeed;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;

        ctx.save();

        const scaledFontSize = this.fontSize * this.currentScale;
        ctx.font = `${scaledFontSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const metrics = ctx.measureText(this.text);
        const textWidth = metrics.width;

        const textCenterX = this.position.x + textWidth / 2;
        const textCenterY = this.position.y + scaledFontSize / 2;

        ctx.translate(textCenterX, textCenterY);
        ctx.rotate(this.currentRotation * Math.PI / 180);
        ctx.translate(-textCenterX, -textCenterY);

        ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha * 0.4})`;
        ctx.fillText(this.text, this.position.x + 2, this.position.y + 2);

        const textColorRgb = this.baseTextColor.match(/\d+/g);
        ctx.fillStyle = `rgba(${textColorRgb[0]}, ${textColorRgb[1]}, ${textColorRgb[2]}, ${this.alpha})`;
        ctx.fillText(this.text, this.position.x, this.position.y);

        ctx.restore();
    }

    getScaledHeight() {
        return this.fontSize * this.currentScale;
    }
}

const hearts = [];
const animatedTexts = [];

let lastHeartSpawnTime = 0;
let lastTextSpawnTime = 0;

// Увеличиваем интервал появления сердец (уменьшаем частоту)
const HEART_SPAWN_INTERVAL = 800; // Чем больше это значение, тем реже будут появляться сердца.
// Увеличиваем интервал появления текста (уменьшаем частоту)
const TEXT_SPAWN_INTERVAL = 1500; // Чем больше это значение, тем реже будет появляться текст.
const CHECK_SPAWN_FREQUENCY = 100;

const introTextContainer = document.getElementById('introTextContainer');
const introTextMessageElement = document.getElementById('introTextMessage');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');

let currentArrowTimer = null;

const introMessages = [
    {
        text: "Ты настолько прекрасна и удивительно чудесна, что мне уже не хватает своего собственного языка, чтобы описать тебя, какая ты волшебная.<br><br>Именно поэтому я подумал, что хочу сделать тебе немного приятно — хотя бы так)",
        displayDuration: 15000
    },
    {
        text: "И вот я выбрал 10 прекрасных языков со всего мира, которые, как по мне, будут тебе особенно красивыми — пусть они скажут то, чего не хватает моим словам.",
        displayDuration: 15000
    },
    {
        text: "Люблю тебя всю, какая ты есть.<br>От твоего Ромы <span class='large-heart'>♥</span>",
        displayDuration: 15000
    },
    {
        text: "Именно для Вас, несравненной&nbsp;Мэделины, Роман выбрал для вас 10 прекрасных языков мира такие как:<br>&nbsp;&nbsp;Русский<br>&nbsp;&nbsp;Молдавский / Румынский<br>&nbsp;&nbsp;Английский<br>&nbsp;&nbsp;Французский<br>&nbsp;&nbsp;Итальянский<br>&nbsp;&nbsp;Испанский<br>&nbsp;&nbsp;Немецкий<br>&nbsp;&nbsp;Португальский<br>&nbsp;&nbsp;Греческий<br>&nbsp;&nbsp;Японский",
        displayDuration: 20000
    },
    {
        text: `Пусть это будет для вас удовольствием,<br><span class="highlight-name">мадемуазель Мэделина.</span><br><br>Наслаждайтесь...`,
        displayDuration: 15000
    }
];
const INTRO_FADE_OUT_DURATION = 3000;
const INTRO_FADE_IN_DURATION = 1000;

let currentMessageIndex = 0;
let mainAnimationIntervalId;

async function showArrow(arrowElement) {
    arrowElement.style.pointerEvents = 'auto';
    arrowElement.style.opacity = 1;
}

async function hideArrow(arrowElement) {
    arrowElement.style.opacity = 0;
    arrowElement.style.pointerEvents = 'none';
}

async function displayMessage(index, showArrowsImmediately = false) {
    if (currentArrowTimer) {
        clearTimeout(currentArrowTimer);
    }
    await hideArrow(nextArrow);
    await hideArrow(prevArrow);

    introTextContainer.style.opacity = 1;
    introTextMessageElement.style.opacity = 0;
    introTextMessageElement.style.transition = `opacity ${INTRO_FADE_IN_DURATION / 1000}s ease-in`;

    const message = introMessages[index];
    introTextMessageElement.innerHTML = message.text;

    if (index < 3) {
        introTextMessageElement.style.fontFamily = "'Great Vibes', cursive";
    } else {
        introTextMessageElement.style.fontFamily = "'Playfair Display', serif";
    }

    await new Promise(resolve => setTimeout(resolve, 50));
    introTextMessageElement.style.opacity = 1;

    await new Promise(resolve => setTimeout(resolve, INTRO_FADE_IN_DURATION));

    const arrowDelay = showArrowsImmediately ? 0 : 5000;

    currentArrowTimer = setTimeout(async () => {
        if (currentMessageIndex > 0) {
            await showArrow(prevArrow);
        } else {
            await hideArrow(prevArrow);
        }

        if (currentMessageIndex < introMessages.length - 1) {
            nextArrow.innerHTML = '▶';
            nextArrow.classList.remove('end-arrow');
            await showArrow(nextArrow);
        } else {
            nextArrow.innerHTML = '♥';
            nextArrow.classList.add('end-arrow');
            await showArrow(nextArrow);
        }
    }, arrowDelay);
}

async function handleNextClick() {
    introTextMessageElement.style.transition = `opacity ${INTRO_FADE_OUT_DURATION / 1000}s ease-out`;
    introTextMessageElement.style.opacity = 0;
    await hideArrow(nextArrow);
    await hideArrow(prevArrow);

    await new Promise(resolve => setTimeout(resolve, INTRO_FADE_OUT_DURATION));

    currentMessageIndex++;
    if (currentMessageIndex < introMessages.length) {
        displayMessage(currentMessageIndex);
    } else {
        introTextContainer.style.transition = `opacity ${INTRO_FADE_OUT_DURATION / 1000}s ease-out`;
        introTextContainer.style.opacity = 0;
        await new Promise(resolve => setTimeout(resolve, INTRO_FADE_OUT_DURATION));
        introTextContainer.style.display = 'none';
        startMainAnimation();
    }
}

async function handlePrevClick() {
    introTextMessageElement.style.transition = `opacity ${INTRO_FADE_OUT_DURATION / 1000}s ease-out`;
    introTextMessageElement.style.opacity = 0;
    await hideArrow(nextArrow);
    await hideArrow(prevArrow);

    await new Promise(resolve => setTimeout(resolve, INTRO_FADE_OUT_DURATION));

    currentMessageIndex--;
    if (currentMessageIndex >= 0) {
        displayMessage(currentMessageIndex, true);
    } else {
        currentMessageIndex = 0;
        displayMessage(currentMessageIndex, true);
    }
}

function startMainAnimation() {
    canvas.style.display = 'block';
    canvas.style.opacity = 1;

    requestAnimationFrame(animate);

    lastHeartSpawnTime = performance.now();
    lastTextSpawnTime = performance.now();

    mainAnimationIntervalId = setInterval(() => {
        const currentTime = performance.now();

        if (currentTime - lastHeartSpawnTime > HEART_SPAWN_INTERVAL) {
            // Увеличиваем размер сердец
            const heartSize = random.nextInt(80, 160); // Было 30, 80
            const x = random.nextInt(0, canvas.width - heartSize);
            const y = random.nextInt(0, canvas.height - heartSize);
            const randomEmoji = emojiHearts[random.nextInt(emojiHearts.length)];
            hearts.push(new Heart(x, y, heartSize, random, randomEmoji));
            lastHeartSpawnTime = currentTime;
        }

        if (currentTime - lastTextSpawnTime > TEXT_SPAWN_INTERVAL) {
            let textToSpawn;
            if (nextSpawnIsAdjective) {
                textToSpawn = adjectives[random.nextInt(adjectives.length)];
            } else {
                textToSpawn = names[random.nextInt(names.length)];
            }
            nextSpawnIsAdjective = !nextSpawnIsAdjective;

            // Увеличиваем размер шрифта текста
            const fontSize = random.nextInt(35, 65); // Было 16, 30

            ctx.font = `${fontSize * 1.0}px Arial`;
            const tempTextMetrics = ctx.measureText(textToSpawn);
            const approxTextWidth = tempTextMetrics.width;
            const approxTextHeight = fontSize * 1.5;

            const x = random.nextInt(0, Math.max(0, canvas.width - approxTextWidth));
            const y = random.nextInt(0, Math.max(0, canvas.height - approxTextHeight));

            animatedTexts.push(new AnimatedText(x, y, textToSpawn, fontSize, random));
            lastTextSpawnTime = currentTime;
        }
    }, CHECK_SPAWN_FREQUENCY);
}

document.addEventListener('DOMContentLoaded', () => {
    nextArrow.addEventListener('click', handleNextClick);
    prevArrow.addEventListener('click', handlePrevClick);

    hideArrow(nextArrow);
    hideArrow(prevArrow);

    introTextContainer.style.display = 'flex';
    introTextContainer.style.opacity = 1;

    displayMessage(currentMessageIndex);
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];
        heart.update();
        if (heart.alpha <= 0 || heart.position.y + heart.baseSize * heart.currentScale < 0) {
            hearts.splice(i, 1);
        } else {
            heart.draw(ctx);
        }
    }

    for (let i = animatedTexts.length - 1; i >= 0; i--) {
        const textObj = animatedTexts[i];
        textObj.update();
        if (textObj.alpha <= 0 || textObj.position.y + textObj.getScaledHeight() < 0) {
            animatedTexts.splice(i, 1);
        } else {
            textObj.draw(ctx);
        }
    }

    requestAnimationFrame(animate);
}