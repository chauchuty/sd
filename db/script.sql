create table categoria (
    id int not null auto_increment,
    nome varchar(50) not null,
    primary key (id)
);

create table usuario (
    id int not null auto_increment,
    nome varchar(255) not null,
    ra varchar(32) not null,
    senha varchar(32) not null,
    categoria_id int not null,
    descricao text not null,
    disponivel int default 0,
    primary key (id),
    foreign key (categoria_id) references categoria (id)
);

insert into categoria (nome) values ('Programador');
update categoria set id = 0 where nome = 'Programador';
insert into categoria (nome) values ('Eletricista');
insert into categoria (nome) values ('Mecânico');
insert into categoria (nome) values ('Cientista');
insert into categoria (nome) values ('Professor');
insert into categoria (nome) values ('Analista');
insert into categoria (nome) values ('Gamer');
insert into categoria (nome) values ('Streamer');