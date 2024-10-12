interface Props {
  className?: string;
}

export default function SettingsSeparator({ className }: Props) {
  return <span className={`${className} block mt-8`} />;
}
