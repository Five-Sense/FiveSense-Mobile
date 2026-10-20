import { usePreventRemove } from 'expo-router/react-navigation';
import { ArrowRight } from 'lucide-react-native';
import { RefreshControl, ScrollView, View } from 'react-native';

import { Alert } from '@/shared/components/feedback/alert';
import { Button } from '@/shared/components/ui/button';

import { OccurrenceFields } from '../components/form/occurrence-fields';
import { OccurrenceHeading } from '../components/form/occurrence-heading';
import { ImageSourceDialog } from '../components/image/image-source-dialog';
import { useOccurrenceForm } from '../hooks/use-occurrence-form';
import { OccurrenceSuccessScreen } from './occurrence-success-screen';

export default function OccurrenceCreationScreen() {
  const form = useOccurrenceForm();
  usePreventRemove(form.sending, form.showPendingNotice);
  if (form.completed) return <OccurrenceSuccessScreen onCreateAnother={form.createAnother} />;

  return (
    <>
      <ScrollView
        className="flex-1 bg-page" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={form.options.problems.isRefetching || form.options.materials.isRefetching} onRefresh={() => { void form.refresh(); }} enabled={!form.sending} />}>
        <View className="w-full max-w-[1440px] flex-1 justify-between gap-[32px] self-center px-[16px] pb-[24px] pt-[32px] md:px-[40px]">
          <View className="gap-[24px]">
            <OccurrenceHeading progress={form.progress} />
            {form.feedback ? <Alert variant={form.feedback.variant} title={form.feedback.title} description={form.feedback.description} /> : null}
            {form.uncertain ? <Button variant="secondary" onPress={form.acknowledgeRetry}>Conferi, liberar nova tentativa</Button> : null}
            <OccurrenceFields form={form} />
          </View>
          <Button icon={ArrowRight} iconPosition="end" iconSize={32} disabled={!form.canSubmit && !form.sending} loading={form.sending} loadingLabel={form.phase === 'uploading' ? 'Enviando imagens...' : 'Enviando ocorrência...'} onPress={form.submit}>Enviar ocorrência</Button>
        </View>
      </ScrollView>
      <ImageSourceDialog visible={form.imageChooserOpen} onClose={() => form.setImageChooserOpen(false)} onChoose={form.pickImage} />
    </>
  );
}
