import { createSwaggerSpec } from 'next-swagger-doc';

import { CONST } from './constants';

export function getSwaggerSpec() {
  return createSwaggerSpec({
    apiFolder: 'app/api', // API 라우트가 위치한 폴더
    definition: {
      openapi: '3.0.0',
      info: {
        title: `${CONST.TITLE.SITE_TITLE} API`,
        version: '1.0.0',
      },
    },
  });
}
