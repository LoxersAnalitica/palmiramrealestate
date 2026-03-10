import crypto from 'crypto';

// Función auxiliar para hashear datos (requerimiento de Meta CAPI)
const hashData = (data) => {
    if (!data) return '';
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

export default async function handler(req, res) {
    // CORS Headers just in case (though Vercel handles same-origin cleanly)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = req.body; // Vercel ya parsea el JSON del body

        // --- 1. Preparar Payload para Kommo CRM ---
        const kommoPayload = [
            {
                "name": "Lead Off-Market - " + data.name,
                "_embedded": {
                    "contacts": [
                        {
                            "name": data.name,
                            "custom_fields_values": [
                                { "field_code": "EMAIL", "values": [{ "value": data.email }] },
                                { "field_code": "PHONE", "values": [{ "value": data.phone }] }
                            ]
                        }
                    ]
                }
            }
        ];

        const kommoPromise = fetch('https://pedropablocastro1995.kommo.com/api/v4/leads/complex', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIzYTI1ODIyMmY2MGE4MjIzZGEwYWExMTUyY2ExNTNiOTM3ZjA2NDRjMmI0NTVmYzQxMTFlM2Q1OTc2YzQ3Mjg4YjYyMTAxMDE3YmZlY2I1In0.eyJhdWQiOiIyNTM5MDhjZi1mMDEzLTQ4YjktYTM2ZC1lNzljZGE0NTU3ZTciLCJqdGkiOiJiM2EyNTgyMjJmNjBhODIyM2RhMGFhMTE1MmNhMTUzYjkzN2YwNjQ0YzJiNDU1ZmM0MTExZTNkNTk3NmM0NzI4OGI2MjEwMTAxN2JmZWNiNSIsImlhdCI6MTc3MzA2ODc0MiwibmJmIjoxNzczMDY4NzQyLCJleHAiOjE5MTE2ODY0MDAsInN1YiI6IjE0OTE2Mzk1IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM2MTczNzExLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZjZlMGNjMWItNDAwMy00MjE0LTg3MjUtZmRlNmY4YzNkZTBiIiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.R7Dyal5d3ouaDu4mjwffZsZbyxgF9-gPA1CRiP8NstueOsSDapvYc0JD-Psdqojq4-qUAY7fC3nReDbIB0JBMdBs0Jk5zOn7JUMfdeKOQyLaSihSMqt8p9lhiiGDP-b8LTxwyc4Mlw-dsBhrJ2StiaE0v0cC3NzMdr3oFB3DUkJ5_o5MCU_QvTuFcdbCLswUehts7nIa7ZRYr9mDqihhJCO31pi_S7GoA1udoXFt3NknaY9SGAbaynoTG8nVIhrcgnTFW5avx7_PU7S7yeZnoOUspdtmQNBwnsmx8JAnxt-T2aygb9sC1WspK9FkdlgHguXv7DhQMdnEkr2_6Feheg`,
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

        const metaPromise = fetch('https://graph.facebook.com/v19.0/1280982267279054/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer EAAX9D6aoNUIBQxNPZAlBlxZBc30pfOeLdYp31QT3ZAkZBnmeHZAm1eryK1zQF7Dlg292HMG3h1ppEZC5sQfih6avAqZBS5NiNxtxxiKI6gt7AA0r3vVtlhovO6Fku0eyhYiZAO7W2XNYObKoUqBZApKTroQIJDZBReZBPfZBXZC0NygNp86ExxOh96PNStIzOMlNm3f4uOAZDZD`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(metaPayload)
        });

        // 3. Ejecutar peticiones en paralelo. 
        const [kommoResponse] = await Promise.all([
            kommoPromise,
            metaPromise.catch(err => { console.error("Meta CAPI Warning (non-fatal):", err); return null; })
        ]);

        if (kommoResponse.ok || kommoResponse.status === 200 || kommoResponse.status === 201) {
            return res.status(200).json({ success: true });
        } else {
            const errText = await kommoResponse.text();
            console.error("Kommo API Error:", errText);
            return res.status(kommoResponse.status).json({ error: 'Error del servidor CRM externo', details: errText });
        }
    } catch (err) {
        console.error("Local Server/Vercel Error:", err);
        return res.status(500).json({ error: 'Error interno del servidor dev' });
    }
}
