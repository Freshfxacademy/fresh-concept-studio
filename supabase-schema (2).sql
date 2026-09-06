-- ============================================================
-- Fresh Concept Studio — Supabase schema for the admin panel
-- Run this once in Supabase: Project -> SQL Editor -> New query
-- ============================================================

-- 1. Table: every portfolio card (video or image) lives here
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tagline text,
  client text,
  category text not null check (category in (
    'podcast', 'action-thriller', '3d-animation',
    'short-film', 'advertisement', 'illustration', 'web-development'
  )),
  media_type text not null check (media_type in ('video', 'image')),
  youtube_id text,
  image_path text,
  external_url text,
  year int,
  tools text[],
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Row Level Security: public can READ, only logged-in admin can write
alter table portfolio_items enable row level security;

create policy "Public can read portfolio items"
  on portfolio_items for select
  using (true);

create policy "Authenticated users can insert"
  on portfolio_items for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update"
  on portfolio_items for update
  to authenticated
  using (true);

create policy "Authenticated users can delete"
  on portfolio_items for delete
  to authenticated
  using (true);

-- 3. Storage bucket for uploaded images (illustration / web-dev screenshots)
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public can view portfolio media"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create policy "Authenticated users can upload portfolio media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-media');

create policy "Authenticated users can delete portfolio media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-media');

-- ============================================================
-- 4. Seed data — your current 11 cards, migrated from works.json
--    (placeholder entries carry their "Replace with..." text —
--    edit those rows from the admin panel once it's live)
-- ============================================================

insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('Replace with episode title', 'Replace with one-line hook from the episode', 'Replace with podcast/show name', 'podcast', 'video', 'REPLACE_WITH_YOUTUBE_ID', NULL, NULL, 2026, '{"Premiere Pro","DaVinci Resolve"}', true, 0);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('THE LAST DAYS', 'When did you stop deciding — and when exactly did you hand that over?', 'Fresh Concept Production', 'action-thriller', 'video', 'ImpZJ44Waqc', NULL, NULL, 2026, '{"Premiere Pro","DaVinci Resolve"}', true, 1);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('VEILS', 'What if reality is only a veil hiding something far greater?', 'Fresh Concept Production', 'action-thriller', 'video', 'tICw5D-MuLo', NULL, NULL, 2026, '{"Premiere Pro","DaVinci Resolve"}', false, 2);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('BLOODLAND', 'This Land Has A Price.', 'Fresh Concept Production', 'action-thriller', 'video', '2n1ACzkx4d4', NULL, NULL, 2026, '{"Premiere Pro","DaVinci Resolve"}', false, 3);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('Tales of Valdir', 'A promotional piece created for a contest entry.', 'Contest entry', '3d-animation', 'video', 'viSh1wKAhSc', NULL, NULL, 2026, '{"Blender","Cinema 4D","After Effects"}', true, 4);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('Koko''s Adventure', 'Koko hears a mysterious BOOM and follows it straight into an adventure with his new best friends.', 'Add client/production name', '3d-animation', 'video', 'Y3P0wXYLM5I', NULL, NULL, 2026, '{"Blender","Cinema 4D","After Effects"}', false, 5);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('War in Heaven', 'A high-impact cinematic short exploring the celestial conflict between Archangel Michael and the Great Dragon.', 'Fresh Concept Production', 'short-film', 'video', '77-RqKmWCcU', NULL, NULL, 2026, '{"Premiere Pro","DaVinci Resolve"}', true, 6);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('DAKADA — Your AI Business Partner', 'Stand Up. Rise Up. Grow Together.', 'DAKADA', 'advertisement', 'video', 'cn2yX3pO2z0', NULL, NULL, 2026, '{"Premiere Pro","After Effects"}', false, 7);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('Godark', 'A promotional piece created for a contest entry.', 'Contest entry', 'advertisement', 'video', 'zjqiNn_QQL8', NULL, NULL, 2026, '{"Premiere Pro","After Effects"}', false, 8);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('Replace with piece title', 'Replace with a one-line description of the piece', 'Replace with client name (or ''Personal work'')', 'illustration', 'image', NULL, '/assets/work/illustration-001.jpg', NULL, 2026, '{"Procreate","Adobe Illustrator"}', false, 9);
insert into portfolio_items (title, tagline, client, category, media_type, youtube_id, image_path, external_url, year, tools, featured, sort_order) values ('Replace with site/project title', 'Replace with a one-line description of the project', 'Replace with client name', 'web-development', 'image', NULL, '/assets/work/web-development-001.jpg', 'https://REPLACE_WITH_LIVE_SITE_URL.com', 2026, '{"React","Tailwind CSS"}', false, 10);
