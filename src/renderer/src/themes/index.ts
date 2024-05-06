import { z } from 'zod';
import fs from 'fs';
import path from 'path';

interface Theme {
  name: string
  createdBy: string
  scheme: {
    font: string
    background: string
    darkBackground: string
    border: string
    muted: string
  }
}

const themeSchema = z.object({
  name: z.string().min(3).max(12),
  createdBy: z.string().min(3).max(12),
  scheme: z.object({
    font: z.string().min(1),
    background: z.string().min(1),
    darkBackground: z.string().min(1),
    border: z.string().min(1),
    muted: z.string().min(1),
  }),
});

export default async function readJSONFiles(): Promise<Theme[]> {
  const directory: string = path.resolve(__dirname, './themes');

  try {
    const files: string[] = await fs.promises.readdir(directory);
    const jsonFiles: string[] = files.filter(file => path.extname(file) === '.json');

    const promises: Promise<Theme>[] = jsonFiles.map(async file => {
      const filepath: string = path.join(directory, file);
      const data: string = await fs.promises.readFile(filepath, 'utf8');
      const json: string = JSON.parse(data);
      return themeSchema.parse(json);
    });
    return Promise.all(promises);
  } catch (err) { throw err }
}


const themes = await readJSONFiles()

export { themes }

import { createServer, Server } from 'http';

const server: Server = createServer((req, res) => {
  if (req.url === '/themes') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(themes));
  } else {
    res.writeHead(404);
    res.end('Endpoint não encontrado');
  }
});

const PORT: number = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
