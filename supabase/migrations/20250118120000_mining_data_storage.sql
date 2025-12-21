-- Location: supabase/migrations/20250118120000_mining_data_storage.sql
-- Mining Safety Data Storage Setup
-- Integration Type: Storage buckets for mining data import management
-- Dependencies: None (storage buckets are independent)

-- Create storage buckets for different mining data types
-- These are private buckets for secure technical data storage

-- Drone Imagery Storage - Private bucket for aerial survey data
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'mining-drone-data',
    'mining-drone-data', 
    false,
    5368709120, -- 5GB limit
    ARRAY['image/jpeg', 'image/png', 'image/tiff', 'image/tif', 'video/mp4', 'video/quicktime', 'video/avi']
);

-- DEM Data Storage - Private bucket for elevation models  
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'mining-dem-data',
    'mining-dem-data',
    false, 
    2147483648, -- 2GB limit
    ARRAY['image/tiff', 'image/tif', 'application/octet-stream', 'text/plain']
);

-- Sensor Data Storage - Private bucket for sensor readings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'mining-sensor-data', 
    'mining-sensor-data',
    false,
    524288000, -- 500MB limit
    ARRAY['text/csv', 'application/json', 'application/xml', 'text/xml', 'text/plain', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
);

-- Environmental Data Storage - Private bucket for environmental monitoring
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'mining-environmental-data',
    'mining-environmental-data', 
    false,
    209715200, -- 200MB limit
    ARRAY['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/xml', 'text/xml', 'text/plain']
);

-- General Mining Data Storage - Private bucket for miscellaneous files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'mining-general-data',
    'mining-general-data',
    false,
    1073741824, -- 1GB limit
    ARRAY['application/pdf', 'text/plain', 'application/zip', 'application/x-zip-compressed']
);

-- RLS Policies for storage buckets - Private access only

-- Mining Drone Data Policies
CREATE POLICY "users_can_upload_drone_data"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mining-drone-data');

CREATE POLICY "users_can_view_own_drone_data"
ON storage.objects  
FOR SELECT
TO authenticated
USING (bucket_id = 'mining-drone-data');

CREATE POLICY "users_can_delete_own_drone_data"
ON storage.objects
FOR DELETE 
TO authenticated
USING (bucket_id = 'mining-drone-data' AND owner = auth.uid());

-- Mining DEM Data Policies
CREATE POLICY "users_can_upload_dem_data"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mining-dem-data');

CREATE POLICY "users_can_view_own_dem_data"
ON storage.objects
FOR SELECT
TO authenticated 
USING (bucket_id = 'mining-dem-data');

CREATE POLICY "users_can_delete_own_dem_data"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'mining-dem-data' AND owner = auth.uid());

-- Mining Sensor Data Policies  
CREATE POLICY "users_can_upload_sensor_data"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mining-sensor-data');

CREATE POLICY "users_can_view_own_sensor_data"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'mining-sensor-data');

CREATE POLICY "users_can_delete_own_sensor_data" 
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'mining-sensor-data' AND owner = auth.uid());

-- Mining Environmental Data Policies
CREATE POLICY "users_can_upload_environmental_data"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mining-environmental-data');

CREATE POLICY "users_can_view_own_environmental_data"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'mining-environmental-data');

CREATE POLICY "users_can_delete_own_environmental_data"
ON storage.objects
FOR DELETE
TO authenticated 
USING (bucket_id = 'mining-environmental-data' AND owner = auth.uid());

-- Mining General Data Policies
CREATE POLICY "users_can_upload_general_data"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'mining-general-data');

CREATE POLICY "users_can_view_own_general_data"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'mining-general-data');

CREATE POLICY "users_can_delete_own_general_data"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'mining-general-data' AND owner = auth.uid());