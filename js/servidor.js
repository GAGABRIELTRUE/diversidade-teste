const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');


// ==========================================================
// PRODUTOS
// ==========================================================

const produtos = {
    1: {
        nome: "Camiseta Todas as Cores",
        preco: "R$ 89,90",
        categoria: "Camiseta",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6qtKwU4GKWQUe0DQaXjn5ON8pCJy8qDE1rk2pa-9SQ&s=10",
        cor: "laranja",
        link: "#"
    },

    2: {
        nome: "Boné Orgulho Bordado",
        preco: "R$ 69,90",
        categoria: "Boné",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFo-lXiSA1grTaW6kuMVaaLvzL7878q7dYpb5im_4pAg&s=10",
        cor: "roxo",
        link: "#"
    },

    3: {
        nome: "Tote Bag Manifesto",
        preco: "R$ 54,90",
        categoria: "Acessório",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqrJOPiYrAgziRVmfOo88mP_zMEY89gkEBJyV0DtFqhw&s",
        cor: "verde",
        link: "#"
    },

    4: {
        nome: "Camiseta Corpo Livre",
        preco: "R$ 89,90",
        categoria: "Camiseta",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSplTLnwi4Fja3o4riYHLV-mTp-_KYWn0myYqKLK4UJqg&s",
        cor: "amarelo",
        link: "#"
    },

    5: {
        nome: "Pin Set Identidade",
        preco: "R$ 39,90",
        categoria: "Acessório",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb2FXBHZmaWM2K_Ta5ihwA6EFzv3QEtJ5SDLf0Ecb2Lw&s=10",
        cor: "laranja",
        link: "#"
    },

    6: {
        nome: "Moletom Todas as Mentes",
        preco: "R$ 159,90",
        categoria: "Moletom",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDN7EAU9l-kZ459kR4RRTVNRRi-EvM4X9koOaM2jfJhQ&s=10",
        cor: "roxo",
        link: "#"
    },

    7: {
        nome: "Camiseta Corpo Livre",
        preco: "R$ 89,90",
        categoria: "Camiseta",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSplTLnwi4Fja3o4riYHLV-mTp-_KYWn0myYqKLK4UJqg&s",
        cor: "amarelo",
        link: "#"
    }
};


// ==========================================================
// PALETAS DE CORES
// ==========================================================

const paletas = {
    laranja: {
        texto: "text-[#FF8B6B]",
        borda: "border-[#FF5A3C]",
        fundo: "bg-[#FF5A3C]",
        hoverFundo: "hover:bg-[#FF8B6B]"
    },

    roxo: {
        texto: "text-[#8B5CF6]",
        borda: "border-[#8B5CF6]",
        fundo: "bg-[#8B5CF6]",
        hoverFundo: "hover:bg-[#A78BFA]"
    },

    verde: {
        texto: "text-[#14B8A6]",
        borda: "border-[#14B8A6]",
        fundo: "bg-[#14B8A6]",
        hoverFundo: "hover:bg-[#2DD4BF]"
    },

    amarelo: {
        texto: "text-[#FFC145]",
        borda: "border-[#FFC145]",
        fundo: "bg-[#FFC145]",
        hoverFundo: "hover:bg-[#FCD34D]"
    }
};


// ==========================================================
// SERVIDOR
// ==========================================================

