let characterStats = {
    health: { current: 19, max: 19 },
    mana: { current: 10, max: 10 },
    xp: { current: 0, max: 100 }
};

function updateStat(type, target, amount) {
    let stat = characterStats[type];

    if (target === 'max') {
        stat.max += amount;
        if (stat.max < 1) stat.max = 1; 
        if (type !== 'xp' && stat.current > stat.max) stat.current = stat.max; 
    } else {
        stat.current += amount;
        if (stat.current < 0) stat.current = 0; 
        if (type !== 'xp' && stat.current > stat.max) stat.current = stat.max; 
    }

    renderUI(type);
}

function renderUI(type) {
    let stat = characterStats[type];

    //js procurw elementos no HTML
    let currentElement = document.getElementById(type + '-current');
    let maxElement = document.getElementById(type + '-max');
    let fillElement = document.getElementById(type + '-fill');

    if (currentElement) currentElement.innerText = stat.current;
    if (maxElement) maxElement.innerText = stat.max;

    if (fillElement) {
        let percentage = (stat.current / stat.max) * 100;
        if (percentage > 100) percentage = 100; 
        fillElement.style.width = percentage + '%';
    }
}

window.onload = function() {
    renderUI('health');
    renderUI('mana');
    renderUI('xp');
};
// ==========================================
// UPLOAD DE PFP
// ==========================================
const avatarUpload = document.getElementById('avatar-upload');
const avatarImg = document.getElementById('avatar-img');

if (avatarUpload) {
    avatarUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            //ferramenta do navegador para ler arquivosPC
            const reader = new FileReader();
            
            reader.onload = function(e) {
                avatarImg.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
}

// ==========================================
// REPUTAÇÃO 
// ==========================================
const repSlider = document.getElementById("repSlider");
const repDisplayBox = document.getElementById("repDisplayBox");
const repValor = document.getElementById("repValor");

function atualizarReputacao() {
    if (!repSlider || !repDisplayBox || !repValor) return;
    
    const valorAtual = repSlider.value;
    const min = repSlider.min;
    const max = repSlider.max;
    repValor.innerText = valorAtual;
    const porcentagem = ((valorAtual - min) / (max - min)) * 100;
    repDisplayBox.style.left = `calc(${porcentagem}% + (${12 - porcentagem * 0.24}px))`;
}
if (repSlider) {
    repSlider.addEventListener("input", atualizarReputacao);
    atualizarReputacao();
}