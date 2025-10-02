#!/bin/sh
API_URL=${API_URL:-http://localhost:8080/api}

echo "Using API_URL=${API_URL}"

# Замінюємо плейсхолдер на API_URL
sed -i "s|API_URL_PLACEHOLDER|${API_URL}|g" /usr/share/nginx/html/config.json

# Запускаємо nginx
exec nginx -g "daemon off;"
