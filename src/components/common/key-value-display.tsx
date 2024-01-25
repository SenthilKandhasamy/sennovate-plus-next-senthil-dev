interface Props {
  heading: string;
  pairs: {
    key?: string | null;
    value?: string | null;
  }[];
}

export default function KeyValueDisplay({ heading, pairs }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold opacity-90 mb-2">{heading}</h2>
      <ul>
        {pairs.map((pair) => (
          <li className="mb-3 grid grid-cols-2" key={pair.key}>
            <span className="font-bold opacity-50">{pair.key}: </span>
            <span>{pair.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
