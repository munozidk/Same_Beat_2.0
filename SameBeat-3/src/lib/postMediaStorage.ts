import { supabase } from './supabaseClient';

export const POST_MEDIA_BUCKET = 'post-media';

const IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const AUDIO_TYPES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/webm',
  'audio/aac',
  'audio/mp4',
]);

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.-]+/g, '_');
}

function buildObjectPath(authUserId: string, folder: 'images' | 'audio', fileName: string) {
  return `${authUserId}/${folder}/${Date.now()}-${sanitizeFileName(fileName)}`;
}

export function isAllowedPostImage(file: File) {
  return IMAGE_TYPES.has(file.type) || /\.(jpe?g|png|webp|gif)$/i.test(file.name);
}

export function isAllowedPostAudio(file: File) {
  return AUDIO_TYPES.has(file.type) || /\.(mp3|wav|ogg|webm|aac|m4a)$/i.test(file.name);
}

export async function uploadPostMediaFile(
  authUserId: string,
  file: File,
  folder: 'images' | 'audio'
): Promise<{ publicUrl: string | null; error: string | null }> {
  const objectPath = buildObjectPath(authUserId, folder, file.name);

  const { error: uploadError } = await supabase.storage
    .from(POST_MEDIA_BUCKET)
    .upload(objectPath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    return { publicUrl: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from(POST_MEDIA_BUCKET).getPublicUrl(objectPath);

  return { publicUrl: data.publicUrl, error: null };
}
