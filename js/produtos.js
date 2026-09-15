// ⚙️ MENU MOBILE — Página de Produtos
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', String(isHidden));
});

// Cores de destaque disponíveis para os cards
const paletas = {
    laranja: { texto: "text-[#FF8B6B]", borda: "hover:border-[#FF5A3C]", fundo: "bg-[#FF5A3C]" },
    roxo: { texto: "text-[#8B5CF6]", borda: "hover:border-[#8B5CF6]", fundo: "bg-[#8B5CF6]" },
    verde: { texto: "text-[#14B8A6]", borda: "hover:border-[#14B8A6]", fundo: "bg-[#14B8A6]" },
    amarelo: { texto: "text-[#FFC145]", borda: "hover:border-[#FFC145]", fundo: "bg-[#FFC145]" }
};

function criarCardProduto(produto) {
    const paleta = paletas[produto.cor] || paletas.laranja;

    const imagemHtml = produto.imagem
        ? `<img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-full object-cover">`
        : `<div class="w-full h-full ${paleta.fundo} flex items-center justify-center">
               <span class="text-white font-black uppercase text-xs tracking-widest opacity-70">Foto do produto</span>
           </div>`;

    const card = document.createElement('a');
    card.href = produto.link || "#";
    card.className = `group bg-white rounded-3xl border-2 border-stone-200 ${paleta.borda} overflow-hidden flex flex-col transition-colors duration-300`;

    card.innerHTML = `
        <div class="w-full aspect-square overflow-hidden">
            ${imagemHtml}
        </div>
        <div class="p-6 flex flex-col gap-2 flex-1">
            <p class="text-[10px] font-mono uppercase tracking-widest ${paleta.texto}">${produto.categoria}</p>
            <h3 class="text-lg font-black uppercase tracking-tight leading-snug">${produto.nome}</h3>
            <div class="mt-auto flex items-center justify-between pt-4">
                <span class="font-bold text-base">${produto.preco}</span>
                <span class="text-xs font-bold uppercase tracking-wider border-b-2 border-transparent group-hover:border-black pb-1 transition-colors">
                    Ver produto
                </span>
            </div>
        </div>
    `;

    return card;
}

// 🛍️ CONEXÃO COM O SERVIDOR (Substitui a lista estática antiga)
// 🔴 MUDE ABAIXO PARA O ENDEREÇO IP DO SEU COMPUTADOR PARA RODAR NO CELULAR
const IP_SERVIDOR = "localhost"; // Mude para algo como "192.168.x.x" se testar no celular
const URL_API = `http://${IP_SERVIDOR}:4433/produtos`;

async function carregarProdutosDoServidor() {
    const grid = document.getElementById('produtos-grid');
    
    try {
        const resposta = await fetch(URL_API);
        const dados = await resposta.json();
        grid.innerHTML = '';

        // Object.entries nos dá o ID (chave) e os dados do produto (valor)
        Object.entries(dados.produtos).forEach(([id, produto]) => {
            
            // Criamos o card passando os dados
            const card = criarCardProduto(produto);
            
            // 🔴 Apontamos o link diretamente para a rota do servidor correspondente ao ID
            card.href = `http://${IP_SERVIDOR}:4433/produto?id=${id}`;
            
            grid.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao buscar produtos da API:", erro);
        grid.innerHTML = `<p class="text-stone-500 font-mono text-xs col-span-full text-center py-8">Não foi possível carregar os produtos.</p>`;
    }
}

// Executa a busca assim que o script carregar
carregarProdutosDoServidor();
