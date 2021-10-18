import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Feature {
  title: string;
  id: string;
  price?: number;
  subFeatures?: Feature[];
}

interface FeatureProps {
  features: Feature[] | undefined;
}

interface ShowItemStates {
  [key: string | number]: boolean;
}

const data: Feature[] = [
  {
    title: "Feature A",
    id: uuidv4(),
    subFeatures: [
      {
        title: "Sub-feature A-1",
        id: uuidv4(),
        price: 0,
      },
      {
        title: "Sub-feature A-2",
        id: uuidv4(),
        price: 0,
        subFeatures: [
          {
            title: "Sub-feature A-2-1",
            id: uuidv4(),
            price: 50,
          },
          {
            title: "Sub-feature A-2-2",
            id: uuidv4(),
            price: 50,
          },
        ],
      },
      {
        title: "Sub-feature A-3",
        id: uuidv4(),
        price: 0,
      },
    ],
  },
  {
    title: "Feature B",
    id: uuidv4(),
  },
  {
    title: "Feature C",
    id: uuidv4(),
  },
];

const FeaturesList = ({ features }: FeatureProps) => {
  const [show, setShow] = useState<ShowItemStates>({});

  return Array.isArray(features) ? (
    <div style={{ cursor: "pointer" }}>
      {features.map((f) => {
        const { id, title, price, subFeatures } = f;

        return (
          <div key={id} style={{ paddingLeft: "10px" }}>
            <p
              onClick={() =>
                setShow((show: ShowItemStates) => ({
                  ...show,
                  [id]: !show[id],
                }))
              }
            >
              {title} {price && `$${price}`} {Array.isArray(subFeatures) && (show[id] ? '(-)' : '(+)')}
            </p>
            {show[id] && <FeaturesList features={subFeatures} />}
          </div>
        );
      })}
    </div>
  ) : (
    <div />
  );
};

export default function App() {
  return (
    <div className="App">
      <FeaturesList features={data} />
    </div>
  );
}
