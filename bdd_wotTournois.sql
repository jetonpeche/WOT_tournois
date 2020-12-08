CREATE TABLE combatSolo
(
    ID_JOUEUR int not null,
    ID_ADVERSAIRE int not null,

    ID_CARTE int not null,

    primary key(ID_JOUEUR, ID_ADVERSAIRE)
);

CREATE TABLE joueur
(
      ID int not null AUTO_INCREMENT,

      NOM varchar(100),
      WIN8 int,
      VICTOIRE int DEFAULT 0,
      DEFAITE int DEFAULT 0,
      POINTS_TOTAL int DEFAULT 0,
      MEMBRE_CLAN varchar(3),
      DON decimal DEFAULT 0,

      ID_EQUIPE int null,
      NIVEAU_PALIER int not null,

      primary key (ID)
);

CREATE TABLE palier
(
      NIVEAU int not null,
      LIBELLE varchar(40),

      primary key(NIVEAU)
);

CREATE TABLE equipe
(
      ID int not null AUTO_INCREMENT,
      NOM_EQUIPE varchar(100),
      POINTS_TOTAL_EQUIPE int DEFAULT 0,

      NIVEAU_PALIER int not null,

      primary key(ID)
);

CREATE TABLE carte
(
      ID int not null AUTO_INCREMENT,

      LIBELLE varchar(40),
      MODE_STANDARD varchar(3) DEFAULT "Oui",
      MODE_ASSAUT varchar(3),
      MODE_IMPROMPTU varchar(3),

      primary key(ID)
);

CREATE TABLE combatEquipe
(
      ID_EQUIPE int not null,
      ID_EQUIPE_ADVERSE int not null,

      ID_CARTE int not null,

      primary key(ID_EQUIPE, ID_EQUIPE_ADVERSE)
);

CREATE TABLE admin
(
	ID int not null AUTO_INCREMENT,
	LOGIN varchar(20),
	PWD varchar(100),

	primary key(ID)
);

CREATE TABLE historiqueConnexion
(
      ID int not null AUTO_INCREMENT,
      ID_ADMIN int not null,
      DATEHEURE datetime,

      primary key (ID)
);

-- admin --
alter table historiqueConnexion add constraint FK_admin foreign key (ID_ADMIN)
      references admin (ID);


-- palier du joueur --
alter table joueur add constraint FK_PALIER foreign key (NIVEAU_PALIER)
      references palier (NIVEAU);

alter table joueur add constraint FK_PALIER_EQUIPE foreign key (ID_EQUIPE)
      references equipe (ID) on delete restrict on update restrict;

-- equipe --
alter table equipe add constraint FK_EQUIPE foreign key (NIVEAU_PALIER)
      references palier (NIVEAU) on delete restrict on update restrict;

-- combatSolo --
alter table combatSolo add constraint FK_CBT_SOLO_CARTE foreign key (ID_CARTE)
      references carte (ID) on delete restrict on update restrict;

alter table combatSolo add constraint FK_CBT_SOLO_J1 foreign key (ID_JOUEUR)
      references joueur (ID) on delete restrict on update restrict;

alter table combatSolo add constraint FK_CBT_SOLO_J2 foreign key (ID_ADVERSAIRE)
      references joueur (ID) on delete restrict on update restrict;

-- combatEquipe --
alter table combatEquipe add constraint FK_CBT_EQUIPE_CARTE foreign key (ID_CARTE)
      references carte (ID) on delete restrict on update restrict;

alter table combatEquipe add constraint FK_CBT_EQUIPE1 foreign key (ID_EQUIPE)
      references equipe (ID) on delete restrict on update restrict;

alter table combatEquipe add constraint FK_CBT_EQUIPE2 foreign key (ID_EQUIPE_ADVERSE)
      references equipe (ID) on delete restrict on update restrict;

INSERT INTO admin (ID, LOGIN, PWD) VALUES (1, tenebros, $2y$10$8ruU.Oc.6sPuR3gtoe2yZuWfnFt8vGat7.SJCTtkwyeWG1xJlcPFS);

INSERT INTO palier (NIVEAU, LIBELLE) VALUES
(1, 'Réserviste'),
(2, 'Recrue'),
(3, 'Soldat'),
(4, 'Officier Subalterne'),
(5, 'Officier Recrutement'),
(6, 'Quartier-Maître'),
(7, 'Officier Renseignement'),
(8, 'Officier Combat'),
(9, 'Officier Personnel'),
(10, 'Commandant Second'),
(11, 'Commandant'),
(12, 'Community Contributor'),
(13, 'Community Manager'),
(14, 'Développeur'),
(15, 'CEO Wargaming');

INSERT INTO carte (ID, LIBELLE, MODE_STANDARD, MODE_ASSAUT, MODE_IMPROMPTU) VALUES
(3, 'Abbaye', 'Oui', 'Non', 'Non'),
(4, 'Autoroute', 'Oui', 'Non', 'Non'),
(5, 'Baie du pêcheur', 'Oui', 'Non', 'Non'),
(6, 'Carélie', 'Oui', 'Oui', 'Non'),
(7, 'Col de montagne', 'Oui', 'Non', 'Non'),
(8, 'Ensk', 'Oui', 'Non', 'Oui'),
(9, 'Falaise', 'Oui', 'Non', 'Oui'),
(10, 'Fjords', 'Oui', 'Non', 'Non'),
(11, 'Frontière de l\'Empire', 'Oui', 'Non', 'Oui'),
(12, 'Himmelsdorf', 'Oui', 'Non', 'Oui'),
(13, 'Lake ville', 'Oui', 'Non', 'Oui'),
(14, 'Ligne Siegfried', 'Oui', 'Oui', 'Oui'),
(15, 'Live Oaks', 'Oui', 'Non', 'Non'),
(16, 'Malinovka', 'Oui', 'Non', 'Oui'),
(17, 'Mines', 'Oui', 'Non', 'Oui'),
(18, 'Minsk', 'Oui', 'Non', 'Non'),
(19, 'Murovanka', 'Oui', 'Non', 'Oui'),
(20, 'Overlord', 'Oui', 'Non', 'Non'),
(21, 'Paris', 'Oui', 'Non', 'Non'),
(22, 'Pilsen', 'Oui', 'Non', 'Non'),
(23, 'Plage sereine', 'Oui', 'Non', 'Non'),
(24, 'Prokhorovka', 'Oui', 'Non', 'Oui'),
(25, 'Province', 'Oui', 'Non', 'Non'),
(26, 'Redshire', 'Oui', 'Non', 'Oui'),
(27, 'Ruinberg', 'Oui', 'Non', 'Oui'),
(28, 'Steppes', 'Oui', 'Non', 'Oui'),
(29, 'Studzianki', 'Oui', 'Non', 'Non'),
(30, 'Toundra', 'Oui', 'Non', 'Non'),
(31, 'Westfield', 'Oui', 'Non', 'Non'),
(32, 'Erlenberg', 'Oui', 'Oui', 'Oui'),
(33, 'Glacier', 'Oui', 'Non', 'Non'),
(34, 'Kharkov', 'Oui', 'Non', 'Non'),
(35, 'Ligne Mannerheim', 'Oui', 'Non', 'Non'),
(37, 'Aérodrome', 'Oui', 'Non', 'Non'),
(38, 'El Halluf', 'Oui', 'Non', 'Oui'),
(39, 'Rivière de sable', 'Oui', 'Non', 'Oui'),
(40, 'Ville fantôme', 'Oui', 'Oui', 'Oui');
