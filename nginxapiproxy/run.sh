#!/bin/bash
sudo docker stop nginxapi
sudo docker rm nginxapi
sudo docker run -d -p 8889:80 -p 8887:81 -p 443:443 --name nginxapi nginxapiproxy