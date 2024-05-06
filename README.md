This is a simple personal budget app created as a final project for ITIS 5166 at the University of
North Carolina at Charlotte.

# Building and Deploying
This project was built using NodeJS 18.15.0, though any recent-ish version of NodeJS should work.
The project has also been configured to be deployed via Docker, so the application can be started
by running `docker compose up`. Secrets do need to be placed in the `secrets` directory to set
up the database. Each secret file should contain the secret with no trailing newline.

## Secrets
- db_password.txt - the non-root password to the database.
- db_root_password.txt - the root password to the database.
- jwt_secret.txt - the secret used to sign the JWT tokens. This should be base64 encoded.

# Testing
The backend uses jest to test the backend functionality. These tests can be ran via `npm test`. The
frontend uses Cypress and Applitools, which can be ran via `npx cypress open` while `ng serve` is
running in the background.