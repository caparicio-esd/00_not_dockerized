#!/bin/bash

# docker-compose up
# node ${PWD}/interface-server/.

bash -c 'node ${PWD}/interface-server/.'
bash -c '
    cd interface-front/interface-server-front-end
    npm run dev
'
