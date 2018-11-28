#!/bin/bash

mv build/static/js/*.js ../been-there-backend/public/js/bundle.js
mv build/static/js/main.*.chunk.js ../been-there-backend/public/js/main.js
mv build/static/js/*.chunk.js ../been-there-backend/public/js/chunk.js
cp -v build/static/css/main.*.css ../been-there-backend/public/css/main.css
