CREATE POLICY "Public can view Tanya and Leslie studio files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'tanya-leslie-interiors');