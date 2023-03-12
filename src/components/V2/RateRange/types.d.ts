interface IRateRangeV2 {
  addClass?: string;
  min: number;
  max: number;
  onChange: (name: "min" | "max", max: number) => void;
}

interface IRange {
  min: number;
  max: number;
}
