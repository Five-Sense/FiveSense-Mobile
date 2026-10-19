import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

import { AppError } from '@/shared/services/api/app-error';

import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type OccurrenceImage } from '../types/occurrence';

const MIME_BY_EXTENSION: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', heic: 'image/heic', heif: 'image/heif', avif: 'image/avif', bmp: 'image/bmp',
};

export function validatePickedImage(asset: ImagePicker.ImagePickerAsset): OccurrenceImage {
  const size = asset.file?.size ?? asset.fileSize;
  const name = asset.file?.name ?? asset.fileName ?? asset.uri.split('/').pop()?.split('?')[0] ?? 'imagem';
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  const mimeType = asset.file?.type || asset.mimeType || MIME_BY_EXTENSION[extension];
  if (!ACCEPTED_IMAGE_TYPES.includes(mimeType ?? '') || (asset.type && asset.type !== 'image')) {
    throw new AppError('validation', 'Selecione uma imagem nos formatos JPG ou PNG.');
  }
  if (!size || !Number.isFinite(size) || size < 1) {
    throw new AppError('validation', 'Não foi possível verificar o tamanho da imagem. Escolha outra foto.');
  }
  if (size > MAX_IMAGE_BYTES) throw new AppError('validation', 'A imagem deve ter no máximo 5 MB.');
  return { uri: asset.uri, name, mimeType, size, ...(asset.file ? { file: asset.file } : {}) };
}

export async function pickOccurrenceImage(source: 'camera' | 'library'): Promise<OccurrenceImage | null> {
  if (source === 'camera' && Platform.OS !== 'web') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) throw new AppError('validation', 'Permita o acesso à câmera ou escolha uma foto da galeria.');
  }
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: false, quality: 1 };
  const result = await (source === 'camera'
    ? ImagePicker.launchCameraAsync(options)
    : ImagePicker.launchImageLibraryAsync(options));
  return result.canceled ? null : validatePickedImage(result.assets[0]);
}
