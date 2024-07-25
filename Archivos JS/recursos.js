document.addEventListener('DOMContentLoaded', function () {
  // Cargar el archivo JSON y mostrar los recursos
  fetch('Archivos JSON/recursos.json')
    .then(response => response.json())
    .then(data => {
      const articulosContent = document.getElementById('articulos-content');
      const librosContent = document.getElementById('libros-content');
      const herramientasContent = document.getElementById('herramientas-content');

      data.articulos.forEach(item => {
        const articuloItem = document.createElement('div');
        articuloItem.classList.add('resource-item', 'mb-3', 'p-3', 'bg-dark', 'text-white', 'rounded');
        articuloItem.innerHTML = `<h5>${item.titulo}</h5><p>${item.descripcion}</p><a href="${item.enlace}" target="_blank" class="btn btn-primary">Leer más</a>`;
        articulosContent.appendChild(articuloItem);
      });

      data.libros.forEach(item => {
        const libroItem = document.createElement('div');
        libroItem.classList.add('resource-item', 'mb-3', 'p-3', 'bg-dark', 'text-white', 'rounded');
        libroItem.innerHTML = `<h5>${item.titulo}</h5><p>${item.descripcion}</p><a href="${item.enlace}" target="_blank" class="btn btn-primary">Leer más</a>`;
        librosContent.appendChild(libroItem);
      });

      data.herramientas.forEach(item => {
        const herramientaItem = document.createElement('div');
        herramientaItem.classList.add('resource-item', 'mb-3', 'p-3', 'bg-dark', 'text-white', 'rounded');
        herramientaItem.innerHTML = `<h5>${item.titulo}</h5><p>${item.descripcion}</p><a href="${item.enlace}" target="_blank" class="btn btn-primary">Leer más</a>`;
        herramientasContent.appendChild(herramientaItem);
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

  // Variables globales
  let net;

  // Cargar el modelo de MobileNet
  async function loadModel() {
    net = await mobilenet.load();
    console.log('Modelo cargado.');
  }

  loadModel();

  // Manejar la carga de imágenes
  document.getElementById('image-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.getElementById('uploaded-image');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('classify-btn').style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Clasificar la imagen cargada
  document.getElementById('classify-btn').addEventListener('click', async function () {
    const img = document.getElementById('uploaded-image');
    const result = await net.classify(img);
    displayResults(result);
  });

  // Mostrar los resultados de la clasificación
  function displayResults(predictions) {
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = '';

    predictions.forEach(prediction => {
      let translatedLabel = translateLabel(prediction.className);
      const listItem = document.createElement('li');
      listItem.textContent = `${translatedLabel} - ${(prediction.probability * 100).toFixed(2)}%`;
      resultsContainer.appendChild(listItem);
    });
  }

  // Traducir las etiquetas de los resultados
  function translateLabel(label) {
    const translations = {
      'lighter, light, igniter, ignitor': 'perro, luz, encendedor, ignitor',
      'beer glass': 'vaso de cerveza',
      'toilet tissue, toilet paper, bathroom tissue': 'papel higiénico, papel de baño',
      // Añade más traducciones aquí según sea necesario
    };

    return translations[label] || label;
  }

  // Chatbot Interactivo
  document.getElementById('send-btn').addEventListener('click', function() {
    const chatInput = document.getElementById('chat-input');
    const userMessage = chatInput.value;
    if (userMessage.trim() !== "") {
      addMessage(userMessage, 'user');
      chatInput.value = '';
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, 'bot');
      }, 1000);
    }
  });

  function addMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hola')) {
      return '¡Hola! ¿Cómo puedo ayudarte con la inteligencia artificial?';
    } else if (lowerCaseMessage.includes('que es ia')) {
      return 'La inteligencia artificial (IA) es una rama de la informática que se enfoca en crear sistemas capaces de realizar tareas que normalmente requieren de la inteligencia humana.';
    } else if (lowerCaseMessage.includes('gracias')) {
      return '¡De nada! ¿Hay algo más en lo que pueda ayudarte?';
    } else if (lowerCaseMessage.includes('aplicaciones de ia')) {
      return 'La IA se utiliza en medicina, negocios, entretenimiento, y muchos otros campos.';
    } else if (lowerCaseMessage.includes('diferencia entre ia débil y fuerte')) {
      return 'IA débil se enfoca en tareas específicas, mientras que IA fuerte tiene capacidades cognitivas generales como un humano.';
    } else if (lowerCaseMessage.includes('aprendizaje supervisado')) {
      return 'El aprendizaje supervisado es un tipo de aprendizaje automático donde el modelo se entrena con datos etiquetados.';
    } else if (lowerCaseMessage.includes('aprendizaje no supervisado')) {
      return 'El aprendizaje no supervisado es un tipo de aprendizaje automático donde el modelo encuentra patrones en datos sin etiquetar.';
    } else if (lowerCaseMessage.includes('aprendizaje por refuerzo')) {
      return 'El aprendizaje por refuerzo es un tipo de aprendizaje automático donde el modelo aprende mediante prueba y error para maximizar recompensas.';
    } else if (lowerCaseMessage.includes('herramientas de ia')) {
      return 'Algunas herramientas de IA populares incluyen TensorFlow, PyTorch, y scikit-learn.';
    } else if (lowerCaseMessage.includes('qué es machine learning')) {
      return 'Machine learning es una subárea de la IA que permite a los sistemas aprender y mejorar automáticamente a partir de la experiencia.';
    } else if (lowerCaseMessage.includes('qué es deep learning')) {
      return 'Deep learning es una subárea de machine learning que utiliza redes neuronales profundas para modelar patrones complejos en grandes cantidades de datos.';
    } else if (lowerCaseMessage.includes('python en ia')) {
      return 'Python es uno de los lenguajes más utilizados en IA debido a su simplicidad y la gran cantidad de librerías disponibles.';
    } else if (lowerCaseMessage.includes('qué es tensorflow')) {
      return 'TensorFlow es una biblioteca de código abierto para el machine learning desarrollada por Google.';
    } else if (lowerCaseMessage.includes('qué es pytorch')) {
      return 'PyTorch es una biblioteca de machine learning desarrollada por Facebook, conocida por su facilidad de uso y flexibilidad.';
    } else if (lowerCaseMessage.includes('aplicaciones de machine learning')) {
      return 'Machine learning se utiliza en reconocimiento de voz, visión por computadora, motores de recomendación, y más.';
    } else if (lowerCaseMessage.includes('qué es nlp')) {
      return 'NLP (procesamiento del lenguaje natural) es un campo de la IA que se enfoca en la interacción entre computadoras y el lenguaje humano.';
    } else if (lowerCaseMessage.includes('ejemplos de nlp')) {
      return 'Ejemplos de NLP incluyen asistentes virtuales, análisis de sentimiento, y traducción automática.';
    } else if (lowerCaseMessage.includes('qué es visión por computadora')) {
      return 'Visión por computadora es un campo de la IA que enseña a las computadoras a interpretar y comprender el mundo visual.';
    } else if (lowerCaseMessage.includes('ejemplos de visión por computadora')) {
      return 'Ejemplos de visión por computadora incluyen reconocimiento facial, análisis de imágenes médicas, y conducción autónoma.';
    } else {
      return 'Lo siento, no entiendo tu pregunta. ¿Puedes intentar preguntar de otra manera?';
    }
  }
});
