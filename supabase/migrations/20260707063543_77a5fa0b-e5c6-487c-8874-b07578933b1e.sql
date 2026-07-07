
-- Restrict has_role execution to authenticated users only (used in RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- Tighten INSERT policy: require non-empty core fields, cap length
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 2 AND 100
    AND length(trim(email)) BETWEEN 3 AND 255
    AND email LIKE '%@%.%'
    AND length(trim(message)) BETWEEN 10 AND 2000
    AND coalesce(length(phone), 0) <= 30
    AND files_count BETWEEN 0 AND 20
    AND delivery_status IN ('pending', 'sent', 'failed')
  );
