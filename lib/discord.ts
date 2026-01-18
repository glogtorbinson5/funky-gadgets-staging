export async function shareToDiscord(webhookUrl: string, prompt: string): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `\`\`\`\n${prompt}\n\`\`\``,
      }),
    });
  } catch (error) {
    console.error('Failed to share to Discord:', error);
    throw error;
  }
}
