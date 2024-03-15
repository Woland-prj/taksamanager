# Taksamanager

## What project about

A powerful task manager app for Infotech mediacenter. It is realy simple to create, administrate and implement tasks. 

## Requirements

* installed [docker](https://www.docker.com/) and docker compose
* installed latest version of [node js](https://node.org/en)
* yarn package manager

## Starting the postgres database in docker

At first you need to be in <repository_location>/taksamanager. Then run the following command:

````shell
docker compose up -d 
````

>***P. S.*** To disable database you need to run:
> 
>```shell
>docker compose down
>```
> 
## Database migration

> ***You must run postgres in container before doing syncronization between schema and database!!!***

To run the app correctly you need to sync database schema with real database in docker conatiner. To do this run command:

````shell
yarn prisma db push
````

Also you can track your database in real time. To do this, run:

````shell
yarn prisma studio
````

After that go to [http://localhost:5555](http://localhost:5555) and select the database schema what you would like to track.
## Starting the developing server

To start all application in dev mode you need change your working directoty to <repository_location>/taksamanager and install packages by command:

````shell
yarn install
````

Or install packages separatly by follwing commands:

````shell
yarn install:server
yarn install:client
````

If all packages already installed run this command to start a full application:

````shell
yarn dev
````

Or start backend and frontend separately:

````shell
yarn dev:server
yarn dev:client
````

## Swagger API documenentation reference

All documentation of API methods is available at [http://localhost:3200/api/v1](http://localhost::3200/api/v1).
