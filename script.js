<!-- FORMULARIO JAVASCRIPT -->
        <script>
            // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAItnN6k046cLMsWAxSrCrkV9yyLklMFrI",
        authDomain: "formulario-dom-cabron.firebaseapp.com",
        databaseURL: "https://formulario-dom-cabron-default-rtdb.firebaseio.com",
        projectId: "formulario-dom-cabron",
        storageBucket: "formulario-dom-cabron.appspot.com",
        messagingSenderId: "583969099203",
        appId: "1:583969099203:web:17b8ce2f39ba3fa0c0c176"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // Manipular envio do formulário

    document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("date").value = new Date().toLocaleString();
    });

    document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const city = document.getElementById("city").value.trim();
        const comment = document.getElementById("comment").value.trim();
        const date = new Date().toLocaleString();

        if (name && city && comment) {
            try {
                // Envia os dados ao Firebase
                await db.ref("comments/").push({ name, city, comment, date });
                alert("Comentário enviado com sucesso!");
                document.getElementById("feedbackForm").reset();
            } catch (error) {
                console.error("Erro ao enviar comentário:", error);
                alert("Não foi possível enviar o comentário. Tente novamente.");
            }
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    });

    // Exibir comentários
    const commentsSection = document.getElementById("commentsSection");
    db.ref("comments/").on("value", (snapshot) => {
        commentsSection.innerHTML = ""; // Limpa os comentários
        snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${comment.date} - ${comment.name} (${comment.city}):</strong>
                <p>${comment.comment}</p>
            `;
            commentsSection.appendChild(li);
        });	
    });
         

    // Referência ao contador no banco de dados
const visitsRef = db.ref("visits");

// Incrementar e exibir contador
async function updateVisitCounter() {
    try {
        const snapshot = await visitsRef.transaction((currentValue) => {
            return (currentValue || 0) + 1; // Incrementa o contador
        });
        document.getElementById("counter").innerHTML = `<strong>Visitas: ${snapshot.snapshot.val()}</strong>`;
    } catch (error) {
        console.error("Erro ao atualizar contador de visitas:", error);
        document.getElementById("counter").innerText = "Erro ao carregar visitas.";
    }
}

// Chamar a função ao carregar a página
updateVisitCounter();


// Capturar detalhes do visitante
async function logVisitorDetails() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;

        const userAgent = navigator.userAgent;

        // Salvar informações no Firebase
        const visitorData = {
            ip: ipAddress,
            userAgent: userAgent,
            timestamp: new Date().toISOString()
        };

        await db.ref("visitors/").push(visitorData);

        console.log("Detalhes do visitante registrados:", visitorData);
    } catch (error) {
        console.error("Erro ao registrar detalhes do visitante:", error);
    }
}

// Registrar detalhes do visitante
logVisitorDetails();

async function getVisitorLocation(ip) {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=6506d361850b98`);
    const data = await response.json();
    console.log("Localização do visitante:", data);
    return data;
}

async function logVisitorDetails() {
    try {
        // Obter o IP do visitante
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        // Obter localização do IP
        const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const locationData = await locationResponse.json();

        const visitorData = {
            ip: ip,
            location: {
                country: locationData.country,
                region: locationData.regionName,
                city: locationData.city,
                isp: locationData.isp
            },
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        // Salvar no Firebase
        await db.ref("visitors/").push(visitorData);

        console.log("Detalhes do visitante registrados:", visitorData);
    } catch (error) {
        console.error("Erro ao registrar detalhes do visitante:", error);
    }
}

logVisitorDetails();


    // Textos a serem digitados
    const tituloTexto = "Bem-vindo ao meu site!";
    const subtituloTexto = "Aqui você encontra as melhores novidades.";

    let tituloIndex = 0;
    let subtituloIndex = 0;

    const tituloElemento = document.getElementById("titulo");
    const subtituloElemento = document.getElementById("subtitulo");

    function digitarTitulo() {
        if (tituloIndex < tituloTexto.length) {
            tituloElemento.textContent += tituloTexto.charAt(tituloIndex);
            tituloIndex++;
            setTimeout(digitarTitulo, 100); // Velocidade da digitação
        } else {
            // Inicia o subtítulo após o título
            setTimeout(digitarSubtitulo, 500);
        }
    }

    function digitarSubtitulo() {
        if (subtituloIndex < subtituloTexto.length) {
            subtituloElemento.textContent += subtituloTexto.charAt(subtituloIndex);
            subtituloIndex++;
            setTimeout(digitarSubtitulo, 100);
        } else {
            // Remove o cursor quando termina a digitação
            tituloElemento.style.borderRight = "none";
            subtituloElemento.style.borderRight = "none";
        }
    }

    // Inicia a animação ao carregar a página
    window.onload = digitarTitulo;

    </script>
