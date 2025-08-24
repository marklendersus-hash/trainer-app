// api/upload.js

// Importiere die notwendigen Werkzeuge aus dem AWS S3 SDK.
// Dieses SDK ist mit der S3-kompatiblen API von Backblaze B2 kompatibel.
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Diese Funktion wird von der Vercel-Hosting-Umgebung aufgerufen,
// wenn eine Anfrage an /api/upload gesendet wird.
export default async function handler(request, response) {
  // Erlaube nur POST-Anfragen, da wir Daten (eine Datei) senden.
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end('Method Not Allowed');
  }

  try {
    // Hole die geheimen Zugangsdaten und Konfigurationen aus den Umgebungsvariablen.
    // Dies ist der sichere Weg, um sensible Daten zu speichern.
    const B2_KEY_ID = process.env.B2_KEY_ID;
    const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY;
    const B2_BUCKET_NAME = process.env.B2_BUCKET_NAME;
    const B2_ENDPOINT = process.env.B2_ENDPOINT; // z.B. 's3.eu-central-003.backblazeb2.com'

    // Überprüfe, ob alle notwendigen Umgebungsvariablen gesetzt sind.
    if (!B2_KEY_ID || !B2_APPLICATION_KEY || !B2_BUCKET_NAME || !B2_ENDPOINT) {
        throw new Error("Server-Konfiguration unvollständig: Umgebungsvariablen fehlen.");
    }

    // Erstelle einen neuen S3-Client, der auf unseren Backblaze B2 Endpoint zeigt.
    const s3Client = new S3Client({
      endpoint: `https://${B2_ENDPOINT}`,
      region: B2_ENDPOINT.split('.')[1], // Extrahiert die Region aus dem Endpoint, z.B. 'eu-central-003'
      credentials: {
        accessKeyId: B2_KEY_ID,
        secretAccessKey: B2_APPLICATION_KEY,
      },
    });

    // Hole den Dateinamen und den Dateityp aus den Headern der Anfrage.
    // Diese werden von unserer Frontend-Funktion in api.js gesendet.
    const fileName = request.headers['x-file-name'];
    const fileType = request.headers['content-type'];

    if (!fileName || !fileType) {
        return response.status(400).json({ message: 'Fehlende Header: x-file-name oder content-type' });
    }
    
    // Erstelle einen eindeutigen Schlüssel für die Datei, um Namenskonflikte zu vermeiden.
    // z.B. 'spielerfotos/1692828192-mein-spieler.jpg'
    const fileKey = `uploads/${Date.now()}-${fileName}`;

    // Erstelle den Befehl zum Hochladen der Datei.
    const command = new PutObjectCommand({
      Bucket: B2_BUCKET_NAME,
      Key: fileKey,
      ContentType: fileType,
    });
    
    // Lade das Objekt (die Datei) direkt aus dem Request-Body in den B2 Bucket hoch.
    await s3Client.send(
        new PutObjectCommand({
            Bucket: B2_BUCKET_NAME,
            Key: fileKey,
            Body: request.body, // Der Stream des Dateiinhalts
            ContentType: fileType,
        })
    );

    // Erstelle die öffentliche URL für die gerade hochgeladene Datei.
    const publicUrl = `https://f005.backblazeb2.com/file/${B2_BUCKET_NAME}/${fileKey}`;

    // Sende die öffentliche URL als erfolgreiche Antwort an die App zurück.
    return response.status(200).json({ url: publicUrl });

  } catch (error) {
    // Wenn ein Fehler auftritt, logge ihn auf dem Server und sende eine Fehlermeldung zurück.
    console.error('Fehler beim Upload:', error);
    return response.status(500).json({ message: 'Datei-Upload fehlgeschlagen.', error: error.message });
  }
}

