import fs from 'fs';
import path from 'path';
import { tempDir } from '../../../utils/publicPaths';

// const tempDir = resolve(__dirname, '..', '..', '..', '..', 'temp');

class VideoController {
  async index(req, res) {
    const filePath = path.resolve(tempDir, 'example.mp4');
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
}

export default new VideoController();
