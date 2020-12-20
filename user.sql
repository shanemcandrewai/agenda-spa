PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE user(
  id integer primary key,
  name text unique not null,
  password text not null
);
INSERT INTO user VALUES(1,'xxx','$2b$12$JdlBj2s8yhuSWXTiXBA52e60TzgErlVV.naBxt.XDtR4jxcT1ceCi');
INSERT INTO user VALUES(2,'sss','$2b$12$fzUfRH6NlEUHc/Lf0pgzMe.JDe1YkU07ZMgmj94eD5slPdaBcO5J6');
COMMIT;
