import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import path from 'node:path';

process.env.DATABASE_URL = `file:${path.resolve(process.cwd(), 'prisma/dev.db')}`;

import 'dotenv/config';
import { app } from './app.js';

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
