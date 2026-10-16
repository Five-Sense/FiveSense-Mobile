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
			accessibilityLabel={[`${style.role}: ${title}`, typeof description === 'string' ? description : null].filter(Boolean).join('. ')}
            accessibilityLiveRegion={variant === 'error' ? 'assertive' : 'polite'}
			className={[
				'gap-2 overflow-hidden rounded-control bg-surface p-4',
				'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
				className ?? '',
			].join(' ')}
		>
			<Text className={`font-montserrat-semibold text-button ${style.text}`}>{title}</Text>

			{description != null ? (
				typeof description === 'string' ? (
					<Text className={`font-montserrat text-helper ${style.text}`}>{description}</Text>
				) : (
					description
				)
			) : null}
		</View>
	);
}
