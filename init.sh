#!/bin/sh

if [ ! -f ".initialized" ]; then
  prisma generate
  prisma migrate dev
  touch .initialized
fi

npm start