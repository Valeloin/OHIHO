-- OHIHO — Migration 007 : suppression du parcours de devis
-- À exécuter dans Supabase : Project → SQL Editor → New query → coller ce fichier entier → Run
-- Annule migration_004_quote_requests.sql : la fonctionnalité de demande de
-- devis en ligne a été retirée du site (voir git). Cette migration ne
-- supprime que ce qui lui appartenait en propre — profiles, site_content et
-- les fonctions communes ne sont pas touchées.

drop table if exists quote_requests;
drop type if exists quote_project_type;
drop type if exists quote_status;
