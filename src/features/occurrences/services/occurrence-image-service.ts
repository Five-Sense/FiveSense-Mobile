import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

import { AppError } from '@/shared/services/api/app-error';

import { ACCEPTED_IMAGE_TYPES, MAX_OCCURRENCE_IMAGES, type OccurrenceImage } from '../types/occurrence';
import { validateOccurrenceImages } from '../utils/occurrence-images';

const MIME_BY_EXTENSION: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' };

export function validatePickedImage(asset: ImagePicker.ImagePickerAsset): OccurrenceImage {
  const size = asset.file?.size ?? asset.fileSize;
  const name = asset.file?.name ?? asset.fileName ?? asset.uri.split('/').pop()?.split('?')[0] ?? 'imagem';
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  const mimeType = asset.file?.type || asset.mimeType || MIME_BY_EXTENSION[extension];
  if (!ACCEPTED_IMAGE_TYPES.includes(mimeType ?? '') || (asset.type && asset.type !== 'image')) {
    throw new AppError('validation', 'Selecione fotos nos formatos JPG ou PNG.');
  }
  const image = { uri: asset.uri, name, mimeType, size: size ?? 0, ...(asset.file ? { file: asset.file } : {}) };
  validateOccurrenceImages([image]);
  return image;
}

export async function pickOccurrenceImages(source: 'camera' | 'library'): Promise<OccurrenceImage[]> {
  if (source === 'camera' && Platform.OS !== 'web') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) throw new AppError('validation', 'Permita o acesso à câmera ou escolha fotos da galeria.');
  }
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: false, quality: 1 };
  const result = await (source === 'camera'
    ? ImagePicker.launchCameraAsync(options)
    : ImagePicker.launchImageLibraryAsync({ ...options, allowsMultipleSelection: true, selectionLimit: MAX_OCCURRENCE_IMAGES }));
  if (result.canceled) return [];
  const images = result.assets.map(validatePickedImage);
  validateOccurrenceImages(images);
  return images;
}
