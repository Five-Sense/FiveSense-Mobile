import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

export type AlertVariant = 'error' | 'info' | 'success' | 'warning';

type VariantStyle = {
	text: string;
	role: string;
};

const VARIANT_STYLES: Record<AlertVariant, VariantStyle> = {
	error: { text: 'text-error-text', role: 'Erro' },
	info: { text: 'text-info-text', role: 'Informação' },
	success: { text: 'text-success-text', role: 'Sucesso' },
	warning: { text: 'text-warning-text', role: 'Aviso' },
};

export type AlertProps = {
	variant?: AlertVariant;
	title: string;
	description?: ReactNode;
	className?: string;
};

export function Alert({ variant = 'error', title, description, className }: AlertProps) {
	const style = VARIANT_STYLES[variant];

	return (
		<View
			accessible
			accessibilityRole="alert"
			accessibilityLabel={`${style.role}: ${title}`}
			className={[
				'gap-2 overflow-hidden rounded-lg bg-surface p-4',
				'shadow-md shadow-black/25',
				className ?? '',
			].join(' ')}
		>
			<Text className={`text-base font-semibold leading-6 ${style.text}`}>{title}</Text>

			{description != null ? (
				typeof description === 'string' ? (
					<Text className={`text-sm font-normal leading-5 ${style.text}`}>{description}</Text>
				) : (
					description
				)
			) : null}
		</View>
	);
}
