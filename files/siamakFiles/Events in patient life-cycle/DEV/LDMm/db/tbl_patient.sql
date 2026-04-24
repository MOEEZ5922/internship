create table patient
(
    id                  INT         NOT null IDENTITY (1, 1)
        constraint patients_pk
            primary key nonclustered,
    first_name          varchar(50),
    last_name           VARCHAR(50),
    address             VARCHAR(100),
    zip_code            INT         NULL,
    town                VARCHAR(50) NULL,
    full_name           VARCHAR(50) NULL,
    data_protected_type INT         NULL,
    creation_date       DATETIME    NULL,
    gender              VARCHAR(5)  NULL,
    trc_id              INT         NULL
)
go

create table treatment
(
    id                     int not null IDENTITY (1, 1)
        constraint treatments_pk
            primary key nonclustered,
    patient_id             int not null
        constraint treatments_patients_id_fk
            references patient (id)
            on update cascade on delete cascade,
    trc_treatment_id       int not null,
    trc_rendered_treatment int
)
go

create table progress_indicator_type
(
    id             int not null IDENTITY (1, 1),
    min_value      float,
    max_value      float,
    description    VARCHAR(100),
    units          varchar(36),
    classification VARCHAR(30),
    field_type     VARCHAR(5)
)
go

create unique index progress_indicator_type_id_uindex
    on progress_indicator_type (id)
go

alter table progress_indicator_type
    add constraint progress_indicator_type_pk
        primary key nonclustered (id)
go

create table risk_factor_type
(
    id          int not null IDENTITY (1, 1),
    factor_type int,
    name        VARCHAR(50)
)
go

create unique index risk_factor_type_id_uindex
    on risk_factor_type (id)
go

alter table risk_factor_type
    add constraint risk_factor_type_pk
        primary key nonclustered (id)
go

create table treatment_risk_factor
(
    id                  int not null IDENTITY (1, 1),
    value               float,
    id_risk_factor_type int not null
        constraint treatment_risk_factor_risk_factor_type_id_fk
            references risk_factor_type (id),
    id_treatment        int not null
        constraint treatment_risk_factor_treatments_id_fk
            references treatment (id)
            on update cascade on delete cascade,
    creation_date       DATETIME
)
go

create unique index treatment_risk_factor_id_uindex
    on treatment_risk_factor (id)
go

alter table treatment_risk_factor
    add constraint treatment_risk_factor_pk
        primary key nonclustered (id)
go

create table treatment_progress_indicator
(
    id                         int not null IDENTITY (1, 1),
    id_progress_indicator_type int not null
        constraint treatment_progress_indicator_progress_indicator_type_id_fk
            references progress_indicator_type,
    id_treatment               int not null
        constraint treatment_progress_indicator_treatments_id_fk
            references treatment
            on update cascade on delete cascade,
    creation_date              DATETIME,
    value                      VARCHAR(50),
    measurement_date           DATETIME
)
go

create unique index treatment_progress_indicator_id_uindex
    on treatment_progress_indicator (id)
go

alter table treatment_progress_indicator
    add constraint treatment_progress_indicator_pk
        primary key nonclustered (id)
go

