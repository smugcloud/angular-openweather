FROM node:0.12

COPY / /var/weather

RUN cd /var/weather && npm install

EXPOSE 9090

ENTRYPOINT ["/var/weather/entrypoint.sh"]
