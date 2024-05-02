USE budgets;

-- TODO: modify default user permissions to be minimal

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
    PRIMARY KEY (id),
    FOREIGN KEY (owner) REFERENCES users(id),
    UNIQUE (name, owner)
);

CREATE TABLE expenses (
	id			INT UNSIGNED NOT NULL AUTO_INCREMENT,
    category	INT UNSIGNED NOT NULL,
    owner		INT UNSIGNED NOT NULL,
    year		SMALLINT UNSIGNED NOT NULL,
    month		TINYINT UNSIGNED NOT NULL,
    value		INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES categories(id),
    FOREIGN KEY (owner) REFERENCES users(id),
    UNIQUE (category, owner, year, month)
);