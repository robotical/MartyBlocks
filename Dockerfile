FROM node:14-alpine

ENV PORT 8601

RUN apk add --no-cache git \
    && git clone https://github.com/robotical/MartyBlocks.git \
    && cd MartyBlocks \
    && ./dockerHelper.sh

WORKDIR /scratch-wifi
EXPOSE 8601
CMD ["npm","start"]
