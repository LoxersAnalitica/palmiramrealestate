import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'crypto'

// Función auxiliar para hashear datos (requerimiento de Meta CAPI)
const hashData = (data) => {
  if (!data) return '';
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

// Backend ficticio en desarrollo para ocultar Tokens y procesar integraciones
const kommoApiPlugin = () => ({
  name: 'kommo-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/kommo' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body);

            // --- 1. Preparar Payload para Kommo CRM ---
            const isDossier = data.name === 'Dossier Request (Atanaus)';
            const targetStatusId = isDossier ? 103045087 : 103034083; // 103045087 = 'Correo', 103034083 = 'Contacto inicial'

            const kommoPayload = [
              {
                "name": "Lead Off-Market - " + data.name,
                "pipeline_id": 13358703,
                "status_id": targetStatusId,
                "_embedded": {
                  "contacts": [
                    {
                      "name": data.name,
                      "custom_fields_values": [
                        { "field_code": "EMAIL", "values": [{ "value": data.email }] },
                        { "field_code": "PHONE", "values": [{ "value": data.phone || "Not provided" }] }
                      ]
                    }
                  ]
                }
              }
            ];

            const kommoPromise = fetch('https://pedropablocastro1995.kommo.com/api/v4/leads/complex', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhMTc1YjFlY2RjMGRhZGE1OGNjNTNiNTFhMDBlYjIyMzk4YmI0NDA3NjQwM2M4MTEzZDU5OTE3NWE5ZWJjYjZlMzQ3N2ZlMmVlOWJmOTRmIn0.eyJhdWQiOiIzOWU2YmMzMS1mMmJhLTRhMmUtOGRjMC1kZjBjMWUxNTQ0ZTUiLCJqdGkiOiJiYTE3NWIxZWNkYzBkYWRhNThjYzUzYjUxYTAwZWIyMjM5OGJiNDQwNzY0MDNjODExM2Q1OTkxNzVhOWViY2I2ZTM0NzdmZTJlZTliZjk0ZiIsImlhdCI6MTc3Mzc2NDMxMiwibmJmIjoxNzczNzY0MzEyLCJleHAiOjE5MDY0MTYwMDAsInN1YiI6IjE0OTE2Mzk1IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM2MTczNzExLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMzI5ODlhYTAtZWRlNC00ZGY5LThlMDQtNzZiMDQzMzUwYTU4IiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.n-ESKadlEYmJy45zaDyDgTRv3w1FN1zwRihWf_90o6om7d-7Y7YrsyX5X4kkHRNQaoB4fw_XHu4P40S-Ayouxe7zcaqAPklSL8BNMNGB6gxpQ2TGgoJ560Rcdxc0404NEgL2ntITbEYGUHt9jGyf_PByhStZakiYHkcDX1KSrygwQk-X3dk3p7aWoL2nerZIITbHAIGBgHr5n9uCQgJHADczEsuek4_-u8hevgzpDXajGzsXy59KUpzxHgKvj0AyXHS-vku7yWp9v5rmAx-V8fa5I-Frui80Nqwn8mb2I5KZTOuJ67LIzEibTy0izpQNPtK7HQPawPGGCjUUK3IAcw`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(kommoPayload)
            });

            // --- 2. Preparar Payload para Meta CAPI ---
            const eventId = crypto.randomUUID();
            const currentTimestamp = Math.floor(Date.now() / 1000);

            const metaPayload = {
              "data": [
                {
                  "event_name": "Lead",
                  "event_time": currentTimestamp,
                  "action_source": "website",
                  "event_id": eventId,
                  "user_data": {
                    "em": [hashData(data.email)],
                    "ph": [hashData(data.phone.replace(/[^0-9]/g, ''))] // Extraemos solo los números para el hash del teléfono
                  }
                }
              ]
            };

            const metaPromise = fetch('https://graph.facebook.com/v19.0/2042708403250462/events', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer EAAM87XgzXQsBQypNcFU41kQitsANL80ah1uFZC5EjvgUDgwv3EttVpq9UkUd7eZAiSiRLInrgRJVS3HTPznrlGfKnoZB1ZBTP8FRPL3zt8GakkOsRO2FzCpdptZA9xgnXUn10c8Dk56KdZA6GXvwiFJV54Rr4t7KIshLSr6QqZBencWyjYM2xBw930Ilw4x5dB6xwZDZD`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(metaPayload)
            });

            // 3. Ejecutar peticiones en paralelo. 
            // Esperamos principalmente a Kommo, Meta dispara independiente (no falla el lead de CRM si meta se cae)
            const [kommoResponse] = await Promise.all([
              kommoPromise,
              metaPromise.catch(err => { console.error("Meta CAPI Warning (non-fatal):", err); return null; })
            ]);

            if (kommoResponse.ok || kommoResponse.status === 200 || kommoResponse.status === 201) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } else {
              const errText = await kommoResponse.text();
              console.error("Kommo API Error:", errText);
              res.statusCode = kommoResponse.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Error del servidor CRM externo' }));
            }
          } catch (err) {
            console.error("Local Server Error:", err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Error interno del servidor dev' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), kommoApiPlugin()],
})
