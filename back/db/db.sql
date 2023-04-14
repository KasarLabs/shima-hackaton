--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: schema_owner; Type: SCHEMA; Schema: -; Owner: owner
--

CREATE SCHEMA schema_owner;


ALTER SCHEMA schema_owner OWNER TO owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dapp; Type: TABLE; Schema: public; Owner: clement
--

CREATE TABLE public.dapp (
    id integer NOT NULL,
    network character varying(255) NOT NULL,
    nom character varying(255) NOT NULL,
    user_id bigint NOT NULL,
    url character varying(255) NOT NULL
);


ALTER TABLE public.dapp OWNER TO clement;

--
-- Name: dapp_id_seq; Type: SEQUENCE; Schema: public; Owner: clement
--

CREATE SEQUENCE public.dapp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dapp_id_seq OWNER TO clement;

--
-- Name: dapp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clement
--

ALTER SEQUENCE public.dapp_id_seq OWNED BY public.dapp.id;


--
-- Name: dapp_user_id_seq; Type: SEQUENCE; Schema: public; Owner: clement
--

CREATE SEQUENCE public.dapp_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dapp_user_id_seq OWNER TO clement;

--
-- Name: dapp_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: clement
--

ALTER SEQUENCE public.dapp_user_id_seq OWNED BY public.dapp.user_id;


--
-- Name: providers; Type: TABLE; Schema: schema_owner; Owner: clement
--

CREATE TABLE schema_owner.providers (
    provider_id integer NOT NULL,
    rpc_url character varying(255) NOT NULL,
    performance_score double precision NOT NULL
);


ALTER TABLE schema_owner.providers OWNER TO clement;

--
-- Name: providers_provider_id_seq; Type: SEQUENCE; Schema: schema_owner; Owner: clement
--

CREATE SEQUENCE schema_owner.providers_provider_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE schema_owner.providers_provider_id_seq OWNER TO clement;

--
-- Name: providers_provider_id_seq; Type: SEQUENCE OWNED BY; Schema: schema_owner; Owner: clement
--

ALTER SEQUENCE schema_owner.providers_provider_id_seq OWNED BY schema_owner.providers.provider_id;


--
-- Name: users; Type: TABLE; Schema: schema_owner; Owner: clement
--

CREATE TABLE schema_owner.users (
    id integer NOT NULL,
    wallet_address character varying(255) NOT NULL,
    key character varying(255) NOT NULL
);


ALTER TABLE schema_owner.users OWNER TO clement;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: schema_owner; Owner: clement
--

CREATE SEQUENCE schema_owner.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE schema_owner.users_id_seq OWNER TO clement;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: schema_owner; Owner: clement
--

ALTER SEQUENCE schema_owner.users_id_seq OWNED BY schema_owner.users.id;


--
-- Name: dapp id; Type: DEFAULT; Schema: public; Owner: clement
--

ALTER TABLE ONLY public.dapp ALTER COLUMN id SET DEFAULT nextval('public.dapp_id_seq'::regclass);


--
-- Name: dapp user_id; Type: DEFAULT; Schema: public; Owner: clement
--

ALTER TABLE ONLY public.dapp ALTER COLUMN user_id SET DEFAULT nextval('public.dapp_user_id_seq'::regclass);


--
-- Name: providers provider_id; Type: DEFAULT; Schema: schema_owner; Owner: clement
--

ALTER TABLE ONLY schema_owner.providers ALTER COLUMN provider_id SET DEFAULT nextval('schema_owner.providers_provider_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: schema_owner; Owner: clement
--

ALTER TABLE ONLY schema_owner.users ALTER COLUMN id SET DEFAULT nextval('schema_owner.users_id_seq'::regclass);


--
-- Data for Name: dapp; Type: TABLE DATA; Schema: public; Owner: clement
--

COPY public.dapp (id, network, nom, user_id, url) FROM stdin;
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: schema_owner; Owner: clement
--

COPY schema_owner.providers (provider_id, rpc_url, performance_score) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: schema_owner; Owner: clement
--

COPY schema_owner.users (id, wallet_address, key) FROM stdin;
\.


--
-- Name: dapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clement
--

SELECT pg_catalog.setval('public.dapp_id_seq', 1, false);


--
-- Name: dapp_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: clement
--

SELECT pg_catalog.setval('public.dapp_user_id_seq', 1, false);


--
-- Name: providers_provider_id_seq; Type: SEQUENCE SET; Schema: schema_owner; Owner: clement
--

SELECT pg_catalog.setval('schema_owner.providers_provider_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: schema_owner; Owner: clement
--

SELECT pg_catalog.setval('schema_owner.users_id_seq', 1, false);


--
-- Name: dapp dapp_pkey; Type: CONSTRAINT; Schema: public; Owner: clement
--

ALTER TABLE ONLY public.dapp
    ADD CONSTRAINT dapp_pkey PRIMARY KEY (id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: schema_owner; Owner: clement
--

ALTER TABLE ONLY schema_owner.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (provider_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: schema_owner; Owner: clement
--

ALTER TABLE ONLY schema_owner.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

