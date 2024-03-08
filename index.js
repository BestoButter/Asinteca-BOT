const qrcode = require('qrcode-terminal');
const fs = require('fs');

const { Client, LocalAuth } = require('whatsapp-web.js');
const stopKeywords = ["3", "3️⃣"];
const usersToStop = new Set(); // Reemplaza "Set" por una variable global si lo prefieres.

//Guardar inicio de sesion
const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
      headless: true,
      args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
  },
  authStrategy: new LocalAuth({ clientId: "client" })
});

//Generacion de QR
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

//Asinteca BOT en la consola, lee desde el root
client.on('ready', () => {
    console.clear();
    console.log(client.info.wid);
    const consoleText = './config/console.txt';
    fs.readFile('console.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading the file:', err);
          return;
        }
        console.log(data);
      });
    }); 

client.on('message', async (message) => {
  const body = message.body;

  if (usersToStop.has(message.from)) {
    if (message.body === "4" || message.body === "4️⃣") {
      usersToStop.delete(message.from); // Remove the user from the list
      await message.reply('Regresaste al menú automatizado.');
      return;
    } else {
      return; // Ignore other messages from blocked users
    }
  }

  if (stopKeywords.some(keyword => body.includes(keyword))) {
    usersToStop.add(message.from); // Agregar el número de teléfono del usuario a la lista
    const WAID = '584146709690@c.us';
    const messageToSend = `El número ${message.from} quiere hablar con usted`;
    client.sendMessage(WAID, messageToSend);
    await message.reply("Nos contactaremos con usted en unos momentos.\n\n" + "O presione 4️⃣ para regresar al menú anterior.");
    return;
  }

	if (message.body === "1" || message.body === "1️⃣") {
    client.sendMessage(message.from, "*Curso de Elaboración de Quesos*\n\n" + "En este curso se estudiarán los aspectos básicos de composición de la leche, evaluación de su calidad y las técnicas para la elaboración de:\n\n" + "1. Queso Semiduro\n" + "2. Queso Aliñado\n" + "3. Queso de Mano\n" + "4. Queso Trenza\n" + "5. Mozzarella\n" + "6. Guayamano\n" + "7. Ricota\n\n" + "Dictado por MV MSc Gustavo Castro, Profesor Titular en la Facultad de Ciencias Veterinarias de LUZ.\n\n" + "*Fecha y lugar:* 16 de marzo de 9:00 am a 6:00 pm. Colegio de Médicos Veterinarios. Viento Norte, Maracaibo \n\n" + "*Inversión:* $ 50, por lo cual recibe certificado, material de apoyo digital (incluye recetas), almuerzo, refrigerios, asesoría postcurso por tiempo limitado.\n\n" + "El pago puede hacerse en bolívares, zelle, Wally o PayPal\n\n" + "Estamos en Instagram como @asintecca"); 
	} else if (message.body === "2" || message.body === "2️⃣") {
    client.sendMessage(message.from, "*Curso de Elaboración de Quesos Online*\n\n" + "En este webinar se estudiarán las técnicas basicas para la elaboración de:\n\n" + "1. Queso Semiduro\n" + "2. Queso Aliñado\n" + "3. Queso de Mano\n" + "4. Queso Trenza\n" + "5. Ricota\n\n" + "Dictado por MV MSc Gustavo Castro, Profesor Titular en la Facultad de Ciencias Veterinarias de LUZ.\n\n" + "*Fecha y lugar:* 23 de marzo de 2:00 a 6:00 pm  (hora de Venezuela) Transmisión en vivo a través de Google Meet\n\n" + "*Inversión:*  $ 30, por lo cual recibe certificado, material de apoyo digital, asesoría postcurso por tiempo limitado\n\n" + "El pago puede hacerse en bolívares, zelle, Wally o PayPal" );
  } else {
    client.sendMessage(message.from, "Gracias por comunicarte con ASINTECA\n\n" + "Envie 1️⃣ para información sobre cursos presenciales\n\n" + "Envie 2️⃣ para información sobre cursos en linea\n\n" + "Envie 3️⃣ para hablar con alguien.");
  }
});


client.initialize();