const server = http.createServer((req, res) => {

    // ------------------------------------------------------
    // CORS
    // ------------------------------------------------------

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );


    // ------------------------------------------------------
    // OPTIONS
    // ------------------------------------------------------

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }


    // ------------------------------------------------------
    // URL
    // ------------------------------------------------------

    const urlBase = `http://${req.headers.host}`;

    const urlParseada = new URL(
        req.url,
        urlBase
    );

    const caminho = urlParseada.pathname;

    const metodo = req.method;


    // ======================================================
    // SERVIR TAILWIND CSS
    // ======================================================

    if (
        metodo === 'GET' &&
        caminho === '/dist/output.css'
    ) {

        // servidor.js está em /js
        // Precisamos sair de /js para chegar em /dist

        const caminhoCss = path.join(
            __dirname,
            '..',
            'dist',
            'output.css'
        );


        try {

            const css = fs.readFileSync(
                caminhoCss,
                'utf8'
            );


            console.log(
                'Tailwind CSS carregado:',
                caminhoCss
            );


            res.writeHead(200, {
                'Content-Type':
                    'text/css; charset=utf-8'
            });


            return res.end(css);

        } catch (erro) {

            console.error(
                'Erro ao carregar output.css:',
                erro
            );


            res.writeHead(404, {
                'Content-Type':
                    'text/plain; charset=utf-8'
            });


            return res.end(
                'Arquivo dist/output.css não encontrado.'
            );
        }
    }


    // ======================================================
    // GET /produtos
    // ======================================================

    if (
        metodo === 'GET' &&
        caminho === '/produtos'
    ) {

        res.writeHead(200, {
            'Content-Type':
                'application/json; charset=utf-8'
        });


        return res.end(
            JSON.stringify({
                produtos
            })
        );
    }


    // ======================================================
    // GET /produto?id=1
    // ======================================================

    if (
        metodo === 'GET' &&
        caminho === '/produto'
    ) {

        const idProduto =
            urlParseada.searchParams.get('id');


        const produto =
            produtos[idProduto];


        // --------------------------------------------------
        // PRODUTO NÃO ENCONTRADO
        // --------------------------------------------------

        if (!produto) {

            res.writeHead(404, {
                'Content-Type':
                    'text/html; charset=utf-8'
            });


            return res.end(`
<!DOCTYPE html>

<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Produto não encontrado</title>

    <link
        rel="stylesheet"
        href="/dist/output.css"
    >

</head>


<body
    class="
        bg-stone-100
        flex
        flex-col
        items-center
        justify-center
        min-h-screen
        font-sans
    "
>

    <h1
        class="
            text-xl
            font-black
            uppercase
            tracking-tight
        "
    >
        Produto não encontrado
    </h1>


    <a
        href="javascript:history.back()"
        class="
            mt-4
            text-xs
            font-bold
            uppercase
            tracking-wider
            border-b-2
            border-black
            pb-1
        "
    >
        Voltar para a loja
    </a>

</body>

</html>
            `);
        }


        // --------------------------------------------------
        // PALETA DO PRODUTO
        // --------------------------------------------------

        const paleta =
            paletas[produto.cor] ||
            paletas.laranja;


        // --------------------------------------------------
        // IMAGEM
        // --------------------------------------------------

        const imagemHtml = produto.imagem

            ? `
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    class="
                        w-full
                        h-full
                        object-cover
                    "
                >
            `

            : `
                <div
                    class="
                        w-full
                        h-full
                        ${paleta.fundo}
                        flex
                        items-center
                        justify-center
                    "
                >

                    <span
                        class="
                            text-white
                            font-black
                            uppercase
                            text-xs
                            tracking-widest
                            opacity-70
                        "
                    >
                        Foto do produto
                    </span>

                </div>
            `;


        // ==================================================
        // HTML DA PÁGINA
        // ==================================================

        const paginaHtml = `
<!DOCTYPE html>

<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ${produto.nome} — Diversidade
    </title>


    <!-- TAILWIND -->

    <link
        rel="stylesheet"
        href="/dist/output.css"
    >

</head>


<body
    class="
        bg-stone-50
        font-sans
        text-stone-900
        min-h-screen
        flex
        flex-col
        justify-between
    "
>


    <!-- =================================================
         HEADER
    ================================================== -->

    <header
        class="
            border-b
            border-stone-200
            bg-white
            px-6
            py-4
            flex
            items-center
            justify-between
        "
    >

        <span
            class="
                text-lg
                font-black
                uppercase
                tracking-tight
            "
        >
            Diversidade.
        </span>


        <a
            href="javascript:history.back()"
            class="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-stone-500
                hover:text-black
                transition-colors
            "
        >
            ← Voltar aos produtos
        </a>

    </header>



    <!-- =================================================
         MAIN
    ================================================== -->

    <main
        class="
            flex-1
            flex
            items-center
            justify-center
            p-6
            md:p-12
        "
    >

        <div
            class="
                bg-white
                rounded-3xl
                border-2
                border-stone-200
                overflow-hidden
                max-w-4xl
                w-full
                flex
                flex-col
                md:flex-row
                shadow-sm
            "
        >


            <!-- =========================================
                 IMAGEM
            ========================================== -->

            <div
                class="
                    w-full
                    md:w-1/2
                    aspect-square
                    overflow-hidden
                    bg-stone-100
                    border-b-2
                    md:border-b-0
                    md:border-r-2
                    border-stone-200
                "
            >

                ${imagemHtml}

            </div>



            <!-- =========================================
                 INFORMAÇÕES
            ========================================== -->

            <div
                class="
                    p-8
                    md:p-12
                    flex
                    flex-col
                    justify-between
                    flex-1
                    gap-8
                "
            >


                <!-- CATEGORIA / NOME -->

                <div
                    class="
                        flex
                        flex-col
                        gap-3
                    "
                >

                    <p
                        class="
                            text-xs
                            font-mono
                            uppercase
                            tracking-widest
                            ${paleta.texto}
                        "
                    >
                        ${produto.categoria}
                    </p>


                    <h1
                        class="
                            text-3xl
                            font-black
                            uppercase
                            tracking-tight
                            leading-none
                        "
                    >
                        ${produto.nome}
                    </h1>


                    <div
                        class="
                            inline-flex
                            items-center
                            gap-2
                            mt-2
                        "
                    >

                        <span
                            class="
                                w-3
                                h-3
                                rounded-full
                                ${paleta.fundo}
                            "
                        ></span>


                        <span
                            class="
                                text-xs
                                font-mono
                                text-stone-500
                                uppercase
                                tracking-wide
                            "
                        >
                            Edição Especial //
                            ${produto.cor}
                        </span>

                    </div>

                </div>



                <!-- PREÇO / BOTÃO -->

                <div>

                    <p
                        class="
                            text-3xl
                            font-black
                            tracking-tight
                            mb-6
                        "
                    >
                        ${produto.preco}
                    </p>


                    <button
                        class="
                            w-full
                            ${paleta.fundo}
                            ${paleta.hoverFundo}
                            text-white
                            text-xs
                            font-bold
                            uppercase
                            tracking-widest
                            py-5
                            rounded-2xl
                            shadow-md
                            transition-all
                            duration-300
                            transform
                            active:scale-95
                        "
                    >
                        Adicionar à sacola
                    </button>


                    <p
                        class="
                            text-[10px]
                            font-mono
                            text-stone-400
                            text-center
                            mt-4
                            uppercase
                            tracking-widest
                        "
                    >
                        Frete calculado na
                        finalização do pedido
                    </p>

                </div>

            </div>

        </div>

    </main>



    <!-- =================================================
         FOOTER
    ================================================== -->

    <footer
        class="
            border-t
            border-stone-200
            bg-white
            px-6
            py-4
            text-center
        "
    >

        <p
            class="
                text-[10px]
                font-mono
                text-stone-400
                uppercase
                tracking-widest
            "
        >
            © 2026 Diversidade.
            Todos os corpos, todas as mentes.
        </p>

    </footer>


</body>

</html>
        `;


        // --------------------------------------------------
        // ENVIA A PÁGINA
        // --------------------------------------------------

        res.writeHead(200, {
            'Content-Type':
                'text/html; charset=utf-8'
        });


        return res.end(paginaHtml);
    }


    // ======================================================
    // ROTA NÃO ENCONTRADA
    // ======================================================

    res.writeHead(404, {
        'Content-Type':
            'application/json; charset=utf-8'
    });


    res.end(
        JSON.stringify({
            erro: "Rota não encontrada"
        })
    );

});


// ==========================================================
// INICIAR SERVIDOR
// ==========================================================

server.listen(4433, () => {

    console.log(
        'Servidor rodando em http://localhost:4433'
    );

});