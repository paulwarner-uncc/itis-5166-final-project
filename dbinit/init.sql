USE budgets;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE categories (
	id		INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name	VARCHAR(100) NOT NULL,
    owner	INT UNSIGNED NOT NULL,
    value	FLOAT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (name, owner)
);

CREATE TABLE expenses (
	id			INT UNSIGNED NOT NULL AUTO_INCREMENT,
    category	INT UNSIGNED NOT NULL,
    owner		INT UNSIGNED NOT NULL,
    year		SMALLINT UNSIGNED NOT NULL,
    month		TINYINT UNSIGNED NOT NULL,
    value		FLOAT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (category, owner, year, month)
);