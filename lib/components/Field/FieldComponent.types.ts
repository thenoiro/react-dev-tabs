export interface FieldComponentProps<PropType> {
  legend: string;
  value: PropType;
  onChange: <PropType>(v: PropType) => void;
  options: PropType[];
  default?: PropType;
}
