const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json()); // Para analisar JSON dos dados do formulário

let venomClient;

// Inicializar o Venom-Bot
venom
  .create()
  .then((client) => {
    venomClient = client;
  })
  .catch((error) => console.log(error));

// Endpoint para receber os dados do formulário e enviar a mensagem
app.post('/send-message', (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).send({ error: 'Número de telefone e mensagem são obrigatórios.' });
  }

  // Enviar a mensagem no WhatsApp
  venomClient
    .sendText(`${phoneNumber}@c.us`, message) // c.us é o código para contas de usuário no WhatsApp
    .then((result) => {
      console.log('Mensagem enviada:', result);
      res.send({ success: true, message: 'Mensagem enviada com sucesso!' });
    })
    .catch((error) => {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).send({ success: false, error: 'Erro ao enviar a mensagem.' });
    });
});

// Iniciar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
