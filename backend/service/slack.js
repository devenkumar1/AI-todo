import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function sendToSlack(message) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error('SLACK_WEBHOOK_URL not set in .env');

  const payload = { text: message };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Slack API error: ${response.statusText}`);
  }
} 