// utils/videoHelper.js
import fs from 'fs';
import path from 'path';

export async function saveFinalizedVideo(testInfo) {
  // Find the video attachment path
  const videoAttachment = testInfo.attachments.find(att => att.name === 'video');
  if (!videoAttachment) return;

  const videoPath = videoAttachment.path;

  const dir = path.resolve('video');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const safeTitle = testInfo.title.replace(/[<>:"\/\\|?*]+/g, '_');
  const destPath = path.join(dir, `${safeTitle}.webm`);

  fs.copyFileSync(videoPath, destPath); // ✅ safer than rename
  console.log(`🎥 Video saved to: ${destPath}`);
}
