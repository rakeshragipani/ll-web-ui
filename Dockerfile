FROM leftlane/nginxuat
EXPOSE 80
COPY dist/leftlane-ui /usr/share/nginx/html/
RUN yum install -y gettext
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
