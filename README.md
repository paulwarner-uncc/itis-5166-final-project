This is a simple personal budget app created as a final project for ITIS 5166 at the University of
North Carolina at Charlotte.

# Building and Deploying
This project was built using NodeJS 18.15.0, though any recent-ish version of NodeJS should work.
The project has also been configured to be deployed via Docker, so the application can be started
by running `docker compose up`.

# Testing
The backend uses jest to test the backend functionality. These tests can be ran via `npm test`. The
frontend uses Cypress, which can be ran via `npx cypress open` while `ng serve` is running in the
background.